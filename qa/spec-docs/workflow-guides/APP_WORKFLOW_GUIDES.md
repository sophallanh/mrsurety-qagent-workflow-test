# MrSurety – In-App Workflow Guides

> **Source:** Screenshots taken directly from the live MrSurety app  
> **App URL:** https://frontend-tan-five-46.vercel.app  
> **Captured:** 2026-03-14

These guides are shown to users **inside the app itself**. They are the authoritative reference
for what the app actually does (as opposed to the Google Docs which describe intended behavior).
When the app and Google Docs disagree, test both and document the discrepancy.

---

## Built-In Test Credentials (from Full Workflow guide)

The app ships with the following demo accounts for testing:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@mrsurety.com | MrSurety2026! |
| Homeowner | testowner@mrsurety.com | MrSurety2026! |
| Contractor | testpro@mrsurety.com | MrSurety2026! |
| Agent | testagent2@mrsurety.com | MrSurety2026! |

> **Note:** Our QA automation also uses separate `@outlook.com` test accounts
> (see `qa/test-user-credentials/TEST_USER_CREDENTIALS.md`).
> The `@mrsurety.com` accounts above are pre-seeded by Christopher for manual testing.

---

## Guide 1: Agent Referral Workflow

> *"How to refer homeowners and earn rewards"*  
> Displayed inside the app to Agents.

### Your Referral Link

1. **Log Into Your Agent Dashboard** — Go to https://frontend-tan-five-46.vercel.app and sign in
   with your agent credentials.

2. **Copy Your Referral Link or QR Code** — On your dashboard, find your unique referral link
   and QR code. Click **Copy Link** or **Download QR Code**.

3. **Share With Homeowners** — Send the link via text, email, or let them scan your QR code in
   person. They can sign up from anywhere — they don't need to be at home.

### What Happens Next

4. **Homeowner Creates Account (Quick Signup)** — They enter just 4 fields: name, email, phone,
   and password. No service request form yet — fast and easy.

5. **Homeowner Completes Service Request From Dashboard** — When ready, they log in and see
   **"Finish Your Referral from [Your Name]"** on their dashboard. They click it to fill out the
   full service request. **You are automatically linked** — they never need to type your email.

6. **Track Your Referrals** — Go to **Clients** on your dashboard to see all referred homeowners
   and their service request status.

### Rewards Program

7. **Earn Points & Climb Tiers** — Earn **100 points** for every paid work order from your
   referrals. Tiers: **Bronze → Silver → Gold**. Track your points and tier progress on your
   dashboard.

### Tips for Success

- Share your link right after policy conversations — highest conversion rate
- QR codes work great on business cards and printed materials
- Same homeowner can use multiple agents' links for different properties
- **Referral only converts when the homeowner completes the service request form**

---

## Guide 2: Homeowner Referral Workflow

> *"Getting started with your agent's referral"*  
> Displayed inside the app to Homeowners who arrive via a referral link.

### Step 1 — Create Your Account

1. **Receive Referral Link From Your Insurance Agent** — Your agent will share a link or QR code
   with you via text, email, or in person.

2. **Click the Link & Sign Up** — Enter just 4 fields: **name, email, phone, and password**. That's
   it! You can do this from anywhere — you don't need to be at home.

3. **Verify Your Email** — Check your inbox for a verification email from MrSurety and click the
   confirmation link.

### Step 2 — Complete Your Service Request

4. **Log Into Your Dashboard** — Go to https://frontend-tan-five-46.vercel.app and sign in with
   the email and password you just created.

5. **See "Finish Your Referral" in Action Required** — On your dashboard, you'll see a card that
   says **"Finish Your Referral from [Agent Name]"**. This is where you complete your service
   request.

6. **Fill Out the Service Request Form** — Click the card to open the full form. Enter your
   property details, service type, photos, and preferred schedule. **Your agent is automatically
   linked** — no need to enter their email.

### After Submission

7. **Track Your Service Request** — View status updates, estimates, and communications on your
   dashboard. You'll receive email notifications at every step.

### Good to Know

- You can sign up now and finish the service request later when you're ready
- If multiple agents refer you, each one appears separately on your dashboard
- Your agent is automatically connected — you never need to type their email
- Need help? Contact support at admin@mrsurety.com

---

## Guide 3: MrSurety Full Workflow

> *"How a job flows from start to finish"*

### Phase 1 — Agent Creates Referral

1. **Log in as the Agent** — Go to the website and sign in
2. **Copy your referral link** — It's on your dashboard — click the copy button
3. **Share the link with a homeowner** — Text it, email it, or show the QR code

*The agent's job is done! The link does the rest.*

### Phase 2 — Homeowner Signs Up & Requests Service

1. **Click the referral link** — Opens a simple sign-up page
2. **Fill out the form** — Name, email, phone, password, property address, service type
3. **Submit** — Your account is created and service request is submitted automatically
4. **Log in to your dashboard** — You'll see your request under 'My Requests'
5. **Wait for your estimate** — You'll get an email when it's ready
6. **Review and approve the estimate** — Click into your request to see the price breakdown

### Phase 3 — After Estimate Approval (Homeowner)

1. **Pay the deposit** — (implied from app flow)
2. **Schedule your installation** — A calendar pops up right after payment — pick a date and time
3. **Wait for the work to be done** — The contractor will come on the scheduled date

### After the Work Is Done

1. **Pay the remaining balance** — You'll get an email with a 'Pay Now' link (or it charges your
   saved card automatically)
2. **Sign the lien releases** — DocuSign emails will arrive — sign them electronically
3. **View your documents** — Invoices, receipts, and lien releases are all on your 'Documents' page

---

## Key Testing Notes from These Guides

| Finding | Impact on Testing |
|---------|------------------|
| Homeowner signup via referral = **4 fields only** (name, email, phone, password) | Don't expect full service form on initial signup |
| Service request is completed **separately** from signup, via dashboard card | Test the "Finish Your Referral" dashboard flow explicitly |
| Referral converts **only when homeowner completes the service request form** | Verify referral not counted if homeowner signs up but doesn't complete form |
| Same homeowner can use **multiple agents' links** for different properties | Test multi-agent referral scenarios |
| Rewards: **100 points per paid work order**, Bronze→Silver→Gold tiers | Verify point counter increments on agent dashboard after payment |
| Built-in app accounts: `testowner`, `testpro`, `testagent2` @mrsurety.com | Use these for quick manual testing when outlook accounts aren't available |
