# React Frontend - E-Commerce Store

## Overview
This is the React frontend for the E-Commerce Store, built to work with the Django REST API backend.

## Features
- **Product Catalog**: Browse products with categories
- **Product Details**: View detailed product information
- **Shopping Cart**: Add, remove, and manage cart items
- **User Authentication**: Login and registration
- **Responsive Design**: Works on all device sizes

## API Endpoints Used
- `GET /api/products/` - List all products
- `GET /api/products/:id/` - Get product details
- `GET /api/categories/` - List all categories
- `GET /api/cart/` - Get user's cart items
- `POST /api/cart/` - Add item to cart
- `PATCH /api/cart/:id/` - Update cart item
- `DELETE /api/cart/:id/` - Remove item from cart
- `POST /api/cart/checkout/` - Clear cart (checkout)
- `POST /api/auth/login/` - User login
- `POST /api/auth/register/` - User registration

## Installation & Setup
1. Install dependencies: `npm install`
2. Start development server: `npm start`
3. Ensure Django backend is running on `http://localhost:8000`

## Project Structure
```
frontend/
├── src/
│   ├── components/
│   │   └── Navbar.js
│   ├── contexts/
│   │   ├── AuthContext.js
│   │   └── CartContext.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Shop.js
│   │   ├── ProductDetail.js
│   │   ├── Cart.js
│   │   ├── Login.js
│   │   └── Register.js
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## Usage
- **Home**: Landing page with welcome message
- **Shop**: Browse products with category filtering
- **Product Detail**: View detailed product information
- **Cart**: Manage shopping cart items
- **Login/Register**: User authentication

## Technologies Used
- React 19.1.1
- React Router DOM
- Axios for API calls
- Material-UI for styling
- Context API for state management
