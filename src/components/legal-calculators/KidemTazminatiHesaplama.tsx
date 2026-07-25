import React, { useState } from 'react';
import { Award, Calculator, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useToast } from '../ui/Toast';
import { calculateServicePeriod, formatCurrencyTR } from '../../utils/dateUtils';
import { legalParameters } from '../../data/legalParameters';
import { useApp } from '../../context/AppContext';
import { CustomNumberInput } from '../ui/CustomNumberInput';
import { CustomDateInput } from '../ui/CustomDateInput';
import { Modal } from '../ui/Modal';

export const KidemTazminatiHesaplama: React.FC = () => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [grossWage, setGrossWage] = useState<string>('');

  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    enteredWage: number;
    effectiveWage: number;
    isCeilingApplied: boolean;
    grossSeverance: number;
    stampTax: number;
    netSeverance: number;
    ceilingValue: number;
  } | null>(null);

  const { addToast } = useToast();
  const { theme, language } = useApp();

  const texts = {
    tr: {
      toastMissingDates: 'Lütfen işe giriş ve çıkış tarihlerini eksiksiz giriniz.',
      toastInvalidDate: 'Geçersiz tarih girdiniz.',
      toastDateOrder: 'İşten çıkış tarihi işe giriş tarihinden önce olamaz.',
      toastInvalidWage: 'Lütfen geçerli bir son giydirilmiş brüt ücret giriniz.',
      toastMinService: 'Kıdem tazminatına hak kazanabilmek için en az 1 tam yıl (365 gün) çalışma süresi gereklidir.',
      toastSuccess: 'Kıdem tazminatı başarıyla hesaplandı.',
      title: 'Kıdem Tazminatı Hesaplama',
      desc: '1475 sayılı İş Kanunu m.14 ve güncel kıdem tazminatı tavanı esas alınarak hizmet süresi ve net kıdem tazminatı hesaplar.',
      startDateLabel: 'İşe Giriş Tarihi *',
      endDateLabel: 'İşten Çıkış / Fesih Tarihi *',
      wageLabel: 'Son Giydirilmiş Brüt Ücret (TL) *',
      wagePlaceholder: 'Maaş + Brüt Yan Haklar',
      infoTitle: '💡 Kıdem Tazminatı Hakkında',
      infoP1: '1475 sayılı İş Kanunu\'nun 14. maddesi uyarınca işçinin kıdem tazminatına hak kazanabilmesi için aynı işverene bağlı olarak en az bir tam yıl çalışmış olması gereklidir.',
      infoP2: 'Hesaplama işlemi, işçinin son aldığı giydirilmiş brüt ücret üzerinden yapılır. Giydirilmiş ücret; çıplak maaşın yanı sıra yol, yemek, ikramiye, prim gibi sürekli ve düzenli sağlanan tüm yan hakların da eklenmesiyle elde edilir.',
      infoP3: 'Yıllık kıdem tazminatı miktarı, ilgili dönem için Maliye Bakanlığı tarafından belirlenen Kıdem Tazminatı Tavanı\'nı aşamaz. Brüt tazminat tutarından sadece binde 7,59 oranında damga vergisi kesilir.',
      calcBtn: 'Kıdem Tazminatını Hesapla',
      modalTitle: 'Kıdem Tazminatı Hesaplama Sonucu',
      calcResult: 'Hesaplanan Kıdem Tazminatı',
      ceilingWarningTitle: 'Kıdem Tazminatı Tavanı Uygulandı!',
      ceilingWarningText: (wage: string, ceiling: string) => `Girilen brüt ücret (${wage}), yasal dönemsel kıdem tazminatı tavanını (${ceiling}) aştığı için hesaplamada kanuni tavan tutarı esas alınmıştır.`,
      servicePeriod: 'Hizmet Süresi:',
      servicePeriodValue: (y: number, m: number, d: number) => `${y} Yıl ${m} Ay ${d} Gün`,
      effectiveWage: 'Esas Alınan Brüt Ücret:',
      grossSeverance: 'Brüt Kıdem Tazminatı:',
      stampTax: 'Damga Vergisi Kesintisi (%0.759):',
      netSeveranceTitle: 'Tahmini Net Kıdem Tazminatı:',
      netSeveranceDesc: '(Damga Vergisi Kesildikten Sonra)',
      basis: '* Dayanak: 1475 sayılı İş Kanunu Madde 14 (Yürürlükteki Hüküm), Yargıtay İçtihatları.'
    },
    en: {
      toastMissingDates: 'Please enter start and end dates completely.',
      toastInvalidDate: 'You entered an invalid date.',
      toastDateOrder: 'End date cannot be before start date.',
      toastInvalidWage: 'Please enter a valid last gross wage.',
      toastMinService: 'A minimum of 1 full year (365 days) of service is required to qualify for severance pay.',
      toastSuccess: 'Severance pay successfully calculated.',
      title: 'Severance Pay Calculator',
      desc: 'Calculates service period and net severance pay based on Article 14 of Labor Law No. 1475 and current severance pay ceiling.',
      startDateLabel: 'Start Date *',
      endDateLabel: 'End Date / Termination Date *',
      wageLabel: 'Last Gross Wage (TRY) *',
      wagePlaceholder: 'Salary + Gross Benefits',
      infoTitle: '💡 About Severance Pay',
      infoP1: 'In accordance with Article 14 of Labor Law No. 1475, the worker must have worked for at least one full year under the same employer to be entitled to severance pay.',
      infoP2: 'The calculation is based on the worker\'s last gross wage. The gross wage includes the base salary as well as all regular and continuous fringe benefits such as travel, food, bonuses, and premiums.',
      infoP3: 'The annual severance pay amount cannot exceed the Severance Pay Ceiling determined by the Ministry of Finance for the relevant period. Only a stamp tax of 0.759% is deducted from the gross severance pay amount.',
      calcBtn: 'Calculate Severance Pay',
      modalTitle: 'Severance Pay Calculation Result',
      calcResult: 'Calculated Severance Pay',
      ceilingWarningTitle: 'Severance Pay Ceiling Applied!',
      ceilingWarningText: (wage: string, ceiling: string) => `Since the entered gross wage (${wage}) exceeds the legal periodic severance pay ceiling (${ceiling}), the legal ceiling amount was used in the calculation.`,
      servicePeriod: 'Service Period:',
      servicePeriodValue: (y: number, m: number, d: number) => `${y} Years ${m} Months ${d} Days`,
      effectiveWage: 'Base Gross Wage:',
      grossSeverance: 'Gross Severance Pay:',
      stampTax: 'Stamp Tax Deduction (0.759%):',
      netSeveranceTitle: 'Estimated Net Severance Pay:',
      netSeveranceDesc: '(After Stamp Tax Deduction)',
      basis: '* Basis: Article 14 of Labor Law No. 1475 (Current Provision), Supreme Court Jurisprudence.'
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

    // Hizmet Süresi Hesabı
    const period = calculateServicePeriod(start, end);

    if (period.years < 1) {
      addToast(texts.toastMinService, 'warning');
      return;
    }

    // Tavan Kontrolü
    const ceiling = legalParameters.kidemTazminatiTavani;
    let effectiveWage = wage;
    let isCeilingApplied = false;

    if (wage > ceiling) {
      effectiveWage = ceiling;
      isCeilingApplied = true;
    }

    // Hesoplama: Her tam yıl için 30 günlük brüt ücret, kıst aylar ve günler pro-rata
    const yearlyPay = effectiveWage * period.years;
    const monthlyPay = (effectiveWage / 12) * period.months;
    const dailyPay = (effectiveWage / 365) * period.days;

    const grossSeverance = yearlyPay + monthlyPay + dailyPay;
    const stampTax = grossSeverance * legalParameters.damgaVergisiOrani; // binde 7.59
    const netSeverance = grossSeverance - stampTax;

    setResult({
      years: period.years,
      months: period.months,
      days: period.days,
      enteredWage: wage,
      effectiveWage,
      isCeilingApplied,
      grossSeverance,
      stampTax,
      netSeverance,
      ceilingValue: ceiling,
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
          <Award size={22} />
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

        {/* Hukuki Bilgi Kutusu (Boşluğu Doldurmak İçin) */}
        <div className="flex-grow p-4 mt-4 rounded-xl bg-white/50 dark:bg-darker-bg/40 border border-gray-200 dark:border-gold/10 text-gray-700 dark:text-gray-300 text-sm overflow-y-auto">
          <p className="font-semibold text-gold mb-2">{texts.infoTitle}</p>
          <p className="mb-2">{texts.infoP1}</p>
          <p className="mb-2">{texts.infoP2}</p>
          <p>{texts.infoP3}</p>
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

          {/* Warning Banner if Ceiling Applied */}
          {result?.isCeilingApplied && (
            <div className={`p-4 rounded-xl border text-xs flex items-start space-x-3 mt-4 ${theme === 'dark' ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
              <AlertTriangle size={18} className={`mt-0.5 flex-shrink-0 ${theme === 'dark' ? 'text-amber-400' : 'text-amber-600'}`} />
              <div>
                <span className="font-bold text-sm">{texts.ceilingWarningTitle}</span>
                <p className="mt-1 leading-relaxed">
                  {texts.ceilingWarningText(formatCurrencyTR(result.enteredWage), formatCurrencyTR(result.ceilingValue))}
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mt-4">
            <div className={`p-4 rounded-xl border space-y-2 ${theme === 'dark' ? 'bg-darker-bg/60 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <div>
                <span className={`block mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{texts.servicePeriod}</span>
                <span className={`font-bold text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {result?.years !== undefined && texts.servicePeriodValue(result.years, result.months, result.days)}
                </span>
              </div>
              <div className={`border-t pt-2 mt-2 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                <span className={`block mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{texts.effectiveWage}</span>
                <span className="font-semibold text-gold text-sm">
                  {result?.effectiveWage && formatCurrencyTR(result.effectiveWage)}
                </span>
              </div>
            </div>

            <div className={`p-4 rounded-xl border space-y-2 ${theme === 'dark' ? 'bg-darker-bg/60 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex justify-between items-center">
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>{texts.grossSeverance}</span>
                <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{result?.grossSeverance && formatCurrencyTR(result.grossSeverance)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>{texts.stampTax}</span>
                <span className={`font-semibold ${theme === 'dark' ? 'text-rose-300' : 'text-rose-500'}`}>-{result?.stampTax && formatCurrencyTR(result.stampTax)}</span>
              </div>
            </div>
          </div>

          <div className={`p-4 rounded-xl border flex items-center justify-between ${theme === 'dark' ? 'bg-gold/10 border-gold/40' : 'bg-gold/5 border-gold/30'}`}>
            <div>
              <span className={`text-xs block font-semibold mb-1 ${theme === 'dark' ? 'text-gold' : 'text-gold-dark'}`}>{texts.netSeveranceTitle}</span>
              <span className={`text-[11px] ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{texts.netSeveranceDesc}</span>
            </div>
            <span className="text-2xl font-bold text-gold">{result?.netSeverance && formatCurrencyTR(result.netSeverance)}</span>
          </div>

          <div className={`pt-3 text-[11px] border-t mt-4 ${theme === 'dark' ? 'text-gray-400 border-gray-700' : 'text-gray-500 border-gray-200'}`}>
            {texts.basis}
          </div>
        </div>
      </Modal>
    </div>
  );
};
