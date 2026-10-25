import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Github, Twitter, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

const defaultProfilePhoto = 'https://res.cloudinary.com/dxjhts59s/image/upload/f_auto,q_auto/1000006938_fnkdwc';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { language, setLanguage, t } = useLanguage();
  const [profilePhoto, setProfilePhoto] = useState<string>(() => {
    const saved = localStorage.getItem('raunak_profile_photo');
    if (saved && saved !== defaultProfilePhoto && !saved.includes('profile_picture')) {
      return saved;
    }
    return defaultProfilePhoto;
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('raunak_profile_photo');
      if (saved && saved !== defaultProfilePhoto && !saved.includes('profile_picture')) {
        setProfilePhoto(saved);
      } else {
        setProfilePhoto(defaultProfilePhoto);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('profile_photo_updated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('profile_photo_updated', handleStorageChange);
    };
  }, []);

  // Intersection Observer for Active Section Tracking
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    const sections = ['home', 'about', 'education', 'skills', 'experience', 'projects', 'contact'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const navLinks = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.education'), href: '#education' },
    { name: t('nav.skills'), href: '#skills' },
    { name: t('nav.experience'), href: '#experience' },
    { name: t('nav.projects'), href: '#projects' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-950/75 border-b border-slate-900/80 backdrop-blur-md py-3' 
          : 'bg-transparent py-5'
      }`}
      id="site-header"
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group" id="nav-logo">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-850 flex-shrink-0 bg-slate-900 shadow-sm">
            <img
              src={profilePhoto}
              alt="Raunak Shrestha"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="font-display font-black text-2xl tracking-[0.1em] uppercase text-white group-hover:text-orange-500 transition-all">
            Raunak
          </span>
          <span className="bg-[#151619] text-orange-500 text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 border border-slate-800 animate-pulse">
            {t('nav.explorer')}
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#151619] border border-slate-800/80 px-2.5 py-1 z-10" id="nav-desktop">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative text-[9px] xl:text-[10px] font-bold uppercase tracking-[0.12em] px-3.5 py-1.5 transition-colors duration-300 select-none ${
                  isActive ? 'text-orange-400 font-extrabold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-[#F27D26]/15 border-b-2 border-[#F27D26]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Social Link Button & Language Switcher */}
        <div className="hidden md:flex items-center gap-4" id="nav-socials">
          {/* Cyber Capsule Language Switcher */}
          <div className="flex items-center bg-slate-950 border border-slate-800/80 p-0.5 rounded-md" id="lang-switcher">
            <button
              onClick={() => setLanguage('en')}
              className={`text-[9px] font-mono font-bold px-2 py-1 rounded transition-all duration-300 cursor-pointer ${
                language === 'en'
                  ? 'bg-orange-500 text-slate-950 shadow-[0_0_8px_rgba(242,125,38,0.4)] font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('np')}
              className={`text-[9px] font-mono font-bold px-2 py-1 rounded transition-all duration-300 cursor-pointer ${
                language === 'np'
                  ? 'bg-orange-500 text-slate-950 shadow-[0_0_8px_rgba(242,125,38,0.4)] font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              नेपाली
            </button>
          </div>

          <a
            href="https://github.com/Raunakv6"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-orange-400 transition-colors"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://x.com/@Raunak4440"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-orange-400 transition-colors"
            title="X (Twitter)"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 bg-white hover:bg-orange-500 hover:text-slate-950 text-slate-950 font-bold text-[10px] uppercase tracking-widest px-4 py-2 transition-all cursor-pointer"
          >
            {t('nav.letsConnect')} <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Action Controls */}
        <div className="flex md:hidden items-center gap-3">
          {/* Simple Mobile Lang Switcher Button */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'np' : 'en')}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-orange-400 hover:text-white text-[10px] font-mono font-bold uppercase flex items-center gap-1 cursor-pointer"
            title="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'EN' : 'ने'}</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-850 cursor-pointer"
            id="btn-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu with Smooth Transitions */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden absolute top-full left-0 w-full bg-slate-950/98 border-b border-slate-800 backdrop-blur-lg flex flex-col p-6 space-y-4 shadow-xl shadow-black/60 overflow-hidden"
            id="nav-mobile-menu"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs font-bold uppercase tracking-[0.15em] text-slate-300 hover:text-white py-2 border-b border-slate-900/60 transition-all"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex justify-between items-center pt-2">
              <div className="flex gap-4">
                <a href="https://github.com/Raunakv6" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white">
                  <Github className="w-4.5 h-4.5" />
                </a>
                <a href="https://x.com/@Raunak4440" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white">
                  <Twitter className="w-4.5 h-4.5" />
                </a>
              </div>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-white text-slate-950 hover:bg-orange-500 hover:text-slate-950 font-bold text-[10px] uppercase tracking-widest px-4 py-2 cursor-pointer transition-colors"
              >
                {t('nav.letsConnect')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

