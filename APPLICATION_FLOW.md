# Urbco Investors App — Application Flow Specification

> **Audience:** Frontend/backend developers, QA testers, and AI coding agents.
> **Scope:** Every authenticated application page **except the marketing landing page** (`/`), `/services`, and `/about`. (The admin console is out of scope of this document.)
> **How to read this doc:**
> - **Human-readable** prose describes each page, its fields, options, validation, and actions.
> - **Machine-readable** blocks are valid YAML (` ```yaml ` fences) that an AI agent can parse directly. Each block uses a consistent schema (see `SCHEMA` below).
> - **Status machines** use ASCII state diagrams.
> - **Tester acceptance criteria** are checklists at the end of each page.

---

## 0. Global System

### 0.1 Brand & Tracks
- Two investment **tracks** exist and drive most conditional logic:
  - **Urbco Foundry** — high-value track. Minimum commitment **₦200,000,000**. Categories: HNW Individual, Family Office, Institution.
  - **Urbco Harbour** — fractional track. Minimum commitment **₦100,000**. Category: **Individual only**.
- Track selection happens on Sign Up and on Institutional Onboarding.

### 0.2 Authentication & Access Control
- **Mock auth only.** There is **no server-side route guard**. All app pages render behind `DashboardLayout` (sidebar + header).
- Auth pages (`/auth/*`) and `/onboard/institutional` use their own minimal layouts.
- State is held in a Zustand `appStore`; "logged-in" is simulated (no token persistence enforcement).
- Log out returns the user to `/auth/login`.

### 0.3 App Shell (DashboardLayout)
- **Sidebar** nav (verified `src/components/layout/sidebar.tsx`):
  `Dashboard (/dashboard)`, `Own-a-Fraction (/marketplace)`, `Portfolio (/portfolio)`, `Dividends (/dividends)`, `Wallet (/wallet)`, `Notifications (/notifications)`, `Referrals (/referrals)`, `Profile (/profile)`, `KYC Verification (/profile/kyc)`, `Settings (/settings)`.
- **Header**: search, notifications bell, user menu, log out.

### 0.4 Design Tokens (reference)
- Brand purple `--color-brand-*` (`#870F73` scale). Accent gold `--color-accent-*` (`#D4A065` scale). Surfaces are light (`bg-surface`, `bg-surface-muted`, `border-line`). Fonts: **Sora** (display) + **Inter** (body).
- ⚠️ Known leftover dark-mode classes exist in a few components (notably `wallet-page.tsx` header/buttons and `Profile`/some badges). These are visual bugs, not functional — see §9 Open Issues.

### SCHEMA (YAML blocks)
```yaml
page:
  route: string
  title: string
  access: string
  shell: dashboard | standalone | auth
  sections:
    - name: string
      fields:            # for forms
        - id: string
          label: string
          type: text|email|tel|password|number|textarea|select|radio|toggle|multiselect|file|otp
          required: bool
          options: [..]  # for select/radio/toggle/multiselect
          validation: string
      controls:          # for non-form UI (filters, toggles)
        - id: string
          type: string
          options: [..]
  actions:
    - id: string
      label: string
      target: route | state
  post_submit: string
```

---

## 1. Authentication Pages

### 1.1 Sign Up — `/auth/signup`
Human summary: Registration form. User picks a **track** (Urbco Foundry / Urbco Harbour) and, for Foundry, an **investor category**. Fields are conditional on track + category. On submit, a success animation shows and the user proceeds to the dashboard (mock; a verification email is implied).

```yaml
page:
  route: /auth/signup
  title: Create your account
  access: public
  shell: auth
  sections:
    - name: Account
      fields:
        - id: fullName
          label: Full Name
          type: text
          required: true
        - id: email
          label: Email Address
          type: email
          required: true
        - id: phone
          label: Phone Number
          type: tel
          required: true
          validation: "+234 prefix, numeric"
        - id: track
          label: Select Track
          type: radio
          required: true
          options: [Urbco Foundry, Urbco Harbour]
        - id: category
          label: Select Investor Category
          type: select
          required: true
          # Harbour -> [Individual] only
          # Foundry -> [HNW Individual, Family Office, Institution]
    - name: Conditional (Individual — Harbour & Foundry Individual)
      fields:
        - id: nationalId
          label: National ID Number
          type: text
          required: true
        - id: bvn
          label: BVN
          type: text
          required: true
        - id: residentialAddress
          label: Residential Address
          type: textarea
          required: true
    - name: Conditional (Family Office / Institution — Foundry)
      fields:
        - id: companyName
          label: Company / Entity Name
          type: text
          required: true
        - id: rcNumber
          label: RC Number
          type: text
          required: true
        - id: companyAddress
          label: Company Address
          type: textarea
          required: true
        - id: repName
          label: Authorized Representative Name
          type: text
          required: true
        - id: repEmail
          label: Authorized Representative Email
          type: email
          required: true
    - name: Conditional (Institution — Foundry only)
      fields:
        - id: institutionType
          label: Institution Type
          type: select
          required: true
          options: [Banks & DFIs, Pension Funds, Insurance Companies, Investment Managers & Funds, Sovereign & Development Funds, Family Offices & HNW, Corporates & Treasuries, Others]
        - id: structure
          label: Structure
          type: select
          required: true
          options: [Real Estate Fund, Private Equity / Co-investment, Direct Asset Holdco, SPV / Consortium, Other]
        - id: aumRange
          label: AUM Range
          type: select
          required: true
          options: ["< ₦10B", "₦10B–₦50B", "₦50B–₦250B", "₦250B–₦1T", "> ₦1T"]
        - id: horizon
          label: Investment Horizon
          type: select
          required: true
          options: ["< 1 year", "1–3 years", "3–7 years", "7+ years"]
        - id: sectors
          label: Preferred Sectors
          type: multiselect
          required: false
          options: [Residential, Commercial, Mixed-Use, Industrial & Logistics, Hospitality, Student Housing, Healthcare, Infrastructure]
    - name: Credentials
      fields:
        - id: password
          label: Password
          type: password
          required: true
          validation: "min 8 chars"
        - id: confirmPassword
          label: Confirm Password
          type: password
          required: true
          validation: "must match password"
        - id: agreeTerms
          label: I agree to the Terms & Privacy Policy
          type: checkbox
          required: true
  actions:
    - id: submit
      label: Create Account
      target: state (success animation) -> /dashboard
    - id: gotoLogin
      label: Already have an account? Sign in
      target: /auth/login
  post_submit: "Success state then Enter Dashboard -> /dashboard"
```

**Tester acceptance:**
- [ ] Harbour shows **only** Individual category; Foundry shows all 3.
- [ ] Institution (Foundry) reveals Institution Type, Structure, AUM, Horizon, Sectors.
- [ ] Password < 8 or mismatch blocks submit; terms checkbox required.
- [ ] All 5 track/category combinations submit without error.

### 1.2 Log In — `/auth/login`
```yaml
page:
  route: /auth/login
  title: Welcome back
  access: public
  shell: auth
  sections:
    - name: Credentials
      fields:
        - id: email
          label: Email Address
          type: email
          required: true
        - id: password
          label: Password
          type: password
          required: true
  actions:
    - id: submit
      label: Sign In
      target: /dashboard
    - id: forgot
      label: Forgot Password?
      target: /auth/forgot-password
    - id: signup
      label: Don't have an account? Sign up
      target: /auth/signup
```

### 1.3 Forgot Password — `/auth/forgot-password`
```yaml
page:
  route: /auth/forgot-password
  title: Reset your password
  access: public
  shell: auth
  sections:
    - name: Request
      fields:
        - id: email
          label: Email Address
          type: email
          required: true
  actions:
    - id: submit
      label: Send Reset Link
      target: state (success "Check your inbox") -> /auth/login
```

### 1.4 OTP Verify — `/auth/otp-verify`
```yaml
page:
  route: /auth/otp-verify
  title: Verify your email
  access: public
  shell: auth
  sections:
    - name: Code
      fields:
        - id: otp
          label: 6-digit code
          type: otp
          required: true
          validation: "6 numeric boxes, auto-advance, backspace support"
  actions:
    - id: verify
      label: Verify
      target: /dashboard
    - id: resend
      label: Resend code
      target: state
    - id: back
      label: Back to login
      target: /auth/login
```

---

## 2. Institutional Onboarding — `/onboard/institutional`

Standalone 6-step wizard (no sidebar). A **track selector** (Urbco Foundry / Urbco Harbour) sits at the top. Each step has Next/Back; validation gates progression. Final step submits and moves status to `under_review`, after which a **status view** replaces the wizard.

```yaml
page:
  route: /onboard/institutional
  title: Institutional Onboarding
  access: authenticated (mock)
  shell: standalone
  track_selector: [Urbco Foundry, Urbco Harbour]
  steps:
    - id: company-info
      name: Company Info
      fields:
        - {id: legalName, label: Legal Entity Name, type: text, required: true}
        - {id: rcNumber, label: RC Number, type: text, required: true}
        - {id: year, label: Year of Incorporation, type: number, required: true, validation: "4-digit"}
        - {id: jurisdiction, label: Jurisdiction, type: text, required: true}
        - {id: address, label: Registered Address, type: textarea, required: true}
        - {id: website, label: Website, type: url, required: false}
    - id: classification
      name: Classification
      fields:
        - {id: institutionType, label: Institution Type, type: select, required: true, options: [Banks & DFIs, Pension Funds, Insurance Companies, Investment Managers & Funds, Sovereign & Development Funds, Family Offices & HNW, Corporates & Treasuries, Others]}
        - {id: aumRange, label: AUM Range, type: select, required: true, options: ["< ₦10B", "₦10B–₦50B", "₦50B–₦250B", "₦250B–₦1T", "> ₦1T"]}
        - {id: structure, label: Structure, type: select, required: true, options: [Real Estate Fund, Private Equity / Co-investment, Direct Asset Holdco, SPV / Consortium, Other]}
        - {id: regulatoryStatus, label: Regulatory Status, type: radio, required: true, options: [Regulated, Exempt, Self-Regulated]}
    - id: rep
      name: Authorised Representative
      fields:
        - {id: repName, label: Full Name, type: text, required: true}
        - {id: repTitle, label: Job Title, type: text, required: true}
        - {id: repEmail, label: Email, type: email, required: true}
        - {id: repPhone, label: Phone, type: tel, required: true}
        - {id: idType, label: ID Type, type: select, required: true, options: [International Passport, National ID, Driver's License]}
        - {id: idNumber, label: ID Number, type: text, required: true}
    - id: profile
      name: Investment Profile
      fields:
        - {id: horizon, label: Investment Horizon, type: select, required: true, options: ["< 1 year", "1–3 years", "3–7 years", "7+ years"]}
        - {id: riskAppetite, label: Risk Appetite, type: radio, required: true, options: [Conservative, Balanced, Aggressive]}
        - {id: sectors, label: Preferred Sectors, type: multiselect, required: false, options: [Residential, Commercial, Mixed-Use, Industrial & Logistics, Hospitality, Student Housing, Healthcare, Infrastructure]}
        - {id: targetAllocation, label: Target Allocation, type: number, required: true}
        - {id: minTicket, label: Min Ticket Size, type: text, required: true}
        - {id: maxTicket, label: Max Ticket Size, type: text, required: true}
        - {id: esg, label: ESG Preferences, type: textarea, required: false}
    - id: documents
      name: Documents
      fields:
        - {id: articles, label: Articles of Incorporation, type: file, required: true}
        - {id: trusteePassports, label: Trustee/Director Passports, type: file, required: true}
        - {id: proofAum, label: Proof of AUM / Asset Scale, type: file, required: true}
        - {id: ubo, label: Beneficial Ownership (UBO), type: file, required: true}
        - {id: corpReg, label: Corporate Registration & Tax ID, type: file, required: true}
        - {id: boardResolution, label: Board Resolution Letter, type: file, required: true}
        - {id: officerId, label: Officer / Director Identification, type: file, required: true}
        - {id: aml, label: AML Compliance Certificate, type: file, required: true}
        # Individual (Harbour + any Individual path) document set:
        - {id: govId, label: Government Photo ID, type: file, required: true}
        - {id: selfie, label: Live Biometric Selfie, type: file, required: true}
        - {id: proofAddress, label: Proof of Address, type: file, required: true}
        - {id: accreditation, label: Accreditation Questionnaire, type: file, required: true}
    - id: review
      name: Review & Submit
      fields: []
      note: "Read-only summary of all steps with edit links; Submit Application -> status under_review"
  status_view:
    states: [Submitted, Under Review, Approved]
    actions: [Back to Dashboard (/dashboard), View Profile (/profile)]
```

**Tester acceptance:**
- [ ] All 6 steps enforce required fields before Next.
- [ ] Document step requires uploads before Review.
- [ ] Submit shows status view with progress (Submitted → Under Review → Approved).
- [ ] Track selector present at top and persists across steps.

---

## 3. Dashboard — `/dashboard`

```yaml
page:
  route: /dashboard
  title: Dashboard
  access: authenticated
  shell: dashboard
  sections:
    - name: Stats
      fields:
        - {label: Portfolio Value, type: stat}
        - {label: Total Invested, type: stat}
        - {label: Total Returns, type: stat}
        - {label: Active Investments, type: stat}
    - name: Quick Actions
      actions:
        - {id: browse, label: Browse Marketplace, target: /marketplace}
        - {id: deposit, label: Deposit Funds, target: /wallet}
        - {id: portfolio, label: View Portfolio, target: /portfolio}
    - name: Recent Investments
      fields:
        - {label: Recent investments list (from store), type: list}
```

---

## 4. Marketplace — `/marketplace`

```yaml
page:
  route: /marketplace
  title: Own-a-Fraction (Marketplace)
  access: authenticated
  shell: dashboard
  sections:
    - name: Filters
      controls:
        - {id: track, type: toggle, options: [All, Urbco Foundry, Urbco Harbour]}
        - {id: stage, type: select, options: [All Stages, + property stage values]}
        - {id: search, type: text, placeholder: "Search by name or location"}
        - {id: viewMode, type: toggle, options: [grid, list]}
    - name: Asset Cards
      fields:
        - {label: Image w/ Stage + ROI badge}
        - {label: Name, Location}
        - {label: Track badge, Buying-path badges}
        - {label: Price, Min Investment}
      actions:
        - {id: viewDetails, label: View Details, target: /marketplace/[id]}
        - {id: invest, label: Invest, target: /checkout}
```

**Tester acceptance:**
- [ ] Track toggle filters Foundry vs Harbour assets.
- [ ] Stage + search + grid/list all functional, no layout overflow at 375/768/1024/1440.

---

## 5. Asset Detail — `/marketplace/[id]`

```yaml
page:
  route: /marketplace/[id]
  title: Asset Detail
  access: authenticated
  shell: dashboard
  sections:
    - name: Gallery
      fields: [{label: Main image + thumbnails (responsive)}]
    - name: Overview
      fields:
        - {label: Title, Location, Track badge, Buying-path badges}
        - {label: Price, Min Investment, Expected ROI, Term}
        - {label: Description, Key Metrics}
    - name: Settlement Flow (9-step BuyingPath)
      fields:
        - steps: [Terms & Allocation, Payment & Settlement, Custody & Title, Reconciliation, Release]
          # each rendered with done / active / pending state
    - name: Call to action
      actions:
        - {id: investNow, label: Invest Now, target: /checkout}
```

---

## 6. Checkout — `/checkout` and `/checkout/success`

```yaml
page:
  route: /checkout
  title: Complete Investment
  access: authenticated
  shell: dashboard
  requires: "a selected property (nav state / query); if absent -> redirect /marketplace"
  steps:
    - id: payment-method
      name: Payment Method
      fields:
        - {id: method, label: Payment Method, type: radio, required: true, options: [Wallet, Card, Bank Transfer]}
    - id: payment-schedule
      name: Payment Schedule
      fields:
        - {id: schedule, label: Payment Schedule, type: radio, required: true, options: [full, 3-months, 6-months, 12-months]}
          # full => 2% discount; 3/6/12 => installments, no discount
    - id: review
      name: Review & Confirm
      fields: [{label: Summary (property, amount, discount, total)}]
    - id: processing
      name: Processing
      fields: []
      note: "spinner -> on success navigate /checkout/success"
  post_submit: "/checkout/success"
---
page:
  route: /checkout/success
  title: Investment Successful!
  access: authenticated
  shell: dashboard
  sections:
    - name: Confirmation
      fields: [{label: Property, Amount, Schedule summary}]
      actions:
        - {id: viewPortfolio, label: View Portfolio, target: /portfolio}
        - {id: browseMore, label: Browse More, target: /marketplace}
```

**Tester acceptance:**
- [ ] Direct visit without a property redirects to marketplace.
- [ ] Full payment shows 2% discount; installments show correct count.
- [ ] Success page links work.

---

## 7. Wallet — `/wallet`

```yaml
page:
  route: /wallet
  title: Wallet
  access: authenticated
  shell: dashboard
  sections:
    - name: Tabs
      controls: [{id: tab, type: toggle, options: [All, Investments, Dividends, Deposits]}]
    - name: Balance
      fields: [{label: Wallet balance}]
    - name: Deposit Funds (dialog)
      fields:
        - {id: amount, label: Amount (₦), type: number, required: true}
      actions: [{id: deposit, label: Deposit, target: state}]
    - name: Withdraw Funds (dialog)
      fields:
        - {id: amount, label: Amount (₦), type: number, required: true}
      actions: [{id: withdraw, label: Withdraw, target: state}]
    - name: Transactions
      fields: [{label: Transaction list filtered by tab}]
```

> ⚠️ Current build: deposit/withdraw dialogs capture **Amount only** (no payment-method selector UI). See §9.

---

## 8. Portfolio — `/portfolio`

```yaml
page:
  route: /portfolio
  title: My Portfolio
  access: authenticated
  shell: dashboard
  sections:
    - name: Stats
      fields: [{label: Total Value}, {label: Amount Invested}, {label: Total Returns (+ %)}]
    - name: Portfolio Performance
      fields: [{label: recharts area/line chart}]
    - name: Your Investments
      fields: [{label: List: property, amount, returns, status}]
```

---

## 9. Dividends — `/dividends`

```yaml
page:
  route: /dividends
  title: Dividends
  access: authenticated
  shell: dashboard
  sections:
    - name: Stats
      fields: [{label: Total Paid}, {label: Upcoming}, {label: Annual Projection}]
    - name: Tabs
      controls: [{id: tab, type: toggle, options: [All, Paid, Upcoming]}]
    - name: Dividend History / Payments
      fields: [{label: List: property, amount, date, status}]
```

---

## 10. Profile — `/profile`

```yaml
page:
  route: /profile
  title: Profile
  access: authenticated
  shell: dashboard
  sections:
    - name: Header
      fields: [{label: Avatar, Name, Email, Track badge, KYC status badge (-> /profile/kyc)}]
    - name: Editable
      fields:
        - {id: fullName, label: Full Name, type: text}
        - {id: email, label: Email, type: email}
        - {id: phone, label: Phone, type: tel}
        - {id: country, label: Country, type: select, options: COUNTRIES}
      actions: [{id: save, label: Save Changes, target: state}]
    - name: Read-only (from signup)
      fields:
        - {id: investmentExperience, label: Investment Experience, type: display, options: [beginner, intermediate, advanced]}
        - {id: riskAppetite, label: Risk Appetite, type: display, options: [low, medium, high]}
    - name: KYC CTA
      actions: [{id: completeKyc, label: Complete KYC Verification, target: /profile/kyc, show_if: "kyc not verified"}]
```

> Note: Investment Experience and Risk Appetite are **display-only** on this page (set at sign-up / onboarding).

---

## 11. KYC Verification — `/profile/kyc`

```yaml
page:
  route: /profile/kyc
  title: KYC Verification
  access: authenticated
  shell: dashboard
  sections:
    - name: Entity Type
      fields:
        - {id: entityType, label: Entity Type, type: radio, required: true, options: [Individual, Family Office, Institution]}
    - name: Documents — Individual set
      fields:
        - {id: govId, label: Government Photo ID, type: file, required: true}
        - {id: selfie, label: Live Biometric Selfie, type: file, required: true}
        - {id: proofAddress, label: Proof of Address, type: file, required: true}
        - {id: accreditation, label: Accreditation Questionnaire, type: file, required: true}
    - name: Documents — Entity set (Family Office / Institution)
      fields:
        - {id: articles, label: Articles of Incorporation, type: file, required: true}
        - {id: trusteePassports, label: Trustee/Director Passports, type: file, required: true}
        - {id: proofAum, label: Proof of AUM / Asset Scale, type: file, required: true}
        - {id: ubo, label: Beneficial Ownership (UBO), type: file, required: true}
        - {id: corpReg, label: Corporate Registration & Tax ID, type: file, required: true}
        - {id: boardResolution, label: Board Resolution Letter, type: file, required: true}
        - {id: officerId, label: Officer / Director Identification, type: file, required: true}
        - {id: aml, label: AML Compliance Certificate, type: file, required: true}
  post_submit: "status -> pending / under_review; status badge + resubmit allowed"
```

---

## 12. Settings — `/settings`

```yaml
page:
  route: /settings
  title: Settings
  access: authenticated
  shell: dashboard
  sections:
    - name: Notification Preferences
      fields: [{label: Toggles (email / push / sms)}]
    - name: Security Settings
      fields:
        - {id: currentPassword, label: Current Password, type: password}
        - {id: newPassword, label: New Password, type: password}
        - {id: confirmPassword, label: Confirm New Password, type: password}
    - name: Appearance
      fields: [{label: Theme toggle}]
    - name: Linked Accounts
      fields: [{label: Connected accounts list}]
    - name: Danger Zone
      fields: [{label: Delete account action}]
```

---

## 13. Notifications — `/notifications`

```yaml
page:
  route: /notifications
  title: Notifications
  access: authenticated
  shell: dashboard
  sections:
    - name: Tabs
      controls: [{id: tab, type: toggle, options: [All, Unread, Read]}]
    - name: List
      fields: [{label: Items: icon, title, message, time, read/unread state}]
      actions: [{id: markAll, label: Mark all read, target: state}, {id: markOne, label: Mark read, target: state}]
```

---

## 14. Referrals — `/referrals`

```yaml
page:
  route: /referrals
  title: Refer & Earn
  access: authenticated
  shell: dashboard
  sections:
    - name: Stats
      fields: [{label: Total Referrals}, {label: Active Referrals}, {label: Rewards Earned}]
    - name: How Referrals Work
      fields: [{label: Steps explanation}]
    - name: Your Referrals
      fields: [{label: List: name, status, reward}]
    - name: Share
      fields: [{label: Referral link + copy action}]
```

---

## 15. Status Machines

### 15.1 KYC Status
```
pending ──submit──▶ under_review ──approve──▶ verified
                          │
                          └──reject──▶ failed ──resubmit──▶ remediation_required ──▶ under_review
```
Enum (source `src/types/index.ts`): `pending | under_review | verified | failed | remediation_required`.

### 15.2 Investment (Checkout) Flow
```
browse(/marketplace) ──invest──▶ checkout(payment method)
        │                                                  │
        │                                          payment schedule
        │                                                  │
        │                                            review & confirm
        │                                                  │
        │                                            processing ──▶ success(/checkout/success)
        │                                                  │
        └──────────────── portfolio updated ◀────────────┘
```
Guard: checkout requires a selected property; otherwise redirect to `/marketplace`.

### 15.3 Institutional Onboarding
```
draft ─▶ company-info ─▶ classification ─▶ rep ─▶ profile ─▶ documents ─▶ review
                                                                          │
                                                              submit ──▶ under_review
                                                                          │
                                                          approved ──▶ verified
                                                          rejected ──▶ remediation (edit)
```

### 15.4 Asset Lifecycle (admin 9-step → investor settlement)
Admin pipeline (source): `Listing → Due Diligence → Legal → Valuation → Asset Management → (live)`.
Investor-facing `BuyingPath` settlement stages (rendered on asset detail):
`Terms & Allocation → Payment & Settlement → Custody & Title → Reconciliation → Release`
Each stage renders `done | active | pending`.

---

## 16. Navigation Graph (ASCII)

```
/auth/login ──▶ /dashboard ──┬─ /marketplace ──▶ /marketplace/[id] ──▶ /checkout ──▶ /checkout/success
        │                    ├─ /portfolio
        │                    ├─ /dividends
        │                    ├─ /wallet
        │                    ├─ /referrals
        │                    ├─ /notifications
        │                    ├─ /profile ──▶ /profile/kyc
        │                    └─ /settings
/auth/signup ──▶ (track/category) ──▶ /dashboard
/auth/forgot-password ──▶ /auth/otp-verify ──▶ /dashboard
/onboard/institutional ──▶ (status view) ──▶ /dashboard
```

---

## 17. Open Issues / Known Inconsistencies

1. **Leftover dark-mode classes** in `wallet-page.tsx` (header "Deposit Funds" button uses `text-emerald-600`, dialog buttons `bg-white/10 text-white`) and some `Profile`/`institutional` badges. These are visual only; light theme is the intended standard.
2. **Sidebar label** for `/marketplace` still reads "Own-a-Fraction" (legacy naming) — should be "Marketplace" / track-aware.
3. **Wallet deposit/withdraw** capture Amount only; no payment-method selector in current UI.
4. **Mock auth**: no real enforcement; "verified" KYC/institutional status is simulated.
5. **Property `status`** enum (`available | reserved | sold`) is not surfaced in the investor UI beyond card badges.

---

*Generated from source inspection of `src/components/pages/**`, `src/app/**`, `src/types/index.ts`, and `src/stores/appStore.ts`. Every field/option above was verified against the current codebase.*
