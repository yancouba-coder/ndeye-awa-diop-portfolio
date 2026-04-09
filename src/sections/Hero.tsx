import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { prepare } from '@chenglou/pretext';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const firstNameRef = useRef<HTMLDivElement>(null);
  const lastNameRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  const firstName = "AWA";
  const lastName = "DIOP";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Prepare text using Pretext for precise measurements
      const fontFirst = '900 15vw Montserrat, system-ui, sans-serif';
      const fontLast = '900 15vw Montserrat, system-ui, sans-serif';
      
      // Use Pretext to prepare and measure the text
      prepare(firstName, fontFirst);
      prepare(lastName, fontLast);

      // Get all character elements
      const firstChars = firstNameRef.current?.querySelectorAll('.pretext-char');
      const lastChars = lastNameRef.current?.querySelectorAll('.pretext-char');

      if (!firstChars || !lastChars) return;

      // Set initial scattered state using Pretext-measured positions
      const allChars = [...Array.from(firstChars), ...Array.from(lastChars)];
      
      allChars.forEach(() => {
        gsap.set(allChars, {
          opacity: 0,
          x: () => (Math.random() - 0.5) * 1000,
          y: () => (Math.random() - 0.5) * 600,
          rotateX: () => (Math.random() - 0.5) * 180,
          rotateY: () => (Math.random() - 0.5) * 180,
          rotateZ: () => (Math.random() - 0.5) * 90,
          scale: () => 2 + Math.random() * 2,
        });
      });

      // Assembly animation timeline
      const tl = gsap.timeline({ delay: 0.3 });

      // Animate first name characters
      tl.to(firstChars, {
        opacity: 1,
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        scale: 1,
        duration: 1.2,
        ease: "expo.out",
        stagger: {
          amount: 0.4,
          from: "random",
        },
      });

      // Animate last name characters
      tl.to(lastChars, {
        opacity: 1,
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        scale: 1,
        duration: 1.2,
        ease: "expo.out",
        stagger: {
          amount: 0.4,
          from: "random",
        },
      }, "-=0.8");

      // Subtitle fade in
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      );

      // Scroll hint
      tl.fromTo(
        scrollHintRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        "-=0.2"
      );

      // Scroll-triggered exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 0.5,
          onLeaveBack: () => {
            // Reset when scrolling back to top
            gsap.to([...firstChars, ...lastChars], {
              opacity: 1,
              scale: 1,
              y: 0,
              x: 0,
              duration: 0.3,
            });
          },
        },
      });

      // Exit animation - letters disperse with Pretext precision
      scrollTl.to([...firstChars, ...lastChars], {
        opacity: 0,
        scale: 1.5,
        y: () => -200 - Math.random() * 200,
        x: () => (Math.random() - 0.5) * 400,
        rotateX: 45,
        rotateZ: () => (Math.random() - 0.5) * 45,
        stagger: {
          amount: 0.3,
          from: "edges",
        },
        ease: "power2.in",
      });

      scrollTl.to(
        subtitleRef.current,
        { opacity: 0, y: -50, ease: "power2.in" },
        "<"
      );

      scrollTl.to(
        scrollHintRef.current,
        { opacity: 0 },
        "<"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-container bg-gradient-to-br from-brand-purple via-brand-dark to-brand-dark z-10"
    >
      {/* Animated background grain 
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            animation: "grain 8s steps(10) infinite",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {/* Main heading with Pretext-powered kinetic letters */}
        <h1 className="font-heading font-black text-white leading-none select-none" style={{ perspective: "1000px" }}>
          {/* First Name */}
          <div ref={firstNameRef} className="overflow-hidden">
            <span 
              className="block tracking-tighter"
              style={{ 
                fontSize: 'clamp(3rem, 15vw, 12rem)',
                lineHeight: 0.9,
              }}
            >
              {firstName.split("").map((letter, i) => (
                <span
                  key={`first-${i}`}
                  className="pretext-char inline-block will-change-transform"
                  style={{ 
                    display: 'inline-block',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {letter}
                </span>
              ))}
            </span>
          </div>
          
          {/* Last Name with gradient */}
          <div ref={lastNameRef} className="overflow-hidden -mt-2 sm:-mt-4">
            <span 
              className="block tracking-tighter text-gradient"
              style={{ 
                fontSize: 'clamp(3rem, 15vw, 12rem)',
                lineHeight: 0.9,
              }}
            >
              {lastName.split("").map((letter, i) => (
                <span
                  key={`last-${i}`}
                  className="pretext-char inline-block will-change-transform"
                  style={{ 
                    display: 'inline-block',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {letter}
                </span>
              ))}
            </span>
          </div>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-6 sm:mt-8 text-lg sm:text-xl md:text-2xl text-white/80 font-body font-light tracking-wide"
        >
          Chargée de Communication Digitale & Brand Content
        </p>

        {/* Location badge */}
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm text-white/70">Lille, France</span>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/50 uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-5 h-5 text-white/50 animate-bounce" />
      </div>

      <style>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          20% { transform: translate(-10%, 5%); }
          30% { transform: translate(5%, -10%); }
          40% { transform: translate(-5%, 15%); }
          50% { transform: translate(-10%, 5%); }
          60% { transform: translate(15%, 0); }
          70% { transform: translate(0, 10%); }
          80% { transform: translate(-15%, 0); }
          90% { transform: translate(10%, 5%); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
