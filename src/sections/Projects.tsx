import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Eye, Heart, MessageCircle, ArrowUpRight } from 'lucide-react';

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
}

const projects: Project[] = [
  {
    id: 1,
    title: "Campagne Mcomme Mutuelle",
    category: "Brand Content",
    description: "Stratégie de contenu digitale complète incluant réseaux sociaux, blog et newsletter pour une mutuelle d'assurance.",
    image: "project1",
    stats: { views: "125K", likes: "8.5K", engagement: "12%" },
    color: "from-rose-500 to-pink-600",
  },
  {
    id: 2,
    title: "Lancement Produit Oparebrise",
    category: "Social Media",
    description: "Campagne de lancement sur Instagram et Facebook avec création de contenu visuel et gestion communautaire.",
    image: "project2",
    stats: { views: "89K", likes: "5.2K", engagement: "8.5%" },
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: 3,
    title: "Stratégie SEO Mcomme",
    category: "SEO & Content",
    description: "Optimisation SEO complète avec création de contenu blog et amélioration du référencement naturel.",
    image: "project3",
    stats: { views: "200K", likes: "-", engagement: "+45%" },
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: 4,
    title: "Influence & Partenariats",
    category: "Influence Marketing",
    description: "Gestion de partenariats avec des influenceurs locaux pour augmenter la notoriété de la marque.",
    image: "project4",
    stats: { views: "56K", likes: "3.8K", engagement: "15%" },
    color: "from-amber-500 to-orange-600",
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);

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
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-brand-dark z-45 py-20 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-purple/5 to-brand-dark" />
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-rose/5 to-transparent" />
      </div>

      {/* Content */}
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
            <button className="btn-outline flex items-center gap-2 self-start sm:self-auto">
              Voir tous les projets
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Projects grid */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 gap-6"
          style={{ perspective: "1000px" }}
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-card will-change-transform"
              onMouseEnter={() => setActiveProject(project.id)}
              onMouseLeave={() => setActiveProject(null)}
            >
              <div className="group relative glass-card-strong rounded-3xl overflow-hidden hover-lift">
                {/* Image placeholder with gradient */}
                <div className={`relative h-56 sm:h-64 bg-gradient-to-br ${project.color} overflow-hidden`}>
                  {/* Pattern overlay */}
                  <div 
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                      backgroundSize: '24px 24px',
                    }}
                  />
                  
                  {/* Animated shapes */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-32 h-32">
                      <div className="absolute inset-0 bg-white/10 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
                      <div className="absolute inset-4 bg-white/15 rounded-full animate-ping animation-delay-500" style={{ animationDuration: '3s' }} />
                      <div className="absolute inset-8 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-4xl font-heading font-bold text-white/40">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-full glass-card text-white text-xs font-medium">
                      {project.category}
                    </span>
                  </div>

                  {/* View button */}
                  <div 
                    className={`absolute top-4 right-4 transition-all duration-300 ${
                      activeProject === project.id 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-0 -translate-y-2'
                    }`}
                  >
                    <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold text-white mb-2 group-hover:text-brand-rose transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-1.5 text-white/50">
                      <Eye className="w-4 h-4" />
                      <span className="text-xs">{project.stats.views}</span>
                    </div>
                    {project.stats.likes !== '-' && (
                      <div className="flex items-center gap-1.5 text-white/50">
                        <Heart className="w-4 h-4" />
                        <span className="text-xs">{project.stats.likes}</span>
                      </div>
                    )}
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

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-white/50 mb-4">Vous avez un projet en tête ?</p>
          <button className="btn-primary inline-flex items-center gap-2">
            Discutons-en
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
