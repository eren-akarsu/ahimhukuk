import React, { useState } from 'react';
import { Calendar as CalendarIcon, Briefcase, CheckCircle2, Info, ArrowRight } from 'lucide-react';
import { useToast } from '../ui/Toast';
import { addDurationHMK, formatDateVerboseTR, formatDateTR } from '../../utils/dateUtils';
import { useApp } from '../../context/AppContext';
import { CustomDateInput } from '../ui/CustomDateInput';
import { Modal } from '../ui/Modal';

export const IseIadeSuresi: React.FC = () => {
  const [tutanakDate, setTutanakDate] = useState<string>('');
  const [result, setResult] = useState<{
    lastDateFormatted: string;
    beforeExtensionFormatted: string;
    isExtended: boolean;
    reasons: string[];
    startDateFormatted: string;
  } | null>(null);

  const { addToast } = useToast();
  const { theme } = useApp();

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!tutanakDate) {
      addToast('Lütfen işe iade arabuluculuk son tutanak tarihini giriniz.', 'error');
      return;
    }

    const startDate = new Date(tutanakDate);
    if (isNaN(startDate.getTime())) {
      addToast('Geçersiz tarih girdiniz.', 'error');
      return;
    }

    // 4857 s. K. m.20 uyarınca 2 hafta
    const hmkRes = addDurationHMK(startDate, 2, 'weeks');

    setResult({
      startDateFormatted: formatDateTR(startDate),
      lastDateFormatted: formatDateVerboseTR(hmkRes.adjustedDate),
      beforeExtensionFormatted: formatDateTR(hmkRes.targetDateBeforeExtension),
      isExtended: hmkRes.isExtended,
      reasons: hmkRes.reasons,
    });

    addToast('İşe iade davası açma süresi başarıyla hesaplandı.', 'success');
  };

  return (
    <div className={`p-6 rounded-2xl transition-all duration-300 h-full flex flex-col ${
      theme === 'dark' ? 'glass-panel border-white/10' : 'bg-white/90 border border-gray-200 shadow-xl'
    }`}>
      {/* Tool Header */}
      <div className="flex items-center space-x-3 mb-5 border-b border-gold/20 pb-4">
        <div className="p-2.5 rounded-xl bg-gold/10 text-gold border border-gold/30">
          <Briefcase size={22} />
        </div>
        <div>
          <h3 className="text-lg font-bold font-serif text-gold">
            İşe İade Davası Açma Süresi
          </h3>
          <p className="text-xs text-gray-700 dark:text-gray-400">
            Arabuluculuk son tutanağının düzenlendiği tarihten itibaren 2 haftalık hak düşürücü dava süresini ve takvim akışını gösterir.
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleCalculate} className="space-y-4 flex-grow flex flex-col justify-center">
        <div>
          <CustomDateInput
            label="Arabuluculuk Son Tutanak Tarihi *"
            value={tutanakDate}
            onChange={setTutanakDate}
          />
        </div>

        {/* Hukuki Bilgi Kutusu */}
        <div className="flex-grow p-4 mt-4 rounded-xl bg-white/50 dark:bg-darker-bg/40 border border-gray-200 dark:border-gold/10 text-gray-700 dark:text-gray-300 text-sm overflow-y-auto">
          <p className="font-semibold text-gold mb-2">💡 İşe İade Davası Hakkında</p>
          <p className="mb-2">4857 sayılı İş Kanunu'nun 20. maddesi ve 7036 sayılı Kanun'un 3. maddesi uyarınca, iş sözleşmesi feshedilen işçi, fesih bildiriminde sebep gösterilmediği veya gösterilen sebebin geçerli olmadığı iddiası ile arabulucuya başvurmak zorundadır.</p>
          <p className="mb-2">Arabuluculuk faaliyeti sonunda anlaşmaya varılamaması hâlinde, <strong>son tutanağın düzenlendiği tarihten itibaren iki hafta içinde</strong> iş mahkemesinde dava açılması şarttır.</p>
          <p>İki haftalık bu süre hak düşürücü nitelikte olup mahkemece re'sen (kendiliğinden) dikkate alınır ve süresi içinde açılmayan dava usulden reddedilir. Sürenin son günü resmî tatile rastlarsa, süre tatili takip eden ilk iş günü mesai bitiminde sona erer.</p>
        </div>

        <button
          type="submit"
          className="w-full mt-auto py-3 px-4 rounded-xl bg-gradient-to-r from-gold to-gold-dark text-[#07222c] font-bold text-sm hover:brightness-110 transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center space-x-2"
        >
          <CalendarIcon size={18} />
          <span>İşe İade Süresini Hesapla</span>
        </button>
      </form>

      {/* Result Modal */}
      <Modal
        isOpen={!!result}
        onClose={() => setResult(null)}
        title="İşe İade Davası Süresi Sonucu"
      >
        <div className="space-y-4">
          <div className={`flex items-center space-x-2 font-bold border-b pb-2 ${theme === 'dark' ? 'text-emerald-400 border-emerald-500/20' : 'text-emerald-600 border-emerald-500/20'}`}>
            <CheckCircle2 size={20} />
            <span>Hesaplama Sonucu</span>
          </div>

          {/* Timeline View */}
          <div className={`p-4 rounded-xl border mt-4 ${theme === 'dark' ? 'bg-darker-bg/80 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
            <span className="text-xs font-semibold text-gold block mb-4">Süreç Ve Takvim Akışı:</span>
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between text-xs space-y-4 md:space-y-0 relative px-2">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs ${theme === 'dark' ? 'bg-gold/20 border-gold text-gold' : 'bg-gold/10 border-gold-dark text-gold-dark'}`}>
                  1
                </div>
                <div>
                  <div className={`text-[11px] mb-0.5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Son Tutanak</div>
                  <div className={`font-semibold text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{result?.startDateFormatted}</div>
                </div>
              </div>

              <ArrowRight size={20} className="text-gold hidden md:block" />

              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs ${theme === 'dark' ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-emerald-100 border-emerald-500 text-emerald-700'}`}>
                  2
                </div>
                <div>
                  <div className={`text-[11px] mb-0.5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Dava Açma Son Günü</div>
                  <div className="font-bold text-gold text-lg">{result?.lastDateFormatted}</div>
                </div>
              </div>
            </div>
          </div>

          {result?.isExtended && (
            <div className={`p-4 rounded-xl border text-xs flex items-start space-x-3 mt-4 ${theme === 'dark' ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
              <Info size={18} className="mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-bold text-sm">HMK m.93 Uyarınca Süre Uzamıştır:</span>
                <p className="mt-1 leading-relaxed">
                  2 haftalık süre {result.beforeExtensionFormatted} tarihinde dolmakta idi. Ancak bu gün resmi tatile veya hafta sonuna denk geldiğinden ({result.reasons.join(', ')}), dava açma son günü takip eden ilk iş gününe aktarılmıştır.
                </p>
              </div>
            </div>
          )}

          <div className={`pt-3 text-[11px] border-t mt-4 ${theme === 'dark' ? 'text-gray-400 border-gray-700' : 'text-gray-500 border-gray-200'}`}>
            * Dayanak: 4857 sayılı İş Kanunu m.20, 7036 sayılı İş Mahkemeleri Kanunu m.3, HMK m.90-95.
          </div>
        </div>
      </Modal>
    </div>
  );
};
