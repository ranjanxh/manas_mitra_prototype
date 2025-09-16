import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

// Import All Pages
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import FeaturesPage from './pages/FeaturesPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import WellnessLibraryPage from './pages/WellnessLibraryPage';
import CommunityCirclePage from './pages/CommunityCirclePage';
import CounselorConnectPage from './pages/CounselorConnectPage';
import AIChatPage from './pages/AIChatPage';
import MeditationPage from './pages/MeditationPage';

// Import Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import DashboardSidebar from './components/layout/DashboardSidebar';

// --- Reusable UI & Animation Components ---

const LoadingScreen = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 to-teal-600 flex items-center justify-center z-50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 bg-white/10 rounded-full animate-bounce delay-500"></div>
      </div>
      <div className="text-center z-10">
        <h2 className="text-3xl font-bold text-white mb-4">Manas Mitra</h2>
        <p className="text-white/80 text-lg">Preparing your wellness journey...</p>
      </div>
    </div>
  );
};

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (location.pathname !== displayChildren.props.location.pathname) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setDisplayChildren(children);
        setIsTransitioning(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [location, children, displayChildren]);

  return (
    <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      {displayChildren}
    </div>
  );
};

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-teal-400/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
    </div>
  );
};

// --- Main App Component ---

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [appReady, setAppReady] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsInitialLoading(false);
      setTimeout(() => setAppReady(true), 500);
    }, 1500);
    return () => clearTimeout(loadTimer);
  }, []);

  const handleGuestLogin = () => {
    setIsLoggedIn(true);
    navigate('/dashboard');
  };

  return (
    <>
      <LoadingScreen isLoading={isInitialLoading} />
      {appReady && (
        <div className="relative min-h-screen">
          <AnimatedBackground />
          <PageTransition>
            <Routes location={location} key={location.pathname}>
              {/* Public & Auth Routes (Layout with Navbar and Footer) */}
              <Route path="/" element={<><Navbar isLoggedIn={isLoggedIn} onLogin={handleGuestLogin} /><HomePage /><Footer /></>} />
              <Route path="/about" element={<><Navbar isLoggedIn={isLoggedIn} onLogin={handleGuestLogin} /><AboutUsPage /><Footer /></>} />
              <Route path="/features" element={<><Navbar isLoggedIn={isLoggedIn} onLogin={handleGuestLogin} /><FeaturesPage /><Footer /></>} />
              <Route path="/contact" element={<><Navbar isLoggedIn={isLoggedIn} onLogin={handleGuestLogin} /><ContactPage /><Footer /></>} />
              <Route path="/login" element={<><Navbar isLoggedIn={isLoggedIn} onLogin={handleGuestLogin} /><LoginPage /></>} />
              <Route path="/signup" element={<><Navbar isLoggedIn={isLoggedIn} onLogin={handleGuestLogin} /><SignUpPage /></>} />

              {/* Dashboard Routes (Layout with Sidebar) */}
              <Route 
  path="/dashboard" 
  element={<div className="flex"><DashboardSidebar /><div className="flex-1 ml-64 p-8"><DashboardPage /></div></div>} 
/>
<Route 
  path="/library" 
  element={<div className="flex"><DashboardSidebar /><div className="flex-1 ml-64 p-8"><WellnessLibraryPage /></div></div>} 
/>
<Route 
  path="/community" 
  element={<div className="flex"><DashboardSidebar /><div className="flex-1 ml-64 p-8"><CommunityCirclePage /></div></div>} 
/>
<Route 
  path="/connect" 
  element={<div className="flex"><DashboardSidebar /><div className="flex-1 ml-64 p-8"><CounselorConnectPage /></div></div>} 
/>
<Route 
  path="/ai-chat" 
  element={<div className="flex"><DashboardSidebar /><div className="flex-1 ml-64 p-8"><AIChatPage /></div></div>} 
/>
<Route 
  path="/meditation" 
  element={<div className="flex"><DashboardSidebar /><div className="flex-1 ml-64 p-8"><MeditationPage /></div></div>} 
/>
            </Routes>
          </PageTransition>
        </div>
      )}
    </>
  );
}

export default App;