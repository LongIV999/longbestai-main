# Log — 2026-02-13 — Post-deploy funnel (longbestai.com)

## Goal
Ship post-deploy funnel upgrades:
- Sticky CTA site-wide (Zalo group + hotline)
- Anti-scam notice
- Intake landing page
- Update `/deals/openclaw-setup` pricing/content to real rates + promo + overage policy

## Work summary (what changed)
### New components
- `apps/web/src/components/sticky-cta.tsx`
- `apps/web/src/components/anti-scam-notice.tsx`
- `apps/web/src/components/lead-capture-cta.tsx`

### New page
- `apps/web/src/app/intake/page.tsx`
  - Currently a placeholder page (form not embedded yet)
  - Provides CTA to Zalo group + tel link

### Updated pages
- `apps/web/src/app/layout.tsx`
  - Renders `<StickyCta />` site-wide
- `apps/web/src/app/page.tsx`
  - Adds `LeadCaptureCta` banner + `AntiScamNotice`
- `apps/web/src/app/deals/[slug]/page.tsx`
  - Adds `LeadCaptureCta` + `AntiScamNotice`
  - Updates pricing display to show promo price + crossed-out original

### Updated content
- `content/deals/openclaw-setup.json`
  - Updated to real pricing + promo rules:
    - Lite: setup 600k (from 1.2m) + 390k/mo
    - Standard: setup 900k (from 1.8m) + 690k/mo
    - Pro: setup 1.25m (from 2.5m) + 990k/mo
  - Promo: 50% off setup for first 25 customers; ends when group hits 100 members
  - Refund: 7-day 100% refund on setup fee
  - Overage policy: 100k/hour or 200k/session (1 session = 2 hours), choose cheaper option; examples included

### Ignore rules
- `.gitignore` updated to ignore `.open-next/` artifacts.

## Validation (must pass)
- `pnpm content:validate` ✅
- `pnpm -C apps/web run lint` ✅
- `pnpm -C apps/web run typecheck` ✅
- `pnpm -C apps/web build` ✅

## Deploy
Deployed via OpenNext Cloudflare:
- `pnpm -C apps/web run deploy`
- Worker URL: `https://longbestai-web.longbest-ai.workers.dev`
- Custom domain verified: `https://longbestai.com/`

## Smoke test URLs
- https://longbestai.com/
- https://longbestai.com/deals/openclaw-setup
- https://longbestai.com/intake
- https://longbestai.com/sitemap.xml
- https://longbestai.com/robots.txt

## Next tasks (for tonight with Claude Code)
1) Replace intake placeholder with real form (embed Google Form or link to it).
   - Recommended: use `NEXT_PUBLIC_INTAKE_URL` and make CTA buttons use that.
2) Improve homepage hero (currently still shows shadcn component showcase) to match production positioning.
3) Add a dedicated CTA section on all money pages (deals) with explicit booking steps.
4) Ensure sticky CTA does not overlap page content on all breakpoints.
