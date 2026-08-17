# SkillForge v0.1

**Teach once. Run anywhere.**

SkillForge is an MVP for turning a demonstrated browser workflow into a reusable, parameterized skill.

## What works in this starter

1. A Chrome extension records clicks and typed values on pages you are authorized to automate.
2. The web app imports the recording and lets you review/parameterize it.
3. The API can compile a recording into a structured skill using OpenAI when `OPENAI_API_KEY` is configured, with a local fallback compiler for development.
4. The Playwright worker can execute the saved skill with new inputs.

## Repository structure

- `apps/web` — dashboard + Teach / Review / Run screens
- `apps/extension` — Manifest V3 Chrome recorder
- `apps/api` — compiler API
- `apps/worker` — Playwright execution engine
- `packages/shared` — shared TypeScript skill schema
- `examples` — sample recording and compiled skill

## MVP scope

The first milestone is intentionally narrow:

> Record a browser task → identify variables → compile it → rerun it with different inputs.

This starter does **not** bypass authentication, CAPTCHAs, paywalls, rate limits, or other access restrictions. Only automate websites and accounts you are authorized to use.

## Setup

Prerequisites: Node.js 20+ and Chrome.

```bash
npm install
cp .env.example apps/api/.env
npm run dev:api
npm run dev:web
```

### Load the Chrome extension

1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked**.
4. Select `apps/extension`.
5. Visit a page you are allowed to automate.
6. Use the extension popup to start and stop recording.
7. Export the recording JSON and import it in the web app.

### Run a compiled skill

From `apps/worker`:

```bash
npm install
npx playwright install chromium
npm run run -- ../../examples/google-search.skill.json '{"query":"dentists in Houston"}'
```

## Next engineering milestones

- Replace JSON export/import with direct extension-to-dashboard sync.
- Add Supabase auth + database persistence.
- Add screenshot capture and visual element descriptions.
- Add semantic selector healing.
- Add encrypted credential vault.
- Add run approvals and domain-level permissions.
- Add MCP exposure for approved skills.
