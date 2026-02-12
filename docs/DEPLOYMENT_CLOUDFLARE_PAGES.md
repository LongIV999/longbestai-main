# Cloudflare Pages Deployment Guide

Hướng dẫn deploy LongBestAI monorepo lên Cloudflare Pages.

## Prerequisites

- Cloudflare account (đăng ký tại https://dash.cloudflare.com/sign-up)
- GitHub repository đã được push code
- Domain name (optional, có thể dùng subdomain miễn phí của Cloudflare)

## Bước 1: Kết nối GitHub Repository

1. Đăng nhập vào Cloudflare Dashboard
2. Vào **Workers & Pages** > **Create Application** > **Pages**
3. Chọn **Connect to Git** > **GitHub**
4. Authorize Cloudflare truy cập GitHub repository
5. Chọn repository `longbestai-main`

## Bước 2: Cấu hình Build Settings

### Framework Preset
- **Framework preset**: `Next.js`

### Build Configuration
Điền các thông tin sau:

| Setting | Value |
|---------|-------|
| **Build command** | `pnpm install --frozen-lockfile && pnpm -C apps/web build` |
| **Build output directory** | `apps/web/.next` |
| **Root directory** | `/` (để trống hoặc `/`, monorepo root) |

### Environment Variables

Thêm các environment variables sau:

| Variable Name | Value | Description |
|--------------|-------|-------------|
| `NODE_VERSION` | `20` | Node.js version |
| `PNPM_VERSION` | `8` | pnpm package manager version |
| `NODE_ENV` | `production` | Production mode |

**Cách thêm:**
1. Scroll xuống phần **Environment variables (advanced)**
2. Click **Add variable**
3. Điền tên và giá trị
4. Repeat cho các biến còn lại

## Bước 3: Deploy

1. Click **Save and Deploy**
2. Cloudflare sẽ clone repository và bắt đầu build
3. Build process (~2-5 phút):
   - Install dependencies với pnpm
   - Run `prebuild` script → generate content bundle
   - Run Next.js build
   - Deploy tới Cloudflare's global network

## Bước 4: Verify Deployment

Sau khi deploy thành công, Cloudflare sẽ cung cấp URL preview:
```
https://longbestai-main-xxx.pages.dev
```

### Checklist Kiểm tra

Mở các URLs sau và verify:

- [ ] **Homepage**: `https://your-site.pages.dev/`
  - Loads without errors
  - Theme toggle works
  - Components render correctly

- [ ] **Sitemap**: `https://your-site.pages.dev/sitemap.xml`
  - Returns valid XML
  - Contains all routes (static + dynamic)

- [ ] **Robots**: `https://your-site.pages.dev/robots.txt`
  - Returns plain text
  - Shows correct sitemap URL

- [ ] **Dynamic Routes**:
  - `/blog` - Blog list page
  - `/blog/[slug]` - Individual post (pick from sitemap)
  - `/deals/[slug]` - Deal detail
  - `/courses/[slug]` - Course detail
  - `/jobs/[filename]` - Job detail

- [ ] **Console Errors**:
  - Open Browser DevTools (F12)
  - Check Console tab
  - No red errors (warnings OK)

- [ ] **SEO Metadata**:
  - View page source (Ctrl+U)
  - Verify `<title>` tag
  - Verify OpenGraph tags (`og:title`, `og:description`, etc.)
  - Verify Twitter tags

## Bước 5: Custom Domain Setup (Optional)

### Nếu có domain riêng (ví dụ: `longbestai.com`)

1. Trong Cloudflare Pages project, vào **Custom domains**
2. Click **Set up a custom domain**
3. Nhập domain: `longbestai.com`
4. Cloudflare sẽ hướng dẫn update DNS records

### Update DNS Records

Thêm CNAME record:

| Type | Name | Target | Proxy |
|------|------|--------|-------|
| CNAME | `@` (hoặc `www`) | `longbestai-main.pages.dev` | ✅ Proxied |

**Note:** Nếu domain đã được quản lý bởi Cloudflare, DNS update tự động. Nếu dùng DNS provider khác, phải update manual.

### Update Metadata Base URL

Sau khi custom domain active, update code:

**File:** `apps/web/src/app/layout.tsx`

```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://longbestai.com'), // ← Update URL
  // ... rest of metadata
};
```

Và update sitemap/robots:

**Files:** `apps/web/src/app/sitemap.ts`, `apps/web/src/app/robots.ts`

```typescript
const baseUrl = 'https://longbestai.com'; // ← Update
```

Commit và push changes, Cloudflare tự động rebuild.

## Build Process Explained

### Content Bundle Generation

1. **Prebuild Hook**: `pnpm -C apps/web build` triggers `prebuild` script
2. **Script Runs**: `tsx scripts/generate-content-bundle.ts`
3. **Content Read**: Đọc tất cả JSON từ `/content/{posts,deals,courses,jobs}`
4. **Validation**: Validate với Zod schemas từ `@longbestai/shared`
5. **Bundle Created**: Generate `apps/web/src/lib/content/.generated/content-bundle.json`
6. **Next.js Build**: Import bundle vào content utilities (không dùng `fs`)

### Static Generation

- Tất cả routes được pre-rendered tại build time
- Dynamic routes sử dụng `generateStaticParams()`
- Sitemap và robots.txt generated as routes

### Edge Runtime Compatibility

✅ **No filesystem operations at runtime**
- Content utilities import static JSON bundle
- Works trên Cloudflare Pages Edge Runtime
- No `fs`, `path`, hoặc Node.js-only APIs

## Troubleshooting

### Build Fails: "Cannot find module 'fs'"

**Nguyên nhân:** Content bundle không được generate, content utilities vẫn dùng `fs`.

**Giải pháp:**
1. Verify `prebuild` script trong `package.json`:
   ```json
   "prebuild": "tsx scripts/generate-content-bundle.ts"
   ```
2. Check build logs, tìm dòng "🚀 Generating content bundle..."
3. Nếu không thấy, manually run: `pnpm -C apps/web exec tsx scripts/generate-content-bundle.ts`

### Build Fails: Content Validation Errors

**Nguyên nhân:** JSON content không match Zod schemas.

**Giải pháp:**
1. Check build logs, tìm validation errors
2. Fix JSON files in `/content` directory
3. Run local validation: `pnpm content:validate`

### 404 on Dynamic Routes

**Nguyên nhân:** `generateStaticParams()` không export routes.

**Giải pháp:**
1. Verify files tồn tại:
   - `apps/web/src/app/blog/[slug]/page.tsx`
   - `apps/web/src/app/deals/[slug]/page.tsx`
   - etc.
2. Check `generateStaticParams()` function exports slugs correctly
3. Run local build: `pnpm -C apps/web build`
4. Check `.next/server/app/` directory cho pre-rendered pages

### Sitemap Returns 404

**Nguyên nhân:** `sitemap.ts` file missing hoặc có errors.

**Giải pháp:**
1. Verify file exists: `apps/web/src/app/sitemap.ts`
2. Check file exports default function correctly
3. Test locally: `http://localhost:3000/sitemap.xml`

### Build Succeeds but Runtime Crashes

**Nguyên nhân:** Code dùng Node.js-only APIs tại runtime.

**Giải pháp:**
1. Check Cloudflare Pages logs (Functions tab)
2. Search for error messages
3. Verify NO import của `fs`, `path`, `child_process`, etc. trong client/edge code
4. Move Node.js code vào build scripts (chỉ run tại build time)

### Slow Build Times

**Nguyên nhân:** Dependencies install mỗi lần build.

**Giải pháp:**
1. Cloudflare Pages tự động cache `node_modules`
2. Ensure `pnpm-lock.yaml` được commit
3. Build thường nhanh hơn sau lần đầu (~1-2 phút)

### Content Updates Không Reflect

**Nguyên nhân:** Bundle không regenerate.

**Giải pháp:**
1. `prebuild` hook tự động chạy khi deploy
2. Nếu develop local, manually run:
   ```bash
   pnpm -C apps/web exec tsx scripts/generate-content-bundle.ts
   ```
3. Hoặc restart dev server (script chạy trong `dev` script)

## Advanced Configuration

### Preview Deployments

Cloudflare tự động tạo preview deployment cho mỗi PR:
- URL format: `https://[commit-hash].longbestai-main.pages.dev`
- Perfect cho testing before merge

### Deployment Branches

Default: chỉ `main` branch được deploy to production.

Custom branch deployment:
1. Settings > Builds & deployments > **Configure Production/Preview deployments**
2. Add branch patterns

### Analytics

Enable Web Analytics:
1. Project settings > **Analytics**
2. Enable **Web Analytics**
3. Visitor metrics, performance, etc.

### Custom Headers & Redirects

Tạo file `apps/web/public/_headers` hoặc `_redirects`:

**Example `_headers`:**
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```

**Example `_redirects`:**
```
/old-path /new-path 301
```

## Performance Optimization

### Image Optimization

Next.js `next/image` với Cloudflare:
- Already configured: `images.unoptimized = true` in `next.config.ts`
- Cloudflare handles image optimization tự động

### Edge Caching

- Static assets cached globally
- HTML pages cached với smart invalidation
- Content updates reflected sau deployment

## Security

### Environment Secrets

Nếu cần API keys hoặc secrets:
1. **Never commit secrets to git**
2. Add via Cloudflare Dashboard:
   - Settings > Environment variables
   - Mark as **Secret** (encrypted)
3. Access trong code:
   ```typescript
   const apiKey = process.env.API_KEY;
   ```

### Content Security Policy (CSP)

Thêm CSP headers trong `_headers` file nếu cần.

## Monitoring & Logs

### Real-time Logs

Xem logs khi build/deploy:
1. Deployments tab
2. Click vào deployment
3. View **Build log** và **Functions log**

### Error Tracking

Integrate với external services:
- Sentry
- LogRocket
- Cloudflare Web Analytics

## Rollback

Nếu deployment có issue:
1. Vào **Deployments** tab
2. Tìm deployment cũ (stable)
3. Click **Rollback to this deployment**
4. Instant rollback (< 30 seconds)

## Support

- **Cloudflare Docs**: https://developers.cloudflare.com/pages/
- **Next.js on Cloudflare**: https://developers.cloudflare.com/pages/framework-guides/nextjs/
- **Community Discord**: https://discord.gg/cloudflaredev

## Summary

✅ **Ready to Deploy:**
- Build-time content bundling (no fs runtime deps)
- SEO ready (sitemap, robots, metadata)
- Cloudflare Pages optimized
- CI pipeline validates before deploy

**Deployment workflow:**
1. Push code to GitHub
2. Cloudflare auto-detects changes
3. Runs CI checks
4. Builds và deploys globally
5. Preview URL available instantly

**Post-deployment:**
- Monitor build logs
- Verify checklist
- Setup custom domain (optional)
- Enable analytics (optional)

Happy deploying! 🚀
