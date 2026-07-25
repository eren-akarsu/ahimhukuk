import React, { useState } from 'react';
import { Percent, Calculator, CheckCircle2, Info } from 'lucide-react';
import { useToast } from '../ui/Toast';
import { calculateServicePeriod, formatCurrencyTR } from '../../utils/dateUtils';
import { legalParameters } from '../../data/legalParameters';
import { useApp } from '../../context/AppContext';
import { CustomNumberInput } from '../ui/CustomNumberInput';
import { CustomDateInput } from '../ui/CustomDateInput';
import { Modal } from '../ui/Modal';

export const FaizHesaplama: React.FC = () => {
  const [principal, setPrincipal] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [interestType, setInterestType] = useState<'yasal' | 'avans' | 'ticari' | 'temerrut' | 'custom'>('yasal');
  const [customRate, setCustomRate] = useState<string>('24');

  const [result, setResult] = useState<{
    principalAmount: number;
    daysCount: number;
    rateUsed: number;
    interestAmount: number;
    totalAmount: number;
    interestTypeName: string;
  } | null>(null);

  const { addToast } = useToast();
  const { theme, language } = useApp();

  const texts = {
    tr: {
      toastInvalidAmount: 'Lütfen geçerli bir alacak tutarı giriniz.',
      toastMissingDates: 'Lütfen faiz başlangıç ve bitiş tarihlerini giriniz.',
      toastInvalidDate: 'Geçersiz tarih girdiniz.',
      toastDateOrder: 'Faiz bitiş tarihi başlangıç tarihinden önce olamaz.',
      toastInvalidRate: 'Faiz oranı 0\'dan küçük olamaz.',
      toastMin1Day: 'Tarihler arasında en az 1 gün olmalıdır.',
      toastSuccess: 'Faiz alacağı başarıyla hesaplandı.',
      nameLegal: 'Yasal Faiz (%24)',
      nameAdvance: 'Avans Faizi (%48)',
      nameCommercial: 'Ticari Faiz (%48)',
      nameDefault: 'Temerrüt Faizi (%24)',
      nameCustom: (rate: string) => `Özel Oran (%${rate})`,
      title: 'Faiz Hesaplama',
      desc: '6098 sayılı Türk Borçlar Kanunu ve 3095 sayılı Kanun çerçevesinde Basit Faiz hesabını gerçekleştirir.',
      amountLabel: 'Alacak Tutarı (Ana Para TL) *',
      amountPlaceholder: 'Örn: 100000',
      typeLabel: 'Faiz Türü / Oranı',
      optLegal: 'Yasal Faiz (%24)',
      optAdvance: 'Avans Faizi (%48 - Ticari İşler)',
      optCommercial: 'Ticari Faiz (%48)',
      optDefault: 'Temerrüt Faizi (%24)',
      optCustom: 'Özel Faiz Oranı (%)',
      customRateLabel: 'Özel Yıllık Faiz Oranı (%) *',
      customRatePlaceholder: 'Örn: 30',
      startDateLabel: 'Faiz Başlangıç Tarihi *',
      endDateLabel: 'Faiz Bitiş / Hesaplama Tarihi *',
      infoTitle: '💡 Yasal ve Temerrüt Faizi',
      infoP1Start: 'Yasal Faiz (%24):',
      infoP1End: ' Sözleşme ile faiz belirlenmemiş işlerde uygulanır.',
      infoP2Start: 'Avans/Ticari Faiz (%48):',
      infoP2End: ' Ticari işlerde temerrüt durumunda uygulanır. Basit faiz yöntemiyle (anapara x oran x gün / 36500) hesaplanır.',
      calcBtn: 'Faizi Hesapla',
      modalTitle: 'Faiz Hesaplama Sonucu',
      calcResult: 'Hesaplanan Faiz Sonucu',
      principalAmount: 'Ana Para Tutarı:',
      daysCount: 'Hesaplanan Gün Sayısı:',
      days: 'Gün',
      interestType: 'Faiz Türü / Oranı:',
      totalInterest: 'Hesaplanan Toplam Faiz:',
      grandTotal: 'Genel Toplam (Ana Para + Faiz):',
      formulaText: 'Formül: (Ana Para × Yıllık Faiz Oranı × Gün Sayısı) / 36.500. Ticari ve adli uyuşmazlıklarda temerrüt ve faiz başlangıç tarihleri davanın açıldığı tarih, ihtarname tebliği veya muacceliyet anına göre belirlenir.',
      basis: '* Dayanak: 3095 sayılı Kanun ve 6098 sayılı Türk Borçlar Kanunu Madde 88 - 120.'
    },
    en: {
      toastInvalidAmount: 'Please enter a valid principal amount.',
      toastMissingDates: 'Please enter interest start and end dates.',
      toastInvalidDate: 'You entered an invalid date.',
      toastDateOrder: 'Interest end date cannot be before the start date.',
      toastInvalidRate: 'Interest rate cannot be less than 0.',
      toastMin1Day: 'There must be at least 1 day between dates.',
      toastSuccess: 'Interest successfully calculated.',
      nameLegal: 'Legal Interest (24%)',
      nameAdvance: 'Advance Interest (48%)',
      nameCommercial: 'Commercial Interest (48%)',
      nameDefault: 'Default Interest (24%)',
      nameCustom: (rate: string) => `Custom Rate (${rate}%)`,
      title: 'Interest Calculator',
      desc: 'Calculates Simple Interest within the framework of Turkish Code of Obligations No. 6098 and Law No. 3095.',
      amountLabel: 'Principal Amount (TRY) *',
      amountPlaceholder: 'E.g.: 100000',
      typeLabel: 'Interest Type / Rate',
      optLegal: 'Legal Interest (24%)',
      optAdvance: 'Advance Interest (48% - Commercial Affairs)',
      optCommercial: 'Commercial Interest (48%)',
      optDefault: 'Default Interest (24%)',
      optCustom: 'Custom Interest Rate (%)',
      customRateLabel: 'Custom Annual Interest Rate (%) *',
      customRatePlaceholder: 'E.g.: 30',
      startDateLabel: 'Interest Start Date *',
      endDateLabel: 'Interest End / Calculation Date *',
      infoTitle: '💡 Legal and Default Interest',
      infoP1Start: 'Legal Interest (24%):',
      infoP1End: ' Applied in matters where interest is not determined by contract.',
      infoP2Start: 'Advance/Commercial Interest (48%):',
      infoP2End: ' Applied in case of default in commercial affairs. Calculated using the simple interest method (principal x rate x days / 36500).',
      calcBtn: 'Calculate Interest',
      modalTitle: 'Interest Calculation Result',
      calcResult: 'Calculated Interest Result',
      principalAmount: 'Principal Amount:',
      daysCount: 'Calculated Number of Days:',
      days: 'Days',
      interestType: 'Interest Type / Rate:',
      totalInterest: 'Calculated Total Interest:',
      grandTotal: 'Grand Total (Principal + Interest):',
      formulaText: 'Formula: (Principal × Annual Interest Rate × Number of Days) / 36,500. In commercial and judicial disputes, default and interest start dates are determined according to the date the lawsuit was filed, the notification of a warning letter, or the moment of maturity.',
      basis: '* Basis: Law No. 3095 and Turkish Code of Obligations No. 6098 Articles 88 - 120.'
    }
  }[language];

  const getRateAndName = (): { rate: number; name: string } => {
    switch (interestType) {
      case 'yasal':
        return { rate: legalParameters.faizOranlari.yasalFaiz, name: texts.nameLegal };
      case 'avans':
        return { rate: legalParameters.faizOranlari.avansFaizi, name: texts.nameAdvance };
      case 'ticari':
        return { rate: legalParameters.faizOranlari.ticariFaiz, name: texts.nameCommercial };
      case 'temerrut':
        return { rate: legalParameters.faizOranlari.temerrutFaizi, name: texts.nameDefault };
      case 'custom':
        return { rate: parseFloat(customRate) || 0, name: texts.nameCustom(customRate) };
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    const pVal = parseFloat(principal);
    if (isNaN(pVal) || pVal <= 0) {
      addToast(texts.toastInvalidAmount, 'error');
      return;
    }

    if (!startDate || !endDate) {
      addToast(texts.toastMissingDates, 'error');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      addToast(texts.toastInvalidDate, 'error');
      return;
    }

    if (end < start) {
      addToast(texts.toastDateOrder, 'error');
      return;
    }

    const { rate, name } = getRateAndName();
    if (rate < 0) {
      addToast(texts.toastInvalidRate, 'error');
      return;
    }

    const period = calculateServicePeriod(start, end);
    const daysCount = period.totalDays;

    if (daysCount <= 0) {
      addToast(texts.toastMin1Day, 'warning');
      return;
    }

    // Basit Faiz Formülü: Ana Para * Faiz Oranı * Gün / 36500
    const interestAmount = (pVal * rate * daysCount) / 36500;
    const totalAmount = pVal + interestAmount;

    setResult({
      principalAmount: pVal,
      daysCount,
      rateUsed: rate,
      interestAmount,
      totalAmount,
      interestTypeName: name,
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
          <Percent size={22} />
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
            <CustomNumberInput
              label={texts.amountLabel}
              value={principal}
              onChange={(val) => setPrincipal(val.toString())}
              placeholder={texts.amountPlaceholder}
              step={1000}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              {texts.typeLabel}
            </label>
            <select
              value={interestType}
              onChange={(e) => setInterestType(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/50 dark:bg-darker-bg/80 border border-gray-300 dark:border-gold/30 text-gray-800 dark:text-white text-sm focus:outline-none focus:border-gold transition-colors"
            >
              <option value="yasal">{texts.optLegal}</option>
              <option value="avans">{texts.optAdvance}</option>
              <option value="ticari">{texts.optCommercial}</option>
              <option value="temerrut">{texts.optDefault}</option>
              <option value="custom">{texts.optCustom}</option>
            </select>
          </div>
        </div>

        {interestType === 'custom' && (
          <div>
            <CustomNumberInput
              label={texts.customRateLabel}
              value={customRate}
              onChange={(val) => setCustomRate(val.toString())}
              placeholder={texts.customRatePlaceholder}
              step={1}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>

        {/* Hukuki Bilgi Kutusu */}
        <div className="flex-grow min-h-0 p-4 mt-4 rounded-xl bg-white/50 dark:bg-darker-bg/40 border border-gray-200 dark:border-gold/10 text-gray-700 dark:text-gray-300 text-sm overflow-y-auto">
          <p className="font-semibold text-gold mb-2">{texts.infoTitle}</p>
          <p className="mb-2"><strong>{texts.infoP1Start}</strong>{texts.infoP1End}</p>
          <p><strong>{texts.infoP2Start}</strong>{texts.infoP2End}</p>
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
              <span className={`block text-xs mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{texts.principalAmount}</span>
              <span className={`font-semibold text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{result?.principalAmount && formatCurrencyTR(result.principalAmount)}</span>
            </div>

            <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-darker-bg/60 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <span className={`block text-xs mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{texts.daysCount}</span>
              <span className={`font-semibold text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{result?.daysCount} {texts.days}</span>
            </div>

            <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-darker-bg/60 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <span className={`block text-xs mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{texts.interestType}</span>
              <span className="font-semibold text-sm text-gold">{result?.interestTypeName}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-emerald-900/20 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'}`}>
              <span className={`text-xs block mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{texts.totalInterest}</span>
              <span className={`font-bold text-xl ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>+{result?.interestAmount && formatCurrencyTR(result.interestAmount)}</span>
            </div>

            <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-gold/10 border-gold/40' : 'bg-gold/5 border-gold/30'}`}>
              <span className={`text-xs block font-semibold mb-1 ${theme === 'dark' ? 'text-gold' : 'text-gold-dark'}`}>{texts.grandTotal}</span>
              <span className="font-bold text-2xl text-gold">{result?.totalAmount && formatCurrencyTR(result.totalAmount)}</span>
            </div>
          </div>

          <div className={`p-3 rounded-lg text-xs flex items-start space-x-3 mt-4 border ${theme === 'dark' ? 'bg-primary/10 border-primary-light/20 text-gray-300' : 'bg-blue-50 border-blue-200 text-gray-700'}`}>
            <Info size={18} className={`mt-0.5 flex-shrink-0 ${theme === 'dark' ? 'text-gold' : 'text-primary'}`} />
            <span className="leading-relaxed">
              {texts.formulaText}
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
