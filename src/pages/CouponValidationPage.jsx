import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Gift } from 'lucide-react';
import { trackingManager } from '@/lib/tracking';

const CouponValidationPage = () => {
  const { step } = useParams();
  const currentStep = parseInt(step);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [inputCode, setInputCode] = useState('');
  const [userName, setUserName] = useState('');
  const [totalBalance, setTotalBalance] = useState(0);
  const [showReward, setShowReward] = useState(false);
  const [rewardValue, setRewardValue] = useState(0);

  const coupons = [
    {
      id: 1,
      brand: 'Nike',
      product: 'Nike Air Force (Black)',
      code: '96714954',
      value: 10500,
      image: 'https://horizons-cdn.hostinger.com/3750fcf7-2e15-49f4-9407-69873196af8a/b5449f3a92f476905318a21c0a5f4aea.webp'
    },
    {
      id: 2,
      brand: 'Nike',
      product: 'Nike Air Force (Rosa)',
      code: '87526465',
      value: 12000,
      image: 'https://horizons-cdn.hostinger.com/3750fcf7-2e15-49f4-9407-69873196af8a/a621a24909417901e1ba3b787e8d259b.webp'
    },
    {
      id: 3,
      brand: 'JBL',
      product: 'JBL Caixa de Som',
      code: '94141786',
      value: 21000,
      image: 'https://horizons-cdn.hostinger.com/3750fcf7-2e15-49f4-9407-69873196af8a/8ff68eb842adee5d416e83d7388a0bd5.webp'
    },
    {
      id: 4,
      brand: 'Riachuelo',
      product: 'Sapato de Salto',
      code: '66777793',
      value: 15000,
      image: 'https://horizons-cdn.hostinger.com/3750fcf7-2e15-49f4-9407-69873196af8a/28363d3c2fc37fedb1911e0039deb7c0.webp'
    },
    {
      id: 5,
      brand: 'Samsung',
      product: 'Samsung Galaxy',
      code: '67661371',
      value: 25000,
      image: 'https://horizons-cdn.hostinger.com/3750fcf7-2e15-49f4-9407-69873196af8a/113a782acf4fea572b03eeee82fa74aa.webp'
    },
    {
      id: 6,
      brand: 'Samsung',
      product: 'Samsung Galaxy (Light Blue)',
      code: '81795889',
      value: 18000,
      image: 'https://horizons-cdn.hostinger.com/3750fcf7-2e15-49f4-9407-69873196af8a/8ec60d140da3cadb6ac0b9181ea8e59c.webp'
    }
  ];

  const currentCoupon = coupons[currentStep - 1];

  useEffect(() => {
    const storedName = localStorage.getItem('userName') || 'Usuário';
    const storedBalance = parseInt(localStorage.getItem('totalBalance') || '0');
    setUserName(storedName);
    setTotalBalance(storedBalance);
  }, [currentStep]);

  const handleValidate = () => {
    if (!inputCode.trim()) {
      toast({
        title: "Código obrigatório",
        description: "Por favor, digite o código do cupom.",
        variant: "destructive",
      });
      return;
    }

    if (inputCode.trim() !== currentCoupon.code) {
      toast({
        title: "Código incorreto",
        description: "O código digitado não confere com o da imagem.",
        variant: "destructive",
      });
      return;
    }

    const newBalance = totalBalance + currentCoupon.value;
    localStorage.setItem('totalBalance', newBalance.toString());
    setRewardValue(currentCoupon.value);
    setShowReward(true);

    // Track successful coupon validation
    trackingManager.trackUserAction('coupon_validated', {
      page: 'coupon_validation',
      action: 'successful_validation',
      step: currentStep,
      coupon_id: currentCoupon.id,
      coupon_brand: currentCoupon.brand,
      coupon_product: currentCoupon.product,
      reward_value: currentCoupon.value,
      total_balance: newBalance
    });

    // Track conversion for coupon validation
    trackingManager.trackConversion('coupon_validation', currentCoupon.value);
  };

  const handleContinue = () => {
    setShowReward(false);
    const nextStep = currentStep + 1;
    if (nextStep <= coupons.length) {
      navigate(`/validacao/${nextStep}`);
      setInputCode('');
    } else {
      navigate('/limite-atingido');
    }
  };

  const renderProgressDots = () => {
    return (
      <div className="progress-dots">
        {[1, 2, 3, 4, 5, 6].map((dot) => (
          <div
            key={dot}
            className={`progress-dot ${
              dot < currentStep ? 'completed' : 
              dot === currentStep ? 'active' : ''
            }`}
          />
        ))}
      </div>
    );
  };

  if (!currentCoupon) {
    navigate('/limite-atingido');
    return null;
  }

  return (
    <>
      <div className="min-h-screen bg-white">
        <motion.div 
          className="flex justify-between items-center p-4 bg-white"
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
            <p className="text-sm text-gray-600">Olá, {userName.split(' ')[0]}</p>
            <p className="text-lg font-bold text-yellow-600">{(totalBalance).toLocaleString()} Kz</p>
          </div>
        </motion.div>

        <motion.div 
          className="px-4 pb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-green-600 mb-2">
              NOVO CUPOM ENCONTRADO!
            </h2>
            {renderProgressDots()}
            <p className="text-gray-600">Cupom {currentStep} de 6</p>
          </div>

          <motion.div 
            className="coupon-card mb-6 fade-in"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative">
              <img 
                src={currentCoupon.image} 
                alt={currentCoupon.product}
                className="w-full h-64 object-contain"
              />
            </div>
          </motion.div>

          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p className="text-center text-blue-600 mb-4 flex items-center justify-center">
              <span className="mr-2">⬇️</span>
              Digite o código da imagem acima
              <span className="ml-2">⬇️</span>
            </p>
            
            <input
              type="number"
              inputMode="numeric"
              placeholder="Digite os 8"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value.replace(/\D/g, '').slice(0, 8))}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-2xl text-lg text-center font-bold focus:border-yellow-400 focus:outline-none input-focus"
              maxLength={8}
            />
          </motion.div>

          <motion.div 
            className="text-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="flex items-center justify-center mb-2">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-2">
                <span className="text-white text-xs">🎯</span>
              </div>
              <span className="font-semibold">{currentCoupon.product}</span>
            </div>
            <p className="text-xl font-bold text-yellow-600">
              Valor a ganhar: {currentCoupon.value.toLocaleString()} Kz
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={handleValidate}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-lg button-hover"
            >
              Validar Cupão
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <AlertDialog open={showReward} onOpenChange={setShowReward}>
        <AlertDialogContent className="bg-white text-center p-8 rounded-2xl max-w-sm mx-auto">
          <AlertDialogHeader>
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Gift className="w-12 h-12 text-green-600" />
            </div>
            <AlertDialogTitle className="text-2xl font-bold text-gray-900 mb-4">
              Nova Recompensa Desbloqueada!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 mb-6">
              Você ganhou
            </AlertDialogDescription>
            <div className="text-4xl font-bold text-green-600 mb-8">
              Kz {rewardValue.toLocaleString()}
            </div>
             <p className="text-gray-600 mb-8">
              Continue a avaliar para ganhar ainda mais!
            </p>
          </AlertDialogHeader>
          <AlertDialogFooter className="w-full">
            <AlertDialogAction 
              onClick={handleContinue} 
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-lg"
            >
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CouponValidationPage;