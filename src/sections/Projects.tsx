import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, MessageCircle, ArrowUpRight, X, Target, Lightbulb, TrendingUp, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  stats: {
    views: string;
    likes: string;
    engagement: string;
  };
  color: string;
  challenge: string;
  solution: string;
  results: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Campagne Mcomme Mutuelle",
    category: "Brand Content",
    description: "Stratégie de contenu digitale complète incluant réseaux sociaux, blog et newsletter.",
    image: "project1",
    stats: { views: "125K", likes: "8.5K", engagement: "12%" },
    color: "from-rose-500 to-pink-600",
    challenge: "Redéfinir l'image d'une mutuelle traditionnelle pour la rendre attractive auprès d'une cible plus jeune et connectée sans perdre la confiance des seniors.",
    solution: "Déploiement d'une ligne éditoriale axée sur le 'Care' et la proximité. Création de contenus 'snackable' pédagogiques et d'un storytelling visuel moderne.",
    results: [
      "Augmentation de 25% de l'engagement sur Instagram",
      "Hausse de 15% du trafic qualifié sur le blog",
      "Amélioration notable du sentiment de marque positif"
    ]
  },
  {
    id: 2,
    title: "Lancement Oparebrise",
    category: "Social Media",
    description: "Campagne de lancement multi-canal avec focus sur la visibilité locale et nationale.",
    image: "project2",
    stats: { views: "89K", likes: "5.2K", engagement: "8.5%" },
    color: "from-blue-500 to-cyan-600",
    challenge: "Imposer un nouvel acteur dans un marché saturé. Nécessité de créer une notoriété instantanée et une preuve de confiance dès le premier contact.",
    solution: "Stratégie Social Ads chirurgicale couplée à une activation d'influence locale. Mise en avant des bénéfices clients et de la facilité du service.",
    results: [
      "89K impressions sur le premier mois",
      "Cout par clic réduit de 20% par rapport au benchmark",
      "50+ prises de rendez-vous directes via les réseaux"
    ]
  },
  {
    id: 3,
    title: "Stratégie SEO & Content",
    category: "SEO & Content",
    description: "Optimisation technique et sémantique pour dominer les résultats de recherche.",
    image: "project3",
    stats: { views: "200K", likes: "-", engagement: "+45%" },
    color: "from-emerald-500 to-teal-600",
    challenge: "Manque de visibilité sur les mots-clés stratégiques. Dépendance trop forte aux campagnes payantes.",
    solution: "Audit sémantique complet et mise en place d'une 'Content Factory' produisant des articles à forte valeur ajoutée répondant aux intentions de recherche réelles.",
    results: [
      "Passage de la position #45 à #3 sur 12 mots-clés clés",
      "Croissance de 45% du trafic organique global",
      "Durée moyenne de session augmentée de 1min30"
    ]
  },
  {
    id: 4,
    title: "Influence & Partenariats",
    category: "Influence Marketing",
    description: "Gestion de campagnes d'influence axées sur l'authenticité et la conversion.",
    image: "project4",
    stats: { views: "56K", likes: "3.8K", engagement: "15%" },
    color: "from-amber-500 to-orange-600",
    challenge: "Trouver le bon équilibre entre portée (reach) et affinité réelle avec la marque.",
    solution: "Sélection rigoureuse de micro-influenceurs partageant les valeurs de la marque. Co-création de contenus authentiques plutôt que de simples placements de produits.",
    results: [
      "Taux d'engagement exceptionnel de 15%",
      "Construction d'une communauté de brand advocates loyaux",
      "Contenus réutilisés sur les supports marketing officiels"
    ]
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [isVaultOpen, setIsVaultOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
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

      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll('.project-card');
      if (cards) {
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { 
              y: 80, 
              opacity: 0,
              rotateX: 15,
            },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: `top+=${i * 100} 70%`,
                end: `top+=${i * 100 + 300} 40%`,
                scrub: 0.5,
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-brand-dark z-45 py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-purple/5 to-brand-dark" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-rose/5 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div ref={titleRef} className="mb-12 will-change-transform">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-1 bg-brand-rose rounded-full" />
            <span className="text-white/50 text-sm uppercase tracking-widest">Portfolio</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-white mb-2">
                Projets Récents
              </h2>
              <p className="text-white/60 max-w-xl">
                Découvrez une sélection de mes réalisations en communication digitale et brand content.
              </p>
            </div>
            <button 
              onClick={() => setIsVaultOpen(true)}
              className="btn-outline flex items-center gap-2 self-start sm:self-auto group"
            >
              Voir tous les projets
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Projects grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-6" style={{ perspective: "1000px" }}>
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-card will-change-transform"
            >
              <div className="group relative glass-card-strong rounded-3xl overflow-hidden hover-lift">
                <div className={`relative h-56 sm:h-64 bg-gradient-to-br ${project.color} overflow-hidden`}>
                  <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`, backgroundSize: '24px 24px' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-32 h-32 text-center">
                      <div className="absolute inset-0 bg-white/10 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
                      <div className="absolute inset-8 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-4xl font-heading font-bold text-white/40">{String(index + 1).padStart(2, '0')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-full glass-card text-white text-xs font-medium">{project.category}</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold text-white mb-2 group-hover:text-brand-rose transition-colors">{project.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">{project.description}</p>
                  <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-1.5 text-white/50">
                      <Eye className="w-4 h-4" />
                      <span className="text-xs">{project.stats.views}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-white/50">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-xs">{project.stats.engagement}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Vault Storytelling View */}
      {isVaultOpen && (
        <div className="fixed inset-0 z-[120] bg-brand-dark overflow-y-auto animate-in slide-in-from-bottom duration-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-20 relative">
            <button 
              onClick={() => setIsVaultOpen(false)}
              className="fixed top-8 right-8 z-[130] w-12 h-12 rounded-full glass-card-strong flex items-center justify-center text-white hover:text-brand-rose transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mb-20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-1 bg-brand-rose rounded-full" />
                <span className="text-white/50 text-sm uppercase tracking-widest">Storytelling</span>
              </div>
              <h1 className="text-5xl sm:text-7xl font-heading font-bold text-white">Le Digital Vault</h1>
            </div>

            <div className="space-y-32">
              {projects.map((project) => (
                <div key={project.id} className="grid lg:grid-cols-2 gap-16 items-start">
                  {/* Visual Side */}
                  <div className="relative group">
                    <div className={`aspect-video rounded-3xl bg-gradient-to-br ${project.color} overflow-hidden`}>
                       <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url('/grid.svg')`, backgroundSize: '40px'}} />
                       <div className="absolute inset-0 flex items-center justify-center">
                          <Eye className="w-20 h-20 text-white/10 group-hover:scale-110 transition-transform duration-500" />
                       </div>
                    </div>
                  </div>

                  {/* Narrative Side */}
                  <div className="space-y-12">
                     <div>
                        <span className="text-brand-rose font-medium tracking-widest uppercase text-xs">{project.category}</span>
                        <h2 className="text-4xl font-heading font-bold text-white mt-4">{project.title}</h2>
                     </div>

                     <div className="grid gap-8">
                        <div className="space-y-4">
                           <div className="flex items-center gap-2 text-white/40 text-sm font-medium uppercase tracking-tighter">
                              <Target className="w-4 h-4 text-rose-500" />
                              <span>Le Challenge</span>
                           </div>
                           <p className="text-white/70 leading-relaxed font-light text-lg italic">"{project.challenge}"</p>
                        </div>

                        <div className="space-y-4">
                           <div className="flex items-center gap-2 text-white/40 text-sm font-medium uppercase tracking-tighter">
                              <Lightbulb className="w-4 h-4 text-emerald-500" />
                              <span>La Stratégie</span>
                           </div>
                           <p className="text-white/60 leading-relaxed">{project.solution}</p>
                        </div>

                        <div className="space-y-6">
                           <div className="flex items-center gap-2 text-white/40 text-sm font-medium uppercase tracking-tighter">
                              <TrendingUp className="w-4 h-4 text-blue-500" />
                              <span>Impact & ROI</span>
                           </div>
                           <div className="space-y-3">
                              {project.results.map((result, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl glass-card border border-white/5">
                                   <div className="w-2 h-2 rounded-full bg-brand-rose" />
                                   <p className="text-white/80 text-sm">{result}</p>
                                </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-40 text-center border-t border-white/10 pt-20">
               <h3 className="text-3xl font-heading font-bold text-white mb-6">Prêt à écrire votre propre histoire ?</h3>
               <button onClick={() => setIsVaultOpen(false)} className="btn-primary flex items-center gap-2 mx-auto">
                  Discuter d'un projet
                  <ArrowRight className="w-4 h-4" />
               </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
