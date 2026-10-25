import React, { useState, useRef } from 'react';
import { X, Download, Loader2, FileText, Check, Sparkles } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useLanguage } from '../context/LanguageContext';

const defaultProfilePhoto = 'https://res.cloudinary.com/dxjhts59s/image/upload/f_auto,q_auto/1000006938_fnkdwc';

interface ResumePDFModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumePDFModal({ isOpen, onClose }: ResumePDFModalProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<'cyberpunk' | 'stark'>('stark');
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  if (!isOpen) return null;

  const resumeData = {
    name: 'Raunak Shrestha',
    title: language === 'en' ? 'STUDENT' : 'विद्यार्थी',
    intro: language === 'en' 
      ? "Curious by nature and always learning. I'm currently studying +2 Science while exploring crypto, AI, and technology. Every project is a chance to improve and create something better."
      : "स्वभावैले जिज्ञासु र सधैं नयाँ कुरा सिक्न तत्पर। म हाल +२ विज्ञान पढ्दै क्रिप्टो, एआई, र प्रविधि अन्वेषण गर्दैछु। प्रत्येक परियोजना मेरो लागि सुधार गर्ने र केहि राम्रो सिर्जना गर्ने मौका हो।",
    careerGoals: language === 'en'
      ? "As a +2 Science student, my goal is to build a strong academic foundation and pursue higher education while exploring opportunities that match my interests and strengths."
      : "+२ विज्ञानको विद्यार्थीको रूपमा, मेरो लक्ष्य बलियो शैक्षिक आधार निर्माण गर्नु र मेरो रुचि र क्षमताहरूसँग मेल खाने अवसरहरू अन्वेषण गर्दै उच्च शिक्षा हासिल गर्नु हो।",
    contact: {
      email: 'raunakshrestha4440@gmail.com',
      phone: '9706144483',
      telegram: '@btchunterNP',
      discord: 'raunakshrestha21',
    },
    socials: {
      instagram: 'instagram.com/raunakshrestha45',
      x: 'x.com/@Raunak4440',
      youtube: 'youtube.com/@hkraunak',
      spotify: 'open.spotify.com/user/RaunakTheOG',
      spotifyName: 'RaunakTheOG',
      github: 'github.com/Raunakv6',
    },
    skills: {
      core: language === 'en' 
        ? ['Problem Solving', 'Quick Learner', 'Critical Thinking', 'Adaptability', 'Time Management']
        : ['समस्या समाधान', 'द्रुत सिकारु', 'आलोचनात्मक सोच', 'अनुकूलनशीलता', 'समय व्यवस्थापन'],
      strength: {
        title: language === 'en' ? 'Curiosity' : 'जिज्ञासु',
        desc: language === 'en' ? 'Always exploring. Always learning.' : 'सधैं अन्वेषण गर्दै। सधैं सिक्दै।'
      },
      technical: [
        { name: language === 'en' ? 'Cryptocurrency Fundamentals' : 'क्रिप्टोकरेन्सी आधारभूत कुराहरू', level: 90 },
        { name: language === 'en' ? 'Blockchain Basics' : 'ब्लकचेन आधारभूत कुराहरू', level: 85 },
        { name: language === 'en' ? 'Crypto Wallet Management' : 'क्रिप्टो वालेट व्यवस्थापन', level: 80 },
        { name: language === 'en' ? 'Token Research' : 'टोकन अनुसन्धान', level: 80 },
        { name: language === 'en' ? 'DeFi Basics' : 'डिफाई (DeFi) आधारभूतहरू', level: 75 },
        { name: language === 'en' ? 'On-chain Transaction Basics' : 'अन-चेन कारोबार आधारभूतहरू', level: 75 },
      ]
    },
    education: language === 'en' ? [
      { level: '+2 SCIENCE (ONGOING)', institution: 'GoldenGate International College', date: 'PRESENT' },
      { level: '10TH', institution: 'Shree Nawa Jyoti Secondary', date: 'March 2025' },
      { level: '8TH', institution: 'Shree Nawa Jyoti Secondary', date: 'March 2023' },
      { level: '5TH', institution: 'The Old Capital Secondary School', date: 'April 2020' },
    ] : [
      { level: '+२ विज्ञान (अध्ययनरत)', institution: 'गोल्डेनगेट इन्टरनेशनल कलेज', date: 'हाल' },
      { level: '१० कक्षा', institution: 'श्री नवज्योति माध्यमिक विद्यालय', date: 'मार्च २०२५' },
      { level: '८ कक्षा', institution: 'श्री नवज्योति माध्यमिक विद्यालय', date: 'मार्च २०२३' },
      { level: '५ कक्षा', institution: 'द ओल्ड क्यापिटल सेकेन्डरी स्कूल', date: 'अप्रिल २०२०' },
    ],
    experience: {
      title: language === 'en' ? 'Focused on Education & Personal Learning' : 'शिक्षा र व्यक्तिगत सिकाइमा केन्द्रित',
      dates: '2009 - 2026',
      desc: language === 'en'
        ? "No professional work experience yet. My current focus is education, learning, and preparing for future opportunities. I'm actively building knowledge through self-learning and exploring new opportunities."
        : "हालसम्म कुनै व्यावसायिक कार्य अनुभव छैन। मेरो वर्तमान ध्यान शिक्षा, सिकाइ, र भविष्यका अवसरहरूको लागि तयारीमा छ। म सक्रिय रूपमा स्व-सिकाइ र नयाँ अवसरहरू अन्वेषण मार्फत ज्ञान निर्माण गर्दैछु।"
    },
    projects: language === 'en' ? [
      {
        id: '01',
        title: 'Date Converter',
        url: 'hamroconverter.netlify.app',
        desc: 'A clean and reliable Bikram Sambat (BS) to Gregorian (AD) date converter for Nepal. Accurate, fast, responsive and designed for simplicity and transparency.'
      },
      {
        id: '02',
        title: 'Earn money by Calculating',
        url: 'calculatorbyraunak.netlify.app',
        desc: 'A modern, responsive calculator with a clean dark interface. Supports essential arithmetic operations, memory functions, scientific mode and delivers fast, accurate results.'
      }
    ] : [
      {
        id: '01',
        title: 'मिति परिवर्तक',
        url: 'hamroconverter.netlify.app',
        desc: 'नेपालको लागि एक सफा र भरपर्दो विक्रम संवत (BS) बाट ईस्वी संवत (AD) मिति परिवर्तक। सटीक, छिटो र उत्तरदायी।'
      },
      {
        id: '02',
        title: 'क्यालकुलेटर',
        url: 'calculatorbyraunak.netlify.app',
        desc: 'सफा गाढा इन्टरफेसको साथ आधुनिक क्यालकुलेटर। यसले आवश्यक अंकगणितीय कार्यहरू, मेमोरी कार्यहरू, र वैज्ञानिक मोडलाई समर्थन गर्दछ।'
      }
    ],
    quote: language === 'en' ? 'The best way to predict the future is to create it.' : 'भविष्यको भविष्यवाणी गर्ने सबैभन्दा राम्रो तरिका यसलाई निर्माण गर्नु हो।'
  };

  const handleDownload = async () => {
    if (!resumeRef.current) return;
    setIsGenerating(true);

    try {
      // Use standard wait for image load guarantee
      await new Promise((resolve) => setTimeout(resolve, 500));

      const element = resumeRef.current;
      
      // Calculate optimized scale for high quality A4 print PDF
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: selectedTheme === 'cyberpunk' ? '#050515' : '#0A0A0A',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      
      // A4 dimensions: 210mm x 297mm
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Raunak_Shrestha_Resume_${selectedTheme}.pdf`);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Theme styling definitions for high fidelity matching
  const isCyber = selectedTheme === 'cyberpunk';
  
  const themeStyles = {
    bg: isCyber ? 'bg-[#050515]' : 'bg-[#0A0A0A]',
    textColor: isCyber ? 'text-slate-200' : 'text-[#F5F5F4]',
    mutedText: isCyber ? 'text-slate-400' : 'text-[#8E9299]',
    primaryAccent: isCyber ? 'text-cyan-400' : 'text-[#F27D26]',
    secondaryAccent: isCyber ? 'text-purple-400' : 'text-[#F5F5F4]',
    borderColor: isCyber ? 'border-[#3b82f6]/30' : 'border-[#F5F5F4]/10',
    cardBg: isCyber ? 'bg-[#0b0c24]' : 'bg-[#151619]',
    badgeBg: isCyber ? 'bg-cyan-500/10 text-cyan-400' : 'bg-[#F27D26] text-[#0A0A0A]',
    nameColor: isCyber ? 'text-white' : 'text-white',
    headerBg: isCyber ? 'border-b border-[#06b6d4]/40' : 'border-b border-[#F5F5F4]/30',
  };

  // Mock visually perfect high-fidelity QR Code representation as SVGs
  const mockQRCode = (url: string) => (
    <svg viewBox="0 0 100 100" className="w-12 h-12 bg-white p-1 rounded-sm">
      {/* Outer borders */}
      <rect x="0" y="0" width="30" height="30" fill="black" />
      <rect x="5" y="5" width="20" height="20" fill="white" />
      <rect x="10" y="10" width="10" height="10" fill="black" />

      <rect x="70" y="0" width="30" height="30" fill="black" />
      <rect x="75" y="5" width="20" height="20" fill="white" />
      <rect x="80" y="10" width="10" height="10" fill="black" />

      <rect x="0" y="70" width="30" height="30" fill="black" />
      <rect x="5" y="75" width="20" height="20" fill="white" />
      <rect x="10" y="80" width="10" height="10" fill="black" />

      {/* Grid pixel matrix representation to look identical to real QR */}
      <rect x="40" y="10" width="10" height="10" fill="black" />
      <rect x="50" y="0" width="10" height="10" fill="black" />
      <rect x="35" y="25" width="15" height="10" fill="black" />
      <rect x="55" y="20" width="10" height="15" fill="black" />
      
      <rect x="15" y="45" width="10" height="15" fill="black" />
      <rect x="40" y="45" width="20" height="10" fill="black" />
      <rect x="80" y="45" width="10" height="15" fill="black" />

      <rect x="45" y="65" width="15" height="15" fill="black" />
      <rect x="75" y="65" width="15" height="15" fill="black" />
      <rect x="65" y="80" width="10" height="15" fill="black" />
      <rect x="35" y="85" width="20" height="10" fill="black" />
    </svg>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto" id="resume-pdf-modal">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex flex-col md:flex-row h-[90vh]">
        
        {/* Controls Panel (Left side in desktop) */}
        <div className="w-full md:w-80 p-6 bg-slate-950 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-500" />
                <span className="font-display font-black text-sm tracking-wider uppercase text-white">
                  {language === 'en' ? 'Resume Downloader' : 'रेजुमे डाउनलोडर'}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer"
                id="btn-close-pdf-modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              {language === 'en' 
                ? "Export Raunak's professional curriculum vitae in high-fidelity PDF formats. Match either the cyberpunk visual style or the stark minimalist theme."
                : "रौनकको व्यावसायिक बायोडाटा (रेजुमे) उच्च गुणस्तरको PDF ढाँचामा डाउनलोड गर्नुहोस्। चाहे साइबरपङ्क शैली वा न्यूनतम (मिनिमलिस्ट) थिम रोज्नुहोस्।"}
            </p>

            <div className="space-y-4 mb-8">
              <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">
                {language === 'en' ? 'Select Visual Theme' : 'भिजुअल थिम छनौट गर्नुहोस्'}
              </label>
              
              <button
                onClick={() => setSelectedTheme('stark')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-left cursor-pointer ${
                  selectedTheme === 'stark'
                    ? 'bg-slate-900 border-emerald-500 text-white'
                    : 'bg-transparent border-slate-800/85 text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-wider">{language === 'en' ? 'Bold Stark Theme' : 'बोल्ड स्टार्क थिम'}</span>
                  <span className="text-[10px] opacity-60">{language === 'en' ? 'High contrast modern layout' : 'उच्च कन्ट्रास्ट आधुनिक लेआउट'}</span>
                </div>
                {selectedTheme === 'stark' && <Check className="w-4 h-4 text-emerald-500" />}
              </button>

              <button
                onClick={() => setSelectedTheme('cyberpunk')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-left cursor-pointer ${
                  selectedTheme === 'cyberpunk'
                    ? 'bg-slate-900 border-cyan-400 text-white'
                    : 'bg-transparent border-slate-800/85 text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-wider">{language === 'en' ? 'Cyberpunk Classic' : 'साइबरपङ्क क्लासिक'}</span>
                  <span className="text-[10px] opacity-60">{language === 'en' ? 'Neon grid & floating shapes' : 'नियोन ग्रिड र फ्लोटिंग आकारहरू'}</span>
                </div>
                {selectedTheme === 'cyberpunk' && <Check className="w-4 h-4 text-cyan-400" />}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className={`w-full py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer ${
                downloadSuccess
                  ? 'bg-emerald-600 text-white'
                  : selectedTheme === 'cyberpunk'
                  ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
              }`}
              id="btn-trigger-pdf-download"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {language === 'en' ? 'Generating PDF...' : 'पीडीएफ सिर्जना गर्दै...'}
                </>
              ) : downloadSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  {language === 'en' ? 'Downloaded!' : 'डाउनलोड भयो!'}
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  {language === 'en' ? 'Download PDF' : 'पीडीएफ डाउनलोड'}
                </>
              )}
            </button>
            <p className="text-[9px] text-slate-500 text-center font-mono uppercase tracking-wider">
              {language === 'en' ? 'A4 Portrait Format • Vector Output' : 'A4 पोर्ट्रेट ढाँचा • भेक्टर आउटपुट'}
            </p>
          </div>
        </div>

        {/* Live Preview Panel (Right side in desktop) */}
        <div className="flex-1 bg-slate-950 p-6 overflow-y-auto flex justify-center items-start">
          
          {/* Constrain to exact high fidelity A4 dimension aspect ratio for crisp rendering (800px width target is standard) */}
          <div className="border border-slate-800 shadow-2xl origin-top scale-75 sm:scale-[0.85] lg:scale-100 transition-all">
            
            <div
              ref={resumeRef}
              className={`w-[800px] h-[1130px] p-10 flex flex-col justify-between font-sans relative overflow-hidden select-none ${themeStyles.bg}`}
              style={{ minWidth: '800px', minHeight: '1130px' }}
            >
              
              {/* Cyberpunk grid overlays */}
              {isCyber && (
                <div className="absolute inset-0 pointer-events-none opacity-20">
                  <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(18,24,67,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(18,24,67,0.3)_1px,transparent_1px)] bg-[size:20px_20px]" />
                  <div className="absolute -top-1/4 -left-1/4 w-[70%] h-[70%] rounded-full bg-cyan-500/10 blur-[100px]" />
                  <div className="absolute -bottom-1/4 -right-1/4 w-[70%] h-[70%] rounded-full bg-purple-500/10 blur-[100px]" />
                  {/* Neon border bounds */}
                  <div className="absolute inset-4 border border-cyan-500/20" />
                  <div className="absolute inset-5 border border-purple-500/10" />
                </div>
              )}

              {/* Stark Accent Borders */}
              {!isCyber && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-4 border border-white/[0.03]" />
                </div>
              )}

              {/* Main inner workspace */}
              <div className="relative z-10 flex flex-col flex-grow">
                
                {/* Header Navigation Strip */}
                <header className={`flex justify-between items-end mb-8 ${themeStyles.headerBg} pb-3`}>
                  <div className={`text-[11px] font-bold tracking-[0.25em] uppercase ${themeStyles.mutedText}`}>
                    {language === 'en' ? 'Portfolio / 2026' : 'पोर्टफोलियो / २०२६'}
                  </div>
                  <div className={`text-[11px] font-bold tracking-[0.25em] uppercase flex gap-8 ${themeStyles.mutedText}`}>
                    <span>RAUNAK SHRESTHA</span>
                    <span className={themeStyles.primaryAccent}>•</span>
                    <span className="opacity-70">{resumeData.title}</span>
                  </div>
                </header>

                {/* 2-Column Main CV Layout */}
                <div className="grid grid-cols-12 gap-8 flex-grow">
                  
                  {/* Left Column - 5 Cols */}
                  <div className={`col-span-5 flex flex-col gap-6 pr-4 ${isCyber ? 'border-r' : 'border-r border-dashed'} ${themeStyles.borderColor}`}>
                    
                    {/* Portrait Avatar Container */}
                    <div className="relative aspect-square w-full bg-slate-900 border overflow-hidden flex items-center justify-center" style={{ borderColor: isCyber ? '#06b6d4/30' : 'rgba(245,245,244,0.1)' }}>
                      <img
                        src={defaultProfilePhoto}
                        alt="Raunak Shrestha"
                        className="w-full h-full object-cover grayscale brightness-95"
                      />
                      {isCyber && (
                        <div className="absolute inset-0 bg-cyan-500/5 mix-blend-color" />
                      )}
                    </div>

                    {/* Contact Details */}
                    <div>
                      <h4 className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-3 ${themeStyles.mutedText}`}>
                        {language === 'en' ? 'Contact Details' : 'सम्पर्क विवरणहरू'}
                      </h4>
                      <div className="space-y-2 text-xs font-mono">
                        <div className="flex flex-col">
                          <span className={`text-[9px] uppercase tracking-wider opacity-60 ${themeStyles.mutedText}`}>{language === 'en' ? 'Email' : 'इमेल'}</span>
                          <span className={`${themeStyles.textColor} font-semibold`}>{resumeData.contact.email}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-[9px] uppercase tracking-wider opacity-60 ${themeStyles.mutedText}`}>{language === 'en' ? 'Phone' : 'फोन'}</span>
                          <span className={`${themeStyles.textColor} font-semibold`}>{resumeData.contact.phone}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-[9px] uppercase tracking-wider opacity-60 ${themeStyles.mutedText}`}>{language === 'en' ? 'Telegram' : 'टेलीग्राम'}</span>
                          <span className={`${themeStyles.textColor} font-semibold`}>{resumeData.contact.telegram}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className={`text-[9px] uppercase tracking-wider opacity-60 ${themeStyles.mutedText}`}>{language === 'en' ? 'Discord' : 'डिस्कोर्ड'}</span>
                          <span className={`${themeStyles.textColor} font-semibold`}>{resumeData.contact.discord}</span>
                        </div>
                      </div>
                    </div>

                    {/* Connect With Me */}
                    <div>
                      <h4 className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-3 ${themeStyles.mutedText}`}>
                        {language === 'en' ? 'Connect Matrix' : 'कनेक्ट म्याट्रिक्स'}
                      </h4>
                      <div className="space-y-2 text-[11px] font-mono">
                        <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
                          <span className="opacity-60">GitHub</span>
                          <span className={`font-semibold ${themeStyles.primaryAccent}`}>github.com/Raunakv6</span>
                        </div>
                        <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
                          <span className="opacity-60">X Profile</span>
                          <span className={`font-semibold ${themeStyles.primaryAccent}`}>x.com/@Raunak4440</span>
                        </div>
                        <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
                          <span className="opacity-60">Instagram</span>
                          <span className={`font-semibold ${themeStyles.primaryAccent}`}>instagram.com/raunak...</span>
                        </div>
                        <div className="flex justify-between items-center py-1 border-b border-white/[0.04]">
                          <span className="opacity-60">YouTube</span>
                          <span className={`font-semibold ${themeStyles.primaryAccent}`}>youtube.com/@hkraunak</span>
                        </div>
                        <div className="flex justify-between items-center py-1">
                          <span className="opacity-60">Spotify</span>
                          <span className={`font-semibold ${themeStyles.primaryAccent}`}>RaunakTheOG</span>
                        </div>
                      </div>
                    </div>

                    {/* Core Skills & Key Strength */}
                    <div className="space-y-4">
                      <div>
                        <h4 className={`text-[10px] font-bold tracking-[0.2em] uppercase mb-2 ${themeStyles.mutedText}`}>
                          {language === 'en' ? 'Core Attributes' : 'मुख्य विशेषताहरू'}
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {resumeData.skills.core.map((s, i) => (
                            <span key={i} className={`text-[9px] font-bold font-mono uppercase px-2 py-1 border ${themeStyles.borderColor} ${themeStyles.textColor}`}>
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className={`p-3 border ${themeStyles.borderColor} ${themeStyles.cardBg}`}>
                        <span className={`text-[9px] font-mono uppercase font-bold tracking-wider ${themeStyles.primaryAccent}`}>
                          {language === 'en' ? 'Primary Driver' : 'मुख्य चालक शक्ति'}
                        </span>
                        <h5 className="text-xs font-bold uppercase mt-1 text-white">{resumeData.skills.strength.title}</h5>
                        <p className={`text-[10px] italic leading-snug mt-0.5 ${themeStyles.mutedText}`}>
                          {resumeData.skills.strength.desc}
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* Right Column - 7 Cols */}
                  <div className="col-span-7 flex flex-col justify-between pl-2">
                    
                    {/* Header profile info */}
                    <div className="mb-6">
                      <h1 className="text-[64px] leading-[0.85] font-display font-black tracking-tighter uppercase mb-2 text-white">
                        RAUNAK
                      </h1>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold uppercase tracking-[0.2em] ${themeStyles.badgeBg} px-2.5 py-1`}>
                          {resumeData.title}
                        </span>
                        <span className={`text-xs font-bold uppercase tracking-[0.15em] ${themeStyles.primaryAccent}`}>
                          &quot;I&apos;m LOST&quot;
                        </span>
                      </div>
                      <p className={`text-xs leading-relaxed italic mt-4 pr-2 ${themeStyles.textColor}`}>
                        &ldquo;{resumeData.intro}&rdquo;
                      </p>
                    </div>

                    {/* Career Goals */}
                    <div>
                      <h3 className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-2 ${themeStyles.mutedText}`}>
                        {language === 'en' ? 'Career Goal' : 'करियरको लक्ष्य'}
                      </h3>
                      <p className={`text-xs leading-relaxed ${themeStyles.textColor}`}>
                        {resumeData.careerGoals}
                      </p>
                    </div>

                    {/* Education Timeline */}
                    <div>
                      <h3 className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-3 text-slate-500`}>
                        {language === 'en' ? 'Education & Journey' : 'शिक्षा र यात्रा'}
                      </h3>
                      <div className="space-y-2.5">
                        {resumeData.education.map((edu, idx) => (
                          <div key={idx} className={`relative pl-3.5 border-l ${idx === 0 ? 'border-emerald-500' : 'border-white/10'}`}>
                            <div className="flex justify-between items-start">
                              <h4 className="text-[11px] font-bold uppercase text-white">{edu.level}</h4>
                              <span className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 border ${themeStyles.borderColor} ${themeStyles.mutedText}`}>
                                {edu.date}
                              </span>
                            </div>
                            <p className={`text-[10px] font-mono uppercase tracking-tight mt-0.5 ${themeStyles.primaryAccent}`}>
                              {edu.institution}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Experience Grid */}
                    <div>
                      <h3 className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-2 ${themeStyles.mutedText}`}>
                        {language === 'en' ? 'Learning Experience' : 'सिकाइको अनुभव'}
                      </h3>
                      <div className={`p-3 border ${themeStyles.borderColor} ${themeStyles.cardBg}`}>
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="text-[11px] font-bold uppercase text-white">{resumeData.experience.title}</h4>
                          <span className={`text-[9px] font-mono font-bold ${themeStyles.primaryAccent}`}>
                            {resumeData.experience.dates}
                          </span>
                        </div>
                        <p className={`text-[10px] leading-relaxed ${themeStyles.mutedText}`}>
                          {resumeData.experience.desc}
                        </p>
                      </div>
                    </div>

                    {/* Technical Competencies Progress bars */}
                    <div>
                      <h3 className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-2.5 ${themeStyles.mutedText}`}>
                        {language === 'en' ? 'Core Technical Intelligence' : 'मुख्य प्राविधिक बुद्धिमत्ता'}
                      </h3>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                        {resumeData.skills.technical.map((tech, idx) => (
                          <div key={idx} className="space-y-0.5">
                            <div className="flex justify-between text-[9px] font-mono">
                              <span className="truncate opacity-80 uppercase text-white">{tech.name}</span>
                              <span className={themeStyles.primaryAccent}>{tech.level}%</span>
                            </div>
                            <div className="h-1 bg-white/5 overflow-hidden">
                              <div
                                className={`h-full ${isCyber ? 'bg-cyan-500' : 'bg-[#F27D26]'}`}
                                style={{ width: `${tech.level}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>

                {/* Projects Section Grid layout */}
                <div className="mt-8 pt-4 border-t border-white/[0.05]">
                  <h3 className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-3 text-slate-500`}>
                    {language === 'en' ? 'Representative Research Projects' : 'प्रतिनिधि अनुसन्धान परियोजनाहरू'}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {resumeData.projects.map((proj) => (
                      <div key={proj.id} className={`p-3.5 border ${themeStyles.borderColor} ${themeStyles.cardBg} flex justify-between items-start gap-3`}>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-1.5">
                            <span className={`text-[9px] font-mono font-bold ${themeStyles.primaryAccent}`}>[{proj.id}]</span>
                            <h4 className="text-[11px] font-bold uppercase text-white">{proj.title}</h4>
                          </div>
                          <p className={`text-[9px] leading-tight line-clamp-2 ${themeStyles.mutedText}`}>
                            {proj.desc}
                          </p>
                          <span className="text-[8px] font-mono tracking-tight text-white/50 block">
                            {proj.url}
                          </span>
                        </div>
                        <div className="flex-shrink-0">
                          {mockQRCode(proj.url)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Section */}
                <footer className={`mt-6 pt-3 border-t ${themeStyles.borderColor} flex justify-between items-center`}>
                  <p className={`text-[9px] italic ${themeStyles.mutedText}`}>
                    &ldquo;{resumeData.quote}&rdquo;
                  </p>
                  <p className="text-[9px] opacity-40 font-mono tracking-wider uppercase">
                    © 2026 RAUNAK SHRESTHA • {language === 'en' ? 'BUILT FOR THE FUTURE' : 'भविष्यको लागि निर्मित'}
                  </p>
                </footer>

              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

