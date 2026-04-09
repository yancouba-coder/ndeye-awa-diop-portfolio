import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ScrollInvite = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance
      gsap.fromTo(
        containerRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.5, ease: 'power4.out', delay: 2 }
      );

      // Endless pulse
      gsap.to(lineRef.current, {
        scaleY: 0.2,
        transformOrigin: 'top',
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'power1.inOut',
      });

      // Text subtle float
      gsap.to(textRef.current, {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: 'power1.inOut',
      });

      // Fade out on scroll
      gsap.to(containerRef.current, {
        opacity: 0,
        x: 50,
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: '+=200',
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-[80] hidden md:flex flex-col items-center gap-12 pointer-events-none"
    >
      <div 
        ref={textRef}
        className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-medium vertical-text"
        style={{ writingMode: 'vertical-rl' }}
      >
        Scroll to explore
      </div>
      <div className="relative w-[1px] h-24 bg-white/10 overflow-hidden">
        <div 
          ref={lineRef}
          className="absolute top-0 left-0 w-full h-full bg-brand-rose origin-top"
        />
      </div>
    </div>
  );
};

export default ScrollInvite;
