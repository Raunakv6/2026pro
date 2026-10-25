import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, QrCode, Play, CheckCircle2, X, Sparkles, Terminal } from 'lucide-react';
import { ProjectItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ProjectCardProps {
  project: ProjectItem;
  isActiveSandbox: boolean;
  onLaunchSandbox: () => void;
}

export default function ProjectCard({ project, isActiveSandbox, onLaunchSandbox }: ProjectCardProps) {
  const [showQRModal, setShowQRModal] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  // Motion values for smooth 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 20 });

  // Rotate card up to 10 degrees based on cursor offset
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  // Subtle glare effect coordinate mapping
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "0%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "0%"]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    // Normalized value between -0.5 and 0.5
    const mouseX = (event.clientX - rect.left) / width - 0.5;
    const mouseY = (event.clientY - rect.top) / height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Generate QR Code matching theme color (orange f27d26 on dark bg 0b0f19)
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(project.link)}&color=f27d26&bgcolor=090d16`;

  return (
    <>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="group relative rounded-3xl p-[1px] bg-gradient-to-b from-slate-800/40 via-slate-900/10 to-orange-500/10 hover:from-orange-500/40 hover:via-slate-850/50 hover:to-orange-500/30 transition-all duration-700 shadow-xl shadow-black/40 h-full cursor-default"
      >
        {/* Animated Background Laser Glow Border (Orange Theme) */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0">
          <div className="absolute inset-[-10px] bg-[radial-gradient(circle_at_center,rgba(242,125,38,0.12),transparent_60%)]" />
          <div className="absolute inset-0 rounded-3xl border border-orange-500/30 shadow-[0_0_30px_rgba(242,125,38,0.15)] animate-pulse" />
        </div>

        {/* Dynamic Card Internal Structure */}
        <div 
          style={{ transform: "translateZ(30px)" }}
          className="relative z-10 bg-slate-950/70 hover:bg-slate-950/80 rounded-[23px] p-6 h-full flex flex-col justify-between backdrop-blur-xl border border-slate-900 transition-all duration-500 overflow-hidden"
        >
          {/* Card Dynamic Reflective Glare Element */}
          <motion.div 
            style={{
              background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0) 50%)`,
            }}
            className="absolute inset-0 pointer-events-none z-20"
          />

          <div className="space-y-5">
            {/* Top Bar (Status Badge + QR Shortcut) */}
            <div className="flex justify-between items-center">
              {/* Pulsing Live Status Badge */}
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-400">
                  SYSTEM_STATUS: <span className="text-white bg-orange-500/15 border border-orange-500/20 px-2 py-0.5 rounded-md">{language === 'en' ? 'LIVE' : 'सक्रिय'}</span>
                </span>
              </div>

              {/* QR Trigger Button */}
              <button
                onClick={() => setShowQRModal(true)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-850 text-slate-400 hover:text-orange-400 hover:border-orange-500/30 hover:bg-slate-900/60 hover:shadow-[0_0_12px_rgba(242,125,38,0.15)] transition-all cursor-pointer"
                title={language === 'en' ? 'Generate Mobile QR Code' : 'मोबाइल क्युआर कोड जेनेरेट गर्नुहोस्'}
              >
                <QrCode className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Premium Project Screenshot Showcase (Image zoom and slide overlay) */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-950 border border-slate-900 group">
              {/* Elegant Orange/Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent z-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-40" />
              
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out z-0"
                referrerPolicy="no-referrer"
              />

              {/* Sandbox Overlay */}
              <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 z-20">
                <div className="text-center px-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-[10px] font-mono font-bold text-orange-400 uppercase tracking-wider mb-1">{language === 'en' ? 'Interactive Environment' : 'अन्तरक्रियात्मक वातावरण'}</p>
                  <h4 className="text-white text-xs font-bold font-mono">{language === 'en' ? 'Run code directly on this page' : 'सिधै यसै पृष्ठमा कोड चलाउनुहोस्'}</h4>
                </div>
                <button
                  onClick={onLaunchSandbox}
                  className="px-5 py-2.5 bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-lg shadow-orange-500/25 transition-all scale-95 group-hover:scale-100 duration-300 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  {language === 'en' ? 'Launch Sandbox' : 'स्यान्डबक्स चलाउनुहोस्'}
                </button>
              </div>
            </div>

            {/* Title & Core Meta */}
            <div className="space-y-2.5">
              <h3 className="font-display font-black text-xl sm:text-2xl text-slate-100 group-hover:text-orange-400 transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed font-normal">
                {project.description}
              </p>
            </div>

            {/* Tech Badges with hover accentuation */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.tech.map((t) => (
                <span 
                  key={t} 
                  className="px-2.5 py-1 bg-slate-900/60 border border-slate-850 rounded-lg text-[10px] font-mono font-bold text-slate-400 group-hover:border-orange-500/15 group-hover:text-slate-300 transition-all duration-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Fully Featured Futuristic Action Button HUD */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 pt-4 border-t border-slate-900/60">
            {/* Live Sandbox Interactive / State Indicator */}
            <button
              onClick={onLaunchSandbox}
              className={`inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-mono font-bold border transition-all duration-300 cursor-pointer ${
                isActiveSandbox
                  ? 'bg-orange-500/10 border-orange-500/35 text-orange-400 shadow-[0_0_15px_rgba(242,125,38,0.1)]'
                  : 'bg-slate-900 border-slate-850 text-slate-300 hover:text-white hover:border-orange-500/40 hover:bg-slate-900/80'
              }`}
            >
              <Play className={`w-3.5 h-3.5 ${isActiveSandbox ? 'animate-pulse text-orange-400' : ''}`} />
              {isActiveSandbox 
                ? (language === 'en' ? 'Sandbox Terminal' : 'स्यान्डबक्स टर्मिनल') 
                : (language === 'en' ? 'Sandbox Demo' : 'स्यान्डबक्स डेमो')}
            </button>
            
            {/* Live External URL Link */}
            <div className="flex gap-2">
              <a
                href={project.link.startsWith('http') ? project.link : `https://${project.link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-3 bg-slate-900/40 border border-slate-850 hover:border-orange-500/20 text-slate-300 hover:text-orange-400 hover:bg-slate-900/80 rounded-xl text-xs font-mono font-bold transition-all duration-300"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                {language === 'en' ? 'Live Demo' : 'लाइभ डेमो'}
              </a>

              {/* GitHub Button */}
              <a
                href={project.github || "https://github.com/rsshrestha234"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-slate-900/40 border border-slate-850 hover:border-orange-500/20 text-slate-300 hover:text-orange-400 hover:bg-slate-900/80 rounded-xl transition-all duration-300"
                title={language === 'en' ? 'Inspect GitHub Repository' : 'गिटहब भिजिट गर्नुहोस्'}
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* QR Code Lightbox Modal Overlay */}
      <AnimatePresence>
        {showQRModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex items-center justify-center z-50 px-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 15, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="bg-slate-950 border border-orange-500/20 rounded-3xl p-6 max-w-sm w-full relative overflow-hidden shadow-[0_0_50px_rgba(242,125,38,0.15)]"
            >
              {/* Neon accent patterns inside modal */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />
              
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-4 h-4 text-orange-400" />
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">{language === 'en' ? 'Mobile Link Hub' : 'मोबाइल लिङ्क हब'}</span>
                </div>
                <button
                  onClick={() => setShowQRModal(false)}
                  className="p-1 rounded bg-slate-900 border border-slate-850 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* QR Image Frame */}
              <div className="flex flex-col items-center justify-center text-center space-y-5">
                <div className="p-4 bg-slate-900/40 border border-slate-850 rounded-2xl relative">
                  <div className="absolute inset-0 border border-orange-500/20 rounded-2xl animate-pulse pointer-events-none" />
                  <img
                    src={qrCodeUrl}
                    alt={`${project.title} Mobile QR Code`}
                    className="w-48 h-48 rounded-lg select-none"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-display font-bold text-slate-200 text-sm">
                    {project.title}
                  </h4>
                  <p className="text-[10px] font-mono text-slate-400 max-w-xs leading-relaxed">
                    {language === 'en' 
                      ? 'Scan this matrix with your mobile device to launch the direct production build deployment.'
                      : 'यस म्याट्रिक्सलाई आफ्नो मोबाइलले स्क्यान गरेर सोझै उत्पादन बिल्ड लग-इन गर्नुहोस्।'}
                  </p>
                </div>
              </div>

              {/* Footer diagnostic label */}
              <div className="mt-6 pt-4 border-t border-slate-900/60 flex items-center justify-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                  {language === 'en' ? 'Secure Direct Transfer Complete' : 'सुरक्षित सिधा स्थानान्तरण सम्पन्न'}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

