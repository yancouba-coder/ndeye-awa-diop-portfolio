import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Star, MessageSquare } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar?: string;
  source: string;
  color: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Manon Lavault",
    role: "Responsable événementiel et communication",
    content: "Awa est un vrai rayon de soleil, volontaire et bonne communicante, elle a de bonnes bases en communication digitale mais aussi un très bon rapport au public ! J'ai eu la chance de l'avoir au sein de mon équipe pendant 1 an et c'était un vrai plaisir ! Foncez !!",
    source: "LinkedIn",
    color: "from-rose-500 to-pink-500"
  },
  {
    id: 2,
    name: "OPAREBRISE BORDEAUX",
    role: "Vitrage Automobile",
    content: "Félicitations Ndeye Awa Diop ! Nous sommes ravis de te compter parmi nous depuis ces trois mois et de voir à quel point tu as contribué à la mise en place de stratégies digitales innovantes pour Oparebrise Bordeaux. Ta créativité, ton engagement et ton professionnalisme sont un véritable atout pour l'équipe !",
    source: "LinkedIn",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 3,
    name: "Hachouma Chkhim",
    role: "Directrice d'établissement chez Halte33",
    content: "J’ai eu le plaisir d’accompagner AWA lors de son stage, puis de poursuivre notre collaboration à travers son engagement bénévole au sein de notre association.\n\nEn tant que chargée de communication, elle a su démontrer de solides compétences rédactionnelles, une grande créativité et une réelle capacité à valoriser les actions de notre structure auprès de différents publics. Son professionnalisme, sa rigueur et sa réactivité ont été particulièrement appréciés.\n\nAu-delà de ses compétences techniques, Awa se distingue par son enthousiasme, son sens de l’écoute et son engagement. Elle s’investit pleinement dans les projets qui lui sont confiés et contribue toujours de manière constructive à la dynamique collective.\n\nJe recommande sa candidature avec confiance et lui souhaite une belle réussite dans sa recherche de CDI à partir de septembre. Toute organisation qui l’accueillera pourra compter sur une professionnelle impliquée, compétente et dotée de belles qualités humaines.",
    source: "LinkedIn",
    color: "from-brand-purple to-brand-rose"
  },
  {
    id: 4,
    name: "Lindsay Bimwala May",
    role: "Directrice de l’agence Zola Média",
    content: "Awa, est une femme très solaire, pleine de pep's et surtout très professionnelle. Elle est arrivée à un moment où l'entreprise avait besoin de revenir à la source et où il fallait communiquer en étant en accord avec notre cible et nos valeurs. En très peu de temps, elle a très vite compris l'ADN de l'entreprise et les enjeux. Tout ce qu'elle proposé et mis en application par la suite ont été couronné de succès. Une vraie pépite !",
    source: "LinkedIn",
    color: "from-emerald-500 to-teal-500"
  }
];

const TestimonialCard = ({ item }: { item: Testimonial }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 280;
  
  const shouldTruncate = item.content.length > maxLength;
  const displayText = isExpanded 
    ? item.content 
    : (shouldTruncate ? `${item.content.substring(0, maxLength)}...` : item.content);

  return (
    <div className="testimonial-card group relative">
      <div className="glass-card-strong rounded-3xl p-8 h-full flex flex-col hover-lift border border-white/5 transition-all duration-500">
        <div className={`absolute -top-1 px-4 py-1.5 rounded-b-xl bg-gradient-to-r ${item.color} text-[10px] font-bold text-white uppercase tracking-tighter opacity-70 group-hover:opacity-100 transition-opacity`}>
           {item.source}
        </div>
        
        <div className="flex items-center gap-4 mb-8 pt-4">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center p-0.5`}>
             <div className="w-full h-full rounded-2xl bg-brand-dark flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
             </div>
          </div>
          <div>
            <h3 className="text-white font-bold leading-tight">{item.name}</h3>
            <p className="text-white/40 text-xs mt-1">{item.role}</p>
          </div>
        </div>

        <div className="relative mb-6 flex-grow">
          <Quote className="absolute -top-4 -left-4 w-10 h-10 text-brand-rose/10" />
          <p className="text-white/70 text-sm leading-relaxed relative z-10 font-light whitespace-pre-line">
            {displayText}
          </p>
          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-brand-rose hover:text-brand-purple text-xs font-semibold mt-3 transition-colors duration-300 relative z-20 flex items-center gap-1"
            >
              {isExpanded ? "Voir moins" : "Voir plus"}
            </button>
          )}
        </div>

        <div className="mt-auto flex items-center gap-1">
           {[...Array(5)].map((_, i) => (
             <Star key={i} className="w-3 h-3 text-amber-500 fill-amber-500" />
           ))}
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title entrance
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
            scrub: 1,
          },
        }
      );

      // Cards staggered reveal
      const cards = cardsRef.current?.querySelectorAll('.testimonial-card');
      if (cards) {
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 80, opacity: 0, scale: 0.9 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                end: "top 70%",
                scrub: 1,
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="testimonials" className="relative py-20 bg-brand-dark overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-rose rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-purple rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        <div ref={titleRef} className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-1 bg-brand-rose rounded-full" />
            <span className="text-white/50 text-sm uppercase tracking-widest">Témoignages</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-white">
            Ils m'ont fait confiance
          </h2>
          <p className="text-white/40 mt-4 max-w-2xl text-lg italic">
            "Tout au long de mon parcours professionnel, j'ai eu la chance de collaborer avec des employeurs et collègues qui ont reconnu mon savoir-faire."
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
