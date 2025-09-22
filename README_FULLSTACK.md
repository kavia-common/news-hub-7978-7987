# News Hub — Full-stack Scaffold

This repository now includes:
- Frontend: React + Router (Tailwind-ready) under `news_aggregator_frontend/`
- Backend: Node.js + Express + MongoDB (Mongoose) under `backend/`
- JWT authentication, modular storage adapters (Firebase or AWS S3), and initial API routes

## Backend
- Install: `cd backend && npm install`
- Configure: copy `.env.example` to `.env` and fill:
  - `MONGODB_URI`, `JWT_SECRET`, `NEWS_API_KEY` (optional), `STORAGE_PROVIDER` and the chosen provider credentials
- Run: `npm run dev` (default port 4000)

Routes (initial):
- `GET /api/health` — health check
- `POST /api/auth/signup` — body: `{ email, password, role? }`
- `POST /api/auth/login` — body: `{ email, password }`
- `GET /api/news/top` — query: `category?, page?, max?`
- `GET /api/news/search` — query: `q, page?, max?`
- `GET /api/bookmarks` — auth required
- `POST /api/bookmarks` — auth, body: `{ article }`
- `DELETE /api/bookmarks` — auth, body: `{ url }`
- `POST /api/admin/news` — admin, multipart form with fields and `image`
- `PUT /api/admin/news/:id` — admin, optional `image`
- `DELETE /api/admin/news/:id` — admin
- `GET /api/admin/news` — admin, optional `category`

Storage:
- Set `STORAGE_PROVIDER=firebase` (default) or `s3`
- The provider adapters are stubs returning expected URLs; replace with real SDK code when ready.

## Frontend
- Install: `cd news_aggregator_frontend && npm install`
- Run: `npm start` (port 3000)
- Routes:
  - `/` — existing feed UI (GNews-based)
  - `/login` — placeholder
  - `/signup` — placeholder
  - `/bookmarks` — placeholder (uses localStorage for now)
  - `/admin` — placeholder (image upload form UI only)

Later steps:
- Wire frontend auth to backend `/api/auth/*` and persist JWT
- Replace localStorage bookmarks with backend `/api/bookmarks`
- Swap feed to call backend `/api/news/*` to merge custom + external
- Implement real storage using Firebase Admin SDK or AWS SDK in `backend/src/storage/providers/`
