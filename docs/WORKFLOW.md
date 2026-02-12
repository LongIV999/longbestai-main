# Development Workflow

## IDE Loop (Local Development)

1. **Edit content**: `pnpm content:make` hoặc edit JSON trực tiếp trong `content/`
2. **Validate**: `pnpm content:validate` để kiểm tra schema
3. **Preview**: `pnpm dev` → http://localhost:3000
4. **Typecheck**: `pnpm -C apps/web run typecheck`
5. **Lint**: `pnpm -C apps/web run lint`
6. **Commit** (when ready)

## OpenClaw Render Loop (Job Cards)

```
Input: content/jobs/*.json (full job data)
  ↓ Export
Output: exports/cards/*.json (card-only data)
  ↓ Render
Final: PNG/JPG via social_card_to_image
```

**Command**: `pnpm content:export-card`

## Content Creation Workflow

1. Boss provides content (see `BOSS_INTAKE_TEMPLATE.md`)
2. Run: `pnpm content:make post` (or deal/course/job)
3. Follow interactive prompts
4. Validate: `pnpm content:validate`
5. Preview: Check http://localhost:3000/blog
6. Commit & deploy

## Content Types & Routes

| Type | Directory | Route | Example |
|------|-----------|-------|---------|
| Posts | `content/posts/` | `/blog` | http://localhost:3000/blog |
| Deals | `content/deals/` | `/deals` | http://localhost:3000/deals |
| Courses | `content/courses/` | `/courses` | http://localhost:3000/courses |
| Jobs | `content/jobs/` | `/jobs` | http://localhost:3000/jobs |

## Pre-commit Checklist

Before committing content changes:

```bash
# Validate all content
pnpm content:validate

# Type check
pnpm -C apps/web run typecheck

# Lint
pnpm -C apps/web run lint

# Test routes locally
pnpm dev
```

## Deployment

Production deployment automatically:
1. Validates all JSON content against schemas
2. Generates static pages for all content (SSG)
3. Caches content in production for performance
