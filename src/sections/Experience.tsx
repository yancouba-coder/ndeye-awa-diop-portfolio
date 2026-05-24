import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Building2, X, ArrowUpRight, Trophy, Target, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  color: string;
  story: string;
  achievements: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: "m-comme-mutuelle",
    company: "M comme Mutuelle",
    role: "Chargée de communication",
    period: "Sept 2025 - Sept 2026",
    description: "Alternance Stratégique",
    highlights: ["Brand Content", "Communication digitale", "Événementiel", "Réseaux Sociaux", "Gestion de projet"],
    color: "from-rose-500 to-purple-600",
    story: "Au sein de M comme Mutuelle, j’ai participé au développement de la communication digitale et événementielle de l’entreprise à travers des projets transverses mêlant création de contenu, coordination, communication institutionnelle, rédaction et valorisation de l’image de marque. Cette expérience m’a permis de contribuer à des actions de communication à forte dimension humaine, en accompagnant la mise en avant des initiatives de la mutuelle tout en participant à la gestion de projets, à l’organisation d’événements et au suivi des performances des actions menées.",
    achievements: [
      "Participation à la stratégie de communication et à la coordination des projets digitaux",
      "Contribution à la création et à la diffusion de contenus éditoriaux et visuels",
      "Participation à l’organisation et à la coordination d’événements internes et externes",
      "Animation des réseaux sociaux et accompagnement de la communauté en ligne",
      "Suivi des performances et analyse des résultats des actions de communication"
    ],
  },
  {
    id: "oparebrise33",
    company: "Oparebrise 33",
    role: "Chargée de communication digitale",
    period: "Jan 2025 - Août 2025",
    description: "Alternance Performance",
    highlights: ["SEO/SEA", "Google Ads", "Acquisition", "Réseaux Sociaux", "Analytique", "Communication Digitale"],
    color: "from-blue-500 to-cyan-600",
    story: "Participation au développement digital et à la stratégie de visibilité locale de l’entreprise à travers des actions mêlant communication, marketing digital et optimisation de la présence en ligne. J’ai contribué à la gestion globale de l’image numérique de la structure, avec une approche orientée acquisition, performance et expérience utilisateur.",
    achievements: [
      "Participation à la stratégie digitale et au pilotage des actions de communication",
      "Contribution à l’optimisation de la visibilité locale et du référencement",
      "Gestion et animation des réseaux sociaux ainsi que des campagnes publicitaires",
      "Participation à l’amélioration du site internet et du tunnel de conversion",
      "Analyse des performances digitales et suivi des résultats des campagnes",
      "Coordination avec différents partenaires et accompagnement de la relation client"
    ],
  },
  {
    id: "zola-media",
    company: "Zola média",
    role: "Chargée de communication et marketing",
    period: "Sept 2024 - Déc 2025",
    description: "Alternance Événementielle",
    highlights: ["Brand Content", "Réseaux Sociaux", "SEO", "Événementiel", "Communication", "Influence"],
    color: "from-amber-400 to-orange-500",
    story: "Expérience au sein d’une agence événementielle et créative où j’ai participé au développement de la communication de marque, à la création de contenus et à la coordination de projets événementiels. Cette immersion m’a permis d’évoluer dans un environnement dynamique mêlant stratégie de contenu, communication digitale et organisation d’événements premium.",
    achievements: [
      "Participation à la stratégie de communication et de contenu de l’agence",
      "Création et gestion de contenus digitaux pour différents supports",
      "Contribution à l’animation des réseaux sociaux et à l’engagement des communautés",
      "Participation à la coordination et à l’organisation d’événements"
    ],
  },
  {
    id: "fontdouce",
    company: "Parc aventure de Fontdouce",
    role: "Chargée de communication et événementielle",
    period: "Nov 2023 - Août 2024",
    description: "Alternance Créative",
    highlights: ["Refonte Web", "Communication Digitale", "SEO/CRO", "Réseaux Sociaux", "Influence", "Gestion de projet"],
    color: "from-emerald-500 to-teal-600",
    story: "Chargée de communication et événementiel au sein d’un parc de loisirs, j’ai contribué au développement de la visibilité digitale et à l’amélioration de l’expérience client à travers des actions de communication, de marketing digital et de gestion de projet. Cette expérience m’a permis de participer à la stratégie de communication globale de la structure, en intervenant aussi bien sur la création de contenu, l’animation des réseaux sociaux, l’optimisation du site web que la coordination d’actions promotionnelles et événementielles.",
    achievements: [
      "Participation à la gestion et à l’évolution de l’écosystème digital du parc",
      "Contribution à la stratégie de contenu et à la communication sur les réseaux sociaux",
      "Accompagnement de la refonte et de l’optimisation du site internet",
      "Développement de la visibilité en ligne via le SEO, le CRO et les contenus éditoriaux",
      "Soutien aux actions événementielles et à l’expérience client"
    ],
  },
];

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [selectedExp, setSelectedExp] = useState<ExperienceItem | null>(null);

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
    <section ref={sectionRef} className="relative bg-brand-dark overflow-hidden">
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
                <div className="glass-card-strong rounded-3xl p-6 sm:p-8 h-full hover-lift group border border-white/10 flex flex-col">
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

                  <div className="flex flex-wrap gap-2 mb-8">
                    {exp.highlights.slice(0, 4).map((highlight, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-lg glass-card text-white/70 text-xs font-medium border border-white/5"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <button 
                    onClick={() => setSelectedExp(exp)}
                    className="mt-auto group/btn flex items-center gap-2 text-white/40 hover:text-brand-rose transition-colors text-sm font-medium"
                  >
                    Voir plus
                    <ArrowUpRight className="w-4 h-4 transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
            <div className="flex-shrink-0 w-8 sm:w-16" />
          </div>
        </div>

        {/* Progress bar */}
        <div className="px-4 sm:px-8 mt-12">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-gradient-to-r from-brand-rose to-brand-purple rounded-full will-change-transform"
              style={{ width: "0%" }}
            />
          </div>
        </div>

      </div>

      {/* Detail Modal Overlay */}
      {selectedExp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-brand-dark/90 backdrop-blur-xl"
            onClick={() => setSelectedExp(null)}
          />
          
          <div className="relative w-full max-w-2xl glass-card-strong rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className={`h-2 bg-gradient-to-r ${selectedExp.color}`} />
            
            <div className="p-8 sm:p-12">
              <button 
                onClick={() => setSelectedExp(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full glass-card flex items-center justify-center text-white/60 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-8">
                <div className="flex items-center gap-2 text-brand-rose text-sm font-medium mb-2">
                  <Target className="w-4 h-4" />
                  <span>Impact Stratégique</span>
                </div>
                <h3 className="text-3xl font-heading font-bold text-white mb-2">{selectedExp.company}</h3>
                <p className="text-white/60 mb-6 leading-relaxed">
                  {selectedExp.story}
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest mb-4">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    <span>Réalisations Clés</span>
                  </div>
                  <div className="grid gap-4">
                    {selectedExp.achievements.map((item, i) => (
                      <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-colors">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-purple/20 flex items-center justify-center border border-brand-purple/30">
                          <Zap className="w-4 h-4 text-brand-purple" />
                        </div>
                        <p className="text-white/80 text-sm leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-12 flex flex-wrap gap-2">
                {selectedExp.highlights.map((tag, i) => (
                  <span key={i} className="px-4 py-2 rounded-xl bg-white/5 text-white/40 text-xs font-medium border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Experience;
