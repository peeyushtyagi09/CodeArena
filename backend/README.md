# Backend Service

Lightweight authentication API built with Express 5 + MongoDB. Supports email/password sign-up, email verification via OTP, login with password or OTP, JWT access/refresh tokens, and logout-all with token invalidation. Secured with `helmet`, `cors`, request validation, and rate limiting.

## Stack
- Node.js (CommonJS), Express 5
- MongoDB via Mongoose
- JWT (access + refresh)
- Nodemailer for OTP emails
- Validation: express-validator
- Rate limiting: express-rate-limit

## Project Structure
- `index.js` — App bootstrap, security middleware, global rate limiter, routes.
- `example_env.js` — Loads all env vars from `.env`.
- `db/db.js` — MongoDB connection helper.
- `routes/authRoutes.js` — Auth endpoints.
- `controllers/authConroller.js` — Auth handlers (register, verify, login, tokens).
- `models/User.js`, `models/OtpToken.js` — Mongoose models.
- `middleware/` — Auth guard, validators, rate limiters.
- `utils/generateOtp.js`, `utils/sendEmail.js` — OTP generation and email sending.

## Prerequisites
- Node.js 18+
- MongoDB instance (local or hosted)
- SMTP credentials for sending OTP emails

## Environment Variables
Create `backend/.env` (use strong secrets in production):
```
PORT=3000
MONGODB_URL=mongodb://<user>:<password>@<host>:<port>/<db>

# JWT
JWT_ACCESS_SECRET=<long-random-string>
JWT_REFRESH_SECRET=<long-random-string>
JWT_ACCESS_EXPIRED=15m
JWT_REFRESH_EXPIRES=7d

# SMTP for OTP delivery
SMTP_HOST=<smtp-host>
SMTP_PORT=587
SMTP_USER=<smtp-user>
SMTP_PASS=<smtp-pass>
SMTP_FROM="Auth Service <no-reply@example.com>"

# OTP config
OTP_LENGTH=6
OTP_TTL_SECONDS=600
OTP_MAX_ATTEMPTS=5

# Rate limiting
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=100
```

## Setup & Run
```bash
cd backend
npm install
node index.js   # or add a "start" script and run npm start
```
Server listens on `PORT` and connects to MongoDB on startup.

## API Overview (`/api/auth`)
- `POST /register` — Create user with email/password, send verification OTP. Body: `{ email, password }`.
- `POST /verify/resend` — Resend verification OTP. Body: `{ email }`. Rate limited by OTP limiter.
- `POST /verify/confirm` — Confirm verification OTP. Body: `{ email, otp }`.
- `POST /login` — Password login (requires verified email). Body: `{ email, password }`.
- `POST /login/otp/request` — Request login OTP (requires verified email). Body: `{ email }`. Rate limited by OTP limiter.
- `POST /login/otp/verify` — Verify login OTP and issue tokens. Body: `{ email, otp }`.
- `POST /token/refresh` — Exchange refresh token for new access/refresh. Body: `{ token }`.
- `POST /logout-everywhere` — Invalidate all tokens for the user. Header: `Authorization: Bearer <access>`.

Validation uses `express-validator`; responses are `422` on validation errors. JWT access tokens are required for protected routes. Global rate limiting is applied to all requests; OTP requests have stricter limits.

## Operational Notes
- Configure CORS origins before production; current config allows all.
- Ensure `MONGODB_URL` includes required SSL/credentials for your provider.
- Use strong JWT secrets and rotate them periodically.
- Keep `.env` out of version control.
- Add logging (e.g., `morgan`) and monitoring in production.

## Testing
No automated tests are included. Recommended additions:
- Unit tests for token helpers and OTP generation/validation.
- Integration tests for auth flows (register → verify → login → refresh → logout).
