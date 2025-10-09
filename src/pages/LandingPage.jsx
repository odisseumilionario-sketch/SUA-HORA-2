import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, CheckCircle, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackingManager } from '@/lib/tracking';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    // Track user starting the process
    trackingManager.trackUserAction('start_process', {
      page: 'landing',
      action: 'click_start_button'
    });
    navigate('/identificacao');
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

      {/* Welcome Section */}
      <motion.div 
        className="flex-1 px-6 flex flex-col justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Bem-vindo!</h2>
          <p className="text-lg text-gray-600 mb-2">Que tal fazermos uma renda extra juntos?</p>
          <p className="text-base text-gray-500 font-medium">Chega mais!</p>
        </div>

        {/* Main CTA */}
        <motion.div 
          className="mb-8"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={handleStart}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-6 rounded-2xl text-lg shadow-lg button-hover flex items-center justify-between"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">1</span>
              </div>
              <span>Começar Agora</span>
            </div>
            <span className="text-xl">→</span>
          </Button>
        </motion.div>

        <p className="text-center text-gray-500 text-sm mb-8">
          É simples, rápido e sem complicações.
        </p>

        {/* Step 2 Preview */}
        <motion.div 
          className="bg-gray-50 rounded-2xl p-4 mb-8 opacity-60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                <span className="text-gray-600 font-bold text-sm">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Realize seu saque</h3>
                <p className="text-sm text-gray-500">Aumente seu saldo para realizar seu primeiro saque.</p>
              </div>
            </div>
            <span className="text-gray-400">→</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Security Section */}
      <motion.div 
        className="px-6 pb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="flex justify-center mb-4 space-x-4 security-icons">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Shield className="w-6 h-6 text-green-600" />
          </div>
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-red-600" />
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
        </div>

        <div className="text-center">
          <h3 className="font-bold text-gray-900 mb-2">
            Suas informações estão 100% protegidas!
          </h3>
          <p className="text-sm text-gray-600 mb-1">
            Este site é seguro e possui Certificado SSL.
          </p>
          <p className="text-sm text-gray-600">
            Sua privacidade é totalmente garantida por nossa política de segurança.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;