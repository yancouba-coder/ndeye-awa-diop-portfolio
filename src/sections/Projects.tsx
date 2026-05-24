import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, MessageCircle, ArrowUpRight, X, Target, Lightbulb, TrendingUp, ArrowRight, Trophy } from 'lucide-react';

import mMutuelleImg from '../assets/images/projects/m_comme_mutuelle.jpg';
import oparebriseImg from '../assets/images/projects/oparebrise_33.jpg';
import zolaMediaImg from '../assets/images/projects/zola_media.jpg';
import fontdouceImg from '../assets/images/projects/fontdouce.jpg';


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
    title: "M comme Mutuelle",
    category: "Événementiel & Activation",
    description: "Piloter une stratégie d’activation sur un événement à fort impact.",
    image: mMutuelleImg,
    stats: { views: "125K", likes: "8.5K", engagement: "12%" },
    color: "from-rose-500 to-pink-600",
    challenge: "Valoriser la présence de la mutuelle en tant que partenaire majeur d’un événement d’envergure, en créant une expérience visible, engageante et cohérente avec son image.",
    solution: "J’ai conçu et piloté l’ensemble du dispositif de communication autour de l’événement, en pensant à la fois l’expérience terrain et les activations de marque (goodies, interactions). L’objectif : créer une présence visible et cohérente capable de capter l’attention et générer du lien.",
    results: [
      "Forte visibilité de la marque sur l’événement",
      "Engagement direct avec le public via des activations terrain",
      "Retours positifs sur l’expérience proposée et la proximité créée",
      "Bilan post-événement validant la pertinence des actions"
    ]
  },
  {
    id: 2,
    title: "Oparebrise 33",
    category: "SEO & Digital Local",
    description: "Positionner la marque en première position sur les recherches locales.",
    image: oparebriseImg,
    stats: { views: "89K", likes: "5.2K", engagement: "8.5%" },
    color: "from-blue-500 to-cyan-600",
    challenge: "Améliorer la visibilité locale de l’entreprise dans un environnement concurrentiel et générer du trafic qualifié via les moteurs de recherche.",
    solution: "Refonte complète du contenu du site avec une approche orientée SEO : intégration de mots-clés stratégiques et optimisation technique globale. Alignement des contenus avec les attentes utilisateurs pour booster la conversion.",
    results: [
      "Positionnement en #1 sur les recherches locales (Cenon)",
      "Augmentation significative du trafic qualifié",
      "Amélioration de la visibilité et de la présence en ligne"
    ]
  },
  {
    id: 3,
    title: "Zola média",
    category: "Communication 360°",
    description: "Construire une stratégie de communication pour un événement local.",
    image: zolaMediaImg,
    stats: { views: "200K", likes: "-", engagement: "+45%" },
    color: "from-emerald-500 to-teal-600",
    challenge: "Concevoir une stratégie de communication complète pour le lancement et la promotion d’un événement local de grande ampleur.",
    solution: "Structuration d'un dispositif 360° : identité visuelle, stratégie digitale (RS, emailing), supports print et plan d'activation. Focus sur la cohérence visuelle pour générer une fréquentation maximale.",
    results: [
      "Mise en place d’une communication 360° cohérente",
      "Déploiement de supports variés (digital + terrain)",
      "Visibilité renforcée autour de l’événement"
    ]
  },
  {
    id: 4,
    title: "Parc aventure Fontdouce",
    category: "UX/UI & Web Performance",
    description: "Refondre un site pour améliorer navigation et performance.",
    image: fontdouceImg,
    stats: { views: "56K", likes: "3.8K", engagement: "15%" },
    color: "from-amber-500 to-orange-600",
    challenge: "Repenser entièrement l’expérience digitale du site pour améliorer la lisibilité, l’attractivité et la fluidité de la navigation.",
    solution: "Conception de la maquette mobile (UX/UI) en autonomie sur Figma. Structuration des parcours utilisateurs et mise à jour globale des contenus, visuels et catégories pour une refonte efficace.",
    results: [
      "Amélioration majeure de l’expérience utilisateur",
      "Site plus clair, structuré et engageant",
      "Refonte globale réussie et validée techniquement"
    ]
  },
];


const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [isVaultOpen, setIsVaultOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);


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
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card will-change-transform cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="group relative glass-card-strong rounded-3xl overflow-hidden hover-lift">
                <div className={`relative h-56 sm:h-64 overflow-hidden`}>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent" />
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
              <h1 className="text-5xl sm:text-7xl font-heading font-bold text-white">Mes Projets</h1>
            </div>

            <div className="space-y-32">
              {projects.map((project) => (
                <div key={project.id} className="grid lg:grid-cols-2 gap-16 items-start">
                  {/* Visual Side */}
                  <div className="relative group">
                    <div className={`aspect-video rounded-3xl overflow-hidden`}>
                       <img 
                         src={project.image} 
                         alt={project.title}
                         className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 via-transparent to-transparent" />
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
      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-brand-dark/90 backdrop-blur-xl"
            onClick={() => setSelectedProject(null)}
          />
          
          <div className="relative w-full max-w-4xl glass-card-strong rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
            <div className={`h-2 bg-gradient-to-r ${selectedProject.color}`} />
            
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full glass-card flex items-center justify-center text-white/60 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid md:grid-cols-2 gap-0">
               {/* Visual Side */}
               <div className="relative h-64 md:h-full">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent md:bg-gradient-to-r" />
               </div>

               {/* Content Side */}
               <div className="p-8 sm:p-12">
                  <div className="mb-8">
                    <div className="flex items-center gap-2 text-brand-rose text-sm font-medium mb-2">
                      <Target className="w-4 h-4" />
                      <span>Le Challenge</span>
                    </div>
                    <h3 className="text-3xl font-heading font-bold text-white mb-2">{selectedProject.title}</h3>
                    <p className="text-white/60 italic mb-6 leading-relaxed">
                      "{selectedProject.challenge}"
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div>
                      <div className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest mb-4">
                        <Lightbulb className="w-4 h-4 text-amber-500" />
                        <span>La Stratégie</span>
                      </div>
                      <p className="text-white/70 text-sm leading-relaxed">
                        {selectedProject.solution}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest mb-4">
                        <Trophy className="w-4 h-4 text-emerald-500" />
                        <span>Impact & Résultats</span>
                      </div>
                      <div className="grid gap-3">
                        {selectedProject.results.map((result, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-rose" />
                            <p className="text-white/80 text-xs">{result}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}
    </section>

  );
};

export default Projects;
