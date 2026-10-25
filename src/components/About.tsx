import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BrainCircuit, GraduationCap, Compass, HelpCircle, Flame, Star, BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const [activeInterest, setActiveInterest] = useState<string>('crypto');
  const { t, language } = useLanguage();

  const interests = [
    {
      id: 'crypto',
      title: t('about.card1Title'),
      percentage: '95%',
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      barColor: 'bg-emerald-500',
      description: t('about.card1Desc'),
    },
    {
      id: 'ai',
      title: t('about.card2Title'),
      percentage: '90%',
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      barColor: 'bg-cyan-500',
      description: t('about.card2Desc'),
    },
    {
      id: 'science',
      title: t('about.card3Title'),
      percentage: '85%',
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      barColor: 'bg-purple-500',
      description: t('about.card3Desc'),
    },
  ];

  return (
    <section id="about" className="py-24 bg-slate-950 border-t border-slate-900" px-6="true">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>{t('about.badge')}</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tighter uppercase">
            {language === 'en' ? (
              <>About <span className="text-emerald-500">Me</span></>
            ) : (
              <>मेरो <span className="text-emerald-500">परिचय</span></>
            )}
          </h2>
          <p className="text-sm text-slate-400 mt-2 font-mono">{t('about.subtitle')}</p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: Bio & Vision - Span 7 Column */}
          <div className="md:col-span-7 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-sm flex flex-col justify-between hover:border-slate-750 transition-all group" id="about-card-bio">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <BrainCircuit className="w-5 h-5" />
                </div>
                <span className="text-[10px] text-slate-500 font-mono uppercase font-bold tracking-wider">Bio &amp; Mindset</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-slate-100 group-hover:text-white transition-colors">
                {language === 'en' ? 'Curious by nature, always learning.' : 'प्रकृतिले जिज्ञासु, सधैं नयाँ कुरा सिक्न तत्पर।'}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t('about.p1')}
              </p>
              <div className="p-4 bg-slate-950/80 border border-slate-850 rounded-2xl flex gap-3.5 items-start">
                <span className="text-2xl mt-0.5">💡</span>
                <p className="text-xs text-slate-400 leading-normal">
                  <strong className="text-slate-200">{language === 'en' ? 'Core Philosophy:' : 'मुख्य दर्शन:'}</strong> {t('about.p2')}
                </p>
              </div>
            </div>
            
            <div className="mt-8 pt-4 border-t border-slate-800/50 flex flex-wrap items-center gap-6 text-xs text-slate-500 font-mono">
              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-500" />
                <span>{language === 'en' ? 'Quick Adapter' : 'छिटो सिक्न सक्ने'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-emerald-400" />
                <span>{language === 'en' ? 'Crypto Researcher' : 'क्रिप्टो अनुसन्धानकर्ता'}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Academic Badge - Span 5 Column */}
          <div className="md:col-span-5 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-sm flex flex-col justify-between hover:border-slate-750 transition-all" id="about-card-college">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="text-[10px] text-slate-500 font-mono uppercase font-bold tracking-wider">Academic Portal</span>
              </div>
              <div>
                <h4 className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest">{language === 'en' ? 'Active Institution' : 'सक्रिय संस्था'}</h4>
                <h3 className="font-display font-bold text-xl text-slate-100 mt-1 leading-snug">
                  {t('education.college')}
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-1">{language === 'en' ? 'Kathmandu, Nepal' : 'काठमाडौं, नेपाल'}</p>
              </div>
              
              {/* Fake Student Card Badge */}
              <div className="border border-slate-800 bg-slate-950/80 rounded-2xl p-4 flex flex-col gap-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl pointer-events-none" />
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 border-b border-slate-900 pb-2">
                  <span>STUDENT PASSPORT</span>
                  <span className="text-cyan-400 font-bold">ACTIVE STATUS</span>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-1">
                    <span className="text-[10px] text-slate-500 font-mono">STUDENT:</span>
                    <span className="text-xs text-slate-200 font-semibold col-span-2 font-mono">{t('about.title')}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <span className="text-[10px] text-slate-500 font-mono">STREAM:</span>
                    <span className="text-xs text-slate-200 font-semibold col-span-2 font-mono">{t('education.science')}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <span className="text-[10px] text-slate-500 font-mono">LOCATION:</span>
                    <span className="text-xs text-slate-200 font-semibold col-span-2 font-mono">Kathmandu, NP</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs text-slate-400 bg-slate-950/40 p-2.5 rounded-xl border border-slate-850 font-mono">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>{language === 'en' ? 'Full-time scientific exploration' : 'पूर्णकालीन वैज्ञानिक अन्वेषण'}</span>
            </div>
          </div>

          {/* Card 3: Career Goals - Span 5 Column */}
          <div className="md:col-span-5 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-sm flex flex-col justify-between hover:border-slate-750 transition-all" id="about-card-goals">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <Compass className="w-5 h-5" />
                </div>
                <span className="text-[10px] text-slate-500 font-mono uppercase font-bold tracking-wider">Career Vectors</span>
              </div>
              <h3 className="font-display font-bold text-xl text-slate-100">
                {language === 'en' ? 'Career Vision & Goals' : 'करियर दृष्टिकोण र लक्ष्यहरू'}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {language === 'en' 
                  ? 'As a +2 Science student, my primary goal is to establish an exceptionally robust academic foundation in math and logic.'
                  : '+२ विज्ञान विद्यार्थीको रूपमा, मेरो प्राथमिक लक्ष्य गणित र तर्कशास्त्रमा असाधारण रूपमा बलियो शैक्षिक जग स्थापना गर्नु हो।'}
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                {language === 'en'
                  ? 'I plan to pursue higher education while actively exploring technical and developer opportunities that match my research interests in decentralized finance (DeFi) and machine learning.'
                  : 'म विकेन्द्रीकृत वित्त (DeFi) र मेसिन लर्निङमा मेरो अनुसन्धान रुचिहरूसँग मेल खाने प्राविधिक र विकासकर्ता अवसरहरू अन्वेषण गर्दै उच्च शिक्षा हासिल गर्ने योजनामा ​​छु।'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-850 text-xs text-slate-400 font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span>{language === 'en' ? 'Seeking advanced engineering paths' : 'उन्नत इन्जिनियरिङ मार्गहरूको खोजीमा'}</span>
            </div>
          </div>

          {/* Card 4: Interactive Curiosity/Interest Tracker - Span 7 Column */}
          <div className="md:col-span-7 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 backdrop-blur-sm hover:border-slate-750 transition-all flex flex-col justify-between" id="about-card-interests">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono font-bold text-slate-400">{t('about.interestTitle')}</span>
                <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">Interactive Matrix</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-2">
                {/* Interest Buttons */}
                <div className="sm:col-span-5 flex flex-col gap-2">
                  {interests.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveInterest(item.id)}
                      className={`text-left px-3 py-2 rounded-xl border text-xs font-medium font-mono transition-all duration-300 flex justify-between items-center cursor-pointer ${
                        activeInterest === item.id
                          ? 'bg-slate-850 border-slate-700 text-white'
                          : 'bg-transparent border-transparent text-slate-400 hover:text-slate-200'
                      }`}
                      id={`btn-interest-${item.id}`}
                    >
                      <span>{item.title}</span>
                      <span className={`px-1.5 py-0.5 text-[9px] rounded font-bold border ${item.color}`}>
                        {item.percentage}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Interest Detail Box */}
                <div className="sm:col-span-7 bg-slate-950/80 border border-slate-850 rounded-2xl p-4 flex flex-col justify-between min-h-[140px]">
                  <div>
                    <h4 className="text-xs font-mono font-bold text-slate-300">
                      {interests.find(i => i.id === activeInterest)?.title}
                    </h4>
                    <p className="text-slate-400 text-xs leading-relaxed mt-2">
                      {interests.find(i => i.id === activeInterest)?.description}
                    </p>
                  </div>
                  
                  {/* Skill loading bar */}
                  <div className="space-y-1 mt-4">
                    <div className="flex justify-between text-[10px] font-mono text-slate-500">
                      <span>{language === 'en' ? 'EXPLORATION RATE' : 'अन्वेषण दर'}</span>
                      <span className="text-emerald-400 font-bold">
                        {interests.find(i => i.id === activeInterest)?.percentage}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-850 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: interests.find(i => i.id === activeInterest)?.percentage }}
                        transition={{ duration: 0.5 }}
                        className={`h-full ${interests.find(i => i.id === activeInterest)?.barColor}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-850 text-[10px] text-slate-500 font-mono">
              💡 {language === 'en' ? "Hover or click categories to explore Raunak's active learning metrics." : 'श्रेणीहरूमा होभर वा क्लिक गरेर मेरो सक्रिय शैक्षिक सूचकहरू अन्वेषण गर्नुहोस्।'}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

