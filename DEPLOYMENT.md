# Deployment Guide

## Prerequisites

- Node.js 18+ installed
- Git repository
- Vercel/Netlify account (or any hosting provider)
- Environment variables configured

## Quick Deploy to Vercel

### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Option 2: GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure environment variables
6. Click "Deploy"

## Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Update the values in `.env.local` with your actual credentials.

### Required Variables

```env
# API
NEXT_PUBLIC_API_URL=https://your-api-url.com

# Authentication
NEXT_PUBLIC_AUTH_EXPIRY=3600

# Payment Gateway
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_xxx
PAYSTACK_SECRET_KEY=sk_test_xxx

# Email
NEXT_PUBLIC_SENDGRID_API_KEY=SG.xxx
NEXT_PUBLIC_SENDGRID_FROM_EMAIL=noreply@yourdomain.com

# Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

## Build Configuration

### Production Build

```bash
# Install dependencies
npm ci

# Build
npm run build

# Start production server
npm start
```

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

Build and run:

```bash
docker build -t urbco-agent .
docker run -p 3000:3000 urbco-agent
```

## CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.API_URL }}

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## Performance Optimization

### Image Optimization

Next.js automatically optimizes images. For best results:

```tsx
import Image from 'next/image';

<Image
  src="/property.jpg"
  alt="Property"
  width={800}
  height={600}
  priority
  quality={85}
/>
```

### Code Splitting

Next.js automatically code-splits by route. For dynamic imports:

```tsx
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('@/components/Chart'), {
  loading: () => <Skeleton className="h-80" />,
  ssr: false,
});
```

### Caching Strategy

Configure caching in `next.config.js`:

```javascript
module.exports = {
  headers: async () => [
    {
      source: '/static/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],
};
```

## Monitoring & Analytics

### Google Analytics

Add to `src/app/layout.tsx`:

```tsx
import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
    </html>
  );
}
```

### Error Tracking (Sentry)

Install Sentry:

```bash
npm install @sentry/nextjs
```

Configure in `sentry.client.config.js`:

```javascript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.2,
});
```

## Security Checklist

- [ ] Enable HTTPS
- [ ] Configure CORS properly
- [ ] Set security headers (already in vercel.json)
- [ ] Use environment variables for secrets
- [ ] Enable rate limiting
- [ ] Implement CSRF protection
- [ ] Sanitize user inputs
- [ ] Use prepared statements for database queries
- [ ] Regular dependency updates
- [ ] Enable DDoS protection

## Post-Deployment

### Health Checks

```bash
# Check if site is up
curl -I https://your-domain.com

# Check API endpoint
curl https://your-domain.com/api/health
```

### Performance Testing

```bash
# Using Lighthouse
npm install -g lighthouse
lighthouse https://your-domain.com --view

# Using WebPageTest
# Visit https://www.webpagetest.org
```

### Monitoring

Set up monitoring for:
- Uptime (UptimeRobot, Pingdom)
- Performance (New Relic, Datadog)
- Errors (Sentry, LogRocket)
- Analytics (Google Analytics, Mixpanel)

## Rollback Strategy

### Vercel Rollback

```bash
# List deployments
vercel ls

# Rollback to previous
vercel rollback <deployment-url>
```

### Manual Rollback

1. Identify the issue
2. Revert the problematic commit
3. Force deploy the previous stable version
4. Monitor for issues

## Scaling Considerations

### Database

- Use connection pooling
- Implement read replicas
- Add database indexes
- Use caching (Redis)

### CDN

- Serve static assets via CDN
- Use edge functions for dynamic content
- Implement proper cache headers

### Load Balancing

- Use multiple regions
- Implement auto-scaling
- Configure health checks

## Support & Maintenance

### Regular Updates

```bash
# Update dependencies weekly
npm update

# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

### Backup Strategy

- Database backups (daily)
- File storage backups (daily)
- Configuration backups (on change)
- Disaster recovery plan

## Troubleshooting

### Common Issues

**Build Fails:**
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

**Runtime Errors:**
- Check environment variables
- Review server logs
- Check Sentry for errors

**Performance Issues:**
- Run Lighthouse audit
- Check bundle size
- Review database queries
- Enable compression

## Contact

For deployment issues, contact the DevOps team or check the logs in your hosting provider's dashboard.
