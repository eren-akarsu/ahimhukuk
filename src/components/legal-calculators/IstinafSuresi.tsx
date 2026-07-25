import React, { useState } from 'react';
import { Scale, Calculator, CheckCircle2, Info } from 'lucide-react';
import { useToast } from '../ui/Toast';
import { addDurationHMK, formatDateVerboseTR, formatDateTR } from '../../utils/dateUtils';
import { useApp } from '../../context/AppContext';
import { CustomDateInput } from '../ui/CustomDateInput';
import { Modal } from '../ui/Modal';

export const IstinafSuresi: React.FC = () => {
  const [tebligDate, setTebligDate] = useState<string>('');
  const [courtCategory, setCourtCategory] = useState<'hukuk' | 'is' | 'icra' | 'ceza'>('hukuk');

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

  const getCourtInfo = () => {
    switch (courtCategory) {
      case 'hukuk':
        return { name: 'Hukuk Mahkemeleri (Asliye, Aile, Ticaret, Tüketici)', amount: 2, unit: 'weeks' as const, text: '2 Hafta (HMK m.345)' };
      case 'is':
        return { name: 'İş Mahkemeleri', amount: 2, unit: 'weeks' as const, text: '2 Hafta (7036 s.K. m.7)' };
      case 'icra':
        return { name: 'İcra Hukuk Mahkemeleri', amount: 10, unit: 'days' as const, text: '10 Gün (İYK m.363)' };
      case 'ceza':
        return { name: 'Ceza Mahkemeleri', amount: 7, unit: 'days' as const, text: '7 Gün (CMK m.273)' };
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!tebligDate) {
      addToast('Lütfen mahkeme kararının tebliğ tarihini seçiniz.', 'error');
      return;
    }

    const start = new Date(tebligDate);
    if (isNaN(start.getTime())) {
      addToast('Geçersiz tarih girdiniz.', 'error');
      return;
    }

    const courtInfo = getCourtInfo();
    const hmkRes = addDurationHMK(start, courtInfo.amount, courtInfo.unit);

    setResult({
      lastDateFormatted: formatDateVerboseTR(hmkRes.adjustedDate),
      beforeExtensionFormatted: formatDateTR(hmkRes.targetDateBeforeExtension),
      isExtended: hmkRes.isExtended,
      reasons: hmkRes.reasons,
      courtName: courtInfo.name,
      durationText: courtInfo.text,
    });

    addToast('İstinaf son başvuru tarihi başarıyla hesaplandı.', 'success');
  };

  return (
    <div className={`p-6 rounded-2xl transition-all duration-300 h-full flex flex-col ${
      theme === 'dark' ? 'glass-panel border-white/10' : 'bg-white/90 border border-gray-200 shadow-xl'
    }`}>
      {/* Tool Header */}
      <div className="flex items-center space-x-3 mb-5 border-b border-gold/20 pb-4">
        <div className="p-2.5 rounded-xl bg-gold/10 text-gold border border-gold/30">
          <Scale size={22} />
        </div>
        <div>
          <h3 className="text-lg font-bold font-serif text-gold">
            İstinaf Süresi Hesaplama
          </h3>
          <p className="text-xs text-gray-700 dark:text-gray-400">
            Mahkeme kararının tebliğ edildiği tarihten itibaren Bölge Adliye Mahkemesi (İstinaf) son başvuru gününü hesaplar.
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleCalculate} className="space-y-4 flex-grow flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Yargı Kolu / Mahkeme Türü
            </label>
            <select
              value={courtCategory}
              onChange={(e) => setCourtCategory(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/50 dark:bg-darker-bg/80 border border-gray-300 dark:border-gold/30 text-gray-800 dark:text-white text-sm focus:outline-none focus:border-gold transition-colors"
            >
              <option value="hukuk">Hukuk Mahkemeleri (2 Hafta - HMK)</option>
              <option value="is">İş Mahkemeleri (2 Hafta - 7036 s.K.)</option>
              <option value="icra">İcra Hukuk Mahkemeleri (10 Gün - İYK)</option>
              <option value="ceza">Ceza Mahkemeleri (7 Gün - CMK)</option>
            </select>
          </div>

          <CustomDateInput
            label="Kararın Tebliğ Tarihi *"
            value={tebligDate}
            onChange={setTebligDate}
          />
        </div>

        {/* Hukuki Bilgi Kutusu */}
        <div className="flex-grow p-4 mt-4 rounded-xl bg-white/50 dark:bg-darker-bg/40 border border-gray-200 dark:border-gold/10 text-gray-700 dark:text-gray-300 text-sm overflow-y-auto">
          <p className="font-semibold text-gold mb-2">💡 İstinaf Kanun Yolu Süreleri Hakkında</p>
          <p className="mb-2"><strong>Hukuk ve İş Mahkemeleri:</strong> Hukuk Muhakemeleri Kanunu ve İş Mahkemeleri Kanunu uyarınca, ilk derece mahkemesi kararlarına karşı istinaf başvuru süresi kararın tebliğinden itibaren <strong>2 haftadır</strong>.</p>
          <p className="mb-2"><strong>İcra Hukuk Mahkemeleri:</strong> İcra ve İflas Kanunu uyarınca, icra mahkemesi kararlarına karşı istinaf yoluna başvuru süresi tefhim veya tebliğ tarihinden itibaren <strong>10 gündür</strong>.</p>
          <p><strong>Ceza Mahkemeleri:</strong> 5271 sayılı CMK uyarınca, hükmün açıklanmasından veya tebliğinden itibaren <strong>7 gün</strong> içinde istinaf yoluna başvurulabilir (İstinaf süre tutum dilekçesi verilebilir). Sürenin son gününün tatile denk gelmesi halinde süre bir sonraki iş gününe uzar.</p>
        </div>

        <button
          type="submit"
          className="w-full mt-auto py-3 px-4 rounded-xl bg-gradient-to-r from-gold to-gold-dark text-[#07222c] font-bold text-sm hover:brightness-110 transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center space-x-2"
        >
          <Calculator size={18} />
          <span>İstinaf Son Gününü Hesapla</span>
        </button>
      </form>

      {/* Result Modal */}
      <Modal
        isOpen={!!result}
        onClose={() => setResult(null)}
        title="İstinaf Süresi Hesaplama Sonucu"
      >
        <div className="space-y-4">
          <div className={`flex items-center space-x-2 font-bold border-b pb-2 ${theme === 'dark' ? 'text-emerald-400 border-emerald-500/20' : 'text-emerald-600 border-emerald-500/20'}`}>
            <CheckCircle2 size={20} />
            <span>İstinaf Son Başvuru Günü</span>
          </div>

          <div className="text-sm space-y-4 mt-4">
            <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-darker-bg/60 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <span className={`block text-xs mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Mahkeme Türü Ve Kanuni Süre:</span>
              <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{result?.courtName} ({result?.durationText})</span>
            </div>

            <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-gold/10 border-gold/40' : 'bg-gold/5 border-gold/30'}`}>
              <span className={`block text-xs mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Son Dilekçe Verme Günü:</span>
              <span className="text-2xl font-bold text-gold">{result?.lastDateFormatted}</span>
            </div>

            {result?.isExtended && (
              <div className={`p-4 rounded-xl border text-xs flex items-start space-x-3 mt-4 ${theme === 'dark' ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
                <Info size={18} className="mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold text-sm">HMK m.93 Tatil Uzaması:</span>
                  <p className="mt-1 leading-relaxed">
                    Sürenin son günü ({result.beforeExtensionFormatted}) resmi tatile veya hafta sonuna denk geldiğinden ({result.reasons.join(', ')}), son başvuru günü takip eden ilk iş gününe aktarılmıştır.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className={`pt-3 text-[11px] border-t mt-4 ${theme === 'dark' ? 'text-gray-400 border-gray-700' : 'text-gray-500 border-gray-200'}`}>
            * Dayanak: 6100 sayılı HMK m.345, 7036 s.K. m.7, 2004 s. İYK m.363, 5271 s. CMK m.273.
          </div>
        </div>
      </Modal>
    </div>
  );
};
