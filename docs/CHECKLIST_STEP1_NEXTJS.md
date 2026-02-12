# Step 1: Scaffold Next.js App - Checklist

## Pre-flight
- [x] Đã commit workspace skeleton
- [x] Git working tree clean
- [x] Đã cài pnpm globally

## Scaffold
- [x] Chạy `cd apps/web`
- [x] Chạy `pnpm create next-app@latest .` với đúng options
- [x] CLI hoàn tất không có errors

## Install
- [x] Quay về repo root: `cd /Users/admin/longbestai-main`
- [x] Chạy `pnpm install`
- [x] pnpm-lock.yaml được tạo/update
- [x] Không có dependency errors

## Test Dev Server
- [x] Chạy `pnpm dev` từ repo root
- [x] Terminal in ra "Ready on http://localhost:3000"
- [x] Mở browser thấy Next.js welcome page

## Test Hot Reload
- [x] Sửa `apps/web/src/app/page.tsx`
- [x] Thay text "To get started, edit the page.tsx file." → "🚀 LongBestAI - Step 1 Complete!"
- [x] Save file
- [x] Browser auto-reload và thấy text mới

## Verify Files Created
- [x] `apps/web/package.json` tồn tại
- [x] `apps/web/src/app/page.tsx` tồn tại
- [x] `apps/web/tsconfig.json` tồn tại
- [x] `apps/web/next.config.ts` tồn tại
- [x] `apps/web/postcss.config.mjs` tồn tại
- [x] `apps/web/eslint.config.mjs` tồn tại

## Final Check
- [x] Dừng dev server (Ctrl+C)
- [x] Paste log vào LOG_TEMPLATE.md
- [ ] Commit changes: `git add . && git commit -m "feat: scaffold Next.js app in apps/web"`

---

**Status:** [x] COMPLETED (Automated by Claude Code)

**Scaffold Date:** 2026-02-12

**Dependencies Installed:**
- next: 16.1.6
- react: 19.2.3
- react-dom: 19.2.3
- tailwindcss: 4.1.18
- typescript: 5.9.3
- eslint: 9.39.2
