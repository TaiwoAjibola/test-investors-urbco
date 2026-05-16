# Getting Started with Urbco Agent

## Quick Start

### 1. Installation
```bash
cd urbco-agent
npm install
```

### 2. Development
```bash
npm run dev
```
Visit http://localhost:3000

### 3. Production Build
```bash
npm run build
npm start
```

## 🎯 Test the Application

### As a New User

1. **Start on Landing Page** (`/`)
   - View featured properties
   - Use ROI calculator
   - Click "Get Started"

2. **Create Account** (`/auth/signup`)
   - Fill in your details
   - Use any email (this is demo mode)
   - Complete OTP verification

3. **Browse Marketplace** (`/marketplace`)
   - Filter by location, type, status
   - Switch between grid/list view
   - Click on any property

4. **View Property Details** (`/assets/[id]`)
   - See property images
   - Review financial information
   - Use ROI calculator
   - Click "Invest Now"

5. **Complete Investment** (`/checkout/[id]`)
   - Select payment method
   - Choose payment schedule
   - Review and confirm
   - See success page

6. **View Dashboard** (`/dashboard`)
   - Check your portfolio metrics
   - View investment performance
   - See upcoming dividends

### As a Returning User

1. **Login** (`/auth/login`)
   - Email: any email
   - Password: any password
   - (Demo mode - accepts any credentials)

2. **Explore Features**
   - Dashboard: Overview of investments
   - Portfolio: Detailed holdings
   - Dividends: Payment tracking
   - Wallet: Manage funds
   - Notifications: Stay updated
   - Referrals: Invite friends
   - Profile: Account settings
   - KYC: Verification status

## 📱 Available Routes

| Page | Route | Status |
|------|-------|--------|
| Landing | `/` | ✅ Complete |
| Login | `/auth/login` | ✅ Complete |
| Signup | `/auth/signup` | ✅ Complete |
| OTP Verify | `/auth/otp-verify` | ✅ Complete |
| Forgot Password | `/auth/forgot-password` | ✅ Complete |
| Dashboard | `/dashboard` | ✅ Complete |
| Marketplace | `/marketplace` | ✅ Complete |
| Asset Detail | `/assets/[id]` | ✅ Complete |
| Checkout | `/checkout/[id]` | ✅ Complete |
| Checkout Success | `/checkout/success` | ✅ Complete |
| Portfolio | `/portfolio` | ✅ Complete |
| Dividends | `/dividends` | ✅ Complete |
| Wallet | `/wallet` | ✅ Complete |
| Notifications | `/notifications` | ✅ Complete |
| Referrals | `/referrals` | ✅ Complete |
| Profile | `/profile` | ✅ Complete |
| KYC | `/profile/kyc` | ✅ Complete |
| Settings | `/settings` | ✅ Complete |

## 🎨 Customization

### Change Branding

Edit `src/lib/config.ts`:
```typescript
export const APP_CONFIG = {
  name: "Your Brand",
  tagline: "Your Tagline",
  // ...
};
```

### Modify Colors

Edit `src/app/globals.css`:
```css
/* Change primary colors */
.gradient-text {
  background: linear-gradient(135deg, #YOUR_COLOR 0%, #YOUR_COLOR 100%);
}
```

### Update Sample Data

Edit `src/data/mockData.ts`:
```typescript
export const properties: Property[] = [
  // Add your properties here
];
```

## 🛠️ Development Tips

### Adding New Pages

1. Create page component in `src/components/pages/[name]/`
2. Create route in `src/app/[route]/page.tsx`
3. Add to navigation in `src/components/layout/sidebar.tsx`

### Adding New Components

1. Create in `src/components/ui/` for reusable components
2. Create in `src/components/pages/[name]/` for page-specific components
3. Export from `src/components/index.ts`

### State Management

Use Zustand store in `src/stores/appStore.ts`:
```typescript
import { useAppStore } from "@/stores/appStore";

function MyComponent() {
  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);
}
```

### Toast Notifications

```typescript
import { useToast } from "@/hooks/use-toast";

function MyComponent() {
  const { success, error, info } = useToast();
  
  const handleAction = () => {
    success("Success!", "Operation completed");
  };
}
```

## 📊 Sample Credentials (Demo Mode)

The app accepts any credentials in demo mode:
- **Email**: any@email.com
- **Password**: any password

Pre-populated data includes:
- User: Ajibola Williams
- Email: ajibola@urbcoinvest.com
- Portfolio Value: ₦24,842,500
- Active Investments: 3 properties

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

### Build Errors
```bash
# Clear cache
rm -rf .next
npm run build
```

### Dependency Issues
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📚 Learn More

### Technologies Used
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion)
- [Recharts Documentation](https://recharts.org)
- [Zustand Documentation](https://github.com/pmndrs/zustand)

### Design Resources
- [Radix UI Components](https://www.radix-ui.com)
- [Lucide Icons](https://lucide.dev)

## 🚀 Next Steps

1. **Backend Integration**: Connect to your API
2. **Authentication**: Implement real auth (NextAuth, Auth0, etc.)
3. **Payments**: Integrate payment gateway (Paystack, Flutterwave)
4. **Email**: Set up email service (SendGrid, Resend)
5. **Database**: Connect to database (PostgreSQL, MongoDB)
6. **Deployment**: Deploy to Vercel, Netlify, or your server

## 💡 Pro Tips

- Use TypeScript for type safety
- Follow the existing component patterns
- Keep components small and focused
- Use the utility functions in `src/lib/utils.ts`
- Check `src/data/mockData.ts` for data structure examples
- Review `src/types/index.ts` for all TypeScript interfaces

---

Need help? Check the main README.md for detailed documentation.
