import React from 'react';
import { motion, useScroll } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollReveal from './components/ScrollReveal';
import CyberSeparator from './components/CyberSeparator';

export default function App() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-orange-500 selection:text-slate-950 scroll-smooth relative" id="app-root">
      
      {/* Neon-orange scroll-progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#F27D26] z-[100] pointer-events-none"
        style={{
          scaleX: scrollYProgress,
          transformOrigin: 'left',
          boxShadow: '0 0 10px #F27D26, 0 0 3px #F27D26'
        }}
      />
      
      {/* Background stars / grid mesh overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Glowing floating ambient orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute top-[40%] right-[10%] w-[35%] h-[35%] rounded-full bg-purple-500/3 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Floating Glass Navigation Header */}
        <Header />

        {/* Sections */}
        <main className="flex-1">
          <Hero />
          
          <CyberSeparator id="hero-about" type="slice" />
          <ScrollReveal delay={100} duration={900}>
            <About />
          </ScrollReveal>
          
          <CyberSeparator id="about-edu" type="glitch" />
          <ScrollReveal delay={100} duration={900}>
            <Education />
          </ScrollReveal>
          
          <CyberSeparator id="edu-skills" type="data" />
          <ScrollReveal delay={100} duration={900}>
            <Skills />
          </ScrollReveal>
          
          <CyberSeparator id="skills-exp" type="slice" />
          <ScrollReveal delay={100} duration={900}>
            <Experience />
          </ScrollReveal>
          
          <CyberSeparator id="exp-proj" type="glitch" />
          <ScrollReveal delay={100} duration={900}>
            <Projects />
          </ScrollReveal>
          
          <CyberSeparator id="proj-contact" type="data" />
          <ScrollReveal delay={100} duration={900}>
            <Contact />
          </ScrollReveal>
        </main>

        {/* Sleek Minimalist Footer */}
        <Footer />
      </div>
    </div>
  );
}
