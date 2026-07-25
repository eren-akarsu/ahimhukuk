import React, { useState } from 'react';
import { Palmtree, Calculator, CheckCircle2, Info } from 'lucide-react';
import { useToast } from '../ui/Toast';
import { calculateServicePeriod } from '../../utils/dateUtils';
import { useApp } from '../../context/AppContext';
import { CustomDateInput } from '../ui/CustomDateInput';
import { Modal } from '../ui/Modal';

export const YillikIzinHesaplama: React.FC = () => {
  const [startDate, setStartDate] = useState<string>('');
  const [targetDate, setTargetDate] = useState<string>('');
  const [ageGroup, setAgeGroup] = useState<'normal' | 'under18orOver50'>('normal');

  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    annualLeavePerYear: number;
    totalCumulativeDays: number;
    isSpecialAgeApplied: boolean;
  } | null>(null);

  const { addToast } = useToast();
  const { theme, language } = useApp();

  const texts = {
    tr: {
      toastMissingDates: 'Lütfen işe giriş ve hesaplama tarihlerini giriniz.',
      toastInvalidDate: 'Geçersiz tarih girdiniz.',
      toastDateOrder: 'Hesaplama tarihi işe giriş tarihinden önce olamaz.',
      toastMinService: '1 yıldan az kıdemi olan işçilerin yıllık ücretli izin hakkı doğmaz.',
      toastSuccess: 'Yıllık izin süresi başarıyla hesaplandı.',
      title: 'Yıllık İzin Hesaplama',
      desc: '4857 sayılı İş Kanunu m.53 uyarınca çalışanın kıdem süresi ve yaş kriterine göre hak ettiği yıllık ücretli izin süresini hesaplar.',
      startDateLabel: 'İşe Giriş Tarihi *',
      targetDateLabel: 'Hesaplama / Ayrılış Tarihi *',
      ageLabel: 'İşçi Yaş Durumu',
      ageNormal: '18 - 50 Yaş Arası',
      ageSpecial: '18 ve daha küçük YAHUT 50 ve daha büyük',
      infoTitle: '💡 Yıllık Ücretli İzin Hakkında',
      infoP1: '4857 sayılı İş Kanunu\'nun 53. maddesine göre, işyerinde işe başladığı günden itibaren en az <strong>1 yıl</strong> çalışmış olan işçilere yıllık ücretli izin verilir.',
      infoL1: '<strong>1 yıldan 5 yıla kadar</strong> (5 yıl dâhil) olanlara: <strong>14 gün</strong>',
      infoL2: '<strong>5 yıldan fazla 15 yıldan az</strong> olanlara: <strong>20 gün</strong>',
      infoL3: '<strong>15 yıl (dâhil) ve daha fazla</strong> olanlara: <strong>26 gün</strong>',
      infoP2: 'Ancak <strong>18 ve daha küçük yaştaki</strong> işçilerle <strong>50 ve daha yukarı yaştaki</strong> işçilere verilecek yıllık ücretli izin süresi <strong>20 günden az olamaz</strong>.',
      calcBtn: 'Yıllık İznini Hesapla',
      modalTitle: 'Yıllık İzin Hesaplama Sonucu',
      calcResult: 'Hesaplanan Yıllık İzin Süresi',
      servicePeriod: 'Hizmet Süresi:',
      servicePeriodValue: (y: number, m: number, d: number) => `${y} Yıl ${m} Ay ${d} Gün`,
      lastYearLeave: 'Son Yıl İçin Hak Edilen İzin:',
      lastYearLeaveValue: (d: number) => `${d} Gün / Yıl`,
      totalLeave: 'Tüm Çalışma Süresince Hak Edilen Toplam İzin:',
      totalLeaveValue: (d: number) => `${d} Gün`,
      specialAgeInfo: '4857 s. K. m.53/5 uyarınca 18 yaşından küçük ve 50 yaşından büyük işçilere verilecek yıllık ücretli izin süresi 20 günden az olamaz hükmü uygulanmıştır.',
      basis: '* Dayanak: 4857 sayılı İş Kanunu Madde 53.'
    },
    en: {
      toastMissingDates: 'Please enter start and calculation dates.',
      toastInvalidDate: 'You entered an invalid date.',
      toastDateOrder: 'Calculation date cannot be before start date.',
      toastMinService: 'Workers with less than 1 year of seniority are not entitled to annual paid leave.',
      toastSuccess: 'Annual leave successfully calculated.',
      title: 'Annual Leave Calculator',
      desc: 'Calculates the annual paid leave duration based on seniority and age according to Article 53 of Labor Law No. 4857.',
      startDateLabel: 'Start Date *',
      targetDateLabel: 'Calculation / Departure Date *',
      ageLabel: 'Worker Age Group',
      ageNormal: 'Between 18 - 50',
      ageSpecial: 'Under 18 OR 50 and over',
      infoTitle: '💡 About Annual Paid Leave',
      infoP1: 'According to Article 53 of Labor Law No. 4857, workers who have worked for at least <strong>1 year</strong> from the day they started working are granted annual paid leave.',
      infoL1: '<strong>From 1 year to 5 years</strong> (including 5 years): <strong>14 days</strong>',
      infoL2: '<strong>More than 5 years and less than 15 years</strong>: <strong>20 days</strong>',
      infoL3: '<strong>15 years (inclusive) and more</strong>: <strong>26 days</strong>',
      infoP2: 'However, the annual paid leave to be given to workers <strong>aged 18 and under</strong> and workers <strong>aged 50 and over</strong> cannot be less than <strong>20 days</strong>.',
      calcBtn: 'Calculate Annual Leave',
      modalTitle: 'Annual Leave Calculation Result',
      calcResult: 'Calculated Annual Leave',
      servicePeriod: 'Service Period:',
      servicePeriodValue: (y: number, m: number, d: number) => `${y} Years ${m} Months ${d} Days`,
      lastYearLeave: 'Leave Entitled for the Last Year:',
      lastYearLeaveValue: (d: number) => `${d} Days / Year`,
      totalLeave: 'Total Cumulative Leave for the Entire Work Period:',
      totalLeaveValue: (d: number) => `${d} Days`,
      specialAgeInfo: 'Pursuant to Article 53/5 of Labor Law No. 4857, the provision that annual paid leave for workers under 18 and over 50 cannot be less than 20 days has been applied.',
      basis: '* Basis: Article 53 of Labor Law No. 4857.'
    }
  }[language];

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!startDate || !targetDate) {
      addToast(texts.toastMissingDates, 'error');
      return;
    }

    const start = new Date(startDate);
    const target = new Date(targetDate);

    if (isNaN(start.getTime()) || isNaN(target.getTime())) {
      addToast(texts.toastInvalidDate, 'error');
      return;
    }

    if (target < start) {
      addToast(texts.toastDateOrder, 'error');
      return;
    }

    const period = calculateServicePeriod(start, target);

    if (period.years < 1) {
      addToast(texts.toastMinService, 'warning');
      setResult({
        years: period.years,
        months: period.months,
        days: period.days,
        annualLeavePerYear: 0,
        totalCumulativeDays: 0,
        isSpecialAgeApplied: false,
      });
      return;
    }

    // Kıdeme göre yıllık izin günü
    let annualLeavePerYear = 14;
    let isSpecialAgeApplied = false;

    if (period.years >= 1 && period.years <= 5) {
      annualLeavePerYear = 14;
    } else if (period.years > 5 && period.years <= 15) {
      annualLeavePerYear = 20;
    } else if (period.years > 15) {
      annualLeavePerYear = 26;
    }

    // 18 yaş altı veya 50 yaş üstü koruması (m.53) -> En az 20 gün
    if (ageGroup === 'under18orOver50' && annualLeavePerYear < 20) {
      annualLeavePerYear = 20;
      isSpecialAgeApplied = true;
    }

    // Toplam birikmiş asgari izin günü hesabı
    let totalCumulativeDays = 0;
    for (let y = 1; y <= period.years; y++) {
      let daysForYear = 14;
      if (y >= 1 && y <= 5) daysForYear = 14;
      else if (y > 5 && y <= 15) daysForYear = 20;
      else if (y > 15) daysForYear = 26;

      if (ageGroup === 'under18orOver50' && daysForYear < 20) {
        daysForYear = 20;
      }
      totalCumulativeDays += daysForYear;
    }

    setResult({
      years: period.years,
      months: period.months,
      days: period.days,
      annualLeavePerYear,
      totalCumulativeDays,
      isSpecialAgeApplied,
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
          <Palmtree size={22} />
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
            label={texts.targetDateLabel}
            value={targetDate}
            onChange={setTargetDate}
          />
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              {texts.ageLabel}
            </label>
            <select
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value as 'normal' | 'under18orOver50')}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/50 dark:bg-darker-bg/80 border border-gray-300 dark:border-gold/30 text-gray-800 dark:text-white text-sm focus:outline-none focus:border-gold transition-colors"
            >
              <option value="normal">{texts.ageNormal}</option>
              <option value="under18orOver50">{texts.ageSpecial}</option>
            </select>
          </div>
        </div>

        {/* Hukuki Bilgi Kutusu */}
        <div className="flex-grow p-4 mt-4 rounded-xl bg-white/50 dark:bg-darker-bg/40 border border-gray-200 dark:border-gold/10 text-gray-700 dark:text-gray-300 text-sm overflow-y-auto">
          <p className="font-semibold text-gold mb-2">{texts.infoTitle}</p>
          <p className="mb-2" dangerouslySetInnerHTML={{ __html: texts.infoP1 }}></p>
          <ul className="list-disc pl-5 space-y-1 mb-2">
            <li dangerouslySetInnerHTML={{ __html: texts.infoL1 }}></li>
            <li dangerouslySetInnerHTML={{ __html: texts.infoL2 }}></li>
            <li dangerouslySetInnerHTML={{ __html: texts.infoL3 }}></li>
          </ul>
          <p dangerouslySetInnerHTML={{ __html: texts.infoP2 }}></p>
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
                <span className={`block mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{texts.lastYearLeave}</span>
                <span className="font-bold text-gold text-base">
                  {result?.annualLeavePerYear !== undefined && texts.lastYearLeaveValue(result.annualLeavePerYear)}
                </span>
              </div>
            </div>

            <div className={`p-4 rounded-xl border flex flex-col justify-center ${theme === 'dark' ? 'bg-darker-bg/60 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <span className={`block mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{texts.totalLeave}</span>
              <span className={`font-bold text-2xl ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>
                {result?.totalCumulativeDays !== undefined && texts.totalLeaveValue(result.totalCumulativeDays)}
              </span>
            </div>
          </div>

          {result?.isSpecialAgeApplied && (
            <div className={`p-4 rounded-xl border text-xs flex items-start space-x-3 mt-4 ${theme === 'dark' ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
              <Info size={18} className="mt-0.5 flex-shrink-0" />
              <span className="leading-relaxed font-medium">
                {texts.specialAgeInfo}
              </span>
            </div>
          )}

          <div className={`pt-3 text-[11px] border-t mt-4 ${theme === 'dark' ? 'text-gray-400 border-gray-700' : 'text-gray-500 border-gray-200'}`}>
            {texts.basis}
          </div>
        </div>
      </Modal>
    </div>
  );
};
