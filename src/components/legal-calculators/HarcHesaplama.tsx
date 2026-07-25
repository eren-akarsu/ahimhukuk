import React, { useState } from 'react';
import { Coins, Calculator, CheckCircle2, Info } from 'lucide-react';
import { useToast } from '../ui/Toast';
import { formatCurrencyTR } from '../../utils/dateUtils';
import { legalParameters } from '../../data/legalParameters';
import { useApp } from '../../context/AppContext';
import { CustomNumberInput } from '../ui/CustomNumberInput';
import { Modal } from '../ui/Modal';

export const HarcHesaplama: React.FC = () => {
  const [caseValue, setCaseValue] = useState<string>('');
  const [feeType, setFeeType] = useState<'nispi' | 'maktu'>('nispi');

  const [result, setResult] = useState<{
    caseValueAmount: number;
    applicationFee: number; // Başvuru Harcı
    decisionFeeTotal: number; // Nispi Karar ve İlam Harcı (Toplam %o 68.31)
    advanceFee: number; // Peşin Harç (1/4)
    powerOfAttorneyFee: number; // Vekalet Harcı
    estimatedExpenseAdvance: number; // Gider Avansı
    totalInitialCost: number; // Dava Açılış Toplam Gideri
  } | null>(null);

  const { addToast } = useToast();
  const { theme, language } = useApp();

  const texts = {
    tr: {
      toastInvalidValue: 'Lütfen geçerli bir dava değeri giriniz.',
      toastSuccess: 'Dava harcı ve giderleri başarıyla hesaplandı.',
      title: 'Dava Harç ve Gideri Hesaplama',
      desc: '492 sayılı Harçlar Kanunu tarifesine göre maktu başvuru harcı, nispi peşin harç ve tahmini açılış masraflarını hesaplar.',
      typeLabel: 'Dava / Harç Türü',
      optNispi: 'Nispi Harçlı Dava (Konusu Para/Malvarlığı Olan)',
      optMaktu: 'Maktu Harçlı Dava (Konusu Para Olmayan)',
      valueLabel: 'Dava Değeri / Alacak Tutarı (TL) *',
      valuePlaceholder: 'Örn: 250000',
      infoTitle: '💡 Dava Harçları ve Giderleri Hakkında',
      infoP1Start: 'Maktu Harca Tabi Davalar:',
      infoP1End: ' Konusu belli bir değer (para) ile ölçülemeyen (örn: boşanma, tahliye, velayet) davalardır. Başvuru harcı ve peşin maktu harç maktu olarak (sabit tutar) alınır.',
      infoP2Start: 'Nispi Harca Tabi Davalar:',
      infoP2End1: ' Konusu para veya parayla değerlendirilebilen malvarlığı hakları olan davalardır (örn: alacak davaları, tapu iptal ve tescil). Nispi harç oranı toplam ',
      infoP2Bold: 'binde 68,31',
      infoP2End2: ' olup, dava açılırken bu tutarın dörtte biri (1/4) peşin olarak tahsil edilir.',
      infoP3Start: 'Gider Avansı:',
      infoP3End: ' HMK m.120 gereği dava açılırken mahkeme veznesine yatırılması zorunlu tebligat, bilirkişi vb. masraflar için alınan avans miktarıdır.',
      calcBtn: 'Dava Harcını Hesapla',
      modalTitle: 'Harç ve Masraf Hesaplama Sonucu',
      calcResult: 'Hesaplanan Dava Masrafları (Yaklaşık)',
      appFee: 'Başvuru Harcı:',
      advFee: 'Peşin Karar ve İlam Harcı (1/4):',
      powFee: 'Vekalet Harcı:',
      estAdv: 'Tahmini Gider Avansı:',
      decFeeTotal: 'Toplam Nispi Karar Harcı (%o 68.31):',
      totalCost: 'Yaklaşık Toplam Dava Açılış Masrafı:',
      totalCostDesc: '(Başvuru + Peşin Harç + Gider Avansı + Vekalet Harcı)',
      infoWarning: 'Harç tarifeleri her takvim yılı başında Hazine ve Maliye Bakanlığı tarafından güncellenmektedir. Dava açılırken ödenen peşin harç, dava sonunda karar harcından mahsup edilir.',
      basis: '* Dayanak: 492 sayılı Harçlar Kanunu, HMK Gider Avansı Tarifesi.'
    },
    en: {
      toastInvalidValue: 'Please enter a valid case value.',
      toastSuccess: 'Lawsuit fees and expenses successfully calculated.',
      title: 'Lawsuit Fee and Expense Calculator',
      desc: 'Calculates the fixed application fee, proportional advance fee and estimated initial costs according to the tariff of Fees Law No. 492.',
      typeLabel: 'Lawsuit / Fee Type',
      optNispi: 'Lawsuit with Proportional Fee (Subject is Money/Property)',
      optMaktu: 'Lawsuit with Fixed Fee (Subject is Not Money)',
      valueLabel: 'Case Value / Receivable Amount (TRY) *',
      valuePlaceholder: 'E.g.: 250000',
      infoTitle: '💡 About Lawsuit Fees and Expenses',
      infoP1Start: 'Lawsuits Subject to Fixed Fees:',
      infoP1End: ' These are lawsuits whose subject cannot be measured with a specific value (money) (e.g. divorce, eviction, custody). The application fee and advance fixed fee are collected as a fixed amount.',
      infoP2Start: 'Lawsuits Subject to Proportional Fees:',
      infoP2End1: ' These are lawsuits whose subject is money or property rights that can be valued in money (e.g. receivables, title deed cancellation and registration). The proportional fee rate is a total of ',
      infoP2Bold: '68.31 per thousand',
      infoP2End2: ', and one-fourth (1/4) of this amount is collected in advance when the lawsuit is filed.',
      infoP3Start: 'Expense Advance:',
      infoP3End: ' Pursuant to HMK Art. 120, it is the advance amount collected for notification, expert, etc. expenses that must be deposited into the court cashier when a lawsuit is filed.',
      calcBtn: 'Calculate Lawsuit Fee',
      modalTitle: 'Fee and Expense Calculation Result',
      calcResult: 'Calculated Lawsuit Expenses (Approximate)',
      appFee: 'Application Fee:',
      advFee: 'Advance Decision and Judgment Fee (1/4):',
      powFee: 'Power of Attorney Fee:',
      estAdv: 'Estimated Expense Advance:',
      decFeeTotal: 'Total Proportional Decision Fee (68.31 per thousand):',
      totalCost: 'Approximate Total Initial Lawsuit Cost:',
      totalCostDesc: '(Application + Advance Fee + Expense Advance + Power of Attorney Fee)',
      infoWarning: 'Fee tariffs are updated by the Ministry of Treasury and Finance at the beginning of each calendar year. The advance fee paid when the lawsuit is filed is deducted from the decision fee at the end of the lawsuit.',
      basis: '* Basis: Fees Law No. 492, HMK Expense Advance Tariff.'
    }
  }[language];

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    const val = parseFloat(caseValue);

    if (feeType === 'nispi' && (isNaN(val) || val <= 0)) {
      addToast(texts.toastInvalidValue, 'error');
      return;
    }

    const { harclar } = legalParameters;
    const applicationFee = harclar.basvuruHarciMaktu;
    const powerOfAttorneyFee = harclar.vekaletHarci;
    const estimatedExpenseAdvance = harclar.giderAvansiTahmini;

    let decisionFeeTotal = 0;
    let advanceFee = 0;

    if (feeType === 'nispi') {
      const caseVal = val;
      decisionFeeTotal = caseVal * harclar.kararVeiLamHarciNispiOran;
      advanceFee = decisionFeeTotal * harclar.pesinHarcOrani;
    } else {
      // Maktu harçlı davalarda peşin karar harcı maktu alınır (başvuru harcı düzeyinde)
      decisionFeeTotal = applicationFee;
      advanceFee = applicationFee;
    }

    const totalInitialCost = applicationFee + advanceFee + powerOfAttorneyFee + estimatedExpenseAdvance;

    setResult({
      caseValueAmount: feeType === 'nispi' ? val : 0,
      applicationFee,
      decisionFeeTotal,
      advanceFee,
      powerOfAttorneyFee,
      estimatedExpenseAdvance,
      totalInitialCost,
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
          <Coins size={22} />
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
              value={feeType}
              onChange={(e) => setFeeType(e.target.value as 'nispi' | 'maktu')}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/50 dark:bg-darker-bg/80 border border-gray-300 dark:border-gold/30 text-gray-800 dark:text-white text-sm focus:outline-none focus:border-gold transition-colors"
            >
              <option value="nispi">{texts.optNispi}</option>
              <option value="maktu">{texts.optMaktu}</option>
            </select>
          </div>

          {feeType === 'nispi' && (
            <div>
              <CustomNumberInput
                label={texts.valueLabel}
                value={caseValue}
                onChange={(val) => setCaseValue(val.toString())}
                placeholder={texts.valuePlaceholder}
                step={1000}
              />
            </div>
          )}
        </div>

        {/* Hukuki Bilgi Kutusu */}
        <div className="flex-grow p-4 mt-4 rounded-xl bg-white/50 dark:bg-darker-bg/40 border border-gray-200 dark:border-gold/10 text-gray-700 dark:text-gray-300 text-sm overflow-y-auto">
          <p className="font-semibold text-gold mb-2">{texts.infoTitle}</p>
          <p className="mb-2"><strong>{texts.infoP1Start}</strong>{texts.infoP1End}</p>
          <p className="mb-2"><strong>{texts.infoP2Start}</strong>{texts.infoP2End1}<strong>{texts.infoP2Bold}</strong>{texts.infoP2End2}</p>
          <p><strong>{texts.infoP3Start}</strong>{texts.infoP3End}</p>
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
              <div className="flex justify-between">
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>{texts.appFee}</span>
                <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{result?.applicationFee && formatCurrencyTR(result.applicationFee)}</span>
              </div>
              <div className="flex justify-between">
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>{texts.advFee}</span>
                <span className="font-semibold text-gold">{result?.advanceFee && formatCurrencyTR(result.advanceFee)}</span>
              </div>
              <div className="flex justify-between">
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>{texts.powFee}</span>
                <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{result?.powerOfAttorneyFee && formatCurrencyTR(result.powerOfAttorneyFee)}</span>
              </div>
            </div>

            <div className={`p-4 rounded-xl border space-y-2 ${theme === 'dark' ? 'bg-darker-bg/60 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex justify-between">
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>{texts.estAdv}</span>
                <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{result?.estimatedExpenseAdvance && formatCurrencyTR(result.estimatedExpenseAdvance)}</span>
              </div>
              {feeType === 'nispi' && (
                <div className={`flex justify-between border-t pt-2 mt-2 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>{texts.decFeeTotal}</span>
                  <span className={`font-semibold ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>{result?.decisionFeeTotal && formatCurrencyTR(result.decisionFeeTotal)}</span>
                </div>
              )}
            </div>
          </div>

          <div className={`p-4 rounded-xl border flex items-center justify-between ${theme === 'dark' ? 'bg-gold/10 border-gold/40' : 'bg-gold/5 border-gold/30'}`}>
            <div>
              <span className={`text-xs block font-semibold mb-1 ${theme === 'dark' ? 'text-gold' : 'text-gold-dark'}`}>{texts.totalCost}</span>
              <span className={`text-[11px] ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{texts.totalCostDesc}</span>
            </div>
            <span className="text-2xl font-bold text-gold">{result?.totalInitialCost && formatCurrencyTR(result.totalInitialCost)}</span>
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
