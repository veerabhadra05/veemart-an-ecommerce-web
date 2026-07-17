# 🛒 VeeMart — Full Stack E-Commerce Platform

VeeMart is a modern full-stack e-commerce web application designed to provide a real-world online shopping experience.  
It allows users to browse products, manage cart items, save delivery addresses, place orders, and make secure online payments.

This project was developed as part of my learning journey in full-stack development to gain practical experience in frontend development, backend APIs, database design, deployment, authentication, and payment integration.

---

# 🚀 Live Demo

LiveLink: https://veemart-web.vercel.app  

---

# ✨ Features

## User Features
- User Registration & Login
- Secure Password Hashing
- Product Browsing
- Category Filtering
- Product Details Page
- Add to Cart
- Quantity Management
- Save Multiple Delivery Addresses
- Edit/Delete Addresses
- Checkout System
- Razorpay Payment Integration
- Order History Tracking

---

## Admin Features
- Admin Login
- Add New Products
- Edit Existing Products
- Delete Products
- Manage Inventory
- View All Orders
- Update Order Status
- Dashboard Statistics

---

# 🏗 System Architecture

```text
React Frontend
      ↓
 REST API Calls
      ↓
Flask Backend
      ↓
MongoDB Atlas
```

---

# 🛠 Tech Stack

## Frontend
- React.js
- JavaScript
- Vite
- HTML5
- CSS3

## Backend
- Python
- Flask
- Flask-CORS
- Flask-Bcrypt

## Database
- MongoDB Atlas

## Payment Gateway
- Razorpay

## Deployment
- Vercel (Frontend)
- Render (Backend)

---

# 📂 Project Structure

```bash
veemart-ecommerce/
│
├── client/
│   ├── public/
│   ├── src/
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── app.py
│   ├── requirements.txt
│   └── .env
│
└── README.md
```

---

# 🔐 Authentication

Authentication system includes:
- User Registration
- Login Verification
- Password Hashing using Bcrypt
- Role-based Access (User/Admin)

Passwords are securely hashed before storing in the database.

---

# 🛍 Product Module

Each product contains:
- Name
- Image
- Price
- Description
- Stock
- Category

Users can browse and view products in detail.

---

# 🛒 Cart Module

Cart features:
- Add products
- Increase quantity if already added
- Remove products
- Dynamic total calculation

Cart data is stored per user.

---

# 📍 Address Management

Users can manage multiple addresses:
- Add address
- Edit address
- Delete address

Address fields:
- Full Name
- Mobile Number
- House
- Area
- City
- State
- Pincode

---

# 💳 Payment Workflow

Payment is integrated using Razorpay.

Flow:
1. User proceeds to checkout  
2. Backend calculates cart total  
3. Razorpay order is created  
4. Payment popup opens  
5. Payment signature verified  
6. Order stored in MongoDB  
7. Cart cleared after successful payment  

---

# 📦 Order Management

Order stores:
- User ID
- Ordered Items
- Payment Status
- Delivery Address
- Total Amount
- Order Timestamp
- Order Status

Example statuses:
- Placed
- Processing
- Shipped
- Delivered

---

# 📊 Admin Dashboard

Admin can monitor:
- Total Products
- Total Orders
- Total Users

Admin also manages product inventory and order progress.

---

# 🗄 Database Collections

MongoDB collections used:

- users
- products
- categories
- cart
- orders

---

# Challenges Faced During Development

- Migrated database from MySQL to MongoDB
- Razorpay integration issues
- Payment verification handling
- CORS issues during deployment
- State management in cart
- Admin routing
- Debugging frontend-backend communication

These challenges improved my debugging and software engineering skills.

---

# Learning Outcomes

Through VeeMart, I learned:

- Full Stack Development
- REST API Development
- React State Management
- MongoDB CRUD Operations
- Authentication Systems
- Payment Gateway Integration
- Deployment Workflow
- Debugging Production Errors

---

# Future Enhancements

Planned improvements:
- Wishlist
- Product Reviews & Ratings
- Coupon Discounts
- AI Recommendations
- Email Notifications
- Analytics Dashboard

---

# 👨‍💻 Author

Ulthi Veerabhadrappa  
B.Tech Computer Science Engineering  
Python Full Stack Developer  

GitHub: https://github.com/veerabhadra05