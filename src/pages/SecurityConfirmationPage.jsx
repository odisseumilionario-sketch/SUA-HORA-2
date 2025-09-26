import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, CheckCircle, AlertTriangle } from 'lucide-react';

const SecurityConfirmationPage = () => {
  const navigate = useNavigate();
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    const storedBalance = parseInt(localStorage.getItem('totalBalance') || '0');
    setTotalBalance(storedBalance);
  }, []);

  const handleActivate = () => {
    navigate('/final');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <motion.div 
        className="max-w-sm mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden slide-up"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-400 to-red-500 p-6 text-center">
          <Shield className="w-12 h-12 text-white mx-auto mb-2" />
          <h1 className="text-xl font-bold text-white">
            🔒 Confirmação de Segurança Necessária
          </h1>
        </div>

        <div className="p-6">
          {/* Amount */}
          <div className="text-center mb-6">
            <p className="text-gray-600 mb-2">Antes de liberar o seu saque de</p>
            <div className="flex items-center justify-center mb-4">
              <span className="text-2xl mr-2">💰</span>
              <span className="text-3xl font-bold text-green-600">
                {totalBalance.toLocaleString()} Kz
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              precisamos confirmar que você é uma pessoa real e não um robô.
            </p>
          </div>

          {/* Security Info */}
          <motion.div 
            className="bg-gray-50 rounded-2xl p-4 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-start mb-3">
              <Shield className="w-5 h-5 text-gray-600 mr-2 mt-0.5" />
              <p className="text-sm text-gray-700">
                Para isso, o sistema exige um cadastro de segurança (IBAN ou Número Express) com uma pequena taxa anti-fraude.
              </p>
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div 
            className="security-check rounded-2xl p-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="font-semibold text-gray-800 mb-3">
              ✅ Essa verificação existe para proteger o seu dinheiro contra:
            </p>
            <div className="space-y-2">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-sm text-gray-700">
                  Robôs automáticos que estavam explorando o sistema
                </span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-sm text-gray-700">
                  Cadastros falsos que tentavam sacar valores indevidos
                </span>
              </div>
            </div>
          </motion.div>

          {/* Important Notice */}
          <motion.div 
            className="warning-box rounded-2xl p-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-start mb-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
              <span className="font-semibold text-gray-800">Importante:</span>
            </div>
            <div className="space-y-1 ml-7">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-sm text-gray-700">Essa taxa NÃO é um custo.</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-sm text-gray-700">
                  Você recebe ela de volta junto com o valor do seu saque.
                </span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-sm text-gray-700">
                  Ou seja: o que é seu, volta garantido.
                </span>
              </div>
            </div>
          </motion.div>

          {/* Next Step */}
          <motion.div 
            className="text-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p className="font-semibold text-gray-800 mb-2">👇 Próximo passo</p>
            <p className="text-sm text-gray-600">
              Clique no botão abaixo, ative o seu cadastro e libere agora mesmo o seu saque.
            </p>
          </motion.div>

          {/* Activate Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={handleActivate}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-lg button-hover pulse-animation"
            >
              Ativar Cadastro e Liberar Saque
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SecurityConfirmationPage;