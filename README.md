# Urbco Agent - Premium Real Estate Fractional Investment Platform

A modern, production-ready real estate fractional investment web application built with Next.js 16, React, TypeScript, and TailwindCSS.

![Urbco Agent](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-blue?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?logo=tailwindcss&logoColor=white)

## 🌟 Features

### Core Functionality
- **Authentication System** - Email/password, Google sign-in, OTP verification
- **Investor Onboarding** - Complete KYC flow with document upload
- **Asset Marketplace** - Browse, filter, and search investment properties
- **Fractional Ownership** - Purchase property fractions with flexible payment plans
- **Investment Checkout** - Multi-step checkout with payment schedule selection
- **Portfolio Management** - Track investments, valuations, and ROI
- **Dividend Tracking** - Monitor rental income and dividend payments
- **Wallet System** - Deposit, withdraw, and transaction history
- **Notifications Center** - Real-time alerts and updates
- **Referral System** - Invite friends and earn rewards
- **Settings & Profile** - Account management and preferences

### Design Features
- Premium, modern UI with glassmorphism effects
- Fully responsive (desktop, tablet, mobile)
- Smooth animations with Framer Motion
- Interactive charts with Recharts
- Dark/Light theme support
- Custom component library
- Skeleton loaders for better UX

## 📁 Project Structure

```
urbco-agent/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── dashboard/          # Investor dashboard
│   │   ├── marketplace/        # Property marketplace
│   │   ├── assets/[id]/        # Asset detail pages
│   │   ├── checkout/           # Investment checkout flow
│   │   ├── portfolio/          # Portfolio management
│   │   ├── dividends/          # Dividend tracking
│   │   ├── wallet/             # Wallet & transactions
│   │   ├── notifications/      # Notification center
│   │   ├── referrals/          # Referral system
│   │   ├── profile/            # User profile & KYC
│   │   ├── settings/           # Account settings
│   │   └── auth/               # Authentication pages
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   ├── layout/             # Layout components (Sidebar, Header)
│   │   └── pages/              # Page-specific components
│   ├── data/
│   │   └── mockData.ts         # Sample property & user data
│   ├── hooks/                  # Custom React hooks
│   ├── lib/
│   │   └── utils.ts            # Utility functions
│   ├── stores/
│   │   └── appStore.ts         # Zustand state management
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   └── styles/
│       └── globals.css         # Global styles
├── public/                     # Static assets
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
cd urbco-agent

# Install dependencies
npm install

# Run development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📱 Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, featured properties, calculator |
| `/auth/login` | Investor login |
| `/auth/signup` | New investor registration |
| `/auth/otp-verify` | Email verification |
| `/dashboard` | Investor dashboard with metrics & charts |
| `/marketplace` | Browse investment properties |
| `/assets/[id]` | Property detail & investment calculator |
| `/checkout/[id]` | Investment checkout flow |
| `/portfolio` | Investment portfolio overview |
| `/dividends` | Dividend tracking & history |
| `/wallet` | Wallet balance & transactions |
| `/notifications` | Notification center |
| `/referrals` | Referral program |
| `/profile` | User profile management |
| `/profile/kyc` | KYC verification flow |
| `/settings` | Account settings & preferences |

## 🎨 Design System

### Color Palette
- **Primary**: Emerald (#10b981) to Teal (#14b8a6)
- **Secondary**: Slate (#64748b)
- **Success**: Emerald (#10b981)
- **Warning**: Amber (#f59e0b)
- **Danger**: Red (#ef4444)
- **Info**: Blue (#3b82f6)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, tracking-tight
- **Body**: Regular weight, relaxed line-height

### Components
- Cards with soft shadows
- Rounded buttons and inputs (xl radius)
- Gradient buttons for primary actions
- Glassmorphism effects
- Skeleton loaders
- Toast notifications
- Modal dialogs
- Custom form inputs

## 💼 Business Logic

### Property Investment Model
- Properties are divided into fractions
- Minimum investment: 1 fraction
- Investors can own multiple fractions
- Returns from:
  - Rental income (quarterly dividends)
  - Capital appreciation (on exit)

### Payment Schedules
- **Full Payment**: 2% discount
- **3 Months**: 3 equal installments
- **6 Months**: 6 equal installments
- **12 Months**: 12 equal installments

### Returns Calculation
```typescript
// Quarterly Dividend
dividend = investment * (rentalYield / 100) / 4

// Annual ROI
roi = investment * (projectedROI / 100)

// Total Returns (over holding period)
totalReturns = investment * (projectedROI / 100) * years
```

## 📊 Sample Data

The application includes realistic mock data for:
- 6 investment properties across Nigeria
- User investment portfolio
- Transaction history
- Dividend payments
- Notifications
- Referral program

## 🔧 Technology Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **State**: Zustand
- **UI Components**: Radix UI

### Development
- **Build Tool**: Turbopack
- **Package Manager**: npm
- **Version Control**: Git

## 🎯 Key Features Implementation

### Authentication
- Email/password login
- Google OAuth ready
- OTP verification
- Forgot password flow
- Protected routes

### KYC Verification
- ID document upload
- Selfie verification
- Address proof upload
- Status tracking

### Investment Flow
1. Browse marketplace
2. View property details
3. Use ROI calculator
4. Select fractions
5. Choose payment schedule
6. Complete checkout
7. Track investment

### Portfolio Tracking
- Total invested amount
- Current valuation
- ROI performance
- Dividend earnings
- Asset allocation

## 📈 Future Enhancements

- [ ] Real-time property updates (WebSocket)
- [ ] Multi-currency support
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] API integration with backend
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Document generation (contracts, receipts)
- [ ] Admin dashboard
- [ ] Property management module

## 🔒 Security Considerations

- Input validation on all forms
- Protected routes with authentication
- Secure password handling
- CSRF protection
- Rate limiting ready
- HTTPS enforcement in production

## 📄 License

This project is proprietary software. All rights reserved.

## 👥 Contact

For inquiries about this project, please contact the development team.

---

Built with ❤️ for Urbco Investors
