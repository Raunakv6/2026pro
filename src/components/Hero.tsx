import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown, Sparkles, Send, Flame, Upload, Clipboard, Download, Loader2 } from 'lucide-react';
import ResumePDFModal from './ResumePDFModal';
import CyberBackground from './CyberBackground';
import { downloadResume } from '../utils/downloadResume';
import { useLanguage } from '../context/LanguageContext';

const defaultProfilePhoto = 'https://res.cloudinary.com/dxjhts59s/image/upload/f_auto,q_auto/1000006938_fnkdwc';

function TypewriterSubtitle() {
  const { t, language } = useLanguage();
  const phrases = t('hero.advancedPhrases') as string[];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isTabActive, setIsTabActive] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Reset indices when language changes to prevent index out of range issues
  useEffect(() => {
    setPhraseIndex(0);
    setCharIndex(0);
    setDisplayText('');
    setIsDeleting(false);
  }, [language]);

  // Handle visibility API to pause when user changes tab
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabActive(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (!isTabActive || !phrases || phrases.length === 0) return;

    let timer: NodeJS.Timeout;
    const currentPhrase = phrases[phraseIndex] || '';

    const tick = () => {
      if (!isDeleting) {
        // Typing phase
        if (charIndex < currentPhrase.length) {
          setDisplayText(currentPhrase.substring(0, charIndex + 1));
          timer = setTimeout(() => {
            setCharIndex((prev) => prev + 1);
          }, 70); // typing speed 70ms
        } else {
          // Pause at end of phrase
          timer = setTimeout(() => {
            setIsDeleting(true);
          }, 1000); // 1 second pause before deleting
        }
      } else {
        // Deleting phase
        if (charIndex > 0) {
          setDisplayText(currentPhrase.substring(0, charIndex - 1));
          timer = setTimeout(() => {
            setCharIndex((prev) => prev - 1);
          }, 35); // delete speed 35ms
        } else {
          // Phrase completely deleted, transition to next phrase
          setIsTransitioning(true);
          timer = setTimeout(() => {
            setIsDeleting(false);
            setPhraseIndex((prev) => (prev + 1) % phrases.length);
            setIsTransitioning(false);
          }, 200); // Short delay for smooth fade transition
        }
      }
    };

    tick();

    return () => clearTimeout(timer);
  }, [phraseIndex, charIndex, isDeleting, isTabActive, phrases]);


  return (
    <div 
      className="flex items-center text-base sm:text-lg md:text-xl font-mono font-bold uppercase ml-1 h-[36px] overflow-hidden select-none" 
      id="typewriter-container"
    >
      <span
        className={`text-[#F27D26] transition-all duration-300 ${
          isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
        style={{
          textShadow: '0 0 8px rgba(242, 125, 38, 0.85), 0 0 20px rgba(242, 125, 38, 0.4)'
        }}
      >
        {displayText}
      </span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
        className="inline-block w-[3px] h-[18px] bg-[#F27D26] ml-2 align-middle"
        style={{
          boxShadow: '0 0 10px #F27D26, 0 0 2px #F27D26',
        }}
      />
    </div>
  );
}

export default function Hero() {
  const { t, language } = useLanguage();
  const [profilePhoto, setProfilePhoto] = useState<string>(() => {
    const saved = localStorage.getItem('raunak_profile_photo');
    if (saved && saved !== defaultProfilePhoto && !saved.includes('profile_picture')) {
      return saved;
    }
    return defaultProfilePhoto;
  });
  const [urlInput, setUrlInput] = useState<string>('');
  const [showUploader, setShowUploader] = useState<boolean>(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const handleDownloadCV = async () => {
    setIsDownloading(true);
    try {
      await downloadResume();
    } catch (err) {
      console.error('Download CV failed:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfilePhoto(base64String);
        localStorage.setItem('raunak_profile_photo', base64String);
        window.dispatchEvent(new Event('profile_photo_updated'));
        setShowUploader(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      setProfilePhoto(urlInput.trim());
      localStorage.setItem('raunak_profile_photo', urlInput.trim());
      window.dispatchEvent(new Event('profile_photo_updated'));
      setUrlInput('');
      setShowUploader(false);
    }
  };

  const resetPhoto = () => {
    setProfilePhoto(defaultProfilePhoto);
    localStorage.removeItem('raunak_profile_photo');
    window.dispatchEvent(new Event('profile_photo_updated'));
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#020617]" px-6="true">
      {/* Absolute Decorative Background Elements */}
      <CyberBackground />

      <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column - Content */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6 lg:pr-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-xs font-mono text-emerald-400 font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('hero.sparkleText')}</span>
          </motion.div>

          <div className="space-y-1">
            <motion.h4
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-xs font-bold tracking-[0.2em] uppercase text-slate-500"
            >
              {t('hero.subtitle')}
            </motion.h4>
            
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-[64px] sm:text-[90px] md:text-[120px] lg:text-[140px] leading-[0.85] font-display font-black tracking-tighter uppercase mb-2 text-white"
            >
              RAUNAK
            </motion.h1>

            <TypewriterSubtitle />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-slate-300 text-lg sm:text-xl leading-relaxed italic opacity-90 border-l-2 border-emerald-500 pl-4 py-1"
          >
            {t('hero.bio')}
          </motion.p>

          {/* Call to Actions - stark solid block style */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap gap-4 w-full sm:w-auto"
          >
            <a
              href="#projects"
              className="bg-cyan-500 hover:bg-slate-300 text-slate-950 font-bold text-xs uppercase tracking-widest px-6 py-3.5 transition-all text-center flex-1 sm:flex-initial cursor-pointer"
            >
              {t('hero.exploreBtn')}
            </a>
            <button
              onClick={handleDownloadCV}
              disabled={isDownloading}
              className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-600 disabled:opacity-80 text-slate-950 font-bold text-xs uppercase tracking-widest px-6 py-3.5 transition-all text-center flex-1 sm:flex-initial cursor-pointer flex items-center justify-center gap-2"
              id="btn-open-resume-pdf"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> {t('hero.downloading')}
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" /> {t('hero.downloadBtn')}
                </>
              )}
            </button>
            <a
              href="#contact"
              className="border border-slate-300/30 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-widest px-6 py-3.5 transition-all text-center flex-1 sm:flex-initial cursor-pointer"
            >
              {t('hero.contactBtn')}
            </a>
          </motion.div>
        </div>

        {/* Right Column - Avatar / Custom Image Upload Component */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-3xl overflow-hidden border border-slate-800/80 bg-slate-900/40 p-3 shadow-2xl backdrop-blur-sm group"
          >
            {/* Ambient Rotating Ring */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-cyan-500/10 to-teal-500/20 opacity-40 rounded-3xl" />
            
            {/* Image Box */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex flex-col items-center justify-center">
              {profilePhoto ? (
                <>
                  <img
                    src={profilePhoto}
                    alt="Raunak Shrestha"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {/* Photo Action Overlay */}
                  <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                    <button
                      onClick={() => setShowUploader(true)}
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-all mb-2 cursor-pointer"
                      id="btn-update-photo"
                    >
                      Change Photo
                    </button>
                    <button
                      onClick={resetPhoto}
                      className="text-xs text-red-400 hover:text-red-300 font-mono hover:underline cursor-pointer"
                      id="btn-remove-photo"
                    >
                      Reset to Default
                    </button>
                  </div>
                </>
              ) : (
                <div className="p-6 flex flex-col items-center justify-center text-center space-y-4">
                  {/* Default SVG Avatar - representing a smart tech explorer with glasses */}
                  <div className="relative w-32 h-32 rounded-full bg-slate-900/80 border border-slate-800/80 flex items-center justify-center text-slate-400">
                    <svg className="w-20 h-20 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    {/* Glowing Glasses decoration inside default avatar */}
                    <div className="absolute top-[44%] left-1/2 -translate-x-1/2 flex gap-1.5 pointer-events-none">
                      <div className="w-5 h-2.5 rounded-full border border-emerald-400/80 bg-emerald-400/10 shadow-[0_0_8px_rgba(52,211,153,0.4)]" />
                      <div className="w-5 h-2.5 rounded-full border border-emerald-400/80 bg-emerald-400/10 shadow-[0_0_8px_rgba(52,211,153,0.4)]" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-slate-200">Raunak Shrestha</h4>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">Mock Avatar Active</p>
                  </div>
                  <button
                    onClick={() => setShowUploader(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-emerald-400 hover:text-emerald-300 font-mono text-[11px] font-semibold border border-slate-800 rounded-lg cursor-pointer transition-colors"
                    id="btn-upload-init"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    Set Custom Photo
                  </button>
                  <p className="text-[9px] text-slate-600 leading-normal max-w-[200px]">
                    Drag &amp; drop or click to upload the college portrait you provided to personalize this page!
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Expandable Image Uploader Overlay */}
          {showUploader && (
            <div className="absolute inset-0 bg-slate-950/95 z-20 rounded-3xl p-6 flex flex-col justify-between border border-slate-800">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-slate-850">
                  <h4 className="font-display font-bold text-sm text-slate-200">Personalize Profile Photo</h4>
                  <button onClick={() => setShowUploader(false)} className="text-xs text-slate-500 hover:text-slate-200 hover:underline cursor-pointer">Cancel</button>
                </div>

                {/* Drag-n-drop simulated box */}
                <div className="relative border-2 border-dashed border-slate-800 hover:border-emerald-500/40 rounded-xl p-4 flex flex-col items-center justify-center text-center group/drop transition-colors duration-200">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    id="file-upload-photo"
                  />
                  <Upload className="w-8 h-8 text-slate-500 group-hover/drop:text-emerald-400 mb-2 transition-colors" />
                  <span className="text-xs text-slate-300 font-bold">Upload portrait image file</span>
                  <span className="text-[10px] text-slate-500 font-mono mt-1">PNG, JPG, SVG up to 5MB</span>
                </div>

                <div className="relative flex items-center justify-center my-1">
                  <span className="absolute left-0 right-0 h-[1px] bg-slate-850" />
                  <span className="relative bg-slate-950 px-2 text-[10px] font-mono text-slate-500 font-bold uppercase">OR</span>
                </div>

                {/* URL paste input */}
                <form onSubmit={handleUrlSubmit} className="space-y-2">
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
                    Paste Image Web URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={urlInput}
                      onChange={e => setUrlInput(e.target.value)}
                      className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 outline-none focus:border-emerald-500 font-mono"
                      id="input-photo-url"
                    />
                    <button
                      type="submit"
                      className="px-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg cursor-pointer"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>

              <div className="text-[9px] text-slate-500 font-mono text-center">
                Stored privately inside your local browser storage.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-500 animate-pulse text-xs font-mono font-bold">
        <span>SCROLL DOWN</span>
        <ArrowDown className="w-3.5 h-3.5" />
      </div>

      {/* High Fidelity Resume PDF Generation Modal */}
      <ResumePDFModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />
    </section>
  );
}
