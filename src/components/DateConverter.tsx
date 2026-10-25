import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, ArrowLeftRight, RefreshCw, AlertCircle, Copy, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// BS Calendar Data (2070 - 2085 BS)
const bsMonthDays: Record<number, number[]> = {
  2070: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  2071: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2072: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2073: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2074: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  2075: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2076: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2077: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2078: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  2079: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2080: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2081: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  2082: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 30],
  2083: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2084: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2085: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 30],
};

// Start Date Anchor: 2070-01-01 BS corresponds to 2013-04-13 AD
const anchorBSYear = 2070;
const anchorBSMonth = 1; // Baisakh
const anchorBSDay = 1;
const anchorADDate = new Date('2013-04-13');

const nepaliMonths = [
  { en: 'Baisakh', ne: 'बैशाख' },
  { en: 'Jestha', ne: 'जेठ' },
  { en: 'Ashadh', ne: 'असार' },
  { en: 'Shrawan', ne: 'साउन' },
  { en: 'Bhadra', ne: 'भदौ' },
  { en: 'Ashwin', ne: 'असोज' },
  { en: 'Kartik', ne: 'कात्तिक' },
  { en: 'Mangsir', ne: 'मंसिर' },
  { en: 'Poush', ne: 'पुस' },
  { en: 'Magh', ne: 'माघ' },
  { en: 'Falgun', ne: 'फागुन' },
  { en: 'Chaitra', ne: 'चैत' },
];

const nepaliDays = [
  { en: 'Sunday', ne: 'आइतबार' },
  { en: 'Monday', ne: 'सोमबार' },
  { en: 'Tuesday', ne: 'मंगलबार' },
  { en: 'Wednesday', ne: 'बुधबार' },
  { en: 'Thursday', ne: 'बिहीबार' },
  { en: 'Friday', ne: 'शुक्रबार' },
  { en: 'Saturday', ne: 'शनिबार' },
];

