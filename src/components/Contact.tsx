import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, Send, Twitter, Youtube, Instagram, Disc, Music, Download, CheckCircle, RefreshCw, AlertCircle, Loader2 } from 'lucide-react';
import { downloadResume } from '../utils/downloadResume';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const { t, language } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const handleDownloadResume = async () => {
    setIsDownloading(true);
    try {
      await downloadResume();
    } catch (err) {
      console.error('Download CV failed:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const isFieldValid = (fieldName: 'name' | 'email' | 'message') => {
    const val = formData[fieldName].trim();
    if (fieldName === 'name') {
      return val.length >= 2;
    }
    if (fieldName === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(val);
    }
    if (fieldName === 'message') {
      return val.length >= 10;
    }
    return true;
  };

  const getFieldError = (fieldName: 'name' | 'email' | 'message') => {
    if (!touched[fieldName]) return '';
    
    if (fieldName === 'name') {
      if (!formData.name.trim()) {
        return language === 'en' 
          ? 'ERR_CODE_01: Identification token is missing.' 
          : 'ERR_CODE_01: पहिचान टोकन हराइरहेको छ।';
      }
      if (formData.name.trim().length < 2) {
        return language === 'en'
          ? 'ERR_CODE_02: Minimally 2 characters required.'
          : 'ERR_CODE_02: न्यूनतम २ अक्षरहरू आवश्यक छ।';
      }
    }
    
    if (fieldName === 'email') {
      if (!formData.email.trim()) {
        return language === 'en'
          ? 'ERR_CODE_03: Ingress routing destination needed.'
          : 'ERR_CODE_03: इमेल मार्ग गन्तव्य आवश्यक छ।';
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        return language === 'en'
          ? 'ERR_CODE_04: Email structure invalid.'
          : 'ERR_CODE_04: इमेल ढाँचा अमान्य छ।';
      }
    }
    
    if (fieldName === 'message') {
      if (!formData.message.trim()) {
        return language === 'en'
          ? 'ERR_CODE_05: Payload content cannot be null.'
          : 'ERR_CODE_05: सन्देश सामग्री खाली हुन सक्दैन।';
      }
      if (formData.message.trim().length < 10) {
        return language === 'en'
          ? 'ERR_CODE_06: Desired length >= 10 bytes.'
          : 'ERR_CODE_06: आवश्यक लम्बाइ १० अक्षर भन्दा बढी हुनुपर्छ।';
      }
    }
    
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleBlur = (fieldName: string) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setTouched({ name: true, email: true, subject: true, message: true });

    const hasErrors = !isFieldValid('name') || !isFieldValid('email') || !isFieldValid('message');
    if (hasErrors) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
      return;
    }

    setStatus('sending');
    
    // Simulate API request
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTouched({ name: false, email: false, subject: false, message: false });
    }, 1800);
  };

  const socials = [
    {
      name: 'Email',
      value: 'raunakshrestha4440@gmail.com',
      href: 'mailto:raunakshrestha4440@gmail.com',
      icon: <Mail className="w-5 h-5 text-emerald-400" />,
      color: 'hover:border-emerald-500/30 hover:bg-emerald-500/5',
    },
    {
      name: 'Phone',
      value: '+977 9706144483',
      href: 'tel:9706144483',
      icon: <Phone className="w-5 h-5 text-cyan-400" />,
      color: 'hover:border-cyan-500/30 hover:bg-cyan-500/5',
    },
    {
      name: 'Telegram',
      value: '@btchunterNP',
      href: 'https://t.me/btchunterNP',
      icon: <Send className="w-5 h-5 text-sky-400" />,
      color: 'hover:border-sky-500/30 hover:bg-sky-500/5',
    },
    {
      name: 'X (Twitter)',
      value: '@Raunak4440',
      href: 'https://x.com/Raunak4440',
      icon: <Twitter className="w-5 h-5 text-slate-200" />,
      color: 'hover:border-white/10 hover:bg-white/5',
    },
    {
      name: 'Instagram',
      value: '@raunakshrestha45',
      href: 'https://www.instagram.com/raunakshrestha45/',
      icon: <Instagram className="w-5 h-5 text-pink-400" />,
      color: 'hover:border-pink-500/30 hover:bg-pink-500/5',
    },
    {
      name: 'YouTube',
      value: 'hkraunak',
      href: 'https://www.youtube.com/@hkraunak',
      icon: <Youtube className="w-5 h-5 text-red-500" />,
      color: 'hover:border-red-500/30 hover:bg-red-500/5',
    },
    {
      name: 'Discord',
      value: 'raunakshrestha21',
      href: 'https://discord.com/',
      icon: <Disc className="w-5 h-5 text-indigo-400 animate-spin-slow" />,
      color: 'hover:border-indigo-500/30 hover:bg-indigo-500/5',
    },
    {
      name: 'Spotify',
      value: 'Raunak Shrestha',
      href: 'https://open.spotify.com/user/31ml3fhln5ztgzuez24irxbx5us4?si=UxU-ysjBSxmiaJTVVtV69w',
      icon: <Music className="w-5 h-5 text-green-400" />,
      color: 'hover:border-green-500/30 hover:bg-green-500/5',
    },
  ];

  return (
    <section id="contact" className="py-24 bg-slate-950 border-t border-slate-900" px-6="true">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest mb-4">
            <Mail className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Connect Center' : 'सम्पर्क केन्द्र'}</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl text-white tracking-tighter uppercase">
            {language === 'en' ? (
              <>Get in <span className="text-emerald-500">Touch</span></>
            ) : (
              <>सम्पर्क <span className="text-emerald-500">गर्नुहोस्</span></>
            )}
          </h2>
          <p className="text-sm text-slate-400 mt-2 font-mono">
            {language === 'en' 
              ? 'Reach out via secure form or find me on digital channels'
              : 'सुरक्षित फारम मार्फत वा डिजिटल च्यानलहरूमा मलाई सम्पर्क गर्नुहोस्'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Side: Contact details & Social grid */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <h3 className="font-display font-bold text-xl text-slate-100">
                {language === 'en' ? 'Digital Handles & Contacts' : 'डिजिटल ह्यान्डल र सम्पर्कहरू'}
              </h3>
              <p className="text-slate-400 text-xs leading-normal">
                {language === 'en'
                  ? 'I am highly active across multiple communication spaces, especially decentralized and developer communities. Click any link to inspect my profile or strike a conversation!'
                  : 'म धेरै सञ्चार माध्यमहरूमा सक्रिय छु, विशेष गरी विकेन्द्रीकृत र विकासकर्ता समुदायहरूमा। मेरो प्रोफाइल निरीक्षण गर्न वा कुराकानी सुरु गर्न कुनै पनि लिङ्कमा क्लिक गर्नुहोस्!'}
              </p>
            </div>

            {/* Social Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/30 border border-slate-850 transition-all group ${social.color}`}
                >
                  <div className="p-2 bg-slate-950 rounded-xl border border-slate-850/60 group-hover:scale-105 transition-transform">
                    {social.icon}
                  </div>
                  <div className="truncate">
                    <span className="block text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wide">
                      {social.name}
                    </span>
                    <span className="block text-xs font-mono font-medium text-slate-300 group-hover:text-slate-100 transition-colors truncate">
                      {social.value}
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* Resume Card Button */}
            <div className="bg-gradient-to-r from-emerald-500/10 via-cyan-500/5 to-transparent border border-emerald-500/20 rounded-3xl p-5 flex items-center justify-between gap-4 group">
              <div className="space-y-1">
                <h4 className="text-xs font-mono font-bold text-emerald-400">
                  {language === 'en' ? 'RESUME DOWNLOAD' : 'बायोडाटा डाउनलोड'}
                </h4>
                <p className="text-[10px] text-slate-400 leading-normal max-w-[240px]">
                  {language === 'en'
                    ? 'View or download my full formatted educational credentials and skill dossier.'
                    : 'मेरो पूर्ण शैक्षिक योग्यता र सीप कागजात हेर्नुहोस् वा डाउनलोड गर्नुहोस्।'}
                </p>
              </div>
              <button
                onClick={handleDownloadResume}
                disabled={isDownloading}
                className="p-3 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-600 disabled:opacity-80 text-slate-950 rounded-2xl flex items-center justify-center transition-all shadow-emerald-500/10 shadow-lg group-hover:scale-105 cursor-pointer"
                title={language === 'en' ? 'Download Resume' : 'रेजुमे डाउनलोड गर्नुहोस्'}
              >
                {isDownloading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Download className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Right Side: Interactive Form */}
          <div className="lg:col-span-7 bg-slate-900/30 border border-slate-850 rounded-3xl p-6 md:p-8 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <h3 className="font-display font-bold text-xl text-slate-100 mb-6 flex items-center gap-2">
              <span>{language === 'en' ? 'Send a Message' : 'सन्देश पठाउनुहोस्'}</span>
              <span className="text-[9px] font-mono font-bold text-emerald-400 px-2 py-0.5 bg-emerald-500/10 rounded-full border border-emerald-500/20 uppercase tracking-widest">
                {language === 'en' ? 'Direct Ingress' : 'प्रत्यक्ष मार्ग'}
              </span>
            </h3>

            {/* Real-time Diagnostics HUD Overlay */}
            <div className="mb-4 bg-slate-950/80 rounded-xl p-3 border border-slate-800/80 font-mono text-[10px] space-y-1">
              <div className="flex justify-between items-center text-slate-500">
                <span>FORM_INTEGRITY_CHECK</span>
                <span className={
                  formData.name.trim() && formData.email.trim() && formData.message.trim() && isFieldValid('name') && isFieldValid('email') && isFieldValid('message')
                    ? "text-emerald-400 font-bold"
                    : "text-amber-500 font-bold"
                }>
                  {formData.name.trim() && formData.email.trim() && formData.message.trim() && isFieldValid('name') && isFieldValid('email') && isFieldValid('message')
                    ? "[✓] READY"
                    : "[!] INTERRUPTED"
                  }
                </span>
              </div>
              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    formData.name.trim() && formData.email.trim() && formData.message.trim() && isFieldValid('name') && isFieldValid('email') && isFieldValid('message')
                      ? "bg-emerald-500 w-full shadow-[0_0_8px_#10b981]"
                      : "bg-amber-500"
                  }`}
                  style={{
                    width: `${
                      ( (formData.name.trim() ? 25 : 0) +
                        (formData.email.trim() ? 25 : 0) +
                        (formData.message.trim() ? 25 : 0) +
                        (isFieldValid('name') && isFieldValid('email') && isFieldValid('message') ? 25 : 0) )
                    }%`
                  }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name Input */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">
                      {language === 'en' ? 'Your Name *' : 'तपाईंको नाम *'}
                    </label>
                    {touched.name && (
                      <span className={`text-[9px] font-mono font-bold uppercase tracking-widest ${isFieldValid('name') ? 'text-emerald-400' : 'text-red-400'}`}>
                        {isFieldValid('name') ? (language === 'en' ? 'SECURED' : 'सुरक्षित') : (language === 'en' ? 'REQUIRED' : 'आवश्यक')}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={() => handleBlur('name')}
                      placeholder={language === 'en' ? 'Enter full name' : 'पूरा नाम लेख्नुहोस्'}
                      className={`w-full bg-slate-950 border rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none font-mono transition-all duration-300 ${
                        touched.name
                          ? isFieldValid('name')
                            ? 'border-emerald-500/40 shadow-[0_0_8px_rgba(16,185,129,0.15)] focus:border-emerald-500'
                            : 'border-red-500/40 shadow-[0_0_8px_rgba(239,68,68,0.15)] focus:border-red-500'
                          : 'border-slate-850 focus:border-emerald-500'
                      }`}
                      required
                      id="form-input-name"
                    />
                  </div>
                  <AnimatePresence mode="wait">
                    {touched.name && !isFieldValid('name') && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: -4 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -4 }}
                        className="text-red-400 font-mono text-[9px] uppercase tracking-wider flex items-center gap-1.5 mt-1 bg-red-950/20 border border-red-500/10 px-2.5 py-1 rounded-lg"
                      >
                        <AlertCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                        <span>{getFieldError('name')}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Email Input */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">
                      {language === 'en' ? 'Your Email *' : 'तपाईंको इमेल *'}
                    </label>
                    {touched.email && (
                      <span className={`text-[9px] font-mono font-bold uppercase tracking-widest ${isFieldValid('email') ? 'text-emerald-400' : 'text-red-400'}`}>
                        {isFieldValid('email') ? (language === 'en' ? 'SECURED' : 'सुरक्षित') : (language === 'en' ? 'REQUIRED' : 'आवश्यक')}
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur('email')}
                      placeholder="raunak@example.com"
                      className={`w-full bg-slate-950 border rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none font-mono transition-all duration-300 ${
                        touched.email
                          ? isFieldValid('email')
                            ? 'border-emerald-500/40 shadow-[0_0_8px_rgba(16,185,129,0.15)] focus:border-emerald-500'
                            : 'border-red-500/40 shadow-[0_0_8px_rgba(239,68,68,0.15)] focus:border-red-500'
                          : 'border-slate-850 focus:border-emerald-500'
                      }`}
                      required
                      id="form-input-email"
                    />
                  </div>
                  <AnimatePresence mode="wait">
                    {touched.email && !isFieldValid('email') && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: -4 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -4 }}
                        className="text-red-400 font-mono text-[9px] uppercase tracking-wider flex items-center gap-1.5 mt-1 bg-red-950/20 border border-red-500/10 px-2.5 py-1 rounded-lg"
                      >
                        <AlertCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                        <span>{getFieldError('email')}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Subject Input */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">
                  {language === 'en' ? 'Subject' : 'विषय'}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder={language === 'en' ? 'What is this inquiry about?' : 'यो सन्देश के बारेमा हो?'}
                  className="w-full bg-slate-950 border border-slate-850 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none focus:border-emerald-500 font-mono"
                  id="form-input-subject"
                />
              </div>

              {/* Message Input */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="block text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">
                    {language === 'en' ? 'Message *' : 'सन्देश *'}
                  </label>
                  {touched.message && (
                    <span className={`text-[9px] font-mono font-bold uppercase tracking-widest ${isFieldValid('message') ? 'text-emerald-400' : 'text-red-400'}`}>
                      {isFieldValid('message') ? (language === 'en' ? 'SECURED' : 'सुरक्षित') : (language === 'en' ? 'REQUIRED' : 'आवश्यक')}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={() => handleBlur('message')}
                    placeholder={language === 'en' ? 'Type your secure message here...' : 'यहाँ आफ्नो सन्देश टाइप गर्नुहोस्...'}
                    rows={4}
                    className={`w-full bg-slate-950 border rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none font-mono resize-none transition-all duration-300 ${
                      touched.message
                        ? isFieldValid('message')
                          ? 'border-emerald-500/40 shadow-[0_0_8px_rgba(16,185,129,0.15)] focus:border-emerald-500'
                          : 'border-red-500/40 shadow-[0_0_8px_rgba(239,68,68,0.15)] focus:border-red-500'
                        : 'border-slate-850 focus:border-emerald-500'
                    }`}
                    required
                    id="form-input-message"
                  />
                </div>
                <AnimatePresence mode="wait">
                  {touched.message && !isFieldValid('message') && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -4 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -4 }}
                      className="text-red-400 font-mono text-[9px] uppercase tracking-wider flex items-center gap-1.5 mt-1 bg-red-950/20 border border-red-500/10 px-2.5 py-1 rounded-lg"
                    >
                      <AlertCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                      <span>{getFieldError('message')}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Status messages */}
              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-mono font-bold flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 shadow-[0_0_8px_#10b981]" />
                    <span>{language === 'en' ? 'Your secure transmission was received successfully. Thank you!' : 'तपाईंको सन्देश सफलतापूर्वक प्राप्त भयो। धन्यवाद!'}</span>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-mono font-bold flex items-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <span>{language === 'en' ? 'Failed to transmit. Please complete name, email, and message inputs correctly.' : 'पठाउन असफल भयो। कृपया नाम, इमेल र सन्देश सहीसँग भर्नुहोस्।'}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs font-mono tracking-widest uppercase rounded-xl shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                id="form-btn-submit"
              >
                {status === 'sending' ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{language === 'en' ? 'Transmitting...' : 'पठाउँदै...'}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Send Message' : 'सन्देश पठाउनुहोस्'}</span>
                  </>
                )}
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}

