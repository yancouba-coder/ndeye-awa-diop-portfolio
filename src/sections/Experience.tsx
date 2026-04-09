import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Building2, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  color: string;
}

const experiences: ExperienceItem[] = [
  {
    company: "Mcomme Mutuelle",
    role: "Chargée de Communication Digitale",
    period: "2023 - Présent",
    description: "Gestion de la stratégie digitale, du SEO et du brand content pour un leader de l'assurance.",
    highlights: [
      "Stratégie digitale & SEO",
      "Gestion des réseaux sociaux",
      "Création de contenu",
      "Analyse des KPIs",
    ],
    color: "from-rose-500 to-purple-600",
  },
  {
    company: "Oparebrise33",
    role: "Responsable Marketing Digital",
    period: "2022 - 2023",
    description: "Direction des campagnes sur les réseaux sociaux et optimisation de la présence web.",
    highlights: [
      "Campagnes Google Ads",
      "Social media management",
      "Optimisation web",
      "Relation client",
    ],
    color: "from-blue-500 to-cyan-600",
  },
  {
    company: "ESP Bordeaux",
    role: "Mastère 1 - Marketing d'Influence",
    period: "2024 - 2025",
    description: "Formation spécialisée en marketing d'influence et communication digitale.",
    highlights: [
      "Stratégie d'influence",
      "Content marketing",
      "Analytics avancé",
      "Gestion de projet",
    ],
    color: "from-amber-500 to-orange-600",
  },
  {
    company: "ESP Lille",
    role: "Mastère 2 - Brand Content",
    period: "2025 - 2026",
    description: "Spécialisation en brand content et stratégie de marque.",
    highlights: [
      "Brand storytelling",
      "Stratégie éditoriale",
      "Production vidéo",
      "Direction artistique",
    ],
    color: "from-emerald-500 to-teal-600",
  },
];

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const container = containerRef.current;
      
      if (!track || !container) return;

      // Calculate scroll distance
      const scrollWidth = track.scrollWidth - container.offsetWidth;

      // Title animation
      gsap.fromTo(
        titleRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 0.5,
          },
        }
      );

      // Horizontal scroll animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${scrollWidth * 1.5}`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
        },
      });

      scrollTl.to(track, {
        x: -scrollWidth,
        ease: "none",
      });

      // Progress bar
      scrollTl.to(
        progressRef.current,
        {
          width: "100%",
          ease: "none",
        },
        0
      );

      // Card entrance animations
      const cards = track.querySelectorAll('.experience-card');
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { 
            y: 50, 
            opacity: 0,
            rotateY: i % 2 === 0 ? 10 : -10,
          },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `top+=${i * 200} 80%`,
              end: `top+=${i * 200 + 300} 50%`,
              scrub: 0.5,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-brand-dark z-30 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-purple/10 to-brand-dark" />
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Section title */}
      <div
        ref={titleRef}
        className="absolute top-8 left-4 sm:left-8 z-20 will-change-transform"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-1 bg-brand-rose rounded-full" />
          <span className="text-white/50 text-sm uppercase tracking-widest">Parcours</span>
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-white mt-2">
          Expérience
        </h2>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={containerRef}
        className="relative h-screen flex items-center overflow-hidden"
      >
        <div
          ref={trackRef}
          className="flex gap-6 sm:gap-8 px-4 sm:px-8 pt-24 will-change-transform"
          style={{ paddingLeft: 'max(1rem, calc((100vw - 1280px) / 2 + 1rem))' }}
        >
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="experience-card flex-shrink-0 w-[85vw] sm:w-[70vw] md:w-[50vw] lg:w-[40vw] max-w-xl will-change-transform"
              style={{ perspective: "1000px" }}
            >
              <div className="glass-card-strong rounded-3xl p-6 sm:p-8 h-full hover-lift group">
                {/* Card header with gradient */}
                <div className={`h-2 w-full rounded-full bg-gradient-to-r ${exp.color} mb-6`} />
                
                {/* Company & Role */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 text-white/50 text-sm mb-1">
                      <Building2 className="w-4 h-4" />
                      <span>Entreprise</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-white group-hover:text-brand-rose transition-colors">
                      {exp.company}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-white/50 text-sm whitespace-nowrap">
                    <Calendar className="w-4 h-4" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Role */}
                <p className="text-brand-rose font-medium mb-4">{exp.role}</p>

                {/* Description */}
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  {exp.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2">
                  <p className="text-white/40 text-xs uppercase tracking-wider">Compétences clés</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((highlight, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-lg glass-card text-white/70 text-xs font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow indicator */}
                <div className="mt-6 flex items-center gap-2 text-white/30 group-hover:text-brand-rose transition-colors">
                  <span className="text-sm">Voir plus</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}

          {/* End spacer */}
          <div className="flex-shrink-0 w-8 sm:w-16" />
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-8 left-4 sm:left-8 right-4 sm:right-8 z-20">
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-brand-rose to-brand-purple rounded-full will-change-transform"
            style={{ width: "0%" }}
          />
        </div>
        <div className="flex justify-between mt-2 text-white/30 text-xs">
          <span>Début</span>
          <span>Scroll horizontal</span>
          <span>Présent</span>
        </div>
      </div>
    </section>
  );
};

export default Experience;
