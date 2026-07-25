import React, { useState } from 'react';
import { Home, Calculator, CheckCircle2, Info } from 'lucide-react';
import { useToast } from '../ui/Toast';
import { formatCurrencyTR } from '../../utils/dateUtils';
import { useApp } from '../../context/AppContext';
import { CustomNumberInput } from '../ui/CustomNumberInput';
import { Modal } from '../ui/Modal';

export const KiraArtisHesaplama: React.FC = () => {
  const [currentRent, setCurrentRent] = useState<string>('');
  const [tufeRate, setTufeRate] = useState<string>('65.07'); // Örnek/Varsayılan TÜFE 12 aylık ortalaması
  const [result, setResult] = useState<{
    currentRentAmount: number;
    increaseAmount: number;
    newRentAmount: number;
    rateUsed: number;
  } | null>(null);

  const { addToast } = useToast();
  const { theme } = useApp();

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    const rentVal = parseFloat(currentRent);
    const rateVal = parseFloat(tufeRate);

    if (isNaN(rentVal) || rentVal <= 0) {
      addToast('Lütfen geçerli bir mevcut kira tutarı giriniz.', 'error');
      return;
    }

    if (isNaN(rateVal) || rateVal < 0) {
      addToast('Lütfen geçerli bir TÜFE oranı giriniz.', 'error');
      return;
    }

    const increaseAmount = rentVal * (rateVal / 100);
    const newRentAmount = rentVal + increaseAmount;

    setResult({
      currentRentAmount: rentVal,
      increaseAmount,
      newRentAmount,
      rateUsed: rateVal,
    });

    addToast('Kira artış oranı başarıyla hesaplandı.', 'success');
  };

  return (
    <div className={`p-6 rounded-2xl transition-all duration-300 h-full flex flex-col ${
      theme === 'dark' ? 'glass-panel border-white/10' : 'bg-white/90 border border-gray-200 shadow-xl'
    }`}>
      {/* Tool Header */}
      <div className="flex items-center space-x-3 mb-5 border-b border-gold/20 pb-4">
        <div className="p-2.5 rounded-xl bg-gold/10 text-gold border border-gold/30">
          <Home size={22} />
        </div>
        <div>
          <h3 className="text-lg font-bold font-serif text-gold">
            Kira Artış Oranı Hesaplama
          </h3>
          <p className="text-xs text-gray-700 dark:text-gray-400">
            Türk Borçlar Kanunu m.344 uyarınca TÜFE 12 aylık ortalamasına göre yasal üst sınırı hesaplar.
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleCalculate} className="space-y-4 flex-grow flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <CustomNumberInput
              label="Mevcut Kira Bedeli (TL) *"
              value={currentRent}
              onChange={(val) => setCurrentRent(val.toString())}
              placeholder="Örn: 20000"
              step={100}
            />
          </div>

          <div>
            <CustomNumberInput
              label="TÜFE (12 Aylık Ortalama %) *"
              value={tufeRate}
              onChange={(val) => setTufeRate(val.toString())}
              placeholder="Örn: 65.07"
              step={0.1}
            />
          </div>
        </div>

        {/* Hukuki Bilgi Kutusu */}
        <div className="flex-grow p-4 mt-4 rounded-xl bg-white/50 dark:bg-darker-bg/40 border border-gray-200 dark:border-gold/10 text-gray-700 dark:text-gray-300 text-sm overflow-y-auto">
          <p className="font-semibold text-gold mb-2">💡 Kira Artış Oranı Hakkında</p>
          <p className="mb-2">6098 sayılı Türk Borçlar Kanunu madde 344 uyarınca, tarafların yenilenen kira dönemlerinde uygulanacak kira bedeline ilişkin anlaşmaları, bir önceki kira yılında TÜİK tarafından belirlenen <strong>TÜFE 12 aylık ortalamalara göre değişim oranını</strong> geçmemek koşuluyla geçerlidir.</p>
          <p className="mb-2">5 yılı dolduran kira sözleşmelerinde, kira bedelinin emsallere ve TÜFE oranına göre yeniden belirlenmesi için "Kira Tespit Davası" açılabilir.</p>
          <p>İşyeri kiralarında da, 1 Temmuz 2020 tarihinden itibaren kira artış oranı yine TÜFE 12 aylık ortalaması baz alınarak hesaplanmaktadır.</p>
        </div>

        <button
          type="submit"
          className="w-full mt-auto py-3 px-4 rounded-xl bg-gradient-to-r from-gold to-gold-dark text-[#07222c] font-bold text-sm hover:brightness-110 transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center space-x-2"
        >
          <Calculator size={18} />
          <span>Yeni Kira Bedelini Hesapla</span>
        </button>
      </form>

      {/* Result Modal */}
      <Modal
        isOpen={!!result}
        onClose={() => setResult(null)}
        title="Kira Artış Hesaplama Sonucu"
      >
        <div className="space-y-4">
          <div className={`flex items-center space-x-2 font-bold border-b pb-2 ${theme === 'dark' ? 'text-emerald-400 border-emerald-500/20' : 'text-emerald-600 border-emerald-500/20'}`}>
            <CheckCircle2 size={20} />
            <span>Hesaplanan Yeni Kira Bedeli</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mt-4">
            <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-darker-bg/60 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <span className={`block text-xs mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Mevcut Kira:</span>
              <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{result?.currentRentAmount && formatCurrencyTR(result.currentRentAmount)}</span>
            </div>

            <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-darker-bg/60 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <span className={`block text-xs mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Artış Tutarı (%{result?.rateUsed}):</span>
              <span className={`font-semibold ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>+{result?.increaseAmount && formatCurrencyTR(result.increaseAmount)}</span>
            </div>
          </div>

          <div className={`p-4 rounded-xl border flex items-center justify-between ${theme === 'dark' ? 'bg-gold/10 border-gold/40' : 'bg-gold/5 border-gold/30'}`}>
            <span className={`text-sm font-semibold ${theme === 'dark' ? 'text-gold' : 'text-gold-dark'}`}>Yeni Kira Bedeli:</span>
            <span className="text-2xl font-bold text-gold">{result?.newRentAmount && formatCurrencyTR(result.newRentAmount)}</span>
          </div>

          <div className={`p-3 rounded-lg text-xs flex items-start space-x-3 mt-4 border ${theme === 'dark' ? 'bg-emerald-900/20 border-emerald-500/30 text-gray-300' : 'bg-emerald-50 border-emerald-200 text-gray-700'}`}>
            <Info size={18} className={`mt-0.5 flex-shrink-0 ${theme === 'dark' ? 'text-gold' : 'text-emerald-600'}`} />
            <span className="leading-relaxed">
              TBK m.344 uyarınca konut kiralarında yenilenen kira dönemlerinde uygulanacak artış oranı, bir önceki kira yılında TÜİK tarafından açıklanan 12 aylık ortalamalara göre TÜFE değişim oranını geçemez.
            </span>
          </div>

          <div className={`pt-3 text-[11px] border-t mt-4 ${theme === 'dark' ? 'text-gray-400 border-gray-700' : 'text-gray-500 border-gray-200'}`}>
            * Dayanak: 6098 sayılı Türk Borçlar Kanunu Madde 344.
          </div>
        </div>
      </Modal>
    </div>
  );
};
