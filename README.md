# Vivid Market

Full-stack, role-based e-commerce marketplace (customer / seller / admin).

## Stack
- **Frontend:** Next.js 16 (App Router) + JavaScript, Tailwind CSS, Zustand, React Hook Form + Zod, Framer Motion, Recharts
- **Backend:** Node.js + Express.js + MongoDB (Mongoose), JWT (httpOnly cookies), Cloudinary, SSLCommerz/bKash + COD

## Structure
- `frontend/` — Next.js app (route groups: `(auth)`, `(customer)`, `(seller)`, `(admin)`)
- `backend/` — Express REST API (`src/models`, `src/controllers`, `src/routes`, `src/middleware`)

## Getting Started

### Backend
```
cd backend
cp .env.example .env   # fill in MONGO_URI, JWT_SECRET, Cloudinary, payment gateway keys
npm install
npm run dev             # http://localhost:5000
```

### Frontend
```
cd frontend
cp .env.local.example .env.local
npm install
npm run dev              # http://localhost:3000
```

## Auth flow
1. User logs in via `POST /api/auth/login` on the Express backend.
2. Backend issues a JWT in an httpOnly cookie (cross-origin, `credentials: true` on both sides).
3. Next.js `middleware.js` and Express `authMiddleware.js` + `roleMiddleware.js` both check the
   user's role before allowing access to seller/admin routes — enforced on both ends, not just the UI.
