# KYC Specification — Urbco Investors App

> Source of truth: `src/components/pages/profile/kyc-page.tsx`, `src/components/pages/auth/signup-page.tsx`,
> `src/app/onboard/institutional/page.tsx`, `src/types/index.ts`.
> Purpose: define, per user type, exactly what KYC data the admin app should expect so it can
> accept / reject (and request remediation on) KYC submissions.

---

## 1. User record the admin always has (`User` model — `src/types/index.ts`)

| Field | Type | Notes |
|-------|------|-------|
| `id` | string | |
| `email` | string | |
| `fullName` | string | |
| `phone` | string | |
| `country` | string | |
| `investmentExperience` | `beginner \| intermediate \| advanced` | display-only after signup |
| `riskAppetite` | `low \| medium \| high` | display-only after signup |
| `investorTrack` | `foundry \| harbor` | Urbco Foundry (≥₦200M) / Urbco Harbour (≥₦100K) |
| `entityType` | `individual \| family-office \| institution` | **drives KYC doc set** |
| `kycStatus` | `pending \| under_review \| verified \| failed \| remediation_required` | |
| `kycSubmittedAt` | Date? | |
| `kycVerifiedAt` | Date? | |
| `kycRemediationItems` | string[]? | admin populates on reject/remediation |
| `createdAt` | Date | |

---

## 2. KYC document sets, by `entityType`

### 2.1 Individual (`individual`) — Harbour & Foundry HNW
**Collected at signup (non-document profile fields):**
- `nationalId`
- `bvn`
- `residentialAddress`

**Documents required (4):**
1. **Government Photo ID** — Passport / Driver's License / National ID
2. **Live Biometric Selfie** — clear photo holding the ID
3. **Proof of Address** — utility bill / bank statement (< 3 months)
4. **Accreditation Questionnaire** — investor risk profile & source of funds

**Declaration fields:**
- `sourceOfFunds` (free text, e.g. "Executive Salary / Investment Income")
- `targetTrack` (`foundry \| harbor \| both`)

### 2.2 Family Office (`family-office`)
**Collected at signup (non-document profile fields):**
- `companyName`
- `rcNumber`
- `companyAddress`
- `repName` (authorized representative)
- `repEmail` (authorized representative)

**Documents required (4):**
1. **Articles of Incorporation** — Family Office Registration or Deed
2. **Trustee/Director Passports** — valid IDs of authorized managing trustees
3. **Proof of AUM / Asset Scale** — audited statement / bank reference (>$10M AUM)
4. **Beneficial Ownership (UBO)** — Ultimate Beneficial Owner Register & Tax ID

**Declaration fields:**
- `declaredAumRange` (free text, e.g. "$50M - $100M AUM")
- `targetTrack` (`foundry \| harbor \| both`)

### 2.3 Institution (`institution`)
> ⚠️ The KYC page does **not** collect institution docs — it shows a "handled separately" card
> and redirects to `/onboard/institutional`. Institutions submit KYB via that onboarding flow only.
> Use the onboarding doc set below (authoritative).

**Collected at signup + onboarding (non-document profile fields):**
- `companyName`, `rcNumber`, `companyAddress`, `repName`, `repEmail`
- `institutionType` (Banks & DFIs, Pension Funds, Insurance Companies, Investment Managers & Funds, Sovereign & Development Funds, Family Offices & HNW, Corporates & Treasuries, Others)
- `structure` (Real Estate Fund, Private Equity / Co-investment, Direct Asset Holdco, SPV / Consortium, Other)
- `aumRange` (`< ₦10B`, `₦10B–₦50B`, `₦50B–₦250B`, `₦250B–₦1T`, `> ₦1T`)
- `horizon` (`< 1 year`, `1–3 years`, `3–7 years`, `7+ years`)
- `sectors` (multi: Residential, Commercial, Mixed-Use, Industrial & Logistics, Hospitality, Student Housing, Healthcare, Infrastructure)
- `regulatoryStatus` (Regulated, Exempt, Self-Regulated)

**Documents required (8) — onboarding KYB set:**
1. **Articles of Incorporation**
2. **Trustee/Director Passports**
3. **Board Resolution Letter** — authorized delegation for real estate investment
4. **Beneficial Ownership (UBO)**
5. **Corporate Registration & Tax ID** — CAC certificate + TIN/LEI
6. **Officer / Director Identification** — signatory officer government IDs
7. **AML Compliance Certificate** — audited financials + AML declaration
8. **(if Harbour track) Individual set:** Government Photo ID, Live Biometric Selfie, Proof of Address, Accreditation Questionnaire

---

## 3. Status lifecycle & accept / reject

```
pending ──submit──▶ under_review ──approve──▶ verified
                         │
                         └──reject──▶ failed ──remediate──▶ remediation_required
                                                                  │
                                                                  └──resubmit──▶ under_review
```

- **Accept** → `kycStatus = verified` (set `kycVerifiedAt`).
- **Reject / send back** → `kycStatus = remediation_required` and populate
  `kycRemediationItems: string[]` with the specific missing / incorrect items.
  These render as a checklist on the user's remediation banner.

---

## 4. Inconsistencies to reconcile before building the admin app

1. **Two different institution doc lists exist.** The `kyc-page` "institution" branch lists 4 docs
   (Corporate Reg & Tax ID, Board Resolution, Officer IDs, AML Cert), but the real institution flow
   (`/onboard/institutional`) uses 8 docs (§2.3). **Use the 8-doc set.**
2. **Institution KYC upload UI is absent** on `/profile/kyc` (it is a redirect). Institutions never
   submit via that page — admin should expect institution KYC to arrive from the onboarding flow only.
3. **Track naming drift.** Signup category "HNW Individual" collapses to `entityType: individual`;
   KYC "Target Investment Track" uses `foundry|harbor|both` while onboarding uses
   `Urbco Foundry|Urbco Harbour`. Pick one canonical enum.
4. **No per-document status.** `kycRemediationItems` is the only structured feedback channel; there
   is no per-document approve/reject flag. For document-level review in admin, extend the model
   (see proposed `KycDocument` below).

---

## 5. Proposed extension for document-level review (optional)

```ts
// Add to src/types/index.ts so admin can approve/reject each doc individually
export type KycDocStatus = "pending" | "approved" | "rejected";

export interface KycDocument {
  id: string;
  entityType: "individual" | "family-office" | "institution";
  name: string;            // e.g. "Government Photo ID"
  fileUrl: string;
  status: KycDocStatus;
  rejectReason?: string;   // shown to user on remediation
}

// Replace free-text kycRemediationItems with structured feedback:
// kycDocuments?: KycDocument[];
```
