import React, { useState, useEffect, useRef } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  triggerOnHover?: boolean;
}

const glyphs = '_X/\\@$*&+=%?0123456789[]{}!#';

export default function GlitchText({ text, className = '', triggerOnHover = true }: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Keep internal text synced with props
    setDisplayText(text);
  }, [text]);

  const startScramble = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsHovered(true);

    let iteration = 0;
    const maxIterations = text.length;

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        prev
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            // 25% chance of keeping space, otherwise random glyph
            if (text[index] === ' ') return ' ';
            return glyphs[Math.floor(Math.random() * glyphs.length)];
          })
          .join('')
      );

      if (iteration >= maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
      }

      iteration += 1 / 2; // Controlled speed of resolution
    }, 30);
  };

  const stopScramble = () => {
    setIsHovered(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setDisplayText(text);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <span
      onMouseEnter={triggerOnHover ? startScramble : undefined}
      onMouseLeave={triggerOnHover ? stopScramble : undefined}
      data-text={text}
      className={`glitch-text-hover select-none cursor-default ${className}`}
    >
      {displayText}
    </span>
  );
}
