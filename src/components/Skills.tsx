import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Cpu, Brain, Flame, Coins, Sparkles, CheckCircle2, TrendingUp, Key } from 'lucide-react';
import { Skill } from '../types';
import GlitchText from './GlitchText';
import { useLanguage } from '../context/LanguageContext';

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'crypto' | 'cognitive'>('all');
  const { t, language } = useLanguage();

  // Key Driver / Superstar Skill
  const keySkill = {
    name: t('skills.curiosity'),
    description: t('skills.curiosityDesc'),
  };

  const skills: Skill[] = language === 'en' ? [
    // Technical / Crypto Skills
    { name: 'Cryptocurrency Fundamentals', category: 'technical', description: 'Deconstructing decentralized financial ledgers and tokenized assets.' },
    { name: 'Blockchain Basics', category: 'technical', description: 'Understanding distributed ledgers, peer-to-peer gossip networks, and consensus.' },
    { name: 'Crypto Wallet Management', category: 'technical', description: 'Safe seed-phrase hygiene, non-custodial wallets, and network gas configuration.' },
    { name: 'Token Research', category: 'technical', description: 'Analyzing circulating supply, FDV, token lockups, utility design, and whitepapers.' },
    { name: 'DeFi Basics', category: 'technical', description: 'Explored automated market makers (AMMs), liquidity pools, and decentralized exchanges.' },
    { name: 'On-chain Transaction Basics', category: 'technical', description: 'Analyzing block explorers (Etherscan, Solscan), gas costs, and transaction states.' },
    
    // Cognitive / Soft Skills
    { name: 'Problem Solving', category: 'personal', description: 'Decomposing complex, abstract technical roadblocks into solvable logic segments.' },
    { name: 'Quick Learner', category: 'personal', description: 'Synthesizing knowledge fast from documentations, whitepapers, and crash courses.' },
    { name: 'Critical Thinking', category: 'personal', description: 'Skeptical analysis of token narratives, claims, and analytical academic topics.' },
    { name: 'Adaptability', category: 'personal', description: 'Pivoting across academic subjects, development environments, and fast Crypto trends.' },
    { name: 'Time Management', category: 'personal', description: 'Balancing full-time college studies with persistent technical research.' },
  ] : [
    // Technical / Crypto Skills
    { name: 'क्रिप्टोकरेन्सी आधारभूत कुराहरू', category: 'technical', description: 'विकेन्द्रीकृत वित्तीय खाताहरू र टोकन सम्पत्तिहरूको विच्छेदन।' },
    { name: 'ब्लकचेन सिद्धान्तहरू', category: 'technical', description: 'वितरित खाताहरू, पियर-टु-पियर नेटवर्क, र सहमति बुझ्ने।' },
    { name: 'क्रिप्टो वालेट व्यवस्थापन', category: 'technical', description: 'सुरक्षित सीड-फ्रेज सरसफाई, नन-कस्टोडियल वालेट, र नेटवर्क ग्यास कन्फिगरेसन।' },
    { name: 'टोकन अनुसन्धान', category: 'technical', description: 'प्रचलनमा रहेको आपूर्ति, FDV, टोकन लकअप, उपयोगिता डिजाइन, र श्वेतपत्रहरूको विश्लेषण।' },
    { name: 'DeFi आधारभूत कुराहरू', category: 'technical', description: 'स्वचालित बजार निर्माताहरू (AMMs), तरलता पूलहरू, र विकेन्द्रीकृत एक्सचेन्जहरूको अन्वेषण।' },
    { name: 'अन-चेन कारोबार विश्लेषण', category: 'technical', description: 'ब्लक एक्सप्लोररहरू (Etherscan, Solscan), ग्यास शुल्क, र कारोबार स्थितिको विश्लेषण।' },
    
    // Cognitive / Soft Skills
    { name: 'समस्या समाधान', category: 'personal', description: 'जटिल, अमूर्त प्राविधिक अवरोधहरूलाई समाधान योग्य तार्किक खण्डहरूमा विभाजन गर्ने।' },
    { name: 'छिटो सिक्ने क्षमता', category: 'personal', description: 'दस्तावेजहरू, श्वेतपत्रहरू, र द्रुत पाठ्यक्रमहरूबाट छिटो ज्ञान प्राप्त गर्ने।' },
    { name: 'आलोचनात्मक सोच', category: 'personal', description: 'टोकन कथाहरू, दाबीहरू, र विश्लेषणात्मक शैक्षिक विषयहरूको शङ्कास्पद विश्लेषण।' },
    { name: 'अनुकूलनशीलता', category: 'personal', description: 'शैक्षिक विषयहरू, विकास वातावरण, र द्रुत क्रिप्टो प्रवृतिहरूमा अनुकूलन हुने।' },
    { name: 'समय व्यवस्थापन', category: 'personal', description: 'पूर्ण-समय कलेज अध्ययनको साथ निरन्तर प्राविधिक अनुसन्धान सन्तुलन गर्ने।' },
  ];

  const filteredSkills = skills.filter(skill => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'crypto') return skill.category === 'technical';
    if (selectedCategory === 'cognitive') return skill.category === 'personal';
    return true;
  });

  return (
    <section id="skills" className="py-24 bg-slate-950 border-t border-slate-900" px-6="true">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>{t('skills.badge')}</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tighter uppercase">
            {language === 'en' ? (
              <>Skills &amp; <span className="text-emerald-500">Competencies</span></>
            ) : (
              <>सीप र <span className="text-emerald-500">क्षमताहरू</span></>
            )}
          </h2>
          <p className="text-sm text-slate-400 mt-2 font-mono">{t('skills.title')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column - Core Driver Highlight & Category Selector */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Core Driver Box */}
            <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-3xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
                <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase tracking-widest">{t('skills.keyStrength')}</span>
              </div>
              <h3 className="font-display font-bold text-2xl text-slate-100 group-hover:text-emerald-300 transition-colors">
                {keySkill.name}
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed mt-2">
                {keySkill.description}
              </p>
              
              <div className="mt-4 pt-3 border-t border-emerald-500/20 flex gap-2 items-center text-[10px] text-slate-400 font-mono">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>{language === 'en' ? 'Infinite drive to figure things out' : 'नयाँ कुरा सिक्ने असीमित जोश'}</span>
              </div>
            </div>

            {/* Category Selectors */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 space-y-2">
              <span className="text-[10px] font-mono text-slate-500 uppercase font-bold tracking-wider px-2 block">
                {language === 'en' ? 'Filter Capabilities' : 'सीपहरू फिल्टर गर्नुहोस्'}
              </span>
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-between cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-slate-800 text-white'
                      : 'bg-transparent text-slate-400 hover:text-slate-200'
                  }`}
                  id="btn-filter-all"
                >
                  <span>{language === 'en' ? 'All Skills' : 'सबै सीपहरू'}</span>
                  <span className="bg-slate-950 px-1.5 py-0.5 rounded text-[10px] text-slate-500">{skills.length}</span>
                </button>
                <button
                  onClick={() => setSelectedCategory('crypto')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-between cursor-pointer ${
                    selectedCategory === 'crypto'
                      ? 'bg-slate-850 text-emerald-400 border border-slate-800'
                      : 'bg-transparent text-slate-400 hover:text-slate-200'
                  }`}
                  id="btn-filter-crypto"
                >
                  <span className="flex items-center gap-1.5"><Coins className="w-3.5 h-3.5" /> {language === 'en' ? 'Crypto & Web3' : 'क्रिप्टो र वेब३'}</span>
                  <span className="bg-slate-950 px-1.5 py-0.5 rounded text-[10px] text-slate-500">6</span>
                </button>
                <button
                  onClick={() => setSelectedCategory('cognitive')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-between cursor-pointer ${
                    selectedCategory === 'cognitive'
                      ? 'bg-slate-850 text-cyan-400 border border-slate-800'
                      : 'bg-transparent text-slate-400 hover:text-slate-200'
                  }`}
                  id="btn-filter-cognitive"
                >
                  <span className="flex items-center gap-1.5"><Brain className="w-3.5 h-3.5" /> {language === 'en' ? 'Cognitive (Soft)' : 'मानसिक / सफ्ट सीप'}</span>
                  <span className="bg-slate-950 px-1.5 py-0.5 rounded text-[10px] text-slate-500">5</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right Column - Skills Grid */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-slate-900/30 border border-slate-850 rounded-2xl p-4 flex flex-col justify-between hover:border-slate-800 hover:bg-slate-900/50 transition-all group"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border transition-all duration-300 ${
                        skill.category === 'technical'
                          ? 'text-emerald-400 bg-emerald-500/5 border-emerald-500/10 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10'
                          : 'text-cyan-400 bg-cyan-500/5 border-cyan-500/10 group-hover:border-cyan-500/40 group-hover:bg-cyan-500/10'
                      }`}>
                        <GlitchText text={skill.category === 'technical' ? (language === 'en' ? 'Crypto / Web3' : 'क्रिप्टो / वेब३') : (language === 'en' ? 'Cognitive / Soft' : 'मानसिक / व्यवहारिक')} />
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-slate-700 group-hover:text-emerald-400 transition-colors" />
                    </div>
                    
                    <h4 className="font-display font-bold text-sm text-slate-200 group-hover:text-white transition-colors">
                      <GlitchText text={skill.name} />
                    </h4>
                    <p className="text-slate-400 text-xs leading-normal">
                      {skill.description}
                    </p>
                  </div>
                  
                  <div className="mt-4 pt-2 border-t border-slate-900/60 flex items-center gap-1 text-[10px] text-slate-500 font-mono">
                    <TrendingUp className="w-3 h-3 text-emerald-400" />
                    <span>{language === 'en' ? 'Actively compounding knowledge' : 'सक्रिय रूपमा ज्ञान बढाउँदै'}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

