import React, { useState } from 'react';
import { Calendar, Scale, CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import { useToast } from '../ui/Toast';
import { addDurationHMK, formatDateVerboseTR, formatDateTR } from '../../utils/dateUtils';
import { useApp } from '../../context/AppContext';
import { CustomDateInput } from '../ui/CustomDateInput';
import { Modal } from '../ui/Modal';

export const ArabuluculukSuresi: React.FC = () => {
  const [tutanakDate, setTutanakDate] = useState<string>('');
  const [category, setCategory] = useState<'is_iade' | 'ucret_itiraz' | 'diger'>('is_iade');
  const [result, setResult] = useState<{
    lastDateFormatted?: string;
    beforeExtensionFormatted?: string;
    isExtended?: boolean;
    reasons?: string[];
    daysCount?: number;
    infoOnly?: boolean;
    infoMessage?: string;
  } | null>(null);

  const { addToast } = useToast();
  const { theme, language } = useApp();

  const texts = {
    tr: {
      toastSelectDate: 'Lütfen arabuluculuk son tutanak tarihini seçiniz.',
      toastInvalidDate: 'Geçersiz tarih girdiniz.',
      toastInfoShow: 'Bilgilendirme gösteriliyor.',
      toastSuccess: 'Dava açma süresi başarıyla hesaplandı.',
      infoOtherMessage: 'İşe iade davası ve arabuluculuk ücretine itiraz dışındaki alacak/tazminat davalarında arabuluculuk son tutanağından itibaren işlemeye başlayan özel bir hak düşürücü süre bulunmamaktadır. Bu davalarda genel zamanaşımı süreleri geçerlidir. Arabuluculuk sürecinde geçen süre zamanaşımına eklenir (Zamanaşımı durur).',
      title: 'Arabuluculuk Sonrası Dava Süresi',
      desc: 'Arabuluculuk son tutanağından itibaren açılacak dava sürelerini hesaplar.',
      typeLabel: 'Dava / Uyuşmazlık Türü',
      optReinstatement: 'İşe İade Davası (7036 s.K. m.3)',
      optFeeObjection: 'Arabuluculuk Ücretine İtiraz (HUAK m.18/A)',
      optOther: 'Diğer Alacak / Tazminat Davaları',
      dateLabel: 'Son Tutanak Düzenleme Tarihi *',
      infoTitle: '💡 Dava Açma Süreleri Hakkında',
      infoP1Start: 'İşe İade Davaları:',
      infoP1End: ' 7036 sayılı Kanun m.3 uyarınca, arabuluculuk faaliyetinin anlaşılamama ile sonuçlanması halinde son tutanağın düzenlendiği tarihten itibaren ',
      infoP1Bold: '2 hafta',
      infoP1End2: ' içinde dava açılmalıdır.',
      infoP2Start: 'Arabuluculuk Ücretine İtiraz:',
      infoP2End: ' Ücretin tebliğinden veya tutanağın düzenlenmesinden itibaren ',
      infoP2Bold: '15 gün',
      infoP2End2: ' içinde Sulh Hukuk Mahkemesine itiraz edilebilir.',
      infoP3Start: 'Diğer Davalar (Kıdem, İhbar vb.):',
      infoP3End: ' Arabuluculuk tutanağından sonra işlemeye başlayan özel bir süre yoktur. Ancak arabuluculuk bürosuna başvurulmasından son tutanağın düzenlendiği tarihe kadar geçen sürede zamanaşımı durur.',
      calcBtn: 'Süreyi Hesapla',
      modalTitle: 'Arabuluculuk Süresi Sonucu',
      importantInfo: 'Önemli Bilgilendirme',
      calcResult: 'Hesaplama Sonucu',
      legalPeriod: 'Kanuni Süre:',
      legalPeriod2Weeks: '2 Hafta (14 Gün)',
      legalPeriod15Days: '15 Gün',
      lastDate: 'Son Dava/İtiraz Açma Tarihi:',
      extensionTitle: 'HMK m.93 Uyarınca Süre Uzamıştır:',
      extensionDesc1: 'Sürenin son günü (',
      extensionDesc2: ') resmi tatile veya hafta sonuna denk geldiğinden (',
      extensionDesc3: '), son gün takip eden ilk iş gününe aktarılmıştır.',
      basis: '* Dayanak: HMK m.90-95, HUAK m.18/A, 7036 s.K. m.3 / 6102 s.K. m.5/A / 6502 s.K. m.73/A.'
    },
    en: {
      toastSelectDate: 'Please select the mediation final report date.',
      toastInvalidDate: 'You entered an invalid date.',
      toastInfoShow: 'Displaying information.',
      toastSuccess: 'Lawsuit filing period successfully calculated.',
      infoOtherMessage: 'In receivables/compensation lawsuits other than reinstatement lawsuits and objections to mediation fees, there is no special statute of repose starting from the final mediation report. General statutes of limitations apply. The period elapsed during mediation is added to the statute of limitations (Statute of limitations stops).',
      title: 'Lawsuit Period After Mediation',
      desc: 'Calculates the periods for filing a lawsuit starting from the final mediation report.',
      typeLabel: 'Lawsuit / Dispute Type',
      optReinstatement: 'Reinstatement Lawsuit (Law No. 7036 Art.3)',
      optFeeObjection: 'Objection to Mediation Fee (HUAK Art.18/A)',
      optOther: 'Other Receivables / Compensation Lawsuits',
      dateLabel: 'Final Report Issuance Date *',
      infoTitle: '💡 About Lawsuit Filing Periods',
      infoP1Start: 'Reinstatement Lawsuits:',
      infoP1End: ' Under Art.3 of Law No. 7036, if the mediation activity results in disagreement, a lawsuit must be filed within ',
      infoP1Bold: '2 weeks',
      infoP1End2: ' from the date of the final report.',
      infoP2Start: 'Objection to Mediation Fee:',
      infoP2End: ' An objection can be filed at the Civil Court of Peace within ',
      infoP2Bold: '15 days',
      infoP2End2: ' from the notification of the fee or issuance of the report.',
      infoP3Start: 'Other Lawsuits (Severance, Notice etc.):',
      infoP3End: ' There is no special period that starts after the mediation report. However, the statute of limitations stops during the period from the application to the mediation office until the final report is issued.',
      calcBtn: 'Calculate Period',
      modalTitle: 'Mediation Period Result',
      importantInfo: 'Important Information',
      calcResult: 'Calculation Result',
      legalPeriod: 'Statutory Period:',
      legalPeriod2Weeks: '2 Weeks (14 Days)',
      legalPeriod15Days: '15 Days',
      lastDate: 'Last Date to File Lawsuit/Objection:',
      extensionTitle: 'Period Extended Under HMK Art.93:',
      extensionDesc1: 'Since the last day of the period (',
      extensionDesc2: ') coincides with an official holiday or weekend (',
      extensionDesc3: '), the deadline is transferred to the next working day.',
      basis: '* Basis: HMK Art.90-95, HUAK Art.18/A, Law No. 7036 Art.3 / Law No. 6102 Art.5/A / Law No. 6502 Art.73/A.'
    }
  }[language];

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!tutanakDate) {
      addToast(texts.toastSelectDate, 'error');
      return;
    }

    const startDate = new Date(tutanakDate);
    if (isNaN(startDate.getTime())) {
      addToast(texts.toastInvalidDate, 'error');
      return;
    }

    if (category === 'diger') {
      setResult({
        infoOnly: true,
        infoMessage: texts.infoOtherMessage,
      });
      addToast(texts.toastInfoShow, 'info');
      return;
    }

    let duration = 0;
    let unit: 'weeks' | 'days' = 'days';

    if (category === 'is_iade') {
      duration = 2;
      unit = 'weeks';
    } else if (category === 'ucret_itiraz') {
      duration = 15;
      unit = 'days';
    }

    const hmkRes = addDurationHMK(startDate, duration, unit);

    setResult({
      infoOnly: false,
      lastDateFormatted: formatDateVerboseTR(hmkRes.adjustedDate),
      beforeExtensionFormatted: formatDateTR(hmkRes.targetDateBeforeExtension),
      isExtended: hmkRes.isExtended,
      reasons: hmkRes.reasons,
      daysCount: category === 'is_iade' ? 14 : 15,
    });

    addToast(texts.toastSuccess, 'success');
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
            {texts.title}
          </h3>
          <p className="text-xs text-gray-700 dark:text-gray-400">
            {texts.desc}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleCalculate} className="space-y-4 flex-grow flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              {texts.typeLabel}
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as 'is_iade' | 'ucret_itiraz' | 'diger')}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/50 dark:bg-darker-bg/80 border border-gray-300 dark:border-gold/30 text-gray-800 dark:text-white text-sm focus:outline-none focus:border-gold transition-colors"
            >
              <option value="is_iade">{texts.optReinstatement}</option>
              <option value="ucret_itiraz">{texts.optFeeObjection}</option>
              <option value="diger">{texts.optOther}</option>
            </select>
          </div>

          <CustomDateInput
            label={texts.dateLabel}
            value={tutanakDate}
            onChange={setTutanakDate}
          />
        </div>

        {/* Hukuki Bilgi Kutusu */}
        <div className="flex-grow p-4 mt-4 rounded-xl bg-white/50 dark:bg-darker-bg/40 border border-gray-200 dark:border-gold/10 text-gray-700 dark:text-gray-300 text-sm overflow-y-auto">
          <p className="font-semibold text-gold mb-2">{texts.infoTitle}</p>
          <p className="mb-2"><strong>{texts.infoP1Start}</strong>{texts.infoP1End}<strong>{texts.infoP1Bold}</strong>{texts.infoP1End2}</p>
          <p className="mb-2"><strong>{texts.infoP2Start}</strong>{texts.infoP2End}<strong>{texts.infoP2Bold}</strong>{texts.infoP2End2}</p>
          <p><strong>{texts.infoP3Start}</strong>{texts.infoP3End}</p>
        </div>

        <button
          type="submit"
          className="w-full mt-auto py-3 px-4 rounded-xl bg-gradient-to-r from-gold to-gold-dark text-[#07222c] font-bold text-sm hover:brightness-110 transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center space-x-2"
        >
          <Calendar size={18} />
          <span>{texts.calcBtn}</span>
        </button>
      </form>

      {/* Result Modal */}
      <Modal
        isOpen={!!result}
        onClose={() => setResult(null)}
        title={texts.modalTitle}
      >
        <div className="space-y-4">
          {result?.infoOnly ? (
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-2 text-amber-500 font-bold border-b border-amber-500/20 pb-2">
                <AlertTriangle size={20} />
                <span>{texts.importantInfo}</span>
              </div>
              <p className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                {result.infoMessage}
              </p>
            </div>
          ) : (
            <>
              <div className={`flex items-center space-x-2 font-bold border-b pb-2 ${theme === 'dark' ? 'text-emerald-400 border-emerald-500/20' : 'text-emerald-600 border-emerald-500/20'}`}>
                <CheckCircle2 size={20} />
                <span>{texts.calcResult}</span>
              </div>

              <div className="text-sm space-y-4 mt-4">
                <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-darker-bg/60 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                  <span className={`block text-xs mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{texts.legalPeriod}</span>
                  <span className={`font-semibold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {category === 'is_iade' ? texts.legalPeriod2Weeks : texts.legalPeriod15Days}
                  </span>
                </div>

                <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-gold/10 border-gold/40' : 'bg-gold/5 border-gold/30'}`}>
                  <span className={`block text-xs mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{texts.lastDate}</span>
                  <span className="text-2xl font-bold text-gold">{result?.lastDateFormatted}</span>
                </div>

                {result?.isExtended && (
                  <div className={`p-4 rounded-xl border text-xs flex items-start space-x-3 ${theme === 'dark' ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
                    <Info size={18} className="mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-sm">{texts.extensionTitle}</span>
                      <p className="mt-1 leading-relaxed">
                        {texts.extensionDesc1}{result.beforeExtensionFormatted}{texts.extensionDesc2}{result.reasons?.join(', ')}{texts.extensionDesc3}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          <div className={`pt-3 text-[11px] border-t mt-4 ${theme === 'dark' ? 'text-gray-400 border-gray-700' : 'text-gray-500 border-gray-200'}`}>
            {texts.basis}
          </div>
        </div>
      </Modal>
    </div>
  );
};

