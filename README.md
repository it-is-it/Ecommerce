# 🛒 Full Stack React Ecommerce

A fully functional, full stack ecommerce platform built with **Next.js**, **NextAuth**, and **MongoDB**, featuring complete authentication, product management, cart system, secure checkout, and admin dashboard capabilities.

> **Live Demo**: [your-demo-link.com]  
> **Demo Login**: `demo@demo.com` / `demo1234`

---

## 📌 What It Does

A complete ecommerce experience allowing users to browse, filter, and purchase products, while giving admins control over managing categories, tags, products, orders, and user roles.

---

## ⚙️ Features

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

## 🧑‍💻 Tech Stack

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

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   ```

````

2. Navigate into the project directory:

   ```bash
   cd your-repo-name
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up `.env.local` with required credentials:

   ```env
   MONGODB_URI=your_mongodb_connection
   NEXTAUTH_SECRET=your_secret
   NEXTAUTH_URL=http://localhost:3000
   CLOUDINARY_URL=your_cloudinary_url
   STRIPE_SECRET_KEY=your_stripe_key
   ...
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

---

<!-- ## 📷 Screenshots

> *(Optional: Add UI screenshots of homepage, product list, cart, admin panel, etc.)* -->

---

## 📩 Feedback & Contributions

Feel free to fork this project, open issues, or submit PRs. Feedback is always welcome!
````
