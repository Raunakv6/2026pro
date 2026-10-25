import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar, ShieldAlert, Laptop, Cpu, BookOpen } from 'lucide-react';
import { ExperienceItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

export default function Experience() {
  const { t, language } = useLanguage();

  const experiences: ExperienceItem[] = language === 'en' ? [
    {
      id: 'self-dev',
      role: 'Self-Directed Developer & Explorer',
      company: 'Personal Research / Open Source',
      dates: '2025 - Present',
      description: 'Actively researching web development frameworks, writing core calculation algorithms, and designing clean responsive layouts. Successfully published the Hamro BS-AD Date Converter and Precision Calculator tools on Netlify.',
      highlights: [
        'Built BS to AD Date Converter with precise calendar offset calculations.',
        'Developed full-featured scientific calculator with mock token mining loops.',
        'Studied React 19, Tailwind CSS v4, and motion layout structures.'
      ]
    },
    {
      id: 'blockchain-res',
      role: 'On-chain Explorer & Token Analyst',
      company: 'Independent Crypto Study',
      dates: '2023 - 2025',
      description: 'Dived deep into decentralized finance structures, token supplies, wallet keys, gas mechanisms, and on-chain block explorers.',
      highlights: [
        'Researched token market caps, FDV metrics, and circulating token distribution ratios.',
        'Explored wallet security mechanics and smart contracts logic.',
        'Mastered on-chain transaction analysis on Etherscan and Solscan.'
      ]
    },
    {
      id: 'academic-foundations',
      role: 'Logic & Foundation Building',
      company: 'Primary & Secondary Education',
      dates: '2009 - 2023',
      description: 'Built a strict analytical mind and rigorous problem-solving approach by studying algebra, physics, and science at Shree Nawa Jyoti and The Old Capital Secondary schools.',
      highlights: [
        'Established advanced skills in algebra, physics, and critical inquiry.',
        'Maintained high academic achievements through collaborative group studies.',
        'Developed an early passion for technology and automated electronics.'
      ]
    }
  ] : [
    {
      id: 'self-dev',
      role: 'स्व-निर्देशित विकासकर्ता र अन्वेषक',
      company: 'व्यक्तिगत अनुसन्धान / खुला स्रोत (ओपन-सोर्स)',
      dates: '२०२५ - हालसम्म',
      description: 'वेब विकास ढाँचाहरूको सक्रिय रूपमा अनुसन्धान गर्दै, मुख्य गणना एल्गोरिदमहरू लेखै, र सफा उत्तरदायी लेआउटहरू डिजाइन गर्दै। नेटलिफाइमा Hamro BS-AD Date Converter र Precision Calculator उपकरणहरू सफलतापूर्वक प्रकाशित।',
      highlights: [
        'सटीक पात्रो गणनाहरूको साथ BS बाट AD मिति परिवर्तक निर्माण।',
        'टोकन खानी (माइनिङ) लूपहरूको साथ पूर्ण-विशेषता वैज्ञानिक क्यालकुलेटर विकास।',
        'React 19, Tailwind CSS v4, र motion लेआउट संरचनाहरूको अध्ययन।'
      ]
    },
    {
      id: 'blockchain-res',
      role: 'अन-चेन अन्वेषक र टोकन विश्लेषक',
      company: 'स्वतन्त्र क्रिप्टो अध्ययन',
      dates: '२०२३ - २०२५',
      description: 'विकेन्द्रीकृत वित्त संरचना, टोकन आपूर्ति, वालेट कुञ्जीहरू, ग्यास संयन्त्र, र अन-चेन ब्लक अन्वेषकहरूमा गहिरो अध्ययन।',
      highlights: [
        'टोकन बजार पूँजीकरण, FDV सूचकहरू, र टोकन वितरण अनुपात अनुसन्धान।',
        'वालेट सुरक्षा संयन्त्र र स्मार्ट सम्झौता (स्मार्ट कन्ट्याक्ट) तर्कहरूको अन्वेषण।',
        'Etherscan र Solscan मा अन-चेन कारोबार विश्लेषण मास्टर।'
      ]
    },
    {
      id: 'academic-foundations',
      role: 'तर्क र आधारभूत ज्ञान निर्माण',
      company: 'प्राथमिक तथा माध्यमिक शिक्षा',
      dates: '२००९ - २०२३',
      description: 'श्री नवज्योति र द ओल्ड क्यापिटल सेकेन्डरी स्कूलहरूमा बीजगणित, भौतिकशास्त्र र विज्ञानको अध्ययन गरेर कडा विश्लेषणात्मक दिमाग र समस्या समाधानको दृष्टिकोण निर्माण।',
      highlights: [
        'बीजगणित, भौतिकशास्त्र र आलोचनात्मक अनुसन्धानमा उन्नत सीपहरूको विकास।',
        'सहयोगात्मक समूह अध्ययन मार्फत उच्च शैक्षिक उपलब्धि हासिल।',
        'प्रविधि र स्वचालित इलेक्ट्रोनिक्समा प्रारम्भिक रुचि र जोश विकास।'
      ]
    }
  ];

  return (
    <section id="experience" className="py-24 bg-slate-950 border-t border-slate-900" px-6="true">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Path of Growth' : 'विकासको मार्ग'}</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tighter uppercase">
            {language === 'en' ? (
              <>Learning &amp; <span className="text-emerald-500">Experience</span></>
            ) : (
              <>ज्ञान र <span className="text-emerald-500">अनुभव</span></>
            )}
          </h2>
          <p className="text-sm text-slate-400 mt-2 font-mono">
            {language === 'en' 
              ? 'My active timeline of self-directed research, study, and project execution'
              : 'मेरो स्व-निर्देशित अनुसन्धान, अध्ययन, र परियोजना सञ्चालनको सक्रिय समयरेखा'}
          </p>
        </div>

        {/* Informational Notice Box (humble, professional) */}
        <div className="mb-10 p-4 bg-slate-900/40 border border-slate-800/80 rounded-2xl flex items-start gap-3.5">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mt-0.5">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-mono font-bold text-slate-200">
              {language === 'en' ? 'Focused on Education & Self-Building' : 'शिक्षा र आत्म-निर्माणमा केन्द्रित'}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mt-1">
              {language === 'en'
                ? 'Currently focused full-time on my academic curriculum and personal skill-building. While I have not held a traditional corporate role, I actively explore emerging markets, crypto economics, and engineering structures daily.'
                : 'हाल मेरो कलेजको पाठ्यक्रम र व्यक्तिगत सीप निर्माणमा पूर्ण-समय केन्द्रित छु। यद्यपि मैले कुनै औपचारिक कर्पोरेट पद धारण गरेको छैन, म दैनिक रूपमा उदीयमान बजारहरू, क्रिप्टो अर्थशास्त्र, र इन्जिनियरिङ ढाँचाहरू अन्वेषण गर्दछु।'}
            </p>
          </div>
        </div>

        {/* Timeline cards */}
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-900/20 border border-slate-850 hover:border-slate-800 rounded-2xl p-5 md:p-6 backdrop-blur-sm transition-all group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-1.5 mb-4 pb-3 border-b border-slate-850/60">
                <div>
                  <h3 className="text-base md:text-lg font-display font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                    {exp.role}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{exp.company}</p>
                </div>
                
                <div className="inline-flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-850 text-xs font-mono text-slate-400 self-start md:self-center">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span>{exp.dates}</span>
                </div>
              </div>

              <p className="text-xs md:text-sm text-slate-400 leading-relaxed mb-4">
                {exp.description}
              </p>

              <div className="space-y-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase font-bold tracking-wider block">
                  {language === 'en' ? 'KEY FOCUSES & OUTPUTS' : 'मुख्य प्राथमिकता र उपलब्धिहरू'}
                </span>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300 font-mono">
                  {exp.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-slate-950/40 p-2 rounded-lg border border-slate-900/60">
                      <span className="text-emerald-400 font-bold mt-0.5">›</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
