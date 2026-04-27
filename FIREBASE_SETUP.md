# BELLA KRAFT — Firebase Setup (Admin + Catalog + Orders)

## 1) Paste your config
Replace the placeholder `firebaseConfig` in:
- `index.html` (storefront)
- `script.js` (storefront logic)
- `admin.html` (admin dashboard)

## 2) Enable products/categories real-time catalog
Create (or let admin create) this Firestore document:
- `stores/bella-kraft`

It will contain:
- `products: []`
- `categories: []`
- `updatedAt`

## 3) Secure admin access (required)
Admin access is controlled by an allowlist:
- `stores/bella-kraft/admins/{UID}`

Steps:
1. Create an admin user in Firebase Auth (Email/Password).
2. Copy their `UID`.
3. Create a Firestore document at `stores/bella-kraft/admins/{UID}` with fields like:
   - `email`
   - `role: "owner"`

## 4) Orders (WhatsApp checkout → Firestore)
Orders are written to:
- `stores/bella-kraft/orders/{orderId}`

Admin reads them in real-time.

## 5) Deploy rules (recommended)
This repo includes:
- `firestore.rules`
- `storage.rules`

Deploy with Firebase CLI (recommended) so:
- catalog writes are admin-only
- storage uploads are admin-only
- orders can be created by visitors, managed by admins

