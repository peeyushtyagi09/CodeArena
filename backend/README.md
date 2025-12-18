# Backend API - CodeArena

A secure, production-ready authentication API built with Express.js and MongoDB. This backend service provides comprehensive authentication features including email/password registration, OTP-based email verification, password and OTP login options, JWT token management, and secure logout functionality.

## 🚀 Features

- **User Registration**: Email/password sign-up with automatic OTP verification
- **Email Verification**: OTP-based email verification system
- **Multiple Login Methods**: Password-based and OTP-based login options
- **JWT Authentication**: Access and refresh token implementation
- **Token Management**: Token refresh and logout-all functionality
- **Security**: Rate limiting, request validation, CORS, and Helmet security headers
- **OTP System**: Secure OTP generation with expiration and attempt limits

## 📋 Tech Stack

- **Runtime**: Node.js (CommonJS)
- **Framework**: Express.js 5.2.1
- **Database**: MongoDB with Mongoose 9.0.1
- **Authentication**: JSON Web Tokens (JWT)
- **Email Service**: Nodemailer 7.0.11
- **Security**: Helmet, CORS, express-rate-limit
- **Validation**: express-validator 7.3.1
- **Password Hashing**: bcrypt 6.0.0

## 📁 Project Structure

```
backend/
├── index.js                 # Application entry point and server setup
├── example_env.js           # Environment variable configuration loader
├── db/
│   └── db.js               # MongoDB connection helper
├── routes/
│   └── authRoutes.js       # Authentication route definitions
├── controllers/
│   └── authConroller.js    # Authentication business logic handlers
├── models/
│   ├── User.js             # User Mongoose model
│   └── OtpToken.js         # OTP token Mongoose model
├── middleware/
│   ├── auth.js             # JWT authentication middleware
│   ├── validate.js         # Request validation middleware
│   └── ratelimiter.js      # Rate limiting middleware
└── utils/
    ├── generateOtp.js      # OTP generation utility
    └── sendEmail.js        # Email sending utility
```

## 🔧 Prerequisites

Before running the backend, ensure you have:

- **Node.js** 18.0.0 or higher
- **MongoDB** instance (local or cloud-hosted like MongoDB Atlas)
- **SMTP credentials** for sending OTP emails (Gmail, SendGrid, AWS SES, etc.)
- **npm** or **yarn** package manager

## ⚙️ Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```env
# Server Configuration
PORT=3000

# Database Configuration
MONGODB_URL=mongodb://<user>:<password>@<host>:<port>/<database>
# Example: mongodb://localhost:27017/codearena
# Or MongoDB Atlas: mongodb+srv://<user>:<password>@cluster.mongodb.net/<database>

# JWT Configuration
JWT_ACCESS_SECRET=<generate-a-long-random-string-here>
JWT_REFRESH_SECRET=<generate-another-long-random-string-here>
JWT_ACCESS_EXPIRED=15m
JWT_REFRESH_EXPIRES=7d

# SMTP Configuration (for OTP emails)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password
SMTP_FROM="CodeArena <no-reply@codearena.com>"

# OTP Configuration
OTP_LENGTH=6
OTP_TTL_SECONDS=600
OTP_MAX_ATTEMPTS=5

# Rate Limiting Configuration
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=100
```

### Generating JWT Secrets

You can generate secure random strings for JWT secrets using:

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Using OpenSSL
openssl rand -hex 64
```

## 🛠️ Installation & Setup

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create environment file**:
   ```bash
   # Copy example_env.js structure and create .env file
   # Add your actual environment variables
   ```

4. **Start the development server**:
   ```bash
   node index.js
   ```

   The server will start on the port specified in your `.env` file (default: 3000).

## 📡 API Endpoints

All authentication endpoints are prefixed with `/api/auth`.

### Public Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response**: `201 Created`
```json
{
  "message": "Registered. Verification OTP sent to email."
}
```

#### Resend Verification OTP
```http
POST /api/auth/verify/resend
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Response**: `200 OK`
```json
{
  "message": "Verification OTP resent."
}
```

#### Verify Email
```http
POST /api/auth/verify/confirm
Content-Type: application/json

{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Response**: `200 OK`
```json
{
  "message": "Email verified",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login with Password
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**Response**: `200 OK`
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Request Login OTP
```http
POST /api/auth/login/otp/request
Content-Type: application/json

{
  "email": "user@example.com"
}
```

**Response**: `200 OK`
```json
{
  "message": "Login OTP sent."
}
```

#### Verify Login OTP
```http
POST /api/auth/login/otp/verify
Content-Type: application/json

{
  "email": "user@example.com",
  "otp": "123456"
}
```

**Response**: `200 OK`
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Refresh Token
```http
POST /api/auth/token/refresh
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response**: `200 OK`
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Protected Endpoints

#### Logout Everywhere
```http
POST /api/auth/logout-everywhere
Authorization: Bearer <accessToken>
```

**Response**: `200 OK`
```json
{
  "message": "Logged out from all sessions"
}
```

## 🔒 Security Features

- **Helmet.js**: Sets various HTTP headers to help protect the app from well-known web vulnerabilities
- **CORS**: Configurable Cross-Origin Resource Sharing
- **Rate Limiting**: Global rate limiting and stricter limits for OTP endpoints
- **Request Validation**: Input validation using express-validator
- **Password Hashing**: bcrypt with salt rounds for secure password storage
- **JWT Tokens**: Secure token-based authentication with refresh token rotation
- **OTP Security**: Time-limited OTPs with attempt limits and secure hashing

## 🧪 Testing

Currently, no automated tests are included. Recommended testing additions:

- **Unit Tests**: Token helpers, OTP generation/validation utilities
- **Integration Tests**: Complete auth flows (register → verify → login → refresh → logout)
- **E2E Tests**: Full user authentication scenarios

Consider using testing frameworks like:
- **Jest** or **Mocha** for unit/integration tests
- **Supertest** for API endpoint testing

## 🚀 Production Deployment

Before deploying to production:

1. **Environment Variables**: Ensure all sensitive values are properly configured
2. **CORS Configuration**: Update CORS settings to allow only your frontend domain
3. **MongoDB**: Use a managed MongoDB service (MongoDB Atlas) with proper security
4. **JWT Secrets**: Use strong, randomly generated secrets and rotate them periodically
5. **Rate Limiting**: Adjust rate limits based on your expected traffic
6. **Logging**: Add logging middleware (e.g., `morgan`) for request logging
7. **Error Handling**: Implement comprehensive error handling and monitoring
8. **HTTPS**: Ensure all connections use HTTPS in production
9. **Process Manager**: Use PM2 or similar for process management
10. **Health Checks**: Add health check endpoints for monitoring

## 📝 Scripts

Add these scripts to `package.json` for better development experience:

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

## 🤝 Contributing

1. Follow the existing code style
2. Ensure all endpoints are properly validated
3. Add appropriate error handling
4. Update documentation for any new features

## 📄 License

ISC

## 🔗 Related Documentation

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT.io](https://jwt.io/)
- [Nodemailer Documentation](https://nodemailer.com/)
