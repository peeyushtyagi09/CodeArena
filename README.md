# Backend Service

Simple Express + MongoDB API starter hardened with `helmet` and `cors`. This README covers setup, configuration, and operational notes for production readiness.

## Tech Stack
- Node.js (CommonJS), Express 5
- MongoDB via Mongoose
- Security middleware: helmet, cors
- Environment management: dotenv

## Prerequisites
- Node.js 18+
- MongoDB instance (local or hosted)

## Project Structure
- `index.js` — Express app bootstrap and middleware.
- `db/db.js` — MongoDB connection helper.
- `example_env.js` — Loads env vars from `.env`.

## Environment Variables
Create a `.env` file in `backend/` with:
```
PORT=3000
MONGODB_URL=mongodb://<user>:<password>@<host>:<port>/<database>
```

## Installation
```bash
cd backend
npm install
```

## Running the Server
```bash
node index.js
```
The app starts on `PORT` and logs once MongoDB is connected. Add a `start` script to `package.json` if you prefer `npm start`.

## Health Check
- `GET /` — logs “That is working” on the server; returns default Express response.

## Operational Notes
- Ensure `MONGODB_URL` includes credentials and SSL options if required by your provider.
- Add request logging (e.g., `morgan`) and rate limiting (`express-rate-limit`) for production traffic.
- Configure CORS origins before production; current setup allows all origins.
- Keep `.env` out of version control.

## Testing
No automated tests are included. Recommend adding:
- Unit tests for DB connection resilience.
- Integration tests for routes as they are added.

