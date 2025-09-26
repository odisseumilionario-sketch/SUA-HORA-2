import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { CreditCard, Smartphone } from 'lucide-react';

const WithdrawalMethodPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedMethod, setSelectedMethod] = useState('multicaixa');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [ibanNumber, setIbanNumber] = useState('');
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    const storedBalance = parseInt(localStorage.getItem('totalBalance') || '0');
    setTotalBalance(storedBalance);
  }, []);

  const handleConfirm = () => {
    if (selectedMethod === 'multicaixa') {
      if (!phoneNumber.trim() || phoneNumber.length !== 9) {
        toast({
          title: "Número inválido",
          description: "Por favor, digite um número de telefone válido com 9 dígitos.",
          variant: "destructive",
        });
        return;
      }
    } else {
      if (!ibanNumber.trim() || ibanNumber.length !== 21) {
        toast({
          title: "IBAN inválido",
          description: "Por favor, digite um IBAN válido com 21 dígitos.",
          variant: "destructive",
        });
        return;
      }
    }

    // Save withdrawal method
    localStorage.setItem('withdrawalMethod', selectedMethod);
    localStorage.setItem('withdrawalAccount', selectedMethod === 'multicaixa' ? phoneNumber : ibanNumber);
    
    navigate('/confirmacao-seguranca');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <motion.div 
        className="max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden slide-up"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="bg-white p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Solicitar Saque</h1>
          <p className="text-gray-600">Sistema de Pagamento Seguro</p>
        </div>

        {/* Balance */}
        <motion.div 
          className="bg-green-50 p-4 mx-6 rounded-2xl mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-center text-gray-600 mb-1">Valor Disponível:</p>
          <p className="text-center text-3xl font-bold text-green-600">
            Kz {totalBalance.toLocaleString()}
          </p>
        </motion.div>

        {/* Method Selection */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Escolha o método de saque:
          </h3>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* IBAN Option */}
            <motion.div
              className={`border-2 rounded-2xl p-4 cursor-pointer transition-all ${
                selectedMethod === 'iban' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 bg-white'
              }`}
              onClick={() => setSelectedMethod('iban')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                <CreditCard className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                <p className="font-semibold text-gray-900">IBAN Bancário</p>
              </div>
            </motion.div>

            {/* Multicaixa Option */}
            <motion.div
              className={`border-2 rounded-2xl p-4 cursor-pointer transition-all ${
                selectedMethod === 'multicaixa' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 bg-white'
              }`}
              onClick={() => setSelectedMethod('multicaixa')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                <Smartphone className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                <p className="font-semibold text-gray-900">Multicaixa Express</p>
              </div>
            </motion.div>
          </div>

          {/* Input Field */}
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {selectedMethod === 'multicaixa' ? (
              <>
                <label className="block text-gray-700 font-semibold mb-2">
                  Número de Telefone (Express)
                </label>
                <input
                  type="tel"
                  placeholder="9XX XXX XXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 9))}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl text-lg focus:border-blue-500 focus:outline-none input-focus"
                  maxLength={9}
                />
              </>
            ) : (
              <>
                <label className="block text-gray-700 font-semibold mb-2">
                  Número IBAN (21 dígitos)
                </label>
                <input
                  type="text"
                  placeholder="Digite o IBAN completo"
                  value={ibanNumber}
                  onChange={(e) => setIbanNumber(e.target.value.replace(/\D/g, '').slice(0, 21))}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl text-lg focus:border-blue-500 focus:outline-none input-focus"
                  maxLength={21}
                />
              </>
            )}
          </motion.div>

          {/* Confirm Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={handleConfirm}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-lg button-hover"
            >
              💳 Confirmar e Sacar
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default WithdrawalMethodPage;