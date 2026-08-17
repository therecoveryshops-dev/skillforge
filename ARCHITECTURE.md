# SkillForge architecture v0.1

## Core loop

1. **Teach** — Chrome extension records a demonstration.
2. **Compile** — recorder events become a Skill JSON definition.
3. **Review** — user reviews variables, domains, and steps.
4. **Run** — Playwright executes the skill with new inputs.
5. **Observe** — logs/results feed future healing and reliability work.

## Security boundaries from day one

- Every skill has an explicit `allowedDomains` list.
- The recorder intentionally ignores password and file inputs.
- The worker refuses cross-domain `navigate` steps unless explicitly allowed.
- Credentials should not be stored in skill JSON.
- Future credential support should use encrypted secret storage plus per-run approvals.
- No CAPTCHA bypass, paywall bypass, anti-bot evasion, or unauthorized access logic belongs in the product.

## Next version

The first serious reliability upgrade should store multiple locators per target:

```json
{
  "role": "button",
  "name": "Search",
  "css": "button[data-testid='search']",
  "text": "Search"
}
```

At runtime, SkillForge can try stable semantic locators before fragile CSS paths and then ask an AI healer to propose a replacement when the page changes.
