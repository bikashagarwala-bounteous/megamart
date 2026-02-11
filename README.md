# 🛒 MegaMart - E-Commerce Platform

A fully-featured e-commerce application built with React, TypeScript, Zustand, and IndexedDB.

## ✨ Features

### Core Features
- 🛍️ **Product Browsing** - Home page, listing page with filters, and detailed product pages
- 🛒 **Shopping Cart** - Add/remove items, update quantities, persistent storage
- ❤️ **Wishlist** - Save favorite products, move to cart, persistent storage
- 🔐 **Authentication** - Login/logout with protected routes
- 💳 **Checkout** - Form validation, shipping address, payment method selection
- 📦 **Order Management** - Order confirmation, history, and details
- 🔔 **Notifications** - Toast notifications for user actions

### Technical Features
- Strong TypeScript typing (no `any` types)
- Zustand for state management
- IndexedDB for data persistence
- React Router for navigation
- Form validation with error messages
- Responsive design
- Proper error handling
- Accessible UI components

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📝 Demo Credentials

Email: `demo@megamart.com`
Password: `demo123`

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
├── pages/              # Page components
├── store/              # Zustand stores
├── db/                 # IndexedDB operations
├── context/            # React context providers
├── types/              # TypeScript definitions
├── utils/              # Helper functions
└── App.tsx            # Main component
```

## 🗺️ Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with featured products |
| `/products` | Product listing with filters |
| `/products/:id` | Product detail page |
| `/cart` | Shopping cart |
| `/login` | User login |
| `/checkout` | Checkout form (protected) |
| `/order-confirmation/:id` | Order success (protected) |
| `/orders` | Order history (protected) |
| `/wishlist` | Saved items (protected) |

## 🧪 What Works

✅ Product browsing and filtering
✅ Add to cart functionality
✅ Cart quantity controls
✅ Remove items from cart
✅ Persistent cart storage
✅ User authentication
✅ Protected routes
✅ Wishlist toggle on products
✅ Wishlist page
✅ Checkout with validation
✅ Order placement
✅ Order confirmation page
✅ Order history
✅ Toast notifications
✅ Responsive design

## 📦 Dependencies

- `react` - UI framework
- `react-router-dom` - Routing
- `zustand` - State management
- `idb` - IndexedDB wrapper
- `tailwindcss` - Styling
- `typescript` - Type safety

## 🔧 Technologies

- React 18+
- TypeScript 5+
- Tailwind CSS
- Zustand
- IndexedDB (idb)
- React Router v6
- Vite (build tool)

## 📄 License

MIT