
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import HomePage from '@/pages/HomePage.jsx';
import LoginPage from '@/pages/LoginPage.jsx';
import SignupPage from '@/pages/SignupPage.jsx';
import DashboardPage from '@/pages/DashboardPage.jsx';
import PricingPage from '@/pages/PricingPage.jsx';
import ContactPage from '@/pages/ContactPage.jsx';
import AboutPage from '@/pages/AboutPage.jsx';
import SettingsPage from '@/pages/SettingsPage.jsx';
import AdminPanel from '@/pages/AdminPanel.jsx';
import ProtectedRoute from '@/components/ProtectedRoute.jsx';
import Navbar from '@/components/Navbar'; // Import Navbar
import Footer from '@/components/Footer'; // Import Footer

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar /> {/* Render Navbar here */}
          <div className="flex-grow"> {/* This div will push the footer to the bottom */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <AdminPanel />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
          <Footer /> {/* Render Footer here */}
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
