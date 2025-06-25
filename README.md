# NextEcom

A full-stack eCommerce application showcasing modern web development with Next.js 15, NextAuth.js, MongoDB, and Stripe.

**Demo**

- Website: [https://nextecom-bay.vercel.app/](https://nextecom-bay.vercel.app/)
- Credentials: `test@test.com` / `test1234`

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation & Usage](#installation--usage)
- [Screenshots](#screenshots)
- [Inspiration](#inspiration)
- [Contributing](#contributing)

---

## Overview

A complete ecommerce experience allowing users to browse, filter, and purchase products, while giving admins control over managing categories, tags, products, orders, and user roles.

---

## Features

### 🛍️ User Features

- Email/password and Google login
- View and filter products by category, tag, and brand
- Product search, reviews, and ratings
- Add to cart, remove, and adjust quantity
- Secure checkout with Stripe integration
- View past orders and order status
- Forgot/reset password via email

### 🛠️ Admin Features

- Admin dashboard with product analytics
- Create, update, delete: categories, tags, and products
- Upload product images with Cloudinary
- Role-based access (admin/user)
- Manage orders and refunds
- Moderate reviews and ratings

### 🧩 Extras

- Pagination for product listings
- Star rating system
- Related product suggestions
- Dark/light mode support (if included)
- Charts using Recharts for dashboard stats

---

## Tech Stack

- **Frontend**: Next.js, Bootstrap / Material CSS
- **Authentication**: NextAuth.js (Email + Google)
- **Backend**: Next.js API Routes
- **Database**: MongoDB (Mongoose)
- **Payments**: Stripe API + Webhooks
- **Media Storage**: Cloudinary
- **Email**: Nodemailer
- **Deployment**: Vercel

---

## 🚀 Getting Started

1. Clone the repo and install dependencies:

   ```bash
   git clone https://github.com/your-username/nextecom.git
   cd nextecom
   npm install
   ```

2. Create a `.env.local` file in the project root and add:

   ```env
   MONGODB_URI=<your_mongodb_connection_string>
   NEXTAUTH_SECRET=<your_nextauth_secret>
   NEXTAUTH_URL=http://localhost:3000
   STRIPE_SECRET_KEY=<your_stripe_secret_key>
   STRIPE_TAX_RATE=<your_stripe_tax_rate_id>
   STRIPE_SHIPPING_RATE=<your_stripe_shipping_rate_id>
   DOMAIN=http://localhost:3000
   CLOUDINARY_URL=<your_cloudinary_url>
   STRIPE_WEBHOOK_SECRET=<from Stripe CLI or Dashboard>
   ```

   # If testing Stripe webhooks locally

   stripe listen --forward-to localhost:3000/api/stripe-webhook

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Build & start for production:
   ```bash
   npm run build
   npm start
   ```

---

---

# 🛒 NextEcom

**NextEcom** is a full-featured, full-stack eCommerce web application built with **Next.js 15 (App Router)**, **MongoDB**, **Stripe**, and **NextAuth.js**. It includes both user and admin functionalities, secure payment processing, and a modern UI powered by Bootstrap and Tailwind.

> 🌐 [Live Demo](https://nextecom-bay.vercel.app/)  
> 🔐 **Demo Credentials:** `test@test.com` / `test1234`

---

## ⚙️ Tech Stack

| Frontend     | Backend             | Services              |
| ------------ | ------------------- | --------------------- |
| Next.js 15   | Next.js API Routes  | Stripe API + Webhooks |
| Tailwind CSS | Mongoose / MongoDB  | Cloudinary            |
| Bootstrap    | NextAuth.js (OAuth) | Nodemailer (Email)    |

---

## 💡 Features

### 🛍️ User Features

- 🔐 Email/password & Google login
- 🔍 Browse, filter, and search products
- ⭐ Leave reviews and ratings
- 🛒 Add/remove/update cart items
- 💳 Checkout with Stripe
- 📦 Track order history and status
- 🔁 Request order refunds
- 🔑 Forgot/reset password

### 🛠️ Admin Features

- 📊 Dashboard with charts & analytics
- 🧩 Manage categories, tags, brands
- 🖼️ Upload images via Cloudinary
- 📝 Create/update/delete products
- 🛒 View/manage orders & refunds
- 🧑‍⚖️ Role-based access control
- 💬 Moderate reviews

### 🧩 Extras

- Pagination for product listings
- Dark/Light mode support (optional)
- Star rating component
- Related products suggestion
- Analytics using Recharts

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/your-username/nextecom.git
cd nextecom
npm install
```

### 2. Environment Setup

Create a `.env.local` in the root directory:

```env
# MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/nextecom

# Auth
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_TAX_RATE=txr_...
STRIPE_SHIPPING_RATE=shr_...

# Domain
DOMAIN=http://localhost:3000

# Cloudinary
CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@cloud_name
```

> 💡 You can get your `STRIPE_WEBHOOK_SECRET` by running:

```bash
stripe listen --forward-to localhost:3000/api/stripe-webhook
```

### 3. Run Development Server

```bash
npm run dev
```

### 4. Build & Start for Production

```bash
npm run build
npm start
```

---

## 📸 Screenshots

## Screenshots

Login Page
![Login Page](public/images/loginPage.png)

Home Page
![Home Page](public/images/homePage.png)

Admin Dashboard
![Admin Dashboard](public/images/adminDashboard.png)

Create Product Page
![Create Product Page](public/images/createProduct.png)

Update Product Page
![Update Product Page](public/images/updateProduct.png)

Shop Page
![Shop Page](public/images/shopPage.png)

Searching Product
![Searching Product](public/images/Searching.png)

Product Page
![Product Page](public/images/product.png)

Review Cart
![Review Cart](public/images/review.png)

Contact Details
![Contact Details](public/images/contact.png)

Checkout Page
![Checkout Page](public/images/checkout.png)

Paying Through Stripe
![Paying Through Stripe](public/images/paying.png)

Order Page
![Order Page](public/images/order.png)

User Orders Page
![User Orders Page](public/images/userOrders.png)

Admin Orders Page
![Admin Orders Page](public/images/adminOrders.png)

## Inspiration

Inspired by real-world marketplaces like Amazon, Daraz, and Flipkart, this project was built to learn and demonstrate full-stack eCommerce app development using modern tools and cloud services.

## Contributing

Contributions are welcome! Feel free to fork the repository, file issues for bugs or feature requests, and submit pull requests. For major changes, please open an issue first to discuss your ideas.

### Contact

Feel free to reach out on LinkedIn or open an issue on GitHub.

## License

This project is open-source under the [MIT License](LICENSE).
