# Frontend - CodeArena

A modern, responsive React application built with Vite, Tailwind CSS, and React Router. This frontend provides a seamless user interface for the CodeArena authentication system, featuring sign-up and sign-in components with a clean, professional design.

## 🚀 Features

- **Modern React**: Built with React 19.2.0 and latest hooks
- **Fast Development**: Vite for lightning-fast HMR (Hot Module Replacement)
- **Styling**: Tailwind CSS 4.1.18 for utility-first styling
- **Routing**: React Router DOM 7.11.0 for client-side routing
- **HTTP Client**: Axios for API communication
- **Code Quality**: ESLint for code linting and quality assurance
- **TypeScript Ready**: Type definitions included for React

## 📋 Tech Stack

- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 4.1.18
- **Routing**: React Router DOM 7.11.0
- **HTTP Client**: Axios 1.13.2
- **Linting**: ESLint 9.39.1
- **TypeScript Types**: @types/react, @types/react-dom

## 📁 Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, fonts, and other assets
│   ├── components/         # React components
│   │   ├── Signin.jsx     # Sign-in component
│   │   └── Signup.jsx     # Sign-up component
│   ├── api/
│   │   └── api.jsx        # Axios API configuration
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles
├── index.html             # HTML template
├── vite.config.js         # Vite configuration
├── eslint.config.js       # ESLint configuration
└── package.json           # Dependencies and scripts
```

## 🔧 Prerequisites

Before running the frontend, ensure you have:

- **Node.js** 18.0.0 or higher
- **npm** or **yarn** package manager
- **Backend API** running (see backend README for setup)

## ⚙️ Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
# Backend API URL
REACT_APP_BACKEND_URL=http://localhost:3000
# For production: REACT_APP_BACKEND_URL=https://api.codearena.com
```

**Note**: In React/Vite, environment variables must be prefixed with `VITE_` instead of `REACT_APP_`. Update your `api.jsx` file accordingly if needed, or use Vite's `import.meta.env.VITE_BACKEND_URL`.

## 🛠️ Installation & Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create environment file**:
   ```bash
   # Create .env file with REACT_APP_BACKEND_URL or VITE_BACKEND_URL
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

   The application will start on `http://localhost:5173` (default Vite port).

## 📜 Available Scripts

- **`npm run dev`**: Start the development server with HMR
- **`npm run build`**: Build the application for production
- **`npm run preview`**: Preview the production build locally
- **`npm run lint`**: Run ESLint to check code quality

## 🏗️ Building for Production

1. **Build the application**:
   ```bash
   npm run build
   ```

   This creates an optimized production build in the `dist/` directory.

2. **Preview the production build**:
   ```bash
   npm run preview
   ```

3. **Deploy**: The `dist/` folder contains static files that can be deployed to any static hosting service:
   - **Vercel**: `vercel deploy`
   - **Netlify**: Drag and drop the `dist/` folder
   - **AWS S3**: Upload `dist/` contents to an S3 bucket
   - **GitHub Pages**: Configure GitHub Actions for deployment

## 🎨 Styling with Tailwind CSS

This project uses Tailwind CSS 4.1.18 for styling. Tailwind is configured via the Vite plugin in `vite.config.js`.

### Usage Example

```jsx
<div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="bg-white p-8 rounded-lg shadow-md">
    <h1 className="text-2xl font-bold text-gray-800">Welcome</h1>
  </div>
</div>
```

## 🔌 API Integration

The frontend communicates with the backend API using Axios. The API client is configured in `src/api/api.jsx`:

```jsx
import api from './api/api';

// Example API call
const response = await api.post('/api/auth/register', {
  email: 'user@example.com',
  password: 'password123'
});
```

### API Configuration

Update `src/api/api.jsx` to use the correct environment variable prefix:

- For Vite: Use `import.meta.env.VITE_BACKEND_URL`
- For Create React App: Use `process.env.REACT_APP_BACKEND_URL`

## 🧩 Components

### Signup Component
Located at `src/components/Signup.jsx` - Handles user registration.

### Signin Component
Located at `src/components/Signin.jsx` - Handles user authentication.

## 🔍 Code Quality

### ESLint Configuration

The project includes ESLint with React-specific rules. Run linting with:

```bash
npm run lint
```

### Recommended ESLint Plugins

- `eslint-plugin-react-hooks`: Enforces React Hooks rules
- `eslint-plugin-react-refresh`: Ensures components can be safely refreshed

## 🚀 Performance Optimization

- **Code Splitting**: Vite automatically handles code splitting
- **Tree Shaking**: Unused code is automatically removed in production builds
- **Asset Optimization**: Images and assets are optimized during build
- **Lazy Loading**: Consider implementing React.lazy() for route-based code splitting

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔒 Security Considerations

- **Environment Variables**: Never commit `.env` files with sensitive data
- **API Security**: Ensure backend API implements proper CORS configuration
- **XSS Protection**: React automatically escapes content, but be cautious with `dangerouslySetInnerHTML`
- **HTTPS**: Always use HTTPS in production

## 📝 Development Tips

1. **Hot Module Replacement**: Changes are reflected instantly without full page reload
2. **Fast Refresh**: React components maintain state during development
3. **Error Overlay**: Vite provides helpful error messages in the browser
4. **Console Logging**: Use browser DevTools for debugging

## 🧪 Testing

Consider adding testing frameworks:

- **Vitest**: Unit testing (Vite-native)
- **React Testing Library**: Component testing
- **Playwright** or **Cypress**: E2E testing

## 🤝 Contributing

1. Follow React best practices and hooks rules
2. Maintain consistent code style (use ESLint)
3. Write reusable components
4. Add proper error handling for API calls
5. Update documentation for new features

## 📄 License

ISC

## 🔗 Related Documentation

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vite.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [React Router Documentation](https://reactrouter.com/)
- [Axios Documentation](https://axios-http.com/)
