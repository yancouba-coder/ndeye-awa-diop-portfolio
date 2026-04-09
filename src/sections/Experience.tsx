import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Building2 } from 'lucide-react';

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
    company: "M comme Mutuelle",
    role: "Chargée de communication",
    period: "Sept 2025 - Sept 2026",
    description: "Alternance",
    highlights: [
      "Gestion et coordination d'événements",
      "Création de contenus digitaux",
      "Planification éditoriale",
      "Gestion et animation des réseaux sociaux",
      "Modération et e-réputation",
      "Analyse et suivi des KPI",
      "Pilotage de la communication agences",
      "Gestion des partenariats",
      "Montage et production vidéo",
      "Optimisation contenus site web",
      "Suivi et gestion budgétaire",
      "Coordination prestataires externes"
    ],
    color: "from-rose-500 to-purple-600",
  },
  {
    company: "Oparebrise33",
    role: "Chargée de communication digitale",
    period: "Jan 2025 - Août 2025",
    description: "Alternance",
    highlights: [
      "Gestion réseaux sociaux & contenu",
      "Accueil et accompagnement client",
      "Analyse Google Analytics",
      "Stratégie digitale & SEO/SEA",
      "Gestion Fiche Google Établissement",
      "Coordination événements",
      "Campagnes Google Ads & Social Ads",
      "Gestion commandes & assurances"
    ],
    color: "from-blue-500 to-cyan-600",
  },
  {
    company: "Parc aventure de Fontdouce",
    role: "Chargée de communication et événementielle",
    period: "Nov 2023 - Août 2024",
    description: "Alternance",
    highlights: [
      "Gestion réseaux sociaux",
      "Gestion projet (refonte site web)",
      "Reporting & analyse résultats",
      "Rédaction articles & contenus",
      "Influence & partenariats",
      "Animation team building",
      "Optimisation SEO & CRO",
      "Relation client & ventes",
      "Montage Vidéo"
    ],
    color: "from-amber-500 to-orange-600",
  },
];

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        return -(trackWidth - window.innerWidth + 64);
      };

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              gsap.set(progressRef.current, { width: `${self.progress * 100}%` });
            }
          }
        },
      });

      return () => {
        tween.kill();
      };
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-brand-dark overflow-hidden"
    >
      <div ref={triggerRef} className="h-screen flex flex-col justify-center">
        {/* Section title */}
        <div className="px-4 sm:px-8 mb-12">
          <div className="flex items-center gap-3">
            <div className="w-12 h-1 bg-brand-rose rounded-full" />
            <span className="text-white/50 text-sm uppercase tracking-widest">Parcours</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-white mt-2">
            Expériences
          </h2>
        </div>

        {/* Horizontal scroll container */}
        <div className="relative">
          <div
            ref={trackRef}
            className="flex gap-6 sm:gap-8 px-4 sm:px-8 will-change-transform"
            style={{ width: "max-content" }}
          >
            {experiences.map((exp, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[35vw] max-w-xl"
              >
                <div className="glass-card-strong rounded-3xl p-6 sm:p-8 h-full hover-lift group border border-white/10">
                  <div className={`h-2 w-full rounded-full bg-gradient-to-r ${exp.color} mb-6`} />
                  
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

                  <p className="text-brand-rose font-medium mb-2">{exp.role}</p>
                  <p className="text-white/40 text-xs mb-4 uppercase tracking-wider">{exp.description}</p>

                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    <div className="flex flex-wrap gap-2">
                      {exp.highlights.map((highlight, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 rounded-lg glass-card text-white/70 text-xs font-medium border border-white/5"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* End spacer */}
            <div className="flex-shrink-0 w-8 sm:w-16" />
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-8 left-4 right-4 sm:left-8 sm:right-8 z-20">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-gradient-to-r from-brand-rose to-brand-purple rounded-full will-change-transform"
              style={{ width: "0%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
