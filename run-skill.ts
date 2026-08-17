import fs from "node:fs";
import { chromium } from "playwright";

const skillPath = process.argv[2];
const inputsArg = process.argv[3] || "{}";

if (!skillPath) {
  console.error("Usage: npm run run -- <skill.json> '<inputs-json>'");
  process.exit(1);
}

const skill = JSON.parse(fs.readFileSync(skillPath, "utf8"));
const inputs = JSON.parse(inputsArg);

function interpolate(value: string) {
  return String(value).replace(/{{\s*([a-zA-Z0-9_]+)\s*}}/g, (_m, key) => {
    if (!(key in inputs)) throw new Error(`Missing required input: ${key}`);
    return String(inputs[key]);
  });
}

function hostname(url: string) {
  try { return new URL(url).hostname; } catch { return ""; }
}

const browser = await chromium.launch({ headless: false });
const context = await browser.newContext();
const page = await context.newPage();

try {
  for (const [index, step] of skill.steps.entries()) {
    console.log(`[${index + 1}/${skill.steps.length}] ${step.action}`);

    if (step.action === "navigate") {
      const url = interpolate(step.url);
      const host = hostname(url);
      if (!skill.allowedDomains.includes(host)) throw new Error(`Blocked navigation to unapproved domain: ${host}`);
      await page.goto(url, { waitUntil: "domcontentloaded" });
    } else if (step.action === "click") {
      await page.locator(step.selector).first().click({ timeout: 15000 });
    } else if (step.action === "fill") {
      await page.locator(step.selector).first().fill(interpolate(step.value), { timeout: 15000 });
    } else if (step.action === "press") {
      await page.locator(step.selector).first().press(step.key, { timeout: 15000 });
    } else if (step.action === "extract") {
      const locator = page.locator(step.selector);
      const values = step.multiple ? await locator.allTextContents() : [await locator.first().textContent()];
      console.log(JSON.stringify({ field: step.field, values }, null, 2));
    } else {
      throw new Error(`Unsupported action: ${step.action}`);
    }
  }
  console.log("Skill run completed.");
} catch (error) {
  console.error("Skill run failed:", error);
  process.exitCode = 1;
} finally {
  await page.waitForTimeout(2500).catch(() => {});
  await browser.close();
}
