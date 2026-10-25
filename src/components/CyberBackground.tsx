import React, { useEffect, useRef, useState } from 'react';

export default function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, active: false });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Track state of page visibility
    let isVisible = true;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Initial mouse center position
    mouseRef.current.targetX = width / 2;
    mouseRef.current.targetY = height / 3;
    mouseRef.current.x = width / 2;
    mouseRef.current.y = height / 3;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    // Attach to window to capture movement anywhere on the hero section easily
    const heroSection = document.getElementById('home');
    if (heroSection) {
      heroSection.addEventListener('mousemove', handleMouseMove);
      heroSection.addEventListener('mouseleave', handleMouseLeave);
    }

    // Particle definition
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: 'orange' | 'blue';
      alpha: number;
      fadeSpeed: number;
      pulseSpeed: number;
      pulseOffset: number;
    }

    interface Square {
      x: number;
      y: number;
      size: number;
      speed: number;
      angle: number;
      rotSpeed: number;
      alpha: number;
    }

    interface LaserLine {
      y: number;
      speed: number;
      alpha: number;
      color: 'cyan' | 'orange';
    }

    const particles: Particle[] = [];
    const squares: Square[] = [];
    const lasers: LaserLine[] = [
      { y: height * 0.2, speed: 0.15, alpha: 0.04, color: 'orange' },
      { y: height * 0.6, speed: -0.22, alpha: 0.03, color: 'cyan' },
      { y: height * 0.8, speed: 0.1, alpha: 0.05, color: 'orange' }
    ];

    const particleCount = isMobile ? 25 : 60;
    const squareCount = isMobile ? 6 : 15;

    // Initialize Particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 2 + 1,
        color: Math.random() > 0.4 ? 'blue' : 'orange',
        alpha: Math.random() * 0.5 + 0.1,
        fadeSpeed: 0.005 + Math.random() * 0.005,
        pulseSpeed: 0.01 + Math.random() * 0.02,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    // Initialize Squares
    for (let i = 0; i < squareCount; i++) {
      squares.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 4 + 2,
        speed: 0.1 + Math.random() * 0.2,
        angle: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.01,
        alpha: Math.random() * 0.3 + 0.05,
      });
    }

    // Grid animation timing
    let gridOffset = 0;
    let noiseSeed = 0;

    // Render loop
    const render = (time: number) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Dark background with smooth gradient fills
      ctx.fillStyle = '#000000'; // Pure cyberpunk absolute black
      ctx.fillRect(0, 0, width, height);

      // Ambient radial gradients
      // Top-right glow (emerald / blue)
      const topGlow = ctx.createRadialGradient(width * 0.8, height * 0.1, 0, width * 0.8, height * 0.1, width * 0.6);
      topGlow.addColorStop(0, 'rgba(16, 185, 129, 0.07)'); // Emerald
      topGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = topGlow;
      ctx.fillRect(0, 0, width, height);

      // Bottom-left glow (cyan / blue)
      const bottomGlow = ctx.createRadialGradient(width * 0.2, height * 0.8, 0, width * 0.2, height * 0.8, width * 0.6);
      bottomGlow.addColorStop(0, 'rgba(6, 182, 212, 0.06)'); // Cyan
      bottomGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = bottomGlow;
      ctx.fillRect(0, 0, width, height);

      // Center-left orange/red ambient glow
      const orangeGlow = ctx.createRadialGradient(width * 0.1, height * 0.4, 0, width * 0.1, height * 0.4, width * 0.4);
      orangeGlow.addColorStop(0, 'rgba(242, 125, 38, 0.04)'); // Orange
      orangeGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = orangeGlow;
      ctx.fillRect(0, 0, width, height);

      // 2. Interactive Spotlight (Mouse Follow with easing)
      // Ease mouse coordinates
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      const spotlightRadius = isMobile ? 180 : 350;
      const spotlightGlow = ctx.createRadialGradient(
        mouseRef.current.x,
        mouseRef.current.y,
        0,
        mouseRef.current.x,
        mouseRef.current.y,
        spotlightRadius
      );
      // Subtle cyan/emerald mix for the spotlight aura
      spotlightGlow.addColorStop(0, 'rgba(16, 185, 129, 0.08)');
      spotlightGlow.addColorStop(0.5, 'rgba(6, 182, 212, 0.03)');
      spotlightGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = spotlightGlow;
      ctx.fillRect(0, 0, width, height);

      // 3. Cyber Glowing Grid (3D Horizon Perspective / Orthogonal Grid)
      // Slow grid translation
      gridOffset = (gridOffset + 0.15) % 40;

      ctx.save();
      ctx.strokeStyle = 'rgba(71, 85, 105, 0.06)'; // Slate-600 very light
      ctx.lineWidth = 1;

      // Vertical lines of the grid
      const gridSpacing = isMobile ? 50 : 60;
      const verticalLineCount = Math.ceil(width / gridSpacing) + 2;
      for (let i = -1; i < verticalLineCount; i++) {
        const x = i * gridSpacing;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal lines moving slowly downward
      const horizontalLineCount = Math.ceil(height / gridSpacing) + 2;
      for (let j = -1; j < horizontalLineCount; j++) {
        const y = j * gridSpacing + gridOffset;
        // Make lines closer to spotlight glow a tiny bit more visible
        const distToMouse = Math.abs(y - mouseRef.current.y);
        const visibilityBoost = Math.max(0, 1 - distToMouse / 250) * 0.07;
        
        ctx.strokeStyle = `rgba(71, 85, 105, ${0.05 + visibilityBoost})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // 3.5 Subtle Moving Laser Lines (Crossing horizontal lasers)
      lasers.forEach(laser => {
        laser.y += laser.speed;
        if (laser.y < -50) {
          laser.y = height + 50;
        } else if (laser.y > height + 50) {
          laser.y = -50;
        }
        
        ctx.beginPath();
        ctx.moveTo(0, laser.y);
        ctx.lineTo(width, laser.y);
        ctx.strokeStyle = laser.color === 'orange' 
          ? `rgba(242, 125, 38, ${laser.alpha})`
          : `rgba(6, 182, 212, ${laser.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // 4. Draw Floating Tiny Squares
      ctx.save();
      squares.forEach((sq) => {
        sq.y -= sq.speed;
        sq.angle += sq.rotSpeed;

        if (sq.y < -20) {
          sq.y = height + 20;
          sq.x = Math.random() * width;
        }

        ctx.translate(sq.x, sq.y);
        ctx.rotate(sq.angle);
        
        // 30% chance of solid border vs soft glowing fill
        ctx.strokeStyle = `rgba(242, 125, 38, ${sq.alpha})`;
        ctx.fillStyle = `rgba(6, 182, 212, ${sq.alpha * 0.4})`;
        ctx.lineWidth = 0.8;

        ctx.beginPath();
        ctx.rect(-sq.size / 2, -sq.size / 2, sq.size, sq.size);
        ctx.fill();
        ctx.stroke();

        // Reset transformation matrix
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      });
      ctx.restore();

      // 5. Draw Particles (Blue & Orange) and connections
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce/Wrap boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Breathing/pulsing alpha
        const currentAlpha = Math.max(
          0.05,
          p.alpha + Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.15
        );

        // Neon Glow effect
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        if (p.color === 'orange') {
          ctx.fillStyle = `rgba(242, 125, 38, ${currentAlpha})`;
          ctx.shadowColor = '#F27D26';
          ctx.shadowBlur = isMobile ? 0 : 4;
        } else {
          ctx.fillStyle = `rgba(6, 182, 212, ${currentAlpha})`;
          ctx.shadowColor = '#06b6d4';
          ctx.shadowBlur = isMobile ? 0 : 4;
        }
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow

        // Subtle moving connections (only to nearby particles)
        // Only on desktop for supreme frame rates
        if (!isMobile) {
          for (let j = idx + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            const maxConnectDist = 110;

            if (dist < maxConnectDist) {
              const lineAlpha = (1 - dist / maxConnectDist) * 0.08;
              ctx.strokeStyle = p.color === 'orange' 
                ? `rgba(242, 125, 38, ${lineAlpha})` 
                : `rgba(6, 182, 212, ${lineAlpha})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      });

      // 6. Very subtle digital grain / noise
      // Create random pixel values over a tiny pattern to look like digital screen noise
      if (!isMobile && Math.random() > 0.3) {
        noiseSeed += 1;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.015)';
        for (let k = 0; k < 12; k++) {
          const nx = Math.random() * width;
          const ny = Math.random() * height;
          const nSize = Math.random() * 1.5 + 0.5;
          ctx.fillRect(nx, ny, nSize, nSize);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (heroSection) {
        heroSection.removeEventListener('mousemove', handleMouseMove);
        heroSection.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none block z-0"
      style={{ opacity: 0.95 }}
    />
  );
}
