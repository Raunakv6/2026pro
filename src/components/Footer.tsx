import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import neonGithubIcon from '../assets/images/neon_github_icon_1782699643111.jpg';
import neonLinkedinIcon from '../assets/images/neon_linkedin_icon_1782699656588.jpg';
import neonTwitterIcon from '../assets/images/neon_twitter_icon_1782699677199.jpg';

export default function Footer() {
  const { t, language } = useLanguage();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12" id="site-footer">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Brand Logo and Copyright */}
        <div className="flex flex-col items-center md:items-start space-y-1">
          <a href="#home" className="font-display font-black text-xl tracking-[0.1em] uppercase text-white hover:text-emerald-500 transition-all">
            Raunak
          </a>
          <p className="text-[10px] text-slate-500 font-mono text-center md:text-left uppercase tracking-wider">
            &copy; 2026 Raunak Shrestha • {language === 'en' ? 'Built for the future.' : 'भविष्यको लागि निर्मित।'}
          </p>
        </div>

        {/* Middle: Minimal Navigation */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[10px] text-slate-500 font-mono uppercase tracking-wider">
          <a href="#home" className="hover:text-emerald-500 transition-colors">{language === 'en' ? 'Home' : 'गृहपृष्ठ'}</a>
          <a href="#about" className="hover:text-emerald-500 transition-colors">{language === 'en' ? 'About' : 'बारेमा'}</a>
          <a href="#education" className="hover:text-emerald-500 transition-colors">{language === 'en' ? 'Education' : 'शिक्षा'}</a>
          <a href="#skills" className="hover:text-emerald-500 transition-colors">{language === 'en' ? 'Skills' : 'सीपहरू'}</a>
          <a href="#projects" className="hover:text-emerald-500 transition-colors">{language === 'en' ? 'Projects' : 'परियोजनाहरू'}</a>
          <a href="#contact" className="hover:text-emerald-500 transition-colors">{language === 'en' ? 'Contact' : 'सम्पर्क'}</a>
        </nav>

        {/* Right Side: Social Media Shortcuts & Scroll Top */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            {/* GitHub Profile */}
            <a
              href="https://github.com/Raunakv6"
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-10 h-10 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-center overflow-hidden hover:scale-110 active:scale-95 transition-all duration-300 group shadow-lg shadow-black/40 hover:border-cyan-500/50 hover:shadow-cyan-500/10 cursor-pointer"
              title="GitHub Profile"
              id="link-footer-github"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/0 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img
                src={neonGithubIcon}
                alt="GitHub"
                className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </a>

            {/* LinkedIn Profile */}
            <a
              href="https://www.linkedin.com/in/raunak-shrestha/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-10 h-10 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-center overflow-hidden hover:scale-110 active:scale-95 transition-all duration-300 group shadow-lg shadow-black/40 hover:border-orange-500/50 hover:shadow-orange-500/10 cursor-pointer"
              title="LinkedIn Profile"
              id="link-footer-linkedin"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/0 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img
                src={neonLinkedinIcon}
                alt="LinkedIn"
                className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </a>

            {/* X / Twitter Profile */}
            <a
              href="https://x.com/Raunak4440"
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-10 h-10 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-center overflow-hidden hover:scale-110 active:scale-95 transition-all duration-300 group shadow-lg shadow-black/40 hover:border-cyan-500/50 hover:shadow-cyan-500/10 cursor-pointer"
              title="X Profile"
              id="link-footer-twitter"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/0 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img
                src={neonTwitterIcon}
                alt="Twitter"
                className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </a>
          </div>

          <button
            onClick={handleScrollTop}
            className="p-2.5 bg-slate-900 hover:bg-emerald-500 text-slate-400 hover:text-slate-950 border border-slate-800 hover:border-emerald-500 transition-all cursor-pointer"
            title={language === 'en' ? 'Scroll to Top' : 'माथि स्क्रोल गर्नुहोस्'}
            id="btn-scroll-top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}

