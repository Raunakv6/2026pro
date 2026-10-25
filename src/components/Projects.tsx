import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FolderGit2, ExternalLink, Terminal, Play, X, Shield, Cpu, RefreshCw, Sparkles } from 'lucide-react';
import { ProjectItem } from '../types';
import DateConverter from './DateConverter';
import Calculator from './Calculator';
import ProjectCard from './ProjectCard';
import { useLanguage } from '../context/LanguageContext';
import hamroConverterNeon from '../assets/images/hamro_converter_neon_1783085670864.jpg';
import precisionCalculatorNeon from '../assets/images/precision_calculator_neon_1783085688641.jpg';

export default function Projects() {
  const [activeSandbox, setActiveSandbox] = useState<'date-converter' | 'calculator' | null>(null);
  const { t, language } = useLanguage();

  const projects: ProjectItem[] = language === 'en' ? [
    {
      id: 'date-converter',
      title: 'Hamro Converter',
      description: 'A premium, ultra-precise Bikram Sambat (BS) to Gregorian (AD) date converter tailored specifically for Nepal. Built with absolute epoch alignment matrices, instant dual-directional index mapping, and dynamic interactive translation tools.',
      image: hamroConverterNeon,
      link: 'https://hamroconverter.netlify.app/',
      github: 'https://github.com/rsshrestha234/HamroConverter',
      tech: ['React 18', 'Tailwind CSS', 'Vite', 'Bikram Sambat Epoch'],
      liveComponent: 'date-converter'
    },
    {
      id: 'calculator',
      title: 'Precision Calculator',
      description: 'A professional, high-fidelity mathematical workstation and conceptual calculation ledger. Features full arithmetic floating point safety, advanced scientific parameter modules, and built-in interactive simulated rewarding mechanics.',
      image: precisionCalculatorNeon,
      link: 'https://calculatorbyraunak.netlify.app/',
      github: 'https://github.com/rsshrestha234/PrecisionCalculator',
      tech: ['Vite', 'TypeScript', 'CSS Grid', 'Local Storage State'],
      liveComponent: 'calculator'
    }
  ] : [
    {
      id: 'date-converter',
      title: 'हाम्रो कन्भर्टर',
      description: 'नेपालका लागि विशेष रूपमा तयार पारिएको प्रिमियम, अत्यन्त सटीक विक्रम संवत (BS) बाट ईस्वी संवत (AD) मिति परिवर्तक। निरपेक्ष युग पङ्क्तिबद्धता म्याट्रिक्स, तत्काल दोहोरो-दिशात्मक अनुक्रमणिका म्यापिङ, र गतिशील अन्तरक्रियात्मक अनुवाद उपकरणहरूको साथ निर्मित।',
      image: hamroConverterNeon,
      link: 'https://hamroconverter.netlify.app/',
      github: 'https://github.com/rsshrestha234/HamroConverter',
      tech: ['React 18', 'Tailwind CSS', 'Vite', 'Bikram Sambat Epoch'],
      liveComponent: 'date-converter'
    },
    {
      id: 'calculator',
      title: 'प्रिसिजन क्यालकुलेटर',
      description: 'एक व्यावसायिक, उच्च-विश्वस्तता गणितीय कार्यस्थान र वैचारिक गणना लेजर। पूर्ण अंकगणितीय फ्लोटिंग पोइन्ट सुरक्षा, उन्नत वैज्ञानिक प्यारामिटर मोड्युलहरू, र निर्मित अन्तरक्रियात्मक सिमुलेटेड पुरस्कृत संयन्त्रहरू।',
      image: precisionCalculatorNeon,
      link: 'https://calculatorbyraunak.netlify.app/',
      github: 'https://github.com/rsshrestha234/PrecisionCalculator',
      tech: ['Vite', 'TypeScript', 'CSS Grid', 'Local Storage State'],
      liveComponent: 'calculator'
    }
  ];

  const handleCloseSandbox = () => {
    setActiveSandbox(null);
  };

  return (
    <section id="projects" className="py-24 bg-[#020617] border-t border-slate-900/80 relative overflow-hidden" px-6="true">
      {/* Decorative ambient background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900/80 border border-slate-800 rounded-full text-[10px] font-mono text-orange-400 font-bold uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(242,125,38,0.1)]">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Interactive Portfolio Terminal' : 'अन्तरक्रियात्मक पोर्टफोलियो टर्मिनल'}</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tighter uppercase">
            {language === 'en' ? (
              <>Featured <span className="text-[#F27D26]" style={{ textShadow: '0 0 15px rgba(242,125,38,0.35)' }}>Showcases</span></>
            ) : (
              <>प्रमुख <span className="text-[#F27D26]" style={{ textShadow: '0 0 15px rgba(242,125,38,0.35)' }}>परियोजनाहरू</span></>
            )}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-3 font-mono">
            {language === 'en' 
              ? 'Launch secure local sandbox modules or inspect raw production code bases'
              : 'सुरक्षित स्थानीय स्यान्डबक्स मोड्युलहरू चलाउनुहोस् वा उत्पादन कोडहरू निरीक्षण गर्नुहोस्'}
          </p>
        </div>

        {/* Sandbox Integration Grid (Dynamic Sandbox Terminal or Project Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Project Cards List (Spans 7 columns when sandbox is active, 12 otherwise) */}
          <div className={`space-y-8 ${activeSandbox ? 'lg:col-span-7' : 'lg:col-span-12 max-w-5xl mx-auto w-full'}`}>
            <div className={`grid grid-cols-1 gap-8 ${activeSandbox ? 'grid-cols-1' : 'md:grid-cols-2'}`}>
              
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className={`h-full flex flex-col ${index % 2 === 0 ? 'animate-cyber-float-1' : 'animate-cyber-float-2'}`}
                >
                  <ProjectCard
                    project={project}
                    isActiveSandbox={activeSandbox === project.liveComponent}
                    onLaunchSandbox={() => setActiveSandbox(project.liveComponent)}
                  />
                </div>
              ))}

            </div>
          </div>

          {/* Right Column: Sandbox Terminal Viewer (Spans 5 columns, rendered conditionally) */}
          <AnimatePresence>
            {activeSandbox && (
              <motion.div
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 25 }}
                transition={{ duration: 0.4 }}
                className="lg:col-span-5 space-y-4"
                key="sandbox-terminal"
              >
                {/* Sandbox Frame */}
                <div className="bg-slate-950 border border-orange-500/25 rounded-3xl p-1 shadow-[0_0_30px_rgba(242,125,38,0.08)] overflow-hidden">
                  
                  {/* Sandbox Bar */}
                  <div className="bg-slate-900 px-4 py-3 flex items-center justify-between border-b border-slate-850">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-orange-400" />
                      <span className="text-xs font-mono font-bold text-slate-300">SANDBOX TERMINAL</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
                    </div>
                    <button
                      onClick={handleCloseSandbox}
                      className="p-1 rounded bg-slate-950 hover:bg-slate-800 border border-slate-850 text-slate-400 hover:text-white transition-colors cursor-pointer"
                      title="Close Sandbox"
                      id="btn-close-sandbox"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Sandbox Content wrapper */}
                  <div className="p-3 bg-slate-950/80">
                    {activeSandbox === 'date-converter' && <DateConverter />}
                    {activeSandbox === 'calculator' && <Calculator />}
                  </div>
                </div>

                <div className="p-4 bg-slate-905/40 border border-slate-850 rounded-2xl flex items-start gap-3">
                  <Shield className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                  <p className="text-[10px] text-slate-400 leading-relaxed font-mono">
                    <strong className="text-slate-200 uppercase">{language === 'en' ? 'Interactive Terminal Mode:' : 'अन्तरक्रियात्मक टर्मिनल मोड:'}</strong> {language === 'en' ? 'This sandbox mounts the real logic built dynamically in React. Enter dates or perform equations to test conversions and miners live!' : 'यो स्यान्डबक्सले रियाक्टमा निर्मित वास्तविक तर्कलाई सिधै रन गर्छ। परीक्षण गर्नका लागि मितिहरू प्रविष्ट गर्नुहोस् वा गणनाहरू गर्नुहोस्!'}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}

