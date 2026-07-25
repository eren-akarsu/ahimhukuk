import React, { useState } from 'react';
import { Clock, Calculator, CheckCircle2, Info } from 'lucide-react';
import { useToast } from '../ui/Toast';
import { formatCurrencyTR } from '../../utils/dateUtils';
import { useApp } from '../../context/AppContext';
import { CustomNumberInput } from '../ui/CustomNumberInput';
import { Modal } from '../ui/Modal';

export const FazlaMesaiHesaplama: React.FC = () => {
  const [grossWage, setGrossWage] = useState<string>('');
  const [weeklyHours, setWeeklyHours] = useState<string>('');
  const [durationWeeks, setDurationWeeks] = useState<string>('52'); // Varsayılan 1 yıl (52 hafta)

  const [result, setResult] = useState<{
    hourlyRate: number;
    overtimeHourlyRate: number;
    weeklyOvertimePay: number;
    totalOvertimePay: number;
    weeksCount: number;
  } | null>(null);

  const { addToast } = useToast();
  const { theme, language } = useApp();

  const texts = {
    tr: {
      toastInvalidWage: 'Lütfen geçerli bir aylık brüt ücret giriniz.',
      toastInvalidHours: 'Lütfen haftalık fazla mesai saatini giriniz.',
      toastInvalidWeeks: 'Lütfen geçerli bir çalışma süresi (hafta) giriniz.',
      toastSuccess: 'Fazla mesai alacağı başarıyla hesaplandı.',
      title: 'Fazla Mesai Hesaplama',
      desc: '4857 sayılı İş Kanunu m.41 uyarınca aylık 225 saatlik çalışma esasına göre %50 zamlı fazla mesai alacağını hesaplar.',
      wageLabel: 'Aylık Brüt Ücret (TL) *',
      wagePlaceholder: 'Maaş',
      hoursLabel: 'Haftalık Fazla Mesai (Saat) *',
      hoursPlaceholder: 'Örn: 10',
      weeksLabel: 'Çalışılan Süre (Hafta Sayısı) *',
      weeksPlaceholder: 'Örn: 52 (1 Yıl)',
      infoTitle: '💡 Fazla Mesai (Fazla Çalışma) Hakkında',
      infoP1: '4857 sayılı İş Kanunu\'nun 41. maddesi uyarınca, haftalık 45 saati aşan çalışmalar fazla çalışma (fazla mesai) sayılır.',
      infoP2Start: 'Fazla çalışma ücreti, normal saatlik çalışma ücretinin ',
      infoP2Bold: 'yüzde elli (%50)',
      infoP2End: ' yükseltilmesiyle ödenir.',
      infoP3: 'Yargıtay uygulamalarına göre fazla mesai ücreti hesaplanırken, aylık brüt ücretin 225 saate bölünmesi suretiyle işçinin saatlik ücreti tespit edilir. Hesaplanan toplam fazla mesai alacağından, ispat durumuna göre (tanık beyanı vb.) mahkemece hakkaniyet indirimi (genellikle %30) yapılmaktadır.',
      calcBtn: 'Fazla Mesai Alacağını Hesapla',
      modalTitle: 'Fazla Mesai Hesaplama Sonucu',
      calcResult: 'Hesaplanan Fazla Mesai Alacağı',
      normalHourly: 'Normal Saat Ücreti:',
      overtimeHourly: '%50 Zamlı Mesai Saat Ücreti:',
      weeklyOvertime: 'Haftalık Fazla Mesai Ücreti:',
      perHour: ' / saat',
      grossTotal: 'Yaklaşık Toplam Brüt Fazla Mesai Alacağı:',
      forWeeks: (weeks: number) => `(${weeks} Hafta İçin)`,
      infoWarning: 'İş Kanunu m.41 uyarınca haftalık 45 saati aşan çalışmalar fazla çalışma sayılır. Yargıtay uygulamalarında davalı tarafın puantaj veya tanık anlatımlarına göre hakkaniyet indirimi (%30-%40) uygulanabilmektedir.',
      basis: '* Dayanak: 4857 sayılı İş Kanunu Madde 41.'
    },
    en: {
      toastInvalidWage: 'Please enter a valid monthly gross wage.',
      toastInvalidHours: 'Please enter weekly overtime hours.',
      toastInvalidWeeks: 'Please enter a valid working period (weeks).',
      toastSuccess: 'Overtime pay successfully calculated.',
      title: 'Overtime Pay Calculator',
      desc: 'Calculates overtime pay with a 50% increase based on a monthly 225-hour working basis according to Art.41 of the Labor Law No. 4857.',
      wageLabel: 'Monthly Gross Wage (TRY) *',
      wagePlaceholder: 'Salary',
      hoursLabel: 'Weekly Overtime (Hours) *',
      hoursPlaceholder: 'E.g.: 10',
      weeksLabel: 'Period Worked (Number of Weeks) *',
      weeksPlaceholder: 'E.g.: 52 (1 Year)',
      infoTitle: '💡 About Overtime Work',
      infoP1: 'In accordance with Article 41 of the Labor Law No. 4857, work exceeding 45 hours a week is considered overtime work.',
      infoP2Start: 'Overtime pay is paid by increasing the normal hourly wage by ',
      infoP2Bold: 'fifty percent (50%)',
      infoP2End: '.',
      infoP3: 'According to Supreme Court practices, when calculating overtime pay, the hourly wage of the worker is determined by dividing the monthly gross wage by 225 hours. From the calculated total overtime receivable, an equity discount (usually 30%) is applied by the court depending on the state of proof (witness statements, etc.).',
      calcBtn: 'Calculate Overtime Pay',
      modalTitle: 'Overtime Calculation Result',
      calcResult: 'Calculated Overtime Receivable',
      normalHourly: 'Normal Hourly Wage:',
      overtimeHourly: '50% Increased Overtime Hourly Wage:',
      weeklyOvertime: 'Weekly Overtime Pay:',
      perHour: ' / hour',
      grossTotal: 'Approximate Total Gross Overtime Receivable:',
      forWeeks: (weeks: number) => `(For ${weeks} Weeks)`,
      infoWarning: 'According to Article 41 of the Labor Law, work exceeding 45 hours a week is considered overtime. In Supreme Court practices, an equity discount (30%-40%) can be applied according to the defendant\'s timekeeping records or witness statements.',
      basis: '* Basis: Labor Law No. 4857 Article 41.'
    }
  }[language];

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    const wage = parseFloat(grossWage);
    const hours = parseFloat(weeklyHours);
    const weeks = parseFloat(durationWeeks);

    if (isNaN(wage) || wage <= 0) {
      addToast(texts.toastInvalidWage, 'error');
      return;
    }

    if (isNaN(hours) || hours <= 0) {
      addToast(texts.toastInvalidHours, 'error');
      return;
    }

    if (isNaN(weeks) || weeks <= 0) {
      addToast(texts.toastInvalidWeeks, 'error');
      return;
    }

    // 4857 s. K. uyarınca saatlik ücret = Aylık Brüt Ücret / 225
    const hourlyRate = wage / 225;
    // %50 zamlı fazla çalışma saat ücreti
    const overtimeHourlyRate = hourlyRate * 1.5;
    const weeklyOvertimePay = overtimeHourlyRate * hours;
    const totalOvertimePay = weeklyOvertimePay * weeks;

    setResult({
      hourlyRate,
      overtimeHourlyRate,
      weeklyOvertimePay,
      totalOvertimePay,
      weeksCount: weeks,
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
          <Clock size={22} />
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
          <div>
            <CustomNumberInput
              label={texts.wageLabel}
              value={grossWage}
              onChange={(val) => setGrossWage(val.toString())}
              placeholder={texts.wagePlaceholder}
              step={100}
            />
          </div>

          <div>
            <CustomNumberInput
              label={texts.hoursLabel}
              value={weeklyHours}
              onChange={(val) => setWeeklyHours(val.toString())}
              placeholder={texts.hoursPlaceholder}
              step={1}
            />
          </div>

          <div>
            <CustomNumberInput
              label={texts.weeksLabel}
              value={durationWeeks}
              onChange={(val) => setDurationWeeks(val.toString())}
              placeholder={texts.weeksPlaceholder}
              step={1}
            />
          </div>
        </div>

        {/* Hukuki Bilgi Kutusu */}
        <div className="flex-grow p-4 mt-4 rounded-xl bg-white/50 dark:bg-darker-bg/40 border border-gray-200 dark:border-gold/10 text-gray-700 dark:text-gray-300 text-sm overflow-y-auto">
          <p className="font-semibold text-gold mb-2">{texts.infoTitle}</p>
          <p className="mb-2">{texts.infoP1}</p>
          <p className="mb-2">{texts.infoP2Start}<strong>{texts.infoP2Bold}</strong>{texts.infoP2End}</p>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-darker-bg/60 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <span className={`block text-xs mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{texts.normalHourly}</span>
              <span className={`font-semibold text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{result?.hourlyRate && formatCurrencyTR(result.hourlyRate)}{texts.perHour}</span>
            </div>

            <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-darker-bg/60 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <span className={`block text-xs mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{texts.overtimeHourly}</span>
              <span className={`font-semibold text-sm ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>{result?.overtimeHourlyRate && formatCurrencyTR(result.overtimeHourlyRate)}{texts.perHour}</span>
            </div>

            <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-darker-bg/60 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <span className={`block text-xs mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{texts.weeklyOvertime}</span>
              <span className={`font-semibold text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{result?.weeklyOvertimePay && formatCurrencyTR(result.weeklyOvertimePay)}</span>
            </div>
          </div>

          <div className={`p-4 rounded-xl border flex items-center justify-between ${theme === 'dark' ? 'bg-gold/10 border-gold/40' : 'bg-gold/5 border-gold/30'}`}>
            <div>
              <span className={`text-xs block font-semibold mb-1 ${theme === 'dark' ? 'text-gold' : 'text-gold-dark'}`}>{texts.grossTotal}</span>
              <span className={`text-xs ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{result?.weeksCount && texts.forWeeks(result.weeksCount)}</span>
            </div>
            <span className="text-2xl font-bold text-gold">{result?.totalOvertimePay && formatCurrencyTR(result.totalOvertimePay)}</span>
          </div>

          <div className={`p-3 rounded-lg text-xs flex items-start space-x-3 mt-4 border ${theme === 'dark' ? 'bg-emerald-900/20 border-emerald-500/30 text-gray-300' : 'bg-emerald-50 border-emerald-200 text-gray-700'}`}>
            <Info size={18} className={`mt-0.5 flex-shrink-0 ${theme === 'dark' ? 'text-gold' : 'text-emerald-600'}`} />
            <span className="leading-relaxed">
              {texts.infoWarning}
            </span>
          </div>

          <div className={`pt-3 text-[11px] border-t mt-4 ${theme === 'dark' ? 'text-gray-400 border-gray-700' : 'text-gray-500 border-gray-200'}`}>
            {texts.basis}
          </div>
        </div>
      </Modal>
    </div>
  );
};
