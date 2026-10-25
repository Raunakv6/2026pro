import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from 'lucide-react';
import { Degree } from '../types';
import { useLanguage } from '../context/LanguageContext';

export default function Education() {
  const { t, language } = useLanguage();

  const degrees: Degree[] = language === 'en' ? [
    {
      id: 'plus-two',
      level: '+2 Science Program',
      institution: 'GoldenGate International College',
      graduationDate: 'Currently Enrolled (Class of 2027)',
      description: 'Acquiring deep fundamentals in Physical Sciences, Higher Mathematics, Chemistry, and Logic. Blending formal academic study with modern computer science, artificial intelligence, and crypto research.',
    },
    {
      id: 'tenth',
      level: '10th Grade / SEE Equivalent',
      institution: 'Shree Nawa Jyoti Secondary',
      graduationDate: 'March 2025',
      description: 'Graduated secondary school with excellent marks, maintaining a deep interest in scientific reasoning and algebraic structures.',
    },
    {
      id: 'eighth',
      level: '8th Grade Certificate',
      institution: 'Shree Nawa Jyoti Secondary',
      graduationDate: 'March 2023',
      description: 'Completed junior high education with core focus on primary sciences, general mathematics, and literature.',
    },
    {
      id: 'fifth',
      level: '5th Grade Certificate',
      institution: 'The Old Capital Secondary School',
      graduationDate: 'April 2020',
      description: 'Acquired foundational primary literacy, arithmetic reasoning, and general knowledge, sparking early curiosity in technical concepts.',
    },
  ] : [
    {
      id: 'plus-two',
      level: '+२ विज्ञान कार्यक्रम',
      institution: 'गोल्डेनगेट इन्टरनेशनल कलेज',
      graduationDate: 'हाल अध्ययनरत (सन् २०२७ को ब्याच)',
      description: 'भौतिक विज्ञान, उच्च गणित, रसायन विज्ञान, र तर्कशास्त्रमा गहिरो आधारभूत ज्ञान प्राप्त गर्दै। औपचारिक शैक्षिक अध्ययनलाई आधुनिक कम्प्युटर विज्ञान, कृत्रिम बुद्धिमत्ता, र क्रिप्टो अनुसन्धानसँग जोड्दै।',
    },
    {
      id: 'tenth',
      level: '१० कक्षा / SEE समकक्ष',
      institution: 'श्री नव ज्योति माध्यमिक विद्यालय',
      graduationDate: 'मार्च २०२५',
      description: 'वैज्ञानिक तर्क र बीजगणितीय संरचनाहरूमा गहिरो रुचि राख्दै उत्कृष्ट अंकका साथ माध्यमिक विद्यालय उत्तीर्ण।',
    },
    {
      id: 'eighth',
      level: '८ कक्षा उत्तीर्ण प्रमाणपत्र',
      institution: 'श्री नव ज्योति माध्यमिक विद्यालय',
      graduationDate: 'मार्च २०२३',
      description: 'प्राथमिक विज्ञान, सामान्य गणित, र साहित्यमा मुख्य ध्यान दिँदै कनिष्ठ उच्च शिक्षा पूरा।',
    },
    {
      id: 'fifth',
      level: '५ कक्षा उत्तीर्ण प्रमाणपत्र',
      institution: 'द ओल्ड क्यापिटल सेकेन्डरी स्कूल',
      graduationDate: 'अप्रिल २०२०',
      description: 'प्राथमिक साक्षरता, अंकगणितीय तर्क, र सामान्य ज्ञानको आधारभूत सीप प्राप्त गर्दै प्रविधि र विज्ञानमा प्रारम्भिक जिज्ञासा जगाएको।',
    },
  ];

  return (
    <section id="education" className="py-24 bg-slate-950 border-t border-slate-900" px-6="true">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest mb-4">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{t('education.badge')}</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tighter uppercase">
            {language === 'en' ? (
              <>Education <span className="text-emerald-500">Timeline</span></>
            ) : (
              <>शैक्षिक <span className="text-emerald-500">यात्रा</span></>
            )}
          </h2>
          <p className="text-sm text-slate-400 mt-2 font-mono">{t('education.title')}</p>
        </div>

        {/* Timeline Layout */}
        <div className="relative border-l-2 border-slate-850 ml-4 md:ml-12 pl-6 md:pl-10 space-y-12">
          
          {degrees.map((deg, index) => (
            <motion.div
              key={deg.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Timeline Bullet Node */}
              <span className={`absolute -left-[31px] md:-left-[47px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                index === 0 
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 ring-4 ring-emerald-500/10' 
                  : 'bg-slate-900 border-slate-850 text-slate-500 group-hover:border-emerald-500/40 group-hover:text-emerald-400'
              }`}>
                {index === 0 ? <Award className="w-3.5 h-3.5" /> : <BookOpen className="w-3 h-3" />}
              </span>

              {/* Education Card */}
              <div className="bg-slate-900/30 border border-slate-850 rounded-2xl p-5 md:p-6 backdrop-blur-sm group-hover:border-slate-800 transition-all shadow-lg relative overflow-hidden">
                {/* Visual Corner Accent */}
                {index === 0 && (
                  <div className="absolute top-0 right-0 bg-emerald-500/10 border-b border-l border-emerald-500/20 text-emerald-400 text-[9px] font-mono font-bold px-2.5 py-1 rounded-bl-xl tracking-wider">
                    {language === 'en' ? 'CURRENTLY STUDYING' : 'हाल अध्ययनरत'}
                  </div>
                )}

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-1.5 mb-3">
                  <div>
                    <h3 className="text-lg md:text-xl font-display font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                      {deg.level}
                    </h3>
                    <p className="text-slate-400 text-sm font-medium flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{deg.institution}</span>
                    </p>
                  </div>
                  
                  <div className="inline-flex items-center gap-1.5 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-850 text-xs font-mono text-slate-400 h-fit self-start md:self-center">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{deg.graduationDate}</span>
                  </div>
                </div>

                {deg.description && (
                  <p className="text-xs md:text-sm text-slate-400 leading-relaxed border-t border-slate-850/50 pt-3 mt-3">
                    {deg.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}

