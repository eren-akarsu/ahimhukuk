import React, { useState } from 'react';
import { Mail, Calculator, CheckCircle2, Info } from 'lucide-react';
import { useToast } from '../ui/Toast';
import { addDurationHMK, formatDateVerboseTR, formatDateTR } from '../../utils/dateUtils';
import type { HMKUnit } from '../../utils/dateUtils';
import { useApp } from '../../context/AppContext';
import { CustomNumberInput } from '../ui/CustomNumberInput';
import { CustomDateInput } from '../ui/CustomDateInput';
import { Modal } from '../ui/Modal';

export const TebligatSuresi: React.FC = () => {
  const [tebligDate, setTebligDate] = useState<string>('');
  const [amount, setAmount] = useState<string>('2');
  const [unit, setUnit] = useState<HMKUnit>('weeks');

  const [result, setResult] = useState<{
    lastDateFormatted: string;
    beforeExtensionFormatted: string;
    isExtended: boolean;
    reasons: string[];
    amountUsed: number;
    unitName: string;
  } | null>(null);

  const { addToast } = useToast();
  const { theme } = useApp();

  const getUnitName = (u: HMKUnit, amt: number) => {
    switch (u) {
      case 'days': return `${amt} Gün`;
      case 'weeks': return `${amt} Hafta`;
      case 'months': return `${amt} Ay`;
      case 'years': return `${amt} Yıl`;
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!tebligDate) {
      addToast('Lütfen tebliğ tarihini giriniz.', 'error');
      return;
    }

    const start = new Date(tebligDate);
    const amt = parseInt(amount, 10);

    if (isNaN(start.getTime())) {
      addToast('Geçersiz tebliğ tarihi girdiniz.', 'error');
      return;
    }

    if (isNaN(amt) || amt <= 0) {
      addToast('Lütfen geçerli bir süre miktarı giriniz.', 'error');
      return;
    }

    // HMK Süre Hesabı + Tatil Uzaması (HMK m.90-95)
    const hmkRes = addDurationHMK(start, amt, unit);

    setResult({
      lastDateFormatted: formatDateVerboseTR(hmkRes.adjustedDate),
      beforeExtensionFormatted: formatDateTR(hmkRes.targetDateBeforeExtension),
      isExtended: hmkRes.isExtended,
      reasons: hmkRes.reasons,
      amountUsed: amt,
      unitName: getUnitName(unit, amt),
    });

    addToast('Tebligat süresi başarıyla hesaplandı.', 'success');
  };

  return (
    <div className={`p-6 rounded-2xl transition-all duration-300 h-full flex flex-col ${
      theme === 'dark' ? 'glass-panel border-white/10' : 'bg-white/90 border border-gray-200 shadow-xl'
    }`}>
      {/* Tool Header */}
      <div className="flex items-center space-x-3 mb-5 border-b border-gold/20 pb-4">
        <div className="p-2.5 rounded-xl bg-gold/10 text-gold border border-gold/30">
          <Mail size={22} />
        </div>
        <div>
          <h3 className="text-lg font-bold font-serif text-gold">
            Tebligat Süre Hesaplama
          </h3>
          <p className="text-xs text-gray-700 dark:text-gray-400">
            Tebliğ tarihinden itibaren HMK m.90-95 genel süre hesaplama kuralları ve HMK m.93 resmi tatil uzaması ilkesiyle son günü hesaplar.
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleCalculate} className="space-y-4 flex-grow flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CustomDateInput
            label="Tebliğ Tarihi *"
            value={tebligDate}
            onChange={setTebligDate}
          />

          <div>
            <CustomNumberInput
              label="Süre Miktarı *"
              value={amount}
              onChange={(val) => setAmount(val.toString())}
              min={1}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Süre Birimi
            </label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as HMKUnit)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/50 dark:bg-darker-bg/80 border border-gray-300 dark:border-gold/30 text-gray-800 dark:text-white text-sm focus:outline-none focus:border-gold transition-colors"
            >
              <option value="days">Gün</option>
              <option value="weeks">Hafta (7 Günlük Dilimler)</option>
              <option value="months">Ay</option>
              <option value="years">Yıl</option>
            </select>
          </div>
        </div>

        {/* Hukuki Bilgi Kutusu */}
        <div className="flex-grow p-4 mt-4 rounded-xl bg-white/50 dark:bg-darker-bg/40 border border-gray-200 dark:border-gold/10 text-gray-700 dark:text-gray-300 text-sm overflow-y-auto">
          <p className="font-semibold text-gold mb-2">💡 Sürelerin Hesaplanması Hakkında</p>
          <p className="mb-2"><strong>6100 sayılı HMK madde 90 - 95</strong> uyarınca, süreler gün, hafta, ay veya yıl olarak belirlenmiş olabilir.</p>
          <ul className="list-disc pl-5 space-y-1 mb-2">
            <li><strong>Gün ile belirlenen sürelerde</strong> tebliğ veya tefhim edildiği gün hesaba katılmaz. Süre, ertesi günden işlemeye başlar.</li>
            <li><strong>Hafta, ay veya yıl</strong> olarak belirlenmiş süreler ise, başladığı güne son hafta, ay veya yıl içindeki karşılık gelen günde biter.</li>
          </ul>
          <p>HMK m.93 gereğince, resmi tatil günleri süreye dâhildir. Ancak <strong>sürenin son günü resmî tatile rastlarsa</strong>, süre tatili takip eden ilk iş günü mesai bitiminde sona erer.</p>
        </div>

        <button
          type="submit"
          className="w-full mt-auto py-3 px-4 rounded-xl bg-gradient-to-r from-gold to-gold-dark text-[#07222c] font-bold text-sm hover:brightness-110 transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center space-x-2"
        >
          <Calculator size={18} />
          <span>Tebligat Son Gününü Hesapla</span>
        </button>
      </form>

      {/* Result Modal */}
      <Modal
        isOpen={!!result}
        onClose={() => setResult(null)}
        title="Tebligat Süresi Hesaplama Sonucu"
      >
        <div className="space-y-4">
          <div className={`flex items-center space-x-2 font-bold border-b pb-2 ${theme === 'dark' ? 'text-emerald-400 border-emerald-500/20' : 'text-emerald-600 border-emerald-500/20'}`}>
            <CheckCircle2 size={20} />
            <span>Tebligat İşlem Son Günü</span>
          </div>

          <div className="text-sm space-y-4 mt-4">
            <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-darker-bg/60 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <span className={`block text-xs mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Uygulanan Süre:</span>
              <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{result?.unitName}</span>
            </div>

            <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-gold/10 border-gold/40' : 'bg-gold/5 border-gold/30'}`}>
              <span className={`block text-xs mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Son İşlem / İtiraz / Cevap Günü:</span>
              <span className="text-2xl font-bold text-gold">{result?.lastDateFormatted}</span>
            </div>

            {result?.isExtended && (
              <div className={`p-4 rounded-xl border text-xs flex items-start space-x-3 mt-4 ${theme === 'dark' ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
                <Info size={18} className="mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold text-sm">HMK m.93 Tatil Uzaması:</span>
                  <p className="mt-1 leading-relaxed">
                    Sürenin son günü ({result.beforeExtensionFormatted}) resmi tatile veya hafta sonuna denk geldiğinden ({result.reasons.join(', ')}), son işlem günü takip eden ilk iş gününe uzatılmıştır.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className={`pt-3 text-[11px] border-t mt-4 ${theme === 'dark' ? 'text-gray-400 border-gray-700' : 'text-gray-500 border-gray-200'}`}>
            * Dayanak: 6100 sayılı Hukuk Muhakemeleri Kanunu Madde 90, 91, 92, 93, 94, 95.
          </div>
        </div>
      </Modal>
    </div>
  );
};
