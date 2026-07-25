import { legalParameters } from '../data/legalParameters';

/**
 * Checks if a given date falls on a weekend (Saturday or Sunday)
 */
export const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6; // 0 = Sunday, 6 = Saturday
};

/**
 * Checks if a given date falls on an official holiday in Turkey
 */
export const getOfficialHolidayInfo = (date: Date): { isHoliday: boolean; name?: string } => {
  const formattedDate = date.toISOString().split('T')[0];
  const holiday = legalParameters.officialHolidays.find((h) => h.date === formattedDate);
  
  if (holiday) {
    return { isHoliday: true, name: holiday.name };
  }

  // Also check recurring month-day holidays like 29 Ekim, 23 Nisan, 19 Mayıs, 15 Temmuz, 30 Ağustos, 1 Ocak
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  if (month === 1 && day === 1) return { isHoliday: true, name: 'Yılbaşı' };
  if (month === 4 && day === 23) return { isHoliday: true, name: 'Ulusal Egemenlik ve Çocuk Bayramı' };
  if (month === 5 && day === 1) return { isHoliday: true, name: 'Emek ve Dayanışma Günü' };
  if (month === 5 && day === 19) return { isHoliday: true, name: 'Atatürk\'ü Anma, Gençlik ve Spor Bayramı' };
  if (month === 7 && day === 15) return { isHoliday: true, name: '15 Temmuz Demokrasi ve Milli Birlik Günü' };
  if (month === 8 && day === 30) return { isHoliday: true, name: 'Zafer Bayramı' };
  if (month === 10 && day === 29) return { isHoliday: true, name: 'Cumhuriyet Bayramı' };

  return { isHoliday: false };
};

export interface HMKAdjustmentResult {
  adjustedDate: Date;
  isExtended: boolean;
  originalDate: Date;
  reasons: string[];
}

/**
 * Applies HMK m.93 rule: If the last day of a period falls on a weekend or official holiday,
 * it automatically extends to the first subsequent business day.
 */
export const adjustForHMKHoliday = (originalDate: Date): HMKAdjustmentResult => {
  const current = new Date(originalDate);
  let isExtended = false;
  const reasons: string[] = [];

  let holidayInfo = getOfficialHolidayInfo(current);
  let weekend = isWeekend(current);

  while (weekend || holidayInfo.isHoliday) {
    isExtended = true;
    if (weekend) {
      const dayName = current.getDay() === 6 ? 'Cumartesi' : 'Pazar';
      reasons.push(`${dayName} (Hafta sonu)`);
    }
    if (holidayInfo.isHoliday && holidayInfo.name) {
      reasons.push(holidayInfo.name);
    }

    // Add 1 day
    current.setDate(current.getDate() + 1);
    weekend = isWeekend(current);
    holidayInfo = getOfficialHolidayInfo(current);
  }

  return {
    adjustedDate: current,
    isExtended,
    originalDate,
    reasons: Array.from(new Set(reasons)) // unique reasons
  };
};

export type HMKUnit = 'days' | 'weeks' | 'months' | 'years';

/**
 * Adds duration to a start date according to HMK m.90-95 rules and applies HMK m.93 holiday extension.
 */
export const addDurationHMK = (
  startDate: Date,
  amount: number,
  unit: HMKUnit
): HMKAdjustmentResult & { targetDateBeforeExtension: Date } => {
  const targetDate = new Date(startDate);

  if (unit === 'days') {
    targetDate.setDate(targetDate.getDate() + amount);
  } else if (unit === 'weeks') {
    // HMK: Weeks are calculated as 7 days per week
    targetDate.setDate(targetDate.getDate() + amount * 7);
  } else if (unit === 'months') {
    // HMK m.92: Months end on the day corresponding to the start date in the target month
    const startDay = targetDate.getDate();
    targetDate.setMonth(targetDate.getMonth() + amount);
    if (targetDate.getDate() !== startDay) {
      // Handles month end overflow e.g. Jan 31 -> Feb 28/29
      targetDate.setDate(0);
    }
  } else if (unit === 'years') {
    const startDay = targetDate.getDate();
    targetDate.setFullYear(targetDate.getFullYear() + amount);
    if (targetDate.getDate() !== startDay) {
      targetDate.setDate(0);
    }
  }

  const hmkResult = adjustForHMKHoliday(targetDate);

  return {
    ...hmkResult,
    targetDateBeforeExtension: targetDate
  };
};

export interface ServicePeriod {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  isInvalid?: boolean;
}

/**
 * Calculates exact service period in years, months, and days between two dates.
 */
export const calculateServicePeriod = (startDate: Date, endDate: Date): ServicePeriod => {
  if (endDate < startDate) {
    return { years: 0, months: 0, days: 0, totalDays: 0, isInvalid: true };
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months--;
    // Get last day of previous month
    const prevMonthEnd = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    days += prevMonthEnd;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const diffTime = Math.abs(end.getTime() - start.getTime());
  const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return { years, months, days, totalDays };
};

/**
 * Formats date into Turkish string "DD.MM.YYYY"
 */
export const formatDateTR = (date: Date): string => {
  if (!date || isNaN(date.getTime())) return '';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

/**
 * Formats date into Turkish verbose string e.g. "15 Temmuz 2026, Çarşamba"
 */
export const formatDateVerboseTR = (date: Date): string => {
  if (!date || isNaN(date.getTime())) return '';
  const monthNames = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];
  const dayNames = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];

  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const dayName = dayNames[date.getDay()];

  return `${day} ${month} ${year}, ${dayName}`;
};

/**
 * Formats currency to Turkish Lira string e.g. "125.450,00 TL"
 */
export const formatCurrencyTR = (amount: number): string => {
  if (isNaN(amount)) return '0,00 TL';
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};
