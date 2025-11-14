import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const LimitReachedPage = () => {
  const navigate = useNavigate();
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    const storedBalance = parseInt(localStorage.getItem('totalBalance') || '0');
    setTotalBalance(storedBalance);
  }, []);

  const handleWithdraw = () => {
    navigate('/metodo-saque');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <motion.div 
        className="text-center py-8 px-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center mb-6">
          <h1 className="text-3xl font-black text-black">cupom</h1>
          <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center ml-1">
            <span className="text-black font-bold text-sm">$</span>
          </div>
          <div className="ml-2">
            <span className="text-sm font-medium text-gray-600 block leading-tight">DA VEZ</span>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        className="flex-1 px-6 flex flex-col justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Limite Diário Atingido!
          </h2>
          <p className="text-gray-600 mb-6">
            Você atingiu o limite de cupões diários.
          </p>
          
          {/* Balance Display */}
          <motion.div 
            className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-gray-600 mb-2">Saldo Total Acumulado:</p>
            <p className="text-4xl font-bold text-green-600 glow-effect">
              {totalBalance.toLocaleString()} Kz
            </p>
          </motion.div>

          <div className="flex items-center justify-center mb-8">
            <span className="mr-2">⬇️</span>
            <p className="text-blue-600 font-medium">
              Realize o seu saque abaixo
            </p>
            <span className="ml-2">⬇️</span>
          </div>
        </div>

        {/* Withdraw Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={handleWithdraw}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-6 rounded-2xl text-lg shadow-lg button-hover pulse-animation"
          >
            REALIZAR SAQUE
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LimitReachedPage;