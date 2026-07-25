import React, { useState } from 'react';
import { ShieldAlert, Calculator, CheckCircle2 } from 'lucide-react';
import { useToast } from '../ui/Toast';
import { calculateServicePeriod, formatCurrencyTR } from '../../utils/dateUtils';
import { legalParameters } from '../../data/legalParameters';
import { useApp } from '../../context/AppContext';
import { CustomNumberInput } from '../ui/CustomNumberInput';
import { CustomDateInput } from '../ui/CustomDateInput';
import { Modal } from '../ui/Modal';

export const IhbarTazminatiHesaplama: React.FC = () => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [grossWage, setGrossWage] = useState<string>('');

  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    noticeWeeks: number;
    noticeDays: number;
    grossNotice: number;
    incomeTax: number;
    stampTax: number;
    netNotice: number;
  } | null>(null);

  const { addToast } = useToast();
  const { theme, language } = useApp();

  const texts = {
    tr: {
      toastMissingDates: 'Lütfen işe giriş ve çıkış tarihlerini eksiksiz giriniz.',
      toastInvalidDate: 'Geçersiz tarih girdiniz.',
      toastDateOrder: 'İşten çıkış tarihi işe giriş tarihinden önce olamaz.',
      toastInvalidWage: 'Lütfen geçerli bir aylık brüt ücret giriniz.',
      toastSuccess: 'İhbar tazminatı başarıyla hesaplandı.',
      title: 'İhbar Tazminatı Hesaplama',
      desc: '4857 sayılı İş Kanunu m.17 uyarınca kıdem süresine göre bildirim öneli ve net ihbar tazminatı hesaplar.',
      startDateLabel: 'İşe Giriş Tarihi *',
      endDateLabel: 'İşten Çıkış / Fesih Tarihi *',
      wageLabel: 'Aylık Brüt Ücret (TL) *',
      wagePlaceholder: 'Brüt Maaş',
      infoTitle: '💡 İhbar Tazminatı Hakkında',
      infoP1: '4857 sayılı İş Kanunu\'nun 17. maddesi gereği belirsiz süreli iş sözleşmelerinin feshinden önce durumun diğer tarafa bildirilmesi gerekir.',
      infoP2: 'Bildirim süresi, işçinin işyerindeki kıdemine göre belirlenir (2, 4, 6 veya 8 hafta). Bu sürelere uymayan taraf, bildirim süresine ilişkin ücret tutarında ihbar tazminatı ödemekle yükümlüdür.',
      infoP3Start: 'İhbar tazminatından kıdem tazminatından farklı olarak, hem ',
      infoP3Bold: 'gelir vergisi',
      infoP3End: ' hem de damga vergisi kesintisi yapılmaktadır. İşçinin kendi isteğiyle haklı nedene dayanmadan (istifa) ayrılması durumunda ihbar tazminatı talep hakkı bulunmaz.',
      calcBtn: 'İhbar Tazminatını Hesapla',
      modalTitle: 'İhbar Tazminatı Hesaplama Sonucu',
      calcResult: 'Hesaplanan İhbar Tazminatı',
      servicePeriod: 'Hizmet Süresi:',
      servicePeriodValue: (y: number, m: number, d: number) => `${y} Yıl ${m} Ay ${d} Gün`,
      noticePeriod: 'Kanuni İhbar Öneli Süresi:',
      noticePeriodValue: (w: number, d: number) => `${w} Hafta (${d} Gün)`,
      grossNotice: 'Brüt İhbar Tazminatı: ',
      incomeTax: 'Gelir Vergisi (%15): ',
      stampTax: 'Damga Vergisi (%0.759): ',
      netNoticeTitle: 'Tahmini Net İhbar Tazminatı:',
      netNoticeDesc: '(Vergi ve Kesintiler Sonrası)',
      basis: '* Dayanak: 4857 sayılı İş Kanunu Madde 17.'
    },
    en: {
      toastMissingDates: 'Please enter start and end dates completely.',
      toastInvalidDate: 'You entered an invalid date.',
      toastDateOrder: 'End date cannot be before start date.',
      toastInvalidWage: 'Please enter a valid monthly gross wage.',
      toastSuccess: 'Notice pay successfully calculated.',
      title: 'Notice Pay Calculator',
      desc: 'Calculates the notice period and net notice pay based on seniority according to Article 17 of Labor Law No. 4857.',
      startDateLabel: 'Start Date *',
      endDateLabel: 'End Date / Termination Date *',
      wageLabel: 'Monthly Gross Wage (TRY) *',
      wagePlaceholder: 'Gross Salary',
      infoTitle: '💡 About Notice Pay',
      infoP1: 'In accordance with Article 17 of Labor Law No. 4857, the situation must be notified to the other party prior to the termination of indefinite-term employment contracts.',
      infoP2: 'The notice period is determined by the worker\'s seniority in the workplace (2, 4, 6, or 8 weeks). The party not complying with these periods is obliged to pay notice pay in the amount of the wage corresponding to the notice period.',
      infoP3Start: 'Unlike severance pay, both ',
      infoP3Bold: 'income tax',
      infoP3End: ' and stamp tax are deducted from notice pay. The worker has no right to demand notice pay if they leave voluntarily without a justified reason (resignation).',
      calcBtn: 'Calculate Notice Pay',
      modalTitle: 'Notice Pay Calculation Result',
      calcResult: 'Calculated Notice Pay',
      servicePeriod: 'Service Period:',
      servicePeriodValue: (y: number, m: number, d: number) => `${y} Years ${m} Months ${d} Days`,
      noticePeriod: 'Legal Notice Period:',
      noticePeriodValue: (w: number, d: number) => `${w} Weeks (${d} Days)`,
      grossNotice: 'Gross Notice Pay: ',
      incomeTax: 'Income Tax (15%): ',
      stampTax: 'Stamp Tax (0.759%): ',
      netNoticeTitle: 'Estimated Net Notice Pay:',
      netNoticeDesc: '(After Taxes and Deductions)',
      basis: '* Basis: Labor Law No. 4857 Article 17.'
    }
  }[language];

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      addToast(texts.toastMissingDates, 'error');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const wage = parseFloat(grossWage);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      addToast(texts.toastInvalidDate, 'error');
      return;
    }

    if (end < start) {
      addToast(texts.toastDateOrder, 'error');
      return;
    }

    if (isNaN(wage) || wage <= 0) {
      addToast(texts.toastInvalidWage, 'error');
      return;
    }

    // Hizmet Süresi
    const period = calculateServicePeriod(start, end);
    const totalMonths = period.years * 12 + period.months;

    // 4857 s. K. m.17 İhbar Süresi Dilimleri
    let noticeWeeks = 2;
    if (totalMonths < 6) {
      noticeWeeks = 2;
    } else if (totalMonths >= 6 && totalMonths < 18) {
      noticeWeeks = 4;
    } else if (totalMonths >= 18 && totalMonths < 36) {
      noticeWeeks = 6;
    } else {
      noticeWeeks = 8;
    }

    const noticeDays = noticeWeeks * 7;
    const dailyWage = wage / 30;

    const grossNotice = dailyWage * noticeDays;
    const incomeTax = grossNotice * legalParameters.gelirVergisiOrani; // %15
    const stampTax = grossNotice * legalParameters.damgaVergisiOrani; // %0.759
    const netNotice = grossNotice - incomeTax - stampTax;

    setResult({
      years: period.years,
      months: period.months,
      days: period.days,
      noticeWeeks,
      noticeDays,
      grossNotice,
      incomeTax,
      stampTax,
      netNotice,
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
          <ShieldAlert size={22} />
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CustomDateInput
            label={texts.startDateLabel}
            value={startDate}
            onChange={setStartDate}
          />
          <CustomDateInput
            label={texts.endDateLabel}
            value={endDate}
            onChange={setEndDate}
          />
          <div>
            <CustomNumberInput
              label={texts.wageLabel}
              value={grossWage}
              onChange={(val) => setGrossWage(val.toString())}
              placeholder={texts.wagePlaceholder}
              step={100}
            />
          </div>
        </div>

        {/* Hukuki Bilgi Kutusu */}
        <div className="flex-grow p-4 mt-4 rounded-xl bg-white/50 dark:bg-darker-bg/40 border border-gray-200 dark:border-gold/10 text-gray-700 dark:text-gray-300 text-sm overflow-y-auto">
          <p className="font-semibold text-gold mb-2">{texts.infoTitle}</p>
          <p className="mb-2">{texts.infoP1}</p>
          <p className="mb-2">{texts.infoP2}</p>
          <p>{texts.infoP3Start}<strong>{texts.infoP3Bold}</strong>{texts.infoP3End}</p>
        </div>

        <button
          type="submit"
          className="w-full mt-auto py-3 px-4 rounded-xl bg-gradient-to-r from-gold to-gold-dark text-[#07222c] font-bold text-sm hover:brightness-110 transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center space-x-2"
        >
          <Calculator size={18} />
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
          <div className={`flex items-center space-x-2 font-bold border-b pb-2 ${theme === 'dark' ? 'text-emerald-400 border-emerald-500/20' : 'text-emerald-600 border-emerald-500/20'}`}>
            <CheckCircle2 size={20} />
            <span>{texts.calcResult}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mt-4">
            <div className={`p-4 rounded-xl border space-y-2 ${theme === 'dark' ? 'bg-darker-bg/60 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <div>
                <span className={`block mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{texts.servicePeriod}</span>
                <span className={`font-bold text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {result?.years !== undefined && texts.servicePeriodValue(result.years, result.months, result.days)}
                </span>
              </div>
              <div className={`border-t pt-2 mt-2 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <span className={`block mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{texts.noticePeriod}</span>
                <span className="font-bold text-gold text-sm">
                  {result?.noticeWeeks !== undefined && texts.noticePeriodValue(result.noticeWeeks, result.noticeDays)}
                </span>
              </div>
            </div>

            <div className={`p-4 rounded-xl border space-y-2 ${theme === 'dark' ? 'bg-darker-bg/60 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex justify-between items-center">
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>{texts.grossNotice}</span>
                <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{result?.grossNotice && formatCurrencyTR(result.grossNotice)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>{texts.incomeTax}</span>
                <span className={`font-semibold ${theme === 'dark' ? 'text-rose-300' : 'text-rose-500'}`}>-{result?.incomeTax && formatCurrencyTR(result.incomeTax)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>{texts.stampTax}</span>
                <span className={`font-semibold ${theme === 'dark' ? 'text-rose-300' : 'text-rose-500'}`}>-{result?.stampTax && formatCurrencyTR(result.stampTax)}</span>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-xl border flex items-center justify-between ${theme === 'dark' ? 'bg-gold/10 border-gold/40' : 'bg-gold/5 border-gold/30'}`}>
            <div>
              <span className={`text-xs block font-semibold mb-1 ${theme === 'dark' ? 'text-gold' : 'text-gold-dark'}`}>{texts.netNoticeTitle}</span>
              <span className={`text-[11px] ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{texts.netNoticeDesc}</span>
            </div>
            <span className="text-2xl font-bold text-gold">{result?.netNotice && formatCurrencyTR(result.netNotice)}</span>
          </div>

          <div className={`pt-3 text-[11px] border-t mt-4 ${theme === 'dark' ? 'text-gray-400 border-gray-700' : 'text-gray-500 border-gray-200'}`}>
            {texts.basis}
          </div>
        </div>
      </Modal>
    </div>
  );
};
