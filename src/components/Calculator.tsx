import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Delete, Trash2, HelpCircle, Coins, Award, History } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Calculator() {
  const { t, language } = useLanguage();
  const [display, setDisplay] = useState<string>('');
  const [equation, setEquation] = useState<string>('');
  const [memory, setMemory] = useState<number>(0);
  const [isScientific, setIsScientific] = useState<boolean>(false);
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  
  // Fun gamification: "Earn money by Calculating"
  const [tokens, setTokens] = useState<number>(() => {
    const saved = localStorage.getItem('raunak_math_tokens');
    return saved ? parseFloat(saved) : 0.00;
  });
  const [showEarnAnimation, setShowEarnAnimation] = useState<boolean>(false);
  const [earnedAmount, setEarnedAmount] = useState<number>(0);

  const handleNumClick = (val: string) => {
    setDisplay(prev => prev + val);
    setEquation(prev => prev + val);
  };

  const handleOperatorClick = (op: string) => {
    let mathOp = op;
    if (op === '×') mathOp = '*';
    if (op === '÷') mathOp = '/';
    
    setDisplay(prev => prev + ' ' + op + ' ');
    setEquation(prev => prev + mathOp);
  };

  const handleClear = () => {
    setDisplay('');
    setEquation('');
  };

  const handleDelete = () => {
    if (display.endsWith(' ')) {
      setDisplay(prev => prev.slice(0, -3));
      setEquation(prev => prev.slice(0, -3));
    } else if (display.length > 0) {
      setDisplay(prev => prev.slice(0, -1));
      setEquation(prev => prev.slice(0, -1));
    }
  };

  const calculateResult = () => {
    try {
      if (!equation) return;
      
      // Basic security sanitization for eval
      const sanitizedEq = equation.replace(/[^0-9+\-*/().]/g, '');
      
      // Perform math
      const result = Function(`"use strict"; return (${sanitizedEq})`)();
      
      if (result === undefined || isNaN(result) || !isFinite(result)) {
        throw new Error('Math Error');
      }

      const calculationString = `${display} = ${result}`;
      setHistory(prev => [calculationString, ...prev.slice(0, 9)]);
      setDisplay(String(result));
      setEquation(String(result));

      // Fictional Earn Mechanic: "Earn money by Calculating"
      // Give 0.05 - 0.25 tokens per successful unique calculation
      const reward = parseFloat((Math.random() * 0.2 + 0.05).toFixed(2));
      const newTokens = parseFloat((tokens + reward).toFixed(2));
      setTokens(newTokens);
      localStorage.setItem('raunak_math_tokens', String(newTokens));
      setEarnedAmount(reward);
      setShowEarnAnimation(true);
      setTimeout(() => setShowEarnAnimation(false), 2000);

    } catch (err) {
      setDisplay('Error');
      setEquation('');
    }
  };

  const handleScientificOp = (op: string) => {
    try {
      let val = parseFloat(display);
      if (isNaN(val)) {
        val = 0;
      }
      
      let res = 0;
      let label = '';
      
      switch (op) {
        case 'sin':
          res = Math.sin(val * Math.PI / 180);
          label = `sin(${val}° )`;
          break;
        case 'cos':
          res = Math.cos(val * Math.PI / 180);
          label = `cos(${val}° )`;
          break;
        case 'tan':
          res = Math.tan(val * Math.PI / 180);
          label = `tan(${val}° )`;
          break;
        case 'sqrt':
          if (val < 0) throw new Error('Invalid Input');
          res = Math.sqrt(val);
          label = `√(${val})`;
          break;
        case 'log':
          if (val <= 0) throw new Error('Invalid Input');
          res = Math.log10(val);
          label = `log(${val})`;
          break;
        case 'ln':
          if (val <= 0) throw new Error('Invalid Input');
          res = Math.log(val);
          label = `ln(${val})`;
          break;
        case 'sq':
          res = Math.pow(val, 2);
          label = `(${val})²`;
          break;
        case 'pi':
          res = Math.PI;
          label = 'π';
          break;
        case 'e':
          res = Math.E;
          label = 'e';
          break;
        default:
          return;
      }

      const formattedRes = parseFloat(res.toFixed(8));
      setDisplay(String(formattedRes));
      setEquation(String(formattedRes));
      setHistory(prev => [`${label} = ${formattedRes}`, ...prev.slice(0, 9)]);

      const reward = parseFloat((Math.random() * 0.3 + 0.1).toFixed(2));
      const newTokens = parseFloat((tokens + reward).toFixed(2));
      setTokens(newTokens);
      localStorage.setItem('raunak_math_tokens', String(newTokens));
      setEarnedAmount(reward);
      setShowEarnAnimation(true);
      setTimeout(() => setShowEarnAnimation(false), 2000);

    } catch (err) {
      setDisplay('Error');
      setEquation('');
    }
  };

  const handleMemory = (op: string) => {
    const currentVal = parseFloat(display) || 0;
    switch (op) {
      case 'MC':
        setMemory(0);
        break;
      case 'MR':
        setDisplay(String(memory));
        setEquation(String(memory));
        break;
      case 'M+':
        setMemory(prev => prev + currentVal);
        break;
      case 'M-':
        setMemory(prev => prev - currentVal);
        break;
    }
  };

  const resetTokens = () => {
    setTokens(0);
    localStorage.setItem('raunak_math_tokens', '0');
  };

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-5 backdrop-blur-md text-slate-100 max-w-sm mx-auto shadow-2xl relative overflow-hidden" id="calculator-widget">
      {/* Background Glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Reward Notification Banner */}
      <AnimatePresence>
        {showEarnAnimation && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-amber-500 text-slate-950 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold shadow-lg"
          >
            <Coins className="w-4 h-4 animate-bounce" />
            <span>
              {language === 'en' 
                ? `Earned +$${earnedAmount.toFixed(2)} mock cash!` 
                : `+$${earnedAmount.toFixed(2)} काल्पनिक पैसा कमाउनुभयो!`}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header and Mock Mining Widget */}
      <div className="flex flex-col gap-2 mb-4 border-b border-slate-800/80 pb-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="font-display font-semibold text-base text-amber-400">
              {language === 'en' ? 'Earn-by-Calc Miner' : 'हिसाब गरेर कमाउने माइनर'}
            </h3>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-950/60 border border-slate-800 px-2 py-1 rounded-xl text-xs font-mono font-bold text-emerald-400">
            <Coins className="w-3.5 h-3.5" />
            <span>${tokens.toFixed(2)}</span>
            {tokens > 0 && (
              <button onClick={resetTokens} className="text-[9px] text-slate-500 hover:text-red-400 font-mono ml-1 hover:underline cursor-pointer" id="btn-reset-tokens">
                {language === 'en' ? 'Reset' : 'रिसेट'}
              </button>
            )}
          </div>
        </div>
        <p className="text-[10px] text-slate-400 leading-normal">
          {language === 'en' 
            ? 'Solve equations to "mine" simulated cash reward. Fictional demo of standard & scientific calculator features.'
            : 'समीकरणहरू समाधान गरेर काल्पनिक पुरस्कार माइन गर्नुहोस्। साधारण र वैज्ञानिक क्यालकुलेटर सुविधाहरूको काल्पनिक प्रदर्शन।'}
        </p>
      </div>

      {/* Screen Display */}
      <div className="bg-slate-950/90 border border-slate-850 rounded-2xl p-4 mb-4 relative flex flex-col justify-end items-end min-h-[90px] overflow-hidden">
        {/* History button */}
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="absolute top-2 left-2 p-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
          title={language === 'en' ? 'Calculation History' : 'हिसाबको इतिहास'}
          id="btn-calculator-history"
        >
          <History className="w-3.5 h-3.5" />
        </button>

        {/* History Panel Overlay */}
        {showHistory && (
          <div className="absolute inset-0 bg-slate-950/95 z-10 p-3 overflow-y-auto flex flex-col text-xs text-slate-300">
            <div className="flex justify-between items-center mb-2 pb-1 border-b border-slate-850">
              <span className="font-bold text-[10px] tracking-wider text-slate-400 font-mono">
                {language === 'en' ? 'CALCULATION HISTORY' : 'हिसाबको इतिहास'}
              </span>
              <button onClick={() => setShowHistory(false)} className="text-[10px] text-emerald-400 hover:underline cursor-pointer">
                {language === 'en' ? 'Close' : 'बन्द गर्नुहोस्'}
              </button>
            </div>
            {history.length === 0 ? (
              <p className="text-slate-500 italic text-center py-4">
                {language === 'en' ? 'No calculations yet' : 'अहिलेसम्म कुनै हिसाब गरिएको छैन'}
              </p>
            ) : (
              <div className="space-y-1 font-mono">
                {history.map((h, i) => (
                  <div key={i} className="text-right border-b border-slate-900 pb-1 text-[11px] truncate">{h}</div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="text-xs text-slate-400 font-mono max-w-full truncate mb-1">
          {display || '0'}
        </div>
        <div className="text-3xl font-mono text-white tracking-tight max-w-full truncate">
          {display ? (display.split(' ').pop() || '0') : '0'}
        </div>
      </div>

      {/* Calculator Buttons */}
      <div className="space-y-2">
        {/* Mode & Memory buttons */}
        <div className="grid grid-cols-4 gap-1.5 text-center text-xs font-mono">
          <button
            onClick={() => setIsScientific(!isScientific)}
            className={`py-1.5 rounded-lg border font-bold transition-all duration-200 cursor-pointer ${
              isScientific 
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-400' 
                : 'bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-800'
            }`}
            id="btn-toggle-scientific"
          >
            {isScientific 
              ? (language === 'en' ? 'Basic' : 'साधारण') 
              : (language === 'en' ? 'Sci' : 'वैज्ञानिक')}
          </button>
          <button onClick={() => handleMemory('MC')} className="py-1.5 rounded-lg bg-slate-800/40 border border-slate-800/60 text-slate-400 hover:text-slate-200 cursor-pointer" id="btn-mem-mc">MC</button>
          <button onClick={() => handleMemory('MR')} className="py-1.5 rounded-lg bg-slate-800/40 border border-slate-800/60 text-slate-400 hover:text-slate-200 cursor-pointer" id="btn-mem-mr">MR</button>
          <button onClick={() => handleMemory('M+')} className="py-1.5 rounded-lg bg-slate-800/40 border border-slate-800/60 text-slate-400 hover:text-slate-200 cursor-pointer" id="btn-mem-mplus">M+</button>
        </div>

        {/* Scientific Row (Shown when isScientific is true) */}
        <AnimatePresence>
          {isScientific && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="grid grid-cols-4 gap-1.5 overflow-hidden font-mono text-xs text-amber-400/90"
              key="scientific-panel"
            >
              <button onClick={() => handleScientificOp('sin')} className="py-2 rounded-xl bg-slate-800/30 border border-slate-800 hover:bg-slate-800 cursor-pointer" id="btn-sci-sin">sin</button>
              <button onClick={() => handleScientificOp('cos')} className="py-2 rounded-xl bg-slate-800/30 border border-slate-800 hover:bg-slate-800 cursor-pointer" id="btn-sci-cos">cos</button>
              <button onClick={() => handleScientificOp('tan')} className="py-2 rounded-xl bg-slate-800/30 border border-slate-800 hover:bg-slate-800 cursor-pointer" id="btn-sci-tan">tan</button>
              <button onClick={() => handleScientificOp('sqrt')} className="py-2 rounded-xl bg-slate-800/30 border border-slate-800 hover:bg-slate-800 cursor-pointer" id="btn-sci-sqrt">√</button>
              <button onClick={() => handleScientificOp('log')} className="py-2 rounded-xl bg-slate-800/30 border border-slate-800 hover:bg-slate-800 cursor-pointer" id="btn-sci-log">log</button>
              <button onClick={() => handleScientificOp('ln')} className="py-2 rounded-xl bg-slate-800/30 border border-slate-800 hover:bg-slate-800 cursor-pointer" id="btn-sci-ln">ln</button>
              <button onClick={() => handleScientificOp('sq')} className="py-2 rounded-xl bg-slate-800/30 border border-slate-800 hover:bg-slate-800 cursor-pointer" id="btn-sci-sq">x²</button>
              <button onClick={() => handleScientificOp('pi')} className="py-2 rounded-xl bg-slate-800/30 border border-slate-800 hover:bg-slate-800 cursor-pointer" id="btn-sci-pi">π</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Primary Keyboard Layout */}
        <div className="grid grid-cols-4 gap-1.5 font-mono text-sm">
          {/* Row 1 */}
          <button onClick={handleClear} className="py-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-slate-950 transition-colors cursor-pointer flex items-center justify-center font-bold" id="btn-calc-clear">
            <Trash2 className="w-4 h-4" />
          </button>
          <button onClick={() => handleNumClick('(')} className="py-3.5 rounded-xl bg-slate-800/60 border border-slate-800 text-slate-300 hover:bg-slate-700 transition-colors cursor-pointer" id="btn-calc-bracketl">(</button>
          <button onClick={() => handleNumClick(')')} className="py-3.5 rounded-xl bg-slate-800/60 border border-slate-800 text-slate-300 hover:bg-slate-700 transition-colors cursor-pointer" id="btn-calc-bracketr">)</button>
          <button onClick={() => handleOperatorClick('÷')} className="py-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 font-bold transition-colors cursor-pointer" id="btn-calc-div">÷</button>

          {/* Row 2 */}
          <button onClick={() => handleNumClick('7')} className="py-3.5 rounded-xl bg-slate-850/80 border border-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer" id="btn-calc-7">7</button>
          <button onClick={() => handleNumClick('8')} className="py-3.5 rounded-xl bg-slate-850/80 border border-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer" id="btn-calc-8">8</button>
          <button onClick={() => handleNumClick('9')} className="py-3.5 rounded-xl bg-slate-850/80 border border-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer" id="btn-calc-9">9</button>
          <button onClick={() => handleOperatorClick('×')} className="py-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 font-bold transition-colors cursor-pointer" id="btn-calc-mul">×</button>

          {/* Row 3 */}
          <button onClick={() => handleNumClick('4')} className="py-3.5 rounded-xl bg-slate-850/80 border border-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer" id="btn-calc-4">4</button>
          <button onClick={() => handleNumClick('5')} className="py-3.5 rounded-xl bg-slate-850/80 border border-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer" id="btn-calc-5">5</button>
          <button onClick={() => handleNumClick('6')} className="py-3.5 rounded-xl bg-slate-850/80 border border-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer" id="btn-calc-6">6</button>
          <button onClick={() => handleOperatorClick('-')} className="py-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 font-bold transition-colors cursor-pointer" id="btn-calc-sub">-</button>

          {/* Row 4 */}
          <button onClick={() => handleNumClick('1')} className="py-3.5 rounded-xl bg-slate-850/80 border border-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer" id="btn-calc-1">1</button>
          <button onClick={() => handleNumClick('2')} className="py-3.5 rounded-xl bg-slate-850/80 border border-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer" id="btn-calc-2">2</button>
          <button onClick={() => handleNumClick('3')} className="py-3.5 rounded-xl bg-slate-850/80 border border-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer" id="btn-calc-3">3</button>
          <button onClick={() => handleOperatorClick('+')} className="py-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 font-bold transition-colors cursor-pointer" id="btn-calc-add">+</button>

          {/* Row 5 */}
          <button onClick={() => handleNumClick('0')} className="py-3.5 rounded-xl bg-slate-850/80 border border-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer" id="btn-calc-0">0</button>
          <button onClick={() => handleNumClick('.')} className="py-3.5 rounded-xl bg-slate-850/80 border border-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer font-bold" id="btn-calc-dot">.</button>
          <button onClick={handleDelete} className="py-3.5 rounded-xl bg-slate-800/60 border border-slate-800 text-slate-300 hover:bg-slate-700 transition-colors cursor-pointer flex items-center justify-center" id="btn-calc-backspace">
            <Delete className="w-4 h-4" />
          </button>
          <button onClick={calculateResult} className="py-3.5 rounded-xl bg-emerald-500 border border-emerald-400 text-slate-950 font-bold hover:bg-emerald-400 transition-colors shadow-emerald-500/20 shadow-lg cursor-pointer" id="btn-calc-equal">=</button>
        </div>
      </div>
    </div>
  );
}
