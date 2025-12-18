# CodeArena

A full-stack authentication application built with modern web technologies. CodeArena provides a secure, production-ready authentication system with email verification, multiple login methods, and comprehensive token management.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Backend Documentation](#backend-documentation)
- [Frontend Documentation](#frontend-documentation)
- [Environment Setup](#environment-setup)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

CodeArena is a complete authentication solution consisting of:

- **Backend API**: Express.js-based RESTful API with MongoDB, JWT authentication, and OTP verification
- **Frontend**: React application with Vite, Tailwind CSS, and modern UI components

This project demonstrates industry-standard practices for building secure, scalable authentication systems.

## ✨ Features

### Authentication Features
- ✅ User registration with email/password
- ✅ Email verification via OTP (One-Time Password)
- ✅ Password-based login
- ✅ OTP-based login (passwordless option)
- ✅ JWT access and refresh tokens
- ✅ Token refresh mechanism
- ✅ Logout from all devices/sessions

### Security Features
- ✅ Password hashing with bcrypt
- ✅ Rate limiting on API endpoints
- ✅ Request validation and sanitization
- ✅ CORS protection
- ✅ Helmet.js security headers
- ✅ OTP expiration and attempt limits
- ✅ Token versioning for logout-all functionality

### Developer Experience
- ✅ Hot Module Replacement (HMR) in frontend
- ✅ Modern ES6+ syntax
- ✅ Modular code structure
- ✅ Comprehensive error handling
- ✅ Environment-based configuration

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 5.2.1
- **Database**: MongoDB with Mongoose 9.0.1
- **Authentication**: JSON Web Tokens (JWT)
- **Email**: Nodemailer 7.0.11
- **Security**: Helmet, CORS, express-rate-limit
- **Validation**: express-validator 7.3.1

### Frontend
- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 4.1.18
- **Routing**: React Router DOM 7.11.0
- **HTTP Client**: Axios 1.13.2
- **Linting**: ESLint 9.39.1

## 📁 Project Structure

```
CodeArena/
├── backend/                 # Backend API server
│   ├── controllers/        # Request handlers
│   ├── db/                 # Database connection
│   ├── middleware/         # Auth, validation, rate limiting
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   ├── index.js            # Server entry point
│   └── README.md           # Backend documentation
│
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── api/            # API client configuration
│   │   ├── assets/         # Static assets
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   ├── public/             # Public assets
│   └── README.md           # Frontend documentation
│
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0.0 or higher
- **MongoDB** instance (local or cloud-hosted)
- **npm** or **yarn** package manager
- **SMTP credentials** for email sending (Gmail, SendGrid, etc.)

### Quick Start

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd CodeArena
   ```

2. **Set up the backend**:
   ```bash
   cd backend
   npm install
   # Create .env file with required variables (see Backend README)
   node index.js
   ```

3. **Set up the frontend** (in a new terminal):
   ```bash
   cd frontend
   npm install
   # Create .env file with REACT_APP_BACKEND_URL or VITE_BACKEND_URL
   npm run dev
   ```

4. **Access the application**:
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3000`

## 📚 Documentation

### Backend Documentation

For detailed backend setup, API endpoints, and configuration, see:
**[Backend README](./backend/README.md)**

The backend README includes:
- Complete API endpoint documentation
- Environment variable configuration
- Security features and best practices
- Database setup instructions
- Production deployment guidelines

### Frontend Documentation

For detailed frontend setup, component structure, and build instructions, see:
**[Frontend README](./frontend/README.md)**

The frontend README includes:
- Component documentation
- Styling guidelines
- Build and deployment instructions
- API integration examples
- Development tips

## ⚙️ Environment Setup

### Backend Environment Variables

Create `backend/.env`:
```env
PORT=3000
MONGODB_URL=mongodb://localhost:27017/codearena
JWT_ACCESS_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret-key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
# ... (see backend/README.md for complete list)
```

### Frontend Environment Variables

Create `frontend/.env`:
```env
REACT_APP_BACKEND_URL=http://localhost:3000
# Or for Vite:
# VITE_BACKEND_URL=http://localhost:3000
```

## 📡 API Documentation

### Base URL
```
http://localhost:3000/api/auth
```

### Main Endpoints

- `POST /register` - Register a new user
- `POST /verify/resend` - Resend verification OTP
- `POST /verify/confirm` - Verify email with OTP
- `POST /login` - Login with password
- `POST /login/otp/request` - Request login OTP
- `POST /login/otp/verify` - Login with OTP
- `POST /token/refresh` - Refresh access token
- `POST /logout-everywhere` - Logout from all devices (protected)

For complete API documentation with request/response examples, see:
**[Backend README - API Endpoints](./backend/README.md#-api-endpoints)**

## 🚀 Deployment

### Backend Deployment

1. Set up MongoDB (MongoDB Atlas recommended)
2. Configure environment variables on your hosting platform
3. Deploy to platforms like:
   - **Heroku**
   - **Railway**
   - **Render**
   - **AWS EC2**
   - **DigitalOcean**

See [Backend README - Production Deployment](./backend/README.md#-production-deployment) for detailed instructions.

### Frontend Deployment

1. Build the production bundle:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy the `dist/` folder to:
   - **Vercel**: `vercel deploy`
   - **Netlify**: Drag and drop `dist/` folder
   - **AWS S3 + CloudFront**
   - **GitHub Pages**

See [Frontend README - Building for Production](./frontend/README.md#-building-for-production) for detailed instructions.

## 🔒 Security Best Practices

- ✅ Never commit `.env` files to version control
- ✅ Use strong, randomly generated JWT secrets
- ✅ Rotate secrets periodically in production
- ✅ Configure CORS to allow only your frontend domain
- ✅ Use HTTPS in production
- ✅ Implement proper rate limiting
- ✅ Validate and sanitize all user inputs
- ✅ Keep dependencies updated

## 🧪 Testing

Currently, automated tests are not included. Recommended additions:

- **Backend**: Unit tests (Jest/Mocha), integration tests (Supertest)
- **Frontend**: Component tests (React Testing Library), E2E tests (Playwright/Cypress)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style Guidelines

- Follow existing code structure and patterns
- Use meaningful variable and function names
- Add comments for complex logic
- Ensure proper error handling
- Update documentation for new features

## 📄 License

This project is licensed under the ISC License.

## 🔗 Useful Links

- [Backend Documentation](./backend/README.md)
- [Frontend Documentation](./frontend/README.md)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [Vite Documentation](https://vite.dev/)

## 📞 Support

For issues, questions, or contributions, please open an issue on the repository.

---

**Note**: This is a demonstration project. For production use, ensure all security measures are properly configured and tested.

