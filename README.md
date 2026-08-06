# 🔧 FixItNow - Modern Home Services Marketplace Frontend

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)](https://fixit-now-flax.vercel.app/)

> **FixItNow** is a premium, high-performance home services marketplace built with Next.js 15 App Router, TypeScript, and Tailwind CSS. It seamlessly connects homeowners with background-checked professionals for electrical, plumbing, AC repair, and deep cleaning services.

---

## 🔗 Quick Links

- 🌐 **Live Website (Frontend):** [https://fixit-now-flax.vercel.app](https://fixit-now-flax.vercel.app/)
- ⚙️ **Backend API Service:** [https://fixit-now-backend-xjyr.onrender.com](https://fixit-now-backend-xjyr.onrender.com/)
- 📄 **API Integration Docs:** See [`INTEGRATION.md`](./INTEGRATION.md)

---

## ✨ Key Features & Highlights

- 🌙 **Dark / Light Theme System:** Toggle seamlessly between dark and light modes with state persistence.
- ⚡ **URL-Based 0ms Search & Pagination:** Real-time filtering by category, location, rating, and max price using Next.js URL SearchParams.
- 🎬 **Framer Motion Animations:** Smooth scroll transitions, staggered cards, and interactive hover effects.
- 🛡️ **Role-Based Access Control & Protection:** Secure routes protected by Next.js Middleware (`CUSTOMER`, `TECHNICIAN`, `ADMIN`).
- 💳 **Payment Integration:** Seamless redirect to payment checkout gateways (SSLCommerz / Stripe) with dedicated outcome pages.
- 👨‍🔧 **Technician Verification Latch:** Unverified technicians are restricted from accepting bookings or listing services until approved by Admin.
- 🔒 **Payment-Enforced Completion Latch:** Technicians cannot mark jobs as `COMPLETED` until customer payment (`PAID` status) is verified.
- 👑 **Admin Moderation Control Center:** Real-time user search, dynamic revenue calculation, technician verification, and category management.

---

## 👥 Roles & Permissions Matrix

| Feature / Access | Customer | Technician | Admin |
| :--- | :---: | :---: | :---: |
| Browse Services & Technicians | ✅ | ✅ | ✅ |
| Book Services & Pick Time Slots | ✅ | ❌ | ❌ |
| Initiate Payment & View Receipts | ✅ | ❌ | ❌ |
| Leave Star Reviews & Ratings | ✅ | ❌ | ❌ |
| Accept / Decline Incoming Jobs | ❌ | ✅ (Verified) | ❌ |
| Create & Manage Service Listings | ❌ | ✅ (Verified) | ❌ |
| Set Availability Scheduler | ❌ | ✅ | ❌ |
| User Moderation (Ban / Unban) | ❌ | ❌ | ✅ |
| Verify Technician Profiles | ❌ | ❌ | ✅ |
| Service Category Management | ❌ | ❌ | ✅ |

---

## 🛠️ Tech Stack & Architecture

- **Framework:** Next.js 15 (App Router, Server Actions, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Shadcn UI, Lucide Icons
- **Animation:** Framer Motion
- **Notifications:** Sonner Toast Handler
- **State & Caching:** Next.js `revalidateTag` & Server Action Mutation
- **Deployment:** Vercel (CI/CD Auto-Deploy)

---

## 🚀 Getting Started Locally

Follow these steps to run the application on your local machine:

### 1. Clone the repository
```bash
git clone https://github.com/MAshhabDev/Fixit_Now-Frontend.git
cd Fixit_Now-Frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
BACKEND_API_URL=https://fixit-now-backend-xjyr.onrender.com
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Folder Structure Overview

```text
├── app/
│   ├── (authGroup)/           # Login & Registration authentication routes
│   ├── (dashboardGroup)/      # Protected Customer, Technician & Admin Dashboards
│   │   ├── admin-dashboard/   # Admin Control Center & User Moderation
│   │   ├── dashboard/         # Customer Booking History & Review Dialogs
│   │   └── technician-dashboard/# Technician Job Portal & Service Creator
│   ├── (publicGroup)/         # Public Marketplace, Services, Technicians & Home
│   ├── globals.css            # Design system tokens & CSS variables
│   ├── layout.tsx             # Root layout with Navbar, Footer & Toaster
│   └── loading.tsx            # Global Skeleton loader boundary
├── components/
│   ├── shared/                # Navbar, Footer & ModeToggle components
│   └── ui/                    # Reusable Shadcn UI primitives
└── service/                   # Auth & Token Service helpers (getMe, refreshToken)
```

---

## 📄 License & Attribution

Designed and developed by **Mahir Ashhab**. Built with using Next.js
