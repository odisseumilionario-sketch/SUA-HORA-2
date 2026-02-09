import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { trackingManager } from '@/lib/tracking';

const IdentificationPage = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleContinue = () => {
    if (!name.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, digite seu nome para continuar.",
        variant: "destructive",
      });
      return;
    }

    // Track user providing name
    trackingManager.trackUserAction('provide_name', {
      page: 'identification',
      action: 'submit_name',
      name_length: name.trim().length
    });

    localStorage.setItem('userName', name.trim());
    navigate('/validacao/1');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
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

      <motion.div 
        className="flex-1 px-6 flex flex-col justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Olá! Como você se chama?
          </h2>
          <p className="text-gray-600">
            Vamos personalizar sua experiência
          </p>
        </div>

        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <input
            type="text"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl text-lg focus:border-yellow-400 focus:outline-none input-focus"
            maxLength={50}
          />
        </motion.div>

        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={handleContinue}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-6 rounded-2xl text-lg shadow-lg button-hover"
          >
            Continuar
          </Button>
        </motion.div>

        <motion.p 
          className="text-center text-sm text-gray-500 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          Ao continuar, você concorda com nossos termos de uso
        </motion.p>
      </motion.div>
    </div>
  );
};

export default IdentificationPage;