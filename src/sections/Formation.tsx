import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Calendar, MapPin, X, ArrowUpRight, BookOpen, Lightbulb } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface EducationItem {
  id: string;
  school: string;
  degree: string;
  period: string;
  location: string;
  color: string;
  story: string;
  modules: string[];
}

const education: EducationItem[] = [
  {
    id: "esp-lille",
    school: "ESP Lille",
    degree: "Mastère 2 Brand content et stratégie de marque",
    period: "2025 - 2026",
    location: "Lille",
    color: "from-brand-rose to-purple-600",
    story: "Une spécialisation de haut niveau axée sur la capacité des marques à devenir leurs propres médias. Ce cursus explore les mécaniques narratives profondes, la psychologie du consommateur et la stratégie de déploiement de contenu multi-plateforme.",
    modules: [
      "Stratégie de Brand Content & Storytelling",
      "Direction de Création et Communication Visuelle",
      "Management de Marque et Identité Digitale",
      "Analyse de Données et Mesure de l'Engagement"
    ],
  },
  {
    id: "esp-bordeaux",
    school: "ESP Bordeaux",
    degree: "Mastère 1 Marketing d'influence et communication",
    period: "2024 - 2025",
    location: "Bordeaux",
    color: "from-blue-500 to-cyan-600",
    story: "Approfondissement des stratégies d'influence et de la gestion de communautés. L'accent a été mis sur la sélection stratégique des relais d'opinion et la création de campagnes de communication authentiques et performantes.",
    modules: [
      "Marketing d'Influence et Relations Publics",
      "Stratégie de Communication Digitale 360°",
      "Social Media Management Avancé",
      "Droit de la Communication et Éthique Digitale"
    ],
  },
  {
    id: "efrei-bordeaux",
    school: "Efrei Bordeaux",
    degree: "Bachelor 3 Marketing digital et communication",
    period: "2023 - 2024",
    location: "Bordeaux",
    color: "from-emerald-500 to-teal-600",
    story: "Diplôme certifiant de 'Chef de Projet Digital'. Une formation polyvalente couvrant les aspects techniques (SEO, Analytics) et stratégiques du webmarketing, permettant une vision globale de la performance e-business.",
    modules: [
      "Gestion de Projet Digital (Méthodes Agiles)",
      "Référencement Naturel (SEO) et Payant (SEA)",
      "Analyse de Trafic et Google Analytics",
      "Développement de Stratégies E-commerce"
    ],
  },
];

const Formation = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [selectedEdu, setSelectedEdu] = useState<EducationItem | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const windowWidth = window.innerWidth;
        return -(trackWidth - windowWidth + 64);
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
        <div className="px-4 sm:px-8 mb-12">
          <div className="flex items-center gap-3">
            <div className="w-12 h-1 bg-brand-rose rounded-full" />
            <span className="text-white/50 text-sm uppercase tracking-widest">Éducation</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-white mt-2">
            Formations
          </h2>
        </div>

        <div className="relative">
          <div
            ref={trackRef}
            className="flex gap-6 sm:gap-8 px-4 sm:px-8 will-change-transform"
            style={{ width: "max-content" }}
          >
            {education.map((edu, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[85vw] sm:w-[50vw] md:w-[40vw] lg:w-[30vw] max-w-md"
              >
                <div className="glass-card-strong rounded-3xl p-6 sm:p-8 h-full hover-lift group border border-white/10 flex flex-col">
                  <div className={`h-2 w-full rounded-full bg-gradient-to-r ${edu.color} mb-6`} />
                  
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 text-white/50 text-sm mb-1">
                        <GraduationCap className="w-4 h-4" />
                        <span>École / Université</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-heading font-bold text-white group-hover:text-brand-rose transition-colors">
                        {edu.school}
                      </h3>
                    </div>
                  </div>

                  <p className="text-brand-rose font-medium mb-4">{edu.degree}</p>

                  <div className="flex flex-col gap-2 mb-8">
                    <div className="flex items-center gap-2 text-white/50 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{edu.period}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/50 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{edu.location}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => setSelectedEdu(edu)}
                    className="mt-auto group/btn flex items-center gap-2 text-white/40 hover:text-brand-rose transition-colors text-sm font-medium"
                  >
                    Détails du cursus
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
      {selectedEdu && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-brand-dark/90 backdrop-blur-xl"
            onClick={() => setSelectedEdu(null)}
          />
          
          <div className="relative w-full max-w-2xl glass-card-strong rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className={`h-2 bg-gradient-to-r ${selectedEdu.color}`} />
            
            <div className="p-8 sm:p-12">
              <button 
                onClick={() => setSelectedEdu(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full glass-card flex items-center justify-center text-white/60 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-8">
                <div className="flex items-center gap-2 text-brand-rose text-sm font-medium mb-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Curriculum & Objectifs</span>
                </div>
                <h3 className="text-3xl font-heading font-bold text-white mb-2">{selectedEdu.school}</h3>
                <p className="text-white/60 mb-6 leading-relaxed">
                  {selectedEdu.story}
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest mb-4">
                    <Lightbulb className="w-4 h-4 text-brand-rose" />
                    <span>Modules Majeurs</span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {selectedEdu.modules.map((item, i) => (
                      <div key={i} className="flex gap-3 items-center p-3 rounded-xl bg-white/5 border border-white/5">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-rose" />
                        <p className="text-white/80 text-xs leading-tight">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-12 flex items-center justify-between text-white/30 text-xs">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  <span>Promotion {selectedEdu.period}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3 h-3" />
                  <span>{selectedEdu.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Formation;
