import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { trackingManager } from '@/lib/tracking';

const FinalPage = () => {
  const [totalBalance, setTotalBalance] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedBalance = parseInt(localStorage.getItem('totalBalance') || '0');
    // Ensure the displayed balance does not exceed 200,000
    setTotalBalance(Math.min(storedBalance, 200000));

    const timer = setTimeout(() => {
      setShowButton(true);
    }, 165000); // 165 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleWithdrawNow = () => {
    // Track final withdrawal action - ultimate conversion
    trackingManager.trackUserAction('final_withdrawal', {
      page: 'final',
      action: 'withdraw_now',
      total_balance: totalBalance
    });

    // Track ultimate conversion event
    trackingManager.trackConversion('final_withdrawal_click', totalBalance);
    
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
          className="w-full max-w-2xl aspect-video rounded-2xl overflow-hidden shadow-2xl mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <iframe 
            id="panda-d0a6e9ae-ed5d-41a3-9e53-12e145f30442" 
            src="https://player-vz-0a641d40-de1.tv.pandavideo.com.br/embed/?v=d0a6e9ae-ed5d-41a3-9e53-12e145f30442" 
            style={{border: 'none', width: '100%', height: '100%'}} 
            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture" 
            allowFullScreen={true}
            fetchpriority="high"
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
          © {new Date().getFullYear()} Todos os direitos reservados - Cupom da Vez
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

export default FinalPage;