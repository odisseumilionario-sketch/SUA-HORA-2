import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { usePreserveQueryNavigate } from '@/lib/usePreserveQueryNavigate';
import { useLocation } from 'react-router-dom';

const PaymentVideoPage = () => {
  const [totalBalance, setTotalBalance] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const navigate = usePreserveQueryNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedBalance = parseInt(localStorage.getItem('totalBalance') || '0');
    // Ensure the displayed balance does not exceed 200,000
    setTotalBalance(Math.min(storedBalance, 200000));

    const timer = setTimeout(() => {
      setShowButton(true);
    }, 150000); // 150 seconds

    return () => clearTimeout(timer);
  }, []);

  // Injeta scripts de pixel e parâmetros UTM
  useEffect(() => {
    // Injeta o Pixel UTMify no <head> (se ainda não estiver lá)
    if (!document.querySelector("#utmify-pixel")) {
      window.pixelId = "68c183a9bc40cfe42b9716e5";
      const pixelScript = document.createElement("script");
      pixelScript.id = "utmify-pixel";
      pixelScript.async = true;
      pixelScript.defer = true;
      pixelScript.src = "https://cdn.utmify.com.br/scripts/pixel/pixel.js";
      document.head.appendChild(pixelScript);
    }

    // Injeta o script de UTMs no <body> (footer)
    if (!document.querySelector("#utmify-utms")) {
      const utmScript = document.createElement("script");
      utmScript.id = "utmify-utms";
      utmScript.src = "https://cdn.utmify.com.br/scripts/utms/latest.js";
      utmScript.setAttribute("data-utmify-prevent-xcod-sck", "");
      utmScript.setAttribute("data-utmify-prevent-subids", "");
      utmScript.async = true;
      utmScript.defer = true;
      document.body.appendChild(utmScript);
    }

    // Dispara PageView em cada troca de rota
    if (window.fbq) {
      window.fbq("track", "PageView");
    }
  }, []);

  // Garante que os parâmetros UTM sejam preservados na URL quando a página carrega
  useEffect(() => {
    // Se o script UTMify estiver disponível, ele já gerencia os parâmetros
    // Mas garantimos que a URL tenha os parâmetros visíveis
    if (typeof window !== 'undefined' && location.search) {
      const currentParams = new URLSearchParams(location.search);
      const windowParams = new URLSearchParams(window.location.search);
      
      // Mescla parâmetros do React Router com window.location
      let hasChanges = false;
      windowParams.forEach((value, key) => {
        if (!currentParams.has(key) && value !== '') {
          currentParams.set(key, value);
          hasChanges = true;
        }
      });
      
      // Se houver parâmetros adicionais, atualiza a URL sem recarregar
      if (hasChanges && currentParams.toString() !== windowParams.toString()) {
        const newSearch = currentParams.toString() ? `?${currentParams.toString()}` : '';
        if (newSearch !== window.location.search) {
          window.history.replaceState({}, '', `${window.location.pathname}${newSearch}${window.location.hash}`);
        }
      }
    }
  }, [location.search]);

  const handleWithdrawNow = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <motion.div 
        className="flex justify-between items-center p-4 bg-white shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center">
          <h1 className="text-2xl font-black text-black">cupom</h1>
          <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center ml-1">
            <span className="text-black font-bold text-xs">$</span>
          </div>
          <div className="ml-1">
            <span className="text-xs font-medium text-gray-600 block leading-tight">DA VEZ</span>
          </div>
        </div>
        
        <div className="text-right">
           <p className="text-sm text-gray-500">Saldo:</p>
           <p className="text-lg font-bold text-green-600 bg-yellow-200 px-3 py-1 rounded-full">
            {totalBalance.toLocaleString('pt-BR', { style: 'currency', currency: 'AOA' }).replace('AOA', 'Kz')}
          </p>
        </div>
      </motion.div>

      <main className="flex-grow flex flex-col items-center justify-center p-4 text-center">
        <motion.div 
          className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ position: 'relative', paddingTop: '216.2962962962963%' }}
        >
          <iframe 
            id="panda-c5dae6b0-3ec1-42ad-9daa-1ad5432883d6" 
            src="https://player-vz-35d0a572-7e6.tv.pandavideo.com.br/embed/?v=c5dae6b0-3ec1-42ad-9daa-1ad5432883d6" 
            style={{ border: 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} 
            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture" 
            allowFullScreen={true}
            fetchPriority="high"
          ></iframe>
        </motion.div>

        <motion.div 
          className="bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded-lg flex items-center max-w-2xl w-full mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <AlertTriangle className="h-6 w-6 mr-3 text-yellow-500"/>
          <p className="font-semibold text-center flex-1">
            Assista esse vídeo até o final para liberar o seu saque!
          </p>
        </motion.div>

        <p className="text-gray-500 text-sm mt-auto mb-4">
          ©️ {new Date().getFullYear()} Todos os direitos reservados - Cupom da Vez
        </p>
      </main>

      <footer className="sticky bottom-0 p-4 bg-white/80 backdrop-blur-sm">
        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={handleWithdrawNow}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-6 px-6 rounded-2xl text-xl shadow-lg transform transition-transform duration-200"
              >
                SACAR AGORA
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </footer>
    </div>
  );
};

export default PaymentVideoPage;

