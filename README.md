# 🛒 NextEcom

**NextEcom** is a full-featured, full-stack eCommerce web application built with **Next.js 15 (App Router)**, **MongoDB**, **Stripe**, and **NextAuth.js**. It includes both user and admin functionalities, secure payment processing, and a modern UI powered by Bootstrap and Tailwind.

> 🌐 [Live Demo](https://nextecom-bay.vercel.app/)  
> 🔐 **Demo Credentials:** `test@test.com` / `test1234`

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

# ⚙️ Tech Stack

| Category           | Technology                         |
| ------------------ | ---------------------------------- |
| **Frontend**       | Next.js, Tailwind CSS, Bootstrap   |
| **Authentication** | NextAuth.js (Email & Google OAuth) |
| **Backend**        | Next.js API Routes                 |
| **Database**       | MongoDB with Mongoose ORM          |
| **Payments**       | Stripe API + Webhooks              |
| **Media Storage**  | Cloudinary                         |
| **Email**          | Nodemailer                         |
| **Deployment**     | Vercel                             |

---

## 🚀 Getting Started

### 1. Clone the repo and install dependencies:

```bash
git clone https://github.com/your-username/nextecom.git
cd nextecom
npm install
```

### 2. Create a `.env.local` file in the project root and add:

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

### Contact

Feel free to reach out on LinkedIn or open an issue on GitHub.

## 🔗 Related Projects

Here are some other projects you might find useful or inspiring:

- 🏨 [The Wild Oasis](https://github.com/it-is-it/the-wild-oasis) — Hotel management dashboard with modern UI and real-time data handling.
- 🌍 [Worldwise](https://github.com/it-is-it/Worldwise) — Travel tracking app to mark places you’ve visited and plan new adventures.
