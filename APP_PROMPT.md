# Urbco — Application Prompt / Product Brief

Use this prompt to describe the application to AI tools, developers, stakeholders, or new contributors.

---

**You are a senior product designer and full-stack developer. Build Urbco, a premium fractional real-estate investment platform for the Nigerian market.**

## Product Overview

Urbco lets everyday Nigerians own a fraction of high-value, professionally managed real estate with as little as ₦500,000. We acquire premium properties, split ownership into tradeable fractional shares, and pay investors passive income through quarterly rental yields + long-term capital appreciation. The platform must feel **premium, financial, trustworthy, modern, and luxurious** — think wealth-management-grade UI, not a basic real-estate portal.

## Technical Stack

- **Framework:** Next.js (App Router), React, TypeScript
- **Styling:** TailwindCSS with a custom design system
- **Animations:** Framer Motion (micro-interactions, page transitions, count-up stats)
- **Charts:** Recharts (portfolio growth areas, allocation donuts, dividend bars)
- **State:** Zustand (client-side global state, auth, wallet, notifications)
- **UI Primitives:** Radix UI (dialog, select, tabs, progress, toast, radio-group, switch, badge)
- **Icons:** Lucide (SVG, 24px grid, consistent sizing — no emoji as icons)

## Brand Identity

- **Name:** Urbco
- **Primary color:** `#870F73` (deep purple — wealth, premium, distinctive)
- **Secondary:** `#D4A065` (gold — luxury, returns, appreciation)
- **Fonts:** Sora for display/headings (geometric, premium, enterprise) + Inter for body (Swiss/minimal, clean, readable)
- **Design language:** Enterprise minimalism — clean, spacious, soft layered shadows, rounded 12–16px cards, 200–300ms transitions, strong typographic hierarchy, WCAG AA+ contrast
- **Currency:** Nigerian Naira (₦)

## Core Pages & Features

1. **Landing page** — hero (₦12.5B+ funded, 5,000+ investors, 22.5% avg ROI), featured properties, how-it-works, ROI calculator, testimonials, CTA, footer. Nav: Own-a-Fraction, Services, About Us, Login, Get Started.
2. **Auth** — login, signup (with investor-profile onboarding), OTP verification, forgot-password.
3. **Dashboard** — KPI cards (total invested, portfolio value, annual returns, dividends), portfolio-growth area chart, asset-allocation donut, active investments, upcoming dividends, notifications.
4. **Marketplace (Own-a-Fraction)** — grid/list toggle, search, filters (location, type, status), loading skeletons, empty states.
5. **Asset detail** — gallery + video tour, specs, amenities, funding progress, rental yield, capital appreciation, interactive ROI calculator, fraction selector, sticky investment sidebar, wishlist/share.
6. **Checkout** — payment method, installment plans (Full / 3 / 6 / 12 months), review, processing, success + receipt.
7. **Portfolio** — total value/invested/returns, performance chart, per-investment holdings with live valuation + ROI.
8. **Dividends** — paid/upcoming/projection cards, history chart, status-filtered list.
9. **Wallet** — balance card, deposit/withdraw dialogs, transaction history.
10. **Referrals, Notifications, Profile, KYC, Settings** — referral links, notification center, profile + investment profile, document-upload KYC flow, notification/security/appearance settings.

## Business Logic (all dynamic, backed by state/data)

- Funding progress, fractions sold, capitalization (percent-funded → sale events)
- ROI and dividends (rental yield %, capital appreciation, payment schedules)
- Installment plans and payment schedules per investment
- Wallet balance, deposits, withdrawals, transactions
- Referral rewards, KYC status, notification read/unread states

## Design Requirements (Non-Negotiable)

- Premium enterprise aesthetic: clean, spacious, easy to use, creative, consistent
- Fully responsive: 375px / 768px / 1024px / 1440px
- High-contrast text (4.5:1 minimum), visible focus states, `prefers-reduced-motion` respected
- All clickable elements get `cursor-pointer` + obvious hover feedback
- Soft layered shadows (no harsh drop shadows), rounded corners, refined spacing rhythm
- Skeleton loaders and empty states everywhere data loads
- Type-safe, reusable components; clean folder structure; no inline emoji icons

## Deliverables for AI Coding Agents

- Components: `src/components/ui`, `src/components/layout`, `src/components/pages/**`
- Types: `src/types/index.ts` / state: `src/stores/appStore.ts` / data: `src/data/mockData.ts`
- Utils: `src/lib/utils.ts` (currency/percent/date formatting, cn), `config.ts`, `validations.ts`, `api.ts`
- Global styles + design tokens: `src/app/globals.css`

## Anti-Patterns to Avoid

- Emoji used as UI icons; scale-transform hover states that shift layout
- Slate-400 (or lighter) as body text; invisible borders (white/10)
- Navbars flush to viewport corners; content hidden behind fixed nav
- Inconsistent card radii, shadow levels, or icon sizes