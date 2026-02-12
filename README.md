# LongBestAI Monorepo

Nền tảng AI automation với Next.js, React 19, shadcn/ui và JSON-first content system.

## Getting Started

```bash
pnpm install
pnpm dev
```

Visit http://localhost:3000 to see the app.

## Content Management

### Commands

- `pnpm dev` - Start Next.js dev server (http://localhost:3000)
- `pnpm content:validate` - Validate all JSON content files
- `pnpm content:make` - Create new content interactively
- `pnpm content:export-card` - Export job cards for rendering

### Content Types

- **Posts** (`content/posts/*.json`) - Blog articles
- **Deals** (`content/deals/*.json`) - Pricing & packages
- **Courses** (`content/courses/*.json`) - Training programs
- **Jobs** (`content/jobs/*.json`) - Visual job postings

### Routes

- Blog: http://localhost:3000/blog
- Deals: http://localhost:3000/deals
- Courses: http://localhost:3000/courses
- Jobs: http://localhost:3000/jobs

### Documentation

- [Development Workflow](docs/WORKFLOW.md) - IDE loop, render loop, deployment
- [Content Style Guide](docs/STYLE.md) - Brand colors, CTA rules, tone & voice
- [Boss Intake Template](docs/BOSS_INTAKE_TEMPLATE.md) - Content submission format

## Project Structure

```
longbestai-main/
├── apps/
│   └── web/               # Next.js 16 app
├── packages/
│   ├── shared/            # Zod schemas, types, utils
│   └── content-ops/       # CLI tools (validate, make, export-card)
├── content/               # JSON content files
│   ├── posts/
│   ├── deals/
│   ├── courses/
│   └── jobs/
├── exports/
│   └── cards/             # Exported job cards
└── docs/                  # Documentation
```

## Tech Stack

- **Next.js 16** - App Router + React 19
- **TypeScript** - Type-safe development
- **shadcn/ui** - Beautiful UI components
- **Tailwind CSS 4** - Utility-first styling
- **Zod** - Schema validation
- **pnpm** - Fast, efficient package manager

## Features

- ✅ 3-theme toggle (bridge-brutal, official-light, dark-aurora)
- ✅ JSON-first content system
- ✅ Type-safe schemas with Zod
- ✅ Interactive CLI for content creation
- ✅ Static site generation (SSG)
- ✅ Vietnamese diacritic handling
- ✅ Brand color system (#00F0F0, #B6FF00)

## License

Private