export default function DateConverter() {
  const { t, language } = useLanguage();
  const [direction, setDirection] = useState<'BS_TO_AD' | 'AD_TO_BS'>('BS_TO_AD');
  
  // BS Inputs
  const [bsYear, setBsYear] = useState<number>(2081);
  const [bsMonth, setBsMonth] = useState<number>(1);
  const [bsDay, setBsDay] = useState<number>(1);
  
  // AD Inputs
  const [adDateStr, setAdDateStr] = useState<string>('2024-04-13');

  // Outputs
  const [resultAD, setResultAD] = useState<Date | null>(null);
  const [resultBS, setResultBS] = useState<{ year: number; month: number; day: number; weekday: string } | null>(null);
  
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Total days from Anchor BS to Target BS
  const getDaysFromAnchorBS = (targetYear: number, targetMonth: number, targetDay: number): number => {
    let days = 0;
    
    // Add days for complete years
    for (let y = anchorBSYear; y < targetYear; y++) {
      const yearDays = bsMonthDays[y].reduce((sum, d) => sum + d, 0);
      days += yearDays;
    }
    
    // Add days for complete months in target year
    const targetMonthsList = bsMonthDays[targetYear];
    for (let m = 0; m < targetMonth - 1; m++) {
      days += targetMonthsList[m];
    }
    
    // Add target days
    days += (targetDay - anchorBSDay);
    
    return days;
  };

  // Convert BS to AD
  const convertBsToAd = () => {
    setError('');
    if (!bsMonthDays[bsYear]) {
      setError(language === 'en' 
        ? 'Date out of supported range (2070 - 2085 BS)' 
        : 'समर्थित दायरा बाहिरको मिति (२०७० - २०८५ वि.सं.)');
      return;
    }

    const maxDays = bsMonthDays[bsYear][bsMonth - 1];
    if (bsDay > maxDays || bsDay < 1) {
      setError(language === 'en'
        ? `Invalid day for the selected month. ${nepaliMonths[bsMonth - 1].en} ${bsYear} has only ${maxDays} days.`
        : `छनोट गरिएको महिनाको लागि अमान्य दिन। ${nepaliMonths[bsMonth - 1].ne} ${bsYear} मा ${maxDays} दिन मात्र छन्।`);
      return;
    }

    const totalDays = getDaysFromAnchorBS(bsYear, bsMonth, bsDay);
    const targetAD = new Date(anchorADDate.getTime());
    targetAD.setDate(targetAD.getDate() + totalDays);
    setResultAD(targetAD);
  };

  // Convert AD to BS
  const convertAdToBs = () => {
    setError('');
    const targetAD = new Date(adDateStr);
    if (isNaN(targetAD.getTime())) {
      setError(language === 'en' 
        ? 'Please select a valid Gregorian date.' 
        : 'कृपया एक मान्य ग्रेगोरियन मिति छनौट गर्नुहोस्।');
      return;
    }

    // Check bounds
    const minAD = new Date(anchorADDate);
    // Find max AD by adding total days in supported BS range
    let totalBsDays = 0;
    for (let y = 2070; y <= 2085; y++) {
      totalBsDays += bsMonthDays[y].reduce((sum, d) => sum + d, 0);
    }
    const maxAD = new Date(anchorADDate.getTime());
    maxAD.setDate(maxAD.getDate() + totalBsDays - 1);

    if (targetAD < minAD || targetAD > maxAD) {
      setError(language === 'en'
        ? `Supported Gregorian date range: ${minAD.toLocaleDateString()} to ${maxAD.toLocaleDateString()}`
        : `समर्थित ग्रेगोरियन मिति दायरा: ${minAD.toLocaleDateString()} देखि ${maxAD.toLocaleDateString()} सम्म`);
      return;
    }

    // Calculate diff in days
    const diffTime = targetAD.getTime() - anchorADDate.getTime();
    let diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    let currentYear = anchorBSYear;
    let currentMonth = anchorBSMonth;
    let currentDay = anchorBSDay;

    while (diffDays > 0) {
      const monthDaysList = bsMonthDays[currentYear];
      const daysLeftInMonth = monthDaysList[currentMonth - 1] - currentDay + 1;

      if (diffDays >= daysLeftInMonth) {
        diffDays -= daysLeftInMonth;
        currentDay = 1;
        currentMonth++;
        if (currentMonth > 12) {
          currentMonth = 1;
          currentYear++;
        }
      } else {
        currentDay += diffDays;
        diffDays = 0;
      }
    }

    const weekdayIndex = targetAD.getDay();
    setResultBS({
      year: currentYear,
      month: currentMonth,
      day: currentDay,
      weekday: nepaliDays[weekdayIndex].en,
    });
  };

  // Run conversion on input change
  useEffect(() => {
    if (direction === 'BS_TO_AD') {
      convertBsToAd();
    } else {
      convertAdToBs();
    }
  }, [bsYear, bsMonth, bsDay, adDateStr, direction]);

  const toggleDirection = () => {
    setDirection(prev => prev === 'BS_TO_AD' ? 'AD_TO_BS' : 'BS_TO_AD');
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const adDayOfYear = resultAD ? Math.ceil((resultAD.getTime() - new Date(resultAD.getFullYear(), 0, 1).getTime()) / 86400000) : 0;

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-md text-slate-100 max-w-lg mx-auto shadow-2xl relative overflow-hidden" id="date-converter-widget">
      {/* Background Glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Title */}
      <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6 text-emerald-400" />
          <div>
            <h3 className="font-display font-semibold text-lg text-emerald-400">
              {language === 'en' ? 'Nepali Date Converter' : 'नेपाली मिति परिवर्तक'}
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              {language === 'en' ? 'Bikram Sambat (BS) ↔ Gregorian (AD)' : 'विक्रम संवत (BS) ↔ इस्वी संवत (AD)'}
            </p>
          </div>
        </div>
        <button
          onClick={toggleDirection}
          className="p-2 rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 transition-all duration-300 group flex items-center justify-center cursor-pointer"
          title={language === 'en' ? 'Toggle conversion direction' : 'परिवर्तनको दिशा बदल्नुहोस्'}
          id="btn-toggle-direction"
        >
          <ArrowLeftRight className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl flex items-center gap-2 text-xs font-medium">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Input UI */}
      <div className="space-y-4">
        {direction === 'BS_TO_AD' ? (
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono">
              {language === 'en' ? 'Enter BS Date (Nepali Calendar)' : 'वि.सं. मिति लेख्नुहोस् (नेपाली क्यालेन्डर)'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {/* Year Dropdown */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-400 font-mono">{language === 'en' ? 'Year' : 'वर्ष'}</span>
                <select
                  value={bsYear}
                  onChange={e => setBsYear(Number(e.target.value))}
                  className="bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                  id="select-bs-year"
                >
                  {Object.keys(bsMonthDays).map(y => (
                    <option key={y} value={y} className="bg-slate-900 text-slate-100">{y}</option>
                  ))}
                </select>
              </div>

              {/* Month Dropdown */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-400 font-mono">{language === 'en' ? 'Month' : 'महिना'}</span>
                <select
                  value={bsMonth}
                  onChange={e => setBsMonth(Number(e.target.value))}
                  className="bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                  id="select-bs-month"
                >
                  {nepaliMonths.map((m, idx) => (
                    <option key={idx} value={idx + 1} className="bg-slate-900 text-slate-100">
                      {idx + 1} - {language === 'en' ? m.en : m.ne}
                    </option>
                  ))}
                </select>
              </div>

              {/* Day Dropdown */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-slate-400 font-mono">{language === 'en' ? 'Day' : 'गते'}</span>
                <select
                  value={bsDay}
                  onChange={e => setBsDay(Number(e.target.value))}
                  className="bg-slate-800/80 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                  id="select-bs-day"
                >
                  {Array.from({ length: bsMonthDays[bsYear]?.[bsMonth - 1] || 32 }, (_, i) => i + 1).map(d => (
                    <option key={d} value={d} className="bg-slate-900 text-slate-100">{d}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono">
              {language === 'en' ? 'Select AD Date (English Calendar)' : 'ई.सं. मिति छनौट गर्नुहोस् (अंग्रेजी क्यालेन्डर)'}
            </label>
            <input
              type="date"
              value={adDateStr}
              onChange={e => setAdDateStr(e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 cursor-pointer font-mono"
              id="input-ad-date"
            />
          </div>
        )}

        {/* Divider / Visual Transition */}
        <div className="relative py-2 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800/80"></div>
          </div>
          <span className="relative px-3 bg-slate-900/90 text-[10px] uppercase font-mono font-bold tracking-widest text-slate-500">
            {language === 'en' ? 'Equivalent' : 'बराबर'}
          </span>
        </div>

        {/* Result UI */}
        <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 flex flex-col items-center justify-center min-h-[120px] relative group overflow-hidden">
          {direction === 'BS_TO_AD' && resultAD ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={`ad-${resultAD.toISOString()}`}
              className="text-center w-full"
            >
              <div className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-bold mb-1">
                {language === 'en' ? 'Gregorian (AD) Date' : 'ग्रेगोरियन (AD) मिति'}
              </div>
              <div className="text-2xl font-display font-bold text-slate-50 tracking-tight">
                {resultAD.toLocaleDateString(language === 'en' ? 'en-US' : 'ne-NP', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              <div className="text-xs text-slate-400 font-mono mt-1.5 flex items-center justify-center gap-1.5">
                <span>{resultAD.toISOString().split('T')[0]}</span>
                <span>•</span>
                <span>
                  {language === 'en' 
                    ? `Day ${adDayOfYear} of Year`
                    : `वर्षको ${adDayOfYear} औं दिन`
                  }
                </span>
              </div>
              <button
                onClick={() => handleCopy(`${resultAD.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`)}
                className="mt-3 inline-flex items-center gap-1 text-[10px] text-slate-400 hover:text-emerald-400 font-mono bg-slate-900/80 px-2 py-1 rounded border border-slate-800 cursor-pointer hover:border-emerald-500/20 transition-all duration-300"
                id="btn-copy-ad-result"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copied ? (language === 'en' ? 'Copied!' : 'प्रतिलिपि भयो!') : (language === 'en' ? 'Copy Date' : 'मिति प्रतिलिपि')}
              </button>
            </motion.div>
          ) : direction === 'AD_TO_BS' && resultBS ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={`bs-${resultBS.year}-${resultBS.month}-${resultBS.day}`}
              className="text-center w-full"
            >
              <div className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-bold mb-1">
                {language === 'en' ? 'Bikram Sambat (BS) Date' : 'विक्रम संवत (BS) मिति'}
              </div>
              <div className="text-2xl font-display font-bold text-slate-50 tracking-tight">
                {resultBS.year} {nepaliMonths[resultBS.month - 1].en} {resultBS.day}
              </div>
              <div className="text-base font-display text-slate-300 mt-0.5 font-medium">
                {nepaliMonths[resultBS.month - 1].ne} {resultBS.day}, {resultBS.year}
              </div>
              <div className="text-xs text-slate-400 font-mono mt-1.5">
                {language === 'en' ? resultBS.weekday : nepaliDays.find(d => d.en === resultBS.weekday)?.ne} ({nepaliDays.find(d => d.en === resultBS.weekday)?.ne})
              </div>
              <button
                onClick={() => handleCopy(`${resultBS.year}-${String(resultBS.month).padStart(2, '0')}-${String(resultBS.day).padStart(2, '0')} BS`)}
                className="mt-3 inline-flex items-center gap-1 text-[10px] text-slate-400 hover:text-emerald-400 font-mono bg-slate-900/80 px-2 py-1 rounded border border-slate-800 cursor-pointer hover:border-emerald-500/20 transition-all duration-300"
                id="btn-copy-bs-result"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copied ? (language === 'en' ? 'Copied!' : 'प्रतिलिपि भयो!') : (language === 'en' ? 'Copy BS Format' : 'BS ढाँचा प्रतिलिपि')}
              </button>
            </motion.div>
          ) : (
            <div className="text-slate-500 text-xs font-mono flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin text-slate-600" />
              <span>{language === 'en' ? 'Calculating...' : 'गणना गर्दै...'}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

