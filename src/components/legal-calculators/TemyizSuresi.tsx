import React, { useState } from 'react';
import { Landmark, Calculator, CheckCircle2, Info } from 'lucide-react';
import { useToast } from '../ui/Toast';
import { addDurationHMK, formatDateVerboseTR, formatDateTR } from '../../utils/dateUtils';
import { useApp } from '../../context/AppContext';
import { CustomDateInput } from '../ui/CustomDateInput';
import { Modal } from '../ui/Modal';

export const TemyizSuresi: React.FC = () => {
  const [tebligDate, setTebligDate] = useState<string>('');
  const [courtCategory, setCourtCategory] = useState<'hukuk' | 'ceza'>('hukuk');

  const [result, setResult] = useState<{
    lastDateFormatted: string;
    beforeExtensionFormatted: string;
    isExtended: boolean;
    reasons: string[];
    courtName: string;
    durationText: string;
  } | null>(null);

  const { addToast } = useToast();
  const { theme } = useApp();

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!tebligDate) {
      addToast('Lütfen ilamın / kararın tebliğ tarihini seçiniz.', 'error');
      return;
    }

    const start = new Date(tebligDate);
    if (isNaN(start.getTime())) {
      addToast('Geçersiz tarih girdiniz.', 'error');
      return;
    }

    const isHukuk = courtCategory === 'hukuk';
    const amount = isHukuk ? 2 : 15;
    const unit = isHukuk ? ('weeks' as const) : ('days' as const);

    const hmkRes = addDurationHMK(start, amount, unit);

    setResult({
      lastDateFormatted: formatDateVerboseTR(hmkRes.adjustedDate),
      beforeExtensionFormatted: formatDateTR(hmkRes.targetDateBeforeExtension),
      isExtended: hmkRes.isExtended,
      reasons: hmkRes.reasons,
      courtName: isHukuk ? 'BAM Hukuk Dairesi Kararı (HMK m.361)' : 'BAM Ceza Dairesi Kararı (CMK m.291)',
      durationText: isHukuk ? '2 Hafta (14 Gün)' : '15 Gün',
    });

    addToast('Temyiz son başvuru tarihi başarıyla hesaplandı.', 'success');
  };

  return (
    <div className={`p-6 rounded-2xl transition-all duration-300 h-full flex flex-col ${
      theme === 'dark' ? 'glass-panel border-white/10' : 'bg-white/90 border border-gray-200 shadow-xl'
    }`}>
      {/* Tool Header */}
      <div className="flex items-center space-x-3 mb-5 border-b border-gold/20 pb-4">
        <div className="p-2.5 rounded-xl bg-gold/10 text-gold border border-gold/30">
          <Landmark size={22} />
        </div>
        <div>
          <h3 className="text-lg font-bold font-serif text-gold">
            Temyiz Süresi Hesaplama
          </h3>
          <p className="text-xs text-gray-700 dark:text-gray-400">
            Bölge Adliye Mahkemesi (İstinaf) kararlarının tebliğ edildiği tarihten itibaren Yargıtay temyiz başvuru son gününü hesaplar.
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleCalculate} className="space-y-4 flex-grow flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              İlam Türü
            </label>
            <select
              value={courtCategory}
              onChange={(e) => setCourtCategory(e.target.value as 'hukuk' | 'ceza')}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/50 dark:bg-darker-bg/80 border border-gray-300 dark:border-gold/30 text-gray-800 dark:text-white text-sm focus:outline-none focus:border-gold transition-colors"
            >
              <option value="hukuk">Hukuk Davaları (2 Hafta - HMK m.361)</option>
              <option value="ceza">Ceza Davaları (15 Gün - CMK m.291)</option>
            </select>
          </div>

          <CustomDateInput
            label="BAM Kararı Tebliğ Tarihi *"
            value={tebligDate}
            onChange={setTebligDate}
          />
        </div>

        {/* Hukuki Bilgi Kutusu */}
        <div className="flex-grow p-4 mt-4 rounded-xl bg-white/50 dark:bg-darker-bg/40 border border-gray-200 dark:border-gold/10 text-gray-700 dark:text-gray-300 text-sm overflow-y-auto">
          <p className="font-semibold text-gold mb-2">💡 Temyiz Kanun Yolu Süreleri Hakkında</p>
          <p className="mb-2"><strong>Hukuk Davaları:</strong> HMK m.361 uyarınca, Bölge Adliye Mahkemesi (BAM) hukuk dairelerinden verilen temyizi kabil nihai kararlara karşı tebliğ tarihinden itibaren <strong>2 hafta</strong> içinde Yargıtay'a temyiz başvurusunda bulunulabilir.</p>
          <p className="mb-2"><strong>Ceza Davaları:</strong> CMK m.291 uyarınca, BAM ceza dairelerinin bozma dışında kalan ve temyizi kabil olan kararlarına karşı, hükmün tebliğinden itibaren <strong>15 gün</strong> içinde Yargıtay'a temyiz yoluna başvurulabilir (süre tutum dilekçesi dâhil).</p>
          <p>Temyiz süresinin son gününün resmi tatile (hafta sonu, bayram tatili vb.) denk gelmesi durumunda, süre tatili izleyen ilk iş günü mesai saati bitimine kadar uzar (HMK m.93).</p>
        </div>

        <button
          type="submit"
          className="w-full mt-auto py-3 px-4 rounded-xl bg-gradient-to-r from-gold to-gold-dark text-[#07222c] font-bold text-sm hover:brightness-110 transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center space-x-2"
        >
          <Calculator size={18} />
          <span>Temyiz Son Gününü Hesapla</span>
        </button>
      </form>

      {/* Result Modal */}
      <Modal
        isOpen={!!result}
        onClose={() => setResult(null)}
        title="Temyiz Süresi Hesaplama Sonucu"
      >
        <div className="space-y-4">
          <div className={`flex items-center space-x-2 font-bold border-b pb-2 ${theme === 'dark' ? 'text-emerald-400 border-emerald-500/20' : 'text-emerald-600 border-emerald-500/20'}`}>
            <CheckCircle2 size={20} />
            <span>Yargıtay Temyiz Son Başvuru Günü</span>
          </div>

          <div className="text-sm space-y-4 mt-4">
            <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-darker-bg/60 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <span className={`block text-xs mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Uygulanan İlam Türü Ve Kanuni Süre:</span>
              <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{result?.courtName} ({result?.durationText})</span>
            </div>

            <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-gold/10 border-gold/40' : 'bg-gold/5 border-gold/30'}`}>
              <span className={`block text-xs mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Temyiz Dilekçesi Son Teslim Günü:</span>
              <span className="text-2xl font-bold text-gold">{result?.lastDateFormatted}</span>
            </div>

            {result?.isExtended && (
              <div className={`p-4 rounded-xl border text-xs flex items-start space-x-3 mt-4 ${theme === 'dark' ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
                <Info size={18} className="mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold text-sm">HMK m.93 Tatil Uzaması:</span>
                  <p className="mt-1 leading-relaxed">
                    Sürenin son günü ({result.beforeExtensionFormatted}) resmi tatile veya hafta sonuna denk geldiğinden ({result.reasons.join(', ')}), son temyiz günü takip eden ilk iş gününe aktarılmıştır.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className={`pt-3 text-[11px] border-t mt-4 ${theme === 'dark' ? 'text-gray-400 border-gray-700' : 'text-gray-500 border-gray-200'}`}>
            * Dayanak: 6100 sayılı Hukuk Muhakemeleri Kanunu Madde 361, 5271 sayılı CMK Madde 291.
          </div>
        </div>
      </Modal>
    </div>
  );
};
