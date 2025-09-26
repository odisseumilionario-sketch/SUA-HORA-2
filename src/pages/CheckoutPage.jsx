import React, { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';

const KintuCheckout = memo(() => {
  return (
    <div className="rounded-xl overflow-hidden shadow-md" style={{ opacity: 1, transform: 'none' }}>
      <div style={{ position: 'relative', width: '100%', paddingTop: '375%' }}>
        <iframe
          src="https://www.kintu.org/product/c80fa956-66ac-4c24-914c-b169cdd42b66"
          title="Checkout"
          allowFullScreen
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
        >
        </iframe>
      </div>
    </div>
  );
});
KintuCheckout.displayName = 'KintuCheckout';

const CheckoutPage = () => {
  const [totalBalance, setTotalBalance] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes in seconds

  useEffect(() => {
    const storedBalance = parseInt(localStorage.getItem('totalBalance') || '0');
    setTotalBalance(Math.min(storedBalance, 200000));
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="w-full p-4 flex justify-center">
        <div className="flex items-center">
          <h1 className="text-4xl font-black text-black">cupom</h1>
          <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center ml-1">
            <span className="text-black font-bold text-sm">$</span>
          </div>
          <div className="ml-1">
            <span className="text-sm font-medium text-gray-600 block leading-tight">DA VEZ</span>
          </div>
        </div>
      </header>
      <main className="w-full max-w-md p-4 flex-grow flex flex-col mx-auto">
        <motion.div
          className="bg-red-600 text-white p-4 rounded-xl text-center mb-6 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-bold text-lg">TEMPO LIMITADO!</p>
          <p className="text-5xl font-bold tracking-wider my-2">{formatTime(timeLeft)}</p>
          <p className="text-sm">Complete seu checkout antes que o tempo acabe</p>
        </motion.div>
        <motion.div
          className="bg-green-100 border-2 border-green-300 p-6 rounded-xl text-center mb-6 shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-green-800">Seu Saque Aprovado!</h2>
          <p className="text-4xl font-bold text-green-700 my-4 flex items-center justify-center">
            <span className="text-4xl mr-2" role="img" aria-label="money bag">💰</span>
            {totalBalance.toLocaleString('pt-BR', { style: 'currency', currency: 'AOA' }).replace('AOA', 'Kz')}
          </p>
          <p className="text-green-700 font-medium text-sm">Valor será transferido após confirmação do pagamento</p>
        </motion.div>
        <KintuCheckout />
      </main>
    </div>
  );
};

export default CheckoutPage;