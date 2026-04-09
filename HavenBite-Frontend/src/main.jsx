import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { RecipeProvider } from './context/RecipeContext.jsx';
import { AuthProvider, useAuthContext } from './context/AuthContext.jsx';
import './index.css'
import App from './App.jsx'

const AppContent = () => {
  const { isAuthLoading } = useAuthContext();

  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-[#F5F2EC] flex items-center justify-center">
        <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2D5016" strokeWidth="2.5">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
        </svg>
      </div>
    );
  }

  return <App />;
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <RecipeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </RecipeProvider>
  </BrowserRouter>
)