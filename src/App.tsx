import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Toaster } from 'sonner';
import { Menu, X } from 'lucide-react';

import Hero from './sections/Hero';
import Profile from './sections/Profile';
import Experience from './sections/Experience';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Formation from './sections/Formation';
import Contact from './sections/Contact';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: 'Profil', href: '#profile' },
  { label: 'Expérience', href: '#experience' },
  { label: 'Compétences', href: '#skills' },
  { label: 'Formation', href: '#formation' },
  { label: 'Projets', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

function App() {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
  const navRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Show nav after scrolling past hero
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = 200; // Hero is now a compact header
      setIsNavVisible(scrollY > heroHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Track active section
    const sections = ['profile', 'experience', 'skills', 'formation', 'projects', 'contact'];
    
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        ScrollTrigger.create({
          trigger: element,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveSection(sectionId),
          onEnterBack: () => setActiveSection(sectionId),
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger && sections.includes(st.vars.trigger as string)) {
          st.kill();
        }
      });
    };
  }, []);

  useEffect(() => {
    // Nav entrance animation
    if (isNavVisible) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
    } else {
      gsap.to(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    }
  }, [isNavVisible]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="relative bg-brand-dark">
      {/* Toast notifications */}
      <Toaster 
        position="top-right" 
        richColors 
        toastOptions={{
          style: {
            background: '#1C1C1E',
            border: '1px solid #333333',
            color: '#fff',
          },
        }}
      />

      {/* Navigation */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[100] opacity-0 -translate-y-full"
      >
        <div className="mx-4 sm:mx-6 mt-4">
          <div className="glass-card-strong rounded-2xl px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <a 
                href="#hero" 
                onClick={(e) => { e.preventDefault(); scrollToSection('#hero'); }}
                className="text-xl font-heading font-bold text-gradient"
              >
                Awa Diop
              </a>

              {/* Desktop nav */}
              <div className="hidden md:flex items-center gap-1">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeSection === item.href.slice(1)
                        ? 'bg-brand-rose/20 text-brand-rose'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              {/* CTA button */}
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
                className="hidden sm:flex btn-primary text-sm py-2 px-4"
              >
                Me contacter
              </a>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden w-10 h-10 rounded-xl glass-card flex items-center justify-center text-white"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
              <div className="md:hidden mt-4 pt-4 border-t border-white/10">
                <div className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                        activeSection === item.href.slice(1)
                          ? 'bg-brand-rose/20 text-brand-rose'
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                  <a
                    href="#contact"
                    onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
                    className="btn-primary text-center mt-2"
                  >
                    Me contacter
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main ref={mainRef} className="relative">
        <Hero />
        <div id="profile">
          <Profile />
        </div>
        <div id="experience">
          <Experience />
        </div>
        <div id="skills">
          <Skills />
        </div>
        <div id="formation">
          <Formation />
        </div>
        <div id="projects">
          <Projects />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </main>

      {/* Custom cursor (desktop only) */}
      <CustomCursor />
    </div>
  );
}

// Custom cursor component
function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    const checkTouch = window.matchMedia('(pointer: coarse)').matches;
    setIsTouch(checkTouch);
    if (checkTouch) return;

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Instant dot movement
      gsap.set(cursorDot, {
        x: mouseX,
        y: mouseY,
      });
    };

    const handleMouseEnter = () => {
      gsap.to([cursor, cursorDot], { opacity: 1, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to([cursor, cursorDot], { opacity: 0, duration: 0.3 });
    };

    // Smooth cursor follow
    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;

      gsap.set(cursor, {
        x: cursorX,
        y: cursorY,
      });

      requestAnimationFrame(animate);
    };

    // Hover effects
    const handleLinkEnter = () => {
      gsap.to(cursor, { scale: 2, duration: 0.3 });
    };

    const handleLinkLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    const links = document.querySelectorAll('a, button');
    links.forEach((link) => {
      link.addEventListener('mouseenter', handleLinkEnter);
      link.addEventListener('mouseleave', handleLinkLeave);
    });

    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      links.forEach((link) => {
        link.removeEventListener('mouseenter', handleLinkEnter);
        link.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-brand-rose/50 pointer-events-none z-[9999] mix-blend-difference opacity-0 hidden lg:block"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-brand-rose pointer-events-none z-[9999] opacity-0 hidden lg:block"
        style={{ willChange: 'transform' }}
      />
    </>
  );
}

export default App;
