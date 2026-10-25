import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // in milliseconds
  duration?: number; // in milliseconds
  threshold?: number; // 0 to 1
  rootMargin?: string;
  distance?: string; // e.g. 'y-8' for slide up, or custom pixel values
  once?: boolean; // trigger animation only once
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 800,
  threshold = 0.1,
  rootMargin = '0px 0px -80px 0px',
  distance = 'translate-y-12',
  once = true,
}: ScrollRevealProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = elementRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          if (once) {
            observer.unobserve(currentRef);
          }
        } else if (!once) {
          setIsRevealed(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef && !once) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, once]);

  // Handle styles for custom animation timing
  const style = {
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
  };

  return (
    <div
      ref={elementRef}
      style={style}
      className={`transition-all ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
        isRevealed 
          ? 'opacity-100 translate-y-0 translate-x-0 filter blur-0' 
          : `opacity-0 ${distance} filter blur-[2px]`
      } ${className}`}
    >
      {children}
    </div>
  );
}
