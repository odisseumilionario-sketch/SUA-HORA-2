import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const LimitReachedPage = () => {
  const navigate = useNavigate();
  const [totalBalance, setTotalBalance] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  const REQUIRED_CLICKS = 4;
  const FRIENDS_PER_CLICK = 5;
  const GROUPS_TARGET = 4;

  const progressPercent = useMemo(() => {
    if (shareCount >= REQUIRED_CLICKS) {
      return 100;
    }
    return Math.min(Math.round((shareCount / REQUIRED_CLICKS) * 100), 100);
  }, [shareCount]);

  const progressMessage = useMemo(() => {
    if (shareCount === 0) {
      return 'Você ainda não compartilhou. Faça 4 partilhas (cada clique pode atingir até 5 amigos ou 1 grupo inteiro).';
    }

    if (shareCount < REQUIRED_CLICKS) {
      const remainingClicks = REQUIRED_CLICKS - shareCount;
      const friendsCovered = shareCount * FRIENDS_PER_CLICK;
      const groupsCovered = shareCount;
      const remainingFriends = Math.max(FRIENDS_PER_CLICK * REQUIRED_CLICKS - friendsCovered, 0);
      const remainingGroups = Math.max(GROUPS_TARGET - groupsCovered, 0);

      return `Excelente! Você já compartilhou ${friendsCovered} amigos / ${groupsCovered} grupos. Faltam ${remainingClicks} ${remainingClicks === 1 ? 'clique' : 'cliques'} para completar os ${GROUPS_TARGET} grupos ou ${FRIENDS_PER_CLICK * REQUIRED_CLICKS} amigos.`;
    }

    return 'Excelente! Você já compartilhou o suficiente e atingiu 100% do progresso.';
  }, [shareCount]);

  useEffect(() => {
    const storedBalance = parseInt(localStorage.getItem('totalBalance') || '0', 10);
    setTotalBalance(Number.isNaN(storedBalance) ? 0 : storedBalance);
  }, []);

  const shareMessage = useMemo(
    () =>
      'É real! Acabei de clicar e ganhei um bônus em dinheiro! É super fácil e recomendo muito que você experimente! Não perca! https://milionariorapido.onrender.com',
    []
  );

  const handleShare = useCallback(
    (platform) => {
      const encodedMessage = encodeURIComponent(shareMessage);

      if (platform === 'whatsapp') {
        window.open(`https://api.whatsapp.com/send?text=${encodedMessage}`, '_blank', 'noopener');
      }

      if (platform === 'messenger') {
        const baseLink = 'https://milionariorapido.onrender.com';
        const messengerUrl = `fb-messenger://share/?link=${encodeURIComponent(baseLink)}&app_id=123456789&text=${encodedMessage}`;
        const fallbackUrl = `https://www.facebook.com/dialog/send?app_id=123456789&link=${encodeURIComponent(baseLink)}&redirect_uri=${encodeURIComponent(baseLink)}&quote=${encodedMessage}`;

        const newWindow = window.open(messengerUrl, '_blank', 'noopener');
        if (!newWindow) {
          window.open(fallbackUrl, '_blank', 'noopener');
        }
      }

      setShareCount((prev) => Math.min(prev + 1, REQUIRED_CLICKS));
    },
    [shareMessage]
  );

  const handleContinue = useCallback(() => {
    if (shareCount >= REQUIRED_CLICKS) {
      navigate('/metodo-saque');
    }
  }, [navigate, shareCount]);

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
        <motion.div
          className="max-w-md mx-auto border border-gray-100 rounded-3xl p-8 shadow-xl bg-white/95 backdrop-blur-sm flex flex-col gap-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold text-gray-900">Limite Diário Atingido!</h2>
            <p className="text-gray-600">Você atingiu o limite de cupões diários.</p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-5 shadow-inner">
            <p className="text-sm font-medium text-gray-500">Saldo Total Acumulado</p>
            <p className="text-3xl font-bold text-green-600 mt-1">
              {Math.max(totalBalance, 0)
                .toLocaleString('pt-BR', { style: 'currency', currency: 'AOA' })
                .replace('AOA', 'Kz')}
            </p>
          </div>

          <p className="text-gray-700 font-medium text-center">
            🚀 Espalhe a sorte! Compartilhe com 4 grupos ou 20 amigos e depois clique em “Continuar” para **garantir sua recompensa agora!
          </p>

          <div className="space-y-3">
            <Button
              onClick={() => handleShare('whatsapp')}
              className="w-full bg-[#25D366] hover:bg-[#1da955] text-white font-bold py-3 px-4 rounded-2xl text-base shadow-md"
            >
              Partilhar via WhatsApp
            </Button>
            <Button
              onClick={() => handleShare('messenger')}
              className="w-full text-white font-bold py-3 px-4 rounded-2xl text-base shadow-md"
              style={{ background: 'linear-gradient(45deg, #0084ff, #c21aff)' }}
            >
              Partilhar via Messenger
            </Button>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 text-center shadow-sm">
            <p className="text-sm font-semibold text-yellow-800 leading-relaxed">
              {progressMessage}
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-full h-3.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-sm text-gray-500 text-center">
              {progressPercent}% concluído • {shareCount}/{REQUIRED_CLICKS} partilhas registradas
            </p>
          </div>

          <Button
            onClick={handleContinue}
            disabled={shareCount < REQUIRED_CLICKS}
            className={`w-full font-bold py-3 px-4 rounded-2xl text-base shadow-lg transition-all duration-300 ${
              shareCount >= REQUIRED_CLICKS
                ? 'bg-yellow-400 hover:bg-yellow-500 text-black'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continuar
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LimitReachedPage;