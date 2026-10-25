import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'np';

export const translations = {
  en: {
    // Header & Navigation
    nav: {
      home: 'Home',
      about: 'About',
      education: 'Education',
      skills: 'Skills',
      experience: 'Experience',
      projects: 'Projects',
      contact: 'Contact',
      letsConnect: "Let's Connect",
      explorer: 'Explorer',
    },
    // Hero Section
    hero: {
      sparkleText: 'Currently Exploring +2 Science, Crypto & AI',
      subtitle: 'PORTFOLIO / 2026',
      bio: '“Curious by nature and always learning. Currently studying +2 Science while exploring crypto, AI, and technology. Every project is a chance to improve.”',
      exploreBtn: 'Explore Projects',
      downloadBtn: 'Download CV',
      downloading: 'Downloading...',
      contactBtn: 'Contact Me',
      advancedPhrases: [
        '+2 Science Student',
        'Crypto Explorer',
        'Blockchain Learner',
        'AI Enthusiast',
        'Web Creator',
        'Always Learning'
      ],
      photoLabel: 'DYNAMIC SYSTEM CONTROL HUB',
      photoUploadBtn: 'Update profile avatar',
      photoEnterUrl: 'Enter image URL',
      photoReset: 'Reset to default',
      photoClose: 'Close panel',
      photoPlaceholder: 'https://...',
      photoUpdate: 'Update Image',
    },
    // About Section
    about: {
      badge: 'About Me',
      title: 'Raunak Shrestha',
      subtitle: 'STUDENT, CREATOR & EXPLORER',
      p1: 'I am a highly driven +2 Science student with a passionate curiosity for the outer limits of technology. Based in Nepal, my work bridges the logical structure of physical sciences with the wild creative potential of decentralized blockchain networks and intelligence modules.',
      p2: 'I enjoy translating complex mathematical principles into simple, fluid interfaces. When I am not studying college physics or chemistry, I am actively building decentralized prototypes, analyzing token mechanics, or learning neural network structures.',
      interestTitle: 'Core Domains of Inquiry',
      card1Title: 'Decentralized Ledgers',
      card1Desc: 'Studying consensus algorithms, cryptographic primitives, smart contract safety, and micro-token incentive loops.',
      card2Title: 'Artificial Intelligence',
      card2Desc: 'Fascinated by high-level neural networks, prompt construction, reinforcement feedback, and automated agents.',
      card3Title: 'Physical Sciences',
      card3Desc: 'Rooted in systematic empirical study — applying mathematical models and physics formulas to computational engines.',
      statsProjects: 'ACTIVE PROJECT CODES',
      statsLanguages: 'LANGUAGES PARSED',
      statsUptime: 'ESTIMATED WORK UPTIME',
    },
    // Education Section
    education: {
      badge: 'Knowledge Stream',
      title: 'Academic Path',
      ongoing: '(ONGOING)',
      present: 'PRESENT',
      science: '+2 Science',
      college: 'GoldenGate International College',
      shreeNawa: 'Shree Nawa Jyoti Secondary School',
      theOldCapital: 'The Old Capital Secondary School',
    },
    // Skills Section
    skills: {
      badge: 'Capabilities Matrix',
      title: 'Skills & Tools',
      coreSkills: 'CORE COGNITIVE SKILLS',
      problemSolving: 'Problem Solving',
      quickLearner: 'Quick Learner',
      criticalThinking: 'Critical Thinking',
      adaptability: 'Adaptability',
      timeManagement: 'Time Management',
      keyStrength: 'KEY COGNITIVE STRENGTH',
      curiosity: 'Curiosity',
      curiosityDesc: 'Always exploring. Always learning.',
      technicalSkills: 'TECHNICAL SKILLS MATRIX',
    },
    // Experience Section
    experience: {
      badge: 'Timeline Log',
      title: 'Experience',
      focused: 'Focused on Education & Personal Learning',
      desc: 'No professional work experience yet. My current focus is education, learning, and preparing for future opportunities. I am actively building knowledge through self-learning and exploring new opportunities.',
    },
    // Projects Section
    projects: {
      badge: 'Interactive Portfolio Terminal',
      title: 'Featured Showcases',
      desc: 'Launch secure local sandbox modules or inspect raw production code bases',
      sandboxTerminal: 'SANDBOX TERMINAL',
      interactiveMode: 'Interactive Terminal Mode:',
      interactiveDesc: 'This sandbox mounts the real logic built dynamically in React. Enter dates or perform equations to test conversions and miners live!',
    },
    // Contact Section
    contact: {
      badge: 'Communication Channel',
      title: "Get In Touch",
      subtitle: "Open for collaboration, sharing ideas, or studying together. Send a direct transmission below.",
      nameLabel: 'Your Name',
      emailLabel: 'Email Address',
      msgLabel: 'Message Payload',
      sendBtn: 'Send Message',
      sendingBtn: 'Transmitting...',
      successTitle: 'Transmission Successful',
      successDesc: 'Your transmission has been logged into my communications terminal. I will respond as soon as possible.',
      errorTitle: 'Transmission Failed',
      errorDesc: 'Something went wrong. Please check your network and try again.',
      resetBtn: 'Open New Channel',
      cardTitle: 'Raunaks Dossier',
      cardDesc: 'View or download my full formatted educational credentials and skill dossier.',
    },
    footer: {
      designedBy: 'Designed & Engineered by Raunak Shrestha',
      allRights: 'All rights reserved.',
    }
  },
  np: {
    // Header & Navigation
    nav: {
      home: 'गृहपृष्ठ',
      about: 'मेरो बारेमा',
      education: 'शिक्षा',
      skills: 'सीपहरू',
      experience: 'अनुभव',
      projects: 'परियोजनाहरू',
      contact: 'सम्पर्क',
      letsConnect: 'सम्पर्क गरौं',
      explorer: 'अन्वेषक',
    },
    // Hero Section
    hero: {
      sparkleText: 'हाल +२ विज्ञान, क्रिप्टो र एआई अन्वेषण गर्दै',
      subtitle: 'पोर्टफोलियो / २०२६',
      bio: '“प्रकृतिले नै जिज्ञासु र सधैं नयाँ कुरा सिक्न तत्पर। हाल क्रिप्टो, एआई र प्रविधि अन्वेषण गर्दै +२ विज्ञान अध्ययनरत। हरेक परियोजना सुधार गर्ने उत्कृष्ट अवसर हो।”',
      exploreBtn: 'परियोजनाहरू हेर्नुहोस्',
      downloadBtn: 'बायोडाटा डाउनलोड',
      downloading: 'डाउनलोड हुँदैछ...',
      contactBtn: 'सम्पर्क गर्नुहोस्',
      advancedPhrases: [
        '+२ विज्ञान विद्यार्थी',
        'क्रिप्टो अन्वेषक',
        'ब्लकचेन शिक्षार्थी',
        'एआई उत्साही',
        'वेब सिर्जनाकर्ता',
        'सधैं सिक्न तत्पर'
      ],
      photoLabel: 'गतिशील प्रणाली नियन्त्रण हब',
      photoUploadBtn: 'प्रोफाइल तस्वीर अपडेट गर्नुहोस्',
      photoEnterUrl: 'तस्वीरको URL राख्नुहोस्',
      photoReset: 'पूर्वनिर्धारितमा फर्काउनुहोस्',
      photoClose: 'प्यानल बन्द गर्नुहोस्',
      photoPlaceholder: 'https://...',
      photoUpdate: 'तस्वीर अपडेट गर्नुहोस्',
    },
    // About Section
    about: {
      badge: 'मेरो परिचय',
      title: 'रौनक श्रेष्ठ',
      subtitle: 'विद्यार्थी, सिर्जनाकर्ता र अन्वेषक',
      p1: 'म प्रविधिको अत्याधुनिक सीमाहरू बुझ्न उत्सुक र दृढ संकल्पित +२ विज्ञानको विद्यार्थी हुँ। नेपालमा आधारित रहेर, मेरो कामले भौतिक विज्ञानको तार्किक संरचनालाई विकेन्द्रीकृत ब्लकचेन नेटवर्क र एआई मोड्युलहरूको रचनात्मक सम्भावनासँग जोड्दछ।',
      p2: 'मलाई जटिल गणितीय सिद्धान्तहरूलाई सरल र गतिशील इन्टरफेसमा रूपान्तरण गर्न मनपर्छ। कलेजको भौतिकशास्त्र वा रसायनशास्त्र अध्ययन नगरेको समयमा म सक्रिय रूपमा विकेन्द्रीकृत प्रोटोटाइपहरूरू निर्माण गर्न, टोकन मेकानिक्स विश्लेषण गर्न, वा न्यूरल नेटवर्क संरचनाहरू सिक्न व्यस्त हुन्छु।',
      interestTitle: 'अन्वेषणका मुख्य क्षेत्रहरू',
      card1Title: 'विकेन्द्रीकृत खाताहरू',
      card1Desc: 'सहमति एल्गोरिदमहरू, क्रिप्टोग्राफिक सिद्धान्तहरू, स्मार्ट सम्झौता सुरक्षा, र माइक्रो-टोकन प्रोत्साहन चक्रहरूको अध्ययन।',
      card2Title: 'कृत्रिम बुद्धिमत्ता (AI)',
      card2Desc: 'उच्च-स्तरको न्यूरल नेटवर्क, प्रम्प्ट निर्माण, सुदृढीकरण प्रतिक्रिया, र स्वचालित एजेन्टहरू प्रति आकर्षित।',
      card3Title: 'भौतिक विज्ञान',
      card3Desc: 'व्यवस्थित अनुभवजन्य अध्ययनमा आधारित — कम्प्यूटेशनल इन्जिनहरूमा गणितीय मोडेलहरू र भौतिकशास्त्रका सूत्रहरू लागू गर्दै।',
      statsProjects: 'सक्रिय परियोजना कोडहरू',
      statsLanguages: 'बुझेका भाषाहरू',
      statsUptime: 'अनुमानित कार्य समय',
    },
    // Education Section
    education: {
      badge: 'ज्ञानको प्रवाह',
      title: 'शैक्षिक यात्रा',
      ongoing: '(अध्ययनरत)',
      present: 'हाल',
      science: '+२ विज्ञान',
      college: 'गोल्डेनगेट इन्टरनेशनल कलेज',
      shreeNawa: 'श्री नव ज्योति माध्यमिक विद्यालय',
      theOldCapital: 'द ओल्ड क्यापिटल सेकेन्डरी स्कूल',
    },
    // Skills Section
    skills: {
      badge: 'क्षमता म्याट्रिक्स',
      title: 'सीप र उपकरणहरू',
      coreSkills: 'मुख्य संज्ञानात्मक सीपहरू',
      problemSolving: 'समस्या समाधान',
      quickLearner: 'छिटो सिक्ने',
      criticalThinking: 'आलोचनात्मक सोच',
      adaptability: 'अनुकूलनशीलता',
      timeManagement: 'समय व्यवस्थापन',
      keyStrength: 'मुख्य मानसिक शक्ति',
      curiosity: 'जिज्ञासा',
      curiosityDesc: 'सधैं नयाँ कुराको खोजीमा। सधैं सिक्न तत्पर।',
      technicalSkills: 'प्राविधिक सीप म्याट्रिक्स',
    },
    // Experience Section
    experience: {
      badge: 'समयरेखा लग',
      title: 'अनुभव',
      focused: 'शिक्षा र व्यक्तिगत सिकाइमा केन्द्रित',
      desc: 'अहिलेसम्म कुनै व्यावसायिक कार्य अनुभव छैन। मेरो वर्तमान ध्यान शिक्षा, सिकाइ, र भविष्यका अवसरहरूको तयारीमा छ। म सक्रिय रूपमा स्व-सिकाई र नयाँ अवसरहरू अन्वेषण गरेर ज्ञान निर्माण गर्दैछु।',
    },
    // Projects Section
    projects: {
      badge: 'सक्रिय पोर्टफोलियो टर्मिनल',
      title: 'उत्कृष्ट प्रदर्शनहरू',
      desc: 'सुरक्षित स्थानीय स्यान्डबक्स मोड्युलहरू चलाउनुहोस् वा प्रत्यक्ष उत्पादन कोड बेसहरू निरिक्षण गर्नुहोस्',
      sandboxTerminal: 'स्यान्डबक्स टर्मिनल',
      interactiveMode: 'सक्रिय टर्मिनल मोड:',
      interactiveDesc: 'यो स्यान्डबक्सले रियाक्टमा निर्मित वास्तविक तर्कलाई प्रस्तुत गर्दछ। प्रत्यक्ष रूपमा रूपान्तरण र गणनाहरूको परीक्षण गर्न मितिहरू प्रविष्ट गर्नुहोस् वा समीकरणहरू हल गर्नुहोस्!',
    },
    // Contact Section
    contact: {
      badge: 'सञ्चार च्यानल',
      title: "सम्पर्कमा रहनुहोस्",
      subtitle: "सहकार्य, विचार आदानप्रदान, वा सँगै अध्ययनका लागि सधैं खुल्ला। तल आफ्नो सन्देश पठाउनुहोस्।",
      nameLabel: 'तपाईको नाम',
      emailLabel: 'इमेल ठेगाना',
      msgLabel: 'सन्देश विवरण',
      sendBtn: 'सन्देश पठाउनुहोस्',
      sendingBtn: 'पठाउँदै...',
      successTitle: 'सन्देश सफलतापूर्वक पठाइयो',
      successDesc: 'तपाईको सन्देश मेरो सञ्चार टर्मिनलमा रेकर्ड गरिएको छ। म चाँडै नै प्रतिक्रिया दिनेछु।',
      errorTitle: 'सन्देश पठाउन सकिएन',
      errorDesc: 'केही त्रुटि भयो। कृपया तपाईको नेटवर्क जाँच गर्नुहोस् र फेरि प्रयास गर्नुहोस्।',
      resetBtn: 'नयाँ सन्देश लेख्नुहोस्',
      cardTitle: 'रौनकको विवरण पत्र',
      cardDesc: 'मेरो पूर्ण शैक्षिक प्रमाणपत्र र सीप विवरण पत्र हेर्नुहोस् वा डाउनलोड गर्नुहोस्।',
    },
    footer: {
      designedBy: 'रौनक श्रेष्ठद्वारा डिजाइन र निर्मित',
      allRights: 'सर्वाधिकार सुरक्षित।',
    }
  }
};

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => any;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('site_language');
    return (saved === 'en' || saved === 'np' ? saved : 'en') as Language;
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('site_language', lang);
    // Dispatch event to make sure all elements react instantly if needed
    window.dispatchEvent(new Event('language_changed'));
  };

  // Safe translation key path finder
  const t = (path: string): any => {
    const keys = path.split('.');
    let current: any = translations[language];

    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        // Fallback to English translation
        let fallback: any = translations['en'];
        for (const fKey of keys) {
          if (fallback && fallback[fKey] !== undefined) {
            fallback = fallback[fKey];
          } else {
            return path; // Return key path if not found
          }
        }
        return fallback;
      }
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
