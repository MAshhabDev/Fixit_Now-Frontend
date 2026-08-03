# 🌐 FixItNow Frontend - Backend API Integration & Route Architecture

This document provides a comprehensive mapping of all Next.js App Router paths, feature components, and consumed backend API endpoints.

---

### 📋 API Consumption & Route Mapping Table

| Next.js Route / Action File | Feature / Component Name | Consumed Backend API Endpoint | HTTP Method |
| :--- | :--- | :--- | :---: |
| 🏠 **`/`** | Home Page Featured Services & Technicians | `${BACKEND_URL}/api/services`, `${BACKEND_URL}/api/technicians` | `GET` |
| 🛠️ **`/services`** | Browse Services with Search & Filters | `${BACKEND_URL}/api/services`, `${BACKEND_URL}/api/categories` | `GET` |
| 🔍 **`/services/[id]`** | Single Service Details & Technician Profile | `${BACKEND_URL}/api/services/:id` | `GET` |
| 👨‍🔧 **`/technicians`** | Technician Directory Listing | `${BACKEND_URL}/api/technicians` | `GET` |
| 👤 **`/technicians/[id]`** | Technician Profile & Past Reviews | `${BACKEND_URL}/api/technicians/:id` | `GET` |
| 📝 **`bookingAction.ts`** | Customer Book Service Request Modal | `${BACKEND_URL}/api/bookings` | `POST` |
| 📊 **`/dashboard`** | Customer Booking History Tracking | `${BACKEND_URL}/api/bookings` | `GET` |
| 💳 **`paymentAction.ts`** | Payment Gateway Initiation (SSLCommerz/Stripe) | `${BACKEND_URL}/api/payments/create` | `POST` |
| ⭐ **`ReviewAction.tsx`** | Customer Rate & Review Submission | `${BACKEND_URL}/api/review` | `POST` |
| 🛠️ **`/technician-dashboard`** | Technician Portal Incoming Jobs | `${BACKEND_URL}/api/bookings` | `GET` |
| 🔄 **`updateStatus.ts`** | Technician Accept/Decline/Complete Job | `${BACKEND_URL}/api/bookings/:id` | `PATCH` |
| 📦 **`/technician-dashboard/my-services`** | Technician My Services Page | `${BACKEND_URL}/api/services` | `GET` |
| ➕ **`serviceCreateAction.ts`** | Technician Create New Service | `${BACKEND_URL}/api/services` | `POST` |
| 🗑️ **`deleteServiceAction.ts`** | Technician Delete Service | `${BACKEND_URL}/api/services/:id` | `DELETE` |
| ✏️ **`updateServiceAction.ts`** | Technician Edit/Update Service | `${BACKEND_URL}/api/services/:id` | `PATCH` |
| 👑 **`getUserAction.ts`** | Admin User Management Table & Pagination | `${BACKEND_URL}/api/users?page=:page&limit=:limit` | `GET` |
| 🚫 **`updateUserAction.ts`** | Admin Ban / Unban User Status | `${BACKEND_URL}/api/users/:id` | `PATCH` |
| 🛡️ **`updateUserAction.ts`** | Admin Verify Technician Profile | `${BACKEND_URL}/api/technicians/:id/verify` | `PATCH` |
| 📁 **`createCategoryAction.ts`** | Admin Create Service Category Modal | `${BACKEND_URL}/api/admin/categories` | `POST` |
| 🔐 **`getMe.ts`** | Auth User Session Profile Fetch | `${BACKEND_URL}/api/users/me` | `GET` |
| 📝 **`/register`** | Auth Registration (Customer/Technician) | `${BACKEND_URL}/api/auth/register` | `POST` |
| 🔑 **`/login`** | Auth User Login Form | `${BACKEND_URL}/api/auth/login` | `POST` |