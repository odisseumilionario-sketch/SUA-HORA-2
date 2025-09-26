import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Gift } from 'lucide-react';

const RewardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { couponValue = 0, nextStep = 1 } = location.state || {};

  const handleContinue = () => {
    if (nextStep <= 6) {
      navigate(`/validacao/${nextStep}`);
    } else {
      navigate('/limite-atingido');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <motion.div 
        className="text-center max-w-sm mx-auto"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 bounce-in"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Gift className="w-12 h-12 text-green-600" />
        </motion.div>

        <motion.h1 
          className="text-2xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Nova Recompensa Desbloqueada!
        </motion.h1>

        <motion.p 
          className="text-gray-600 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Você ganhou
        </motion.p>

        <motion.div 
          className="text-4xl font-bold text-green-600 mb-8 glow-effect"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Kz {couponValue.toLocaleString()}
        </motion.div>

        <motion.p 
          className="text-gray-600 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          Continue a avaliar para ganhar ainda mais!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={handleContinue}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-lg button-hover"
          >
            Continuar
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RewardPage;