import { useEffect, useRef, useState, useCallback } from 'react';
import { prepare, prepareWithSegments, layout, layoutWithLines, type PreparedText, type PreparedTextWithSegments } from '@chenglou/pretext';
import gsap from 'gsap';

interface PretextAnimationProps {
  text: string;
  fontSize?: string;
  fontFamily?: string;
  lineHeight?: number;
  maxWidth?: number;
  className?: string;
  animate?: boolean;
  animationType?: 'reveal' | 'typewriter' | 'wave' | 'scramble';
  staggerDelay?: number;
  duration?: number;
}

// Scramble characters for effect
const scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

export const PretextAnimation = ({
  text,
  fontSize = '12vw',
  fontFamily = 'Montserrat, system-ui, sans-serif',
  lineHeight = 1.1,
  maxWidth = 1200,
  className = '',
  animate = true,
  animationType = 'reveal',
  staggerDelay = 0.03,
  duration = 1.2,
}: PretextAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [prepared, setPrepared] = useState<PreparedTextWithSegments | null>(null);
  const [displayText, setDisplayText] = useState<string[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Prepare text using Pretext
  useEffect(() => {
    const fontString = `${fontSize} ${fontFamily}`;
    const preparedText = prepareWithSegments(text, fontString);
    setPrepared(preparedText);

    // Calculate layout
    const { height } = layout(preparedText, maxWidth, lineHeight);
    
    // Get lines for rendering
    const { lines } = layoutWithLines(preparedText, maxWidth, lineHeight);
    setDisplayText(lines.map(l => l.text));

    // Set container height
    if (containerRef.current) {
      containerRef.current.style.height = `${height}px`;
    }
  }, [text, fontSize, fontFamily, lineHeight, maxWidth]);

  // Animation effects
  useEffect(() => {
    if (!animate || !prepared || displayText.length === 0 || isAnimating) return;

    setIsAnimating(true);
    const chars = containerRef.current?.querySelectorAll('.pretext-char');
    if (!chars) return;

    switch (animationType) {
      case 'reveal':
        gsap.fromTo(
          chars,
          { 
            opacity: 0, 
            y: 50,
            rotateX: -90,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration,
            stagger: staggerDelay,
            ease: 'expo.out',
          }
        );
        break;

      case 'typewriter':
        gsap.fromTo(
          chars,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.05,
            stagger: staggerDelay * 0.5,
            ease: 'none',
          }
        );
        break;

      case 'wave':
        gsap.fromTo(
          chars,
          { 
            opacity: 0, 
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: duration * 0.5,
            stagger: {
              each: staggerDelay,
              from: 'center',
            },
            ease: 'back.out(1.7)',
          }
        );
        break;

      case 'scramble':
        // Scramble effect
        chars.forEach((char) => {
          const originalChar = char.textContent || '';
          if (originalChar === ' ') return;

          let iterations = 0;
          const maxIterations = 10;
          
          const interval = setInterval(() => {
            if (iterations >= maxIterations) {
              char.textContent = originalChar;
              clearInterval(interval);
              return;
            }
            
            char.textContent = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
            iterations++;
          }, 50);
        });

        gsap.fromTo(
          chars,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.1,
            stagger: staggerDelay,
          }
        );
        break;
    }
  }, [prepared, displayText, animate, animationType, staggerDelay, duration, isAnimating]);

  // Split text into characters for animation
  const renderAnimatedText = useCallback(() => {
    return displayText.map((line, lineIndex) => (
      <div 
        key={lineIndex} 
        className="pretext-line whitespace-nowrap"
        style={{ 
          lineHeight: `${lineHeight}em`,
          display: 'block',
        }}
      >
        {line.split('').map((char, charIndex) => (
          <span
            key={`${lineIndex}-${charIndex}`}
            className="pretext-char inline-block will-change-transform"
            style={{
              opacity: animate ? 0 : 1,
              display: char === ' ' ? 'inline' : 'inline-block',
              width: char === ' ' ? '0.3em' : 'auto',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    ));
  }, [displayText, lineHeight, animate]);

  return (
    <div 
      ref={containerRef}
      className={`pretext-container ${className}`}
      style={{
        fontSize,
        fontFamily,
        fontWeight: 900,
        letterSpacing: '-0.02em',
      }}
    >
      {/* Hidden canvas for Pretext measurements */}
      <canvas 
        ref={canvasRef} 
        className="absolute opacity-0 pointer-events-none"
        width={maxWidth}
        height={100}
      />
      
      {/* Animated text */}
      <div className="pretext-content">
        {renderAnimatedText()}
      </div>
    </div>
  );
};

// Hook for using Pretext measurements
export const usePretextMeasure = (text: string, font: string) => {
  const [measurements, setMeasurements] = useState<{
    width: number;
    height: number;
    prepared: PreparedText | null;
  }>({ width: 0, height: 0, prepared: null });

  useEffect(() => {
    const preparedText = prepare(text, font);
    const { height } = layout(preparedText, 1000, 1.2);
    
    // Calculate approximate width
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.font = font;
      const width = ctx.measureText(text).width;
      setMeasurements({ width, height, prepared: preparedText });
    }
  }, [text, font]);

  return measurements;
};

// Kinetic typography component with Pretext
export const KineticPretext = ({
  texts,
  className = '',
}: {
  texts: string[];
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (texts.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [texts.length]);

  useEffect(() => {
    const chars = containerRef.current?.querySelectorAll('.kinetic-char');
    if (!chars) return;

    gsap.fromTo(
      chars,
      { 
        opacity: 0, 
        y: 80,
        rotateY: 90,
        scale: 1.5,
      },
      {
        opacity: 1,
        y: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.04,
        ease: 'expo.out',
      }
    );
  }, [currentIndex]);

  const currentText = texts[currentIndex];
  
  // Use Pretext to prepare the text
  useEffect(() => {
    const font = 'bold 4vw Montserrat, system-ui, sans-serif';
    prepare(currentText, font);
  }, [currentText]);

  return (
    <div ref={containerRef} className={`kinetic-pretext ${className}`}>
      <div className="flex flex-wrap justify-center">
        {currentText.split('').map((char, i) => (
          <span
            key={`${currentIndex}-${i}`}
            className="kinetic-char inline-block text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-white/80"
            style={{ 
              opacity: 0,
              perspective: '1000px',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PretextAnimation;
