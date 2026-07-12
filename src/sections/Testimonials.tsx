import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Star, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';

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
    name: "Stéphanie DELAROCHE",
    role: "Responsable clientèle chez Oparebrise 33",
    content: "Awa ne laisse que de bons souvenirs partout où elle passe, autant humainement que professionnellement.\nAutonome, compétente et efficace, elle trouve ses marques rapidement.\nSon plus : elle amène de la joie, elle rayonne et apporte une très bonne dynamique.\nN’hésitez pas à lui accorder votre confiance, vous ne serez pas déçus !",
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
  },
  {
    id: 5,
    name: "Mahmoud EL HAMRI",
    role: "Directeur de Oparebrise33",
    content: "J’ai eu le plaisir d’accueillir Awa en alternance au sein de mon entreprise, Oparebrise 33. Tout au long de son parcours, elle a fait preuve de sérieux, de motivation et d’un excellent sens des responsabilités.\n\nElle s’est rapidement intégrée à l’équipe, a su apprendre efficacement et mener à bien les missions qui lui étaient confiées avec professionnalisme, notamment dans les domaines de la communication, du marketing et du développement commercial. Son implication, sa ponctualité et sa capacité d’adaptation ont été particulièrement appréciées.\n\nAwa est une personne agréable, investie et toujours désireuse de progresser. Je la recommande vivement.",
    source: "LinkedIn",
    color: "from-sky-500 to-indigo-500"
  },
  {
    id: 6,
    name: "Justine LEPORCQ",
    role: "Responsable communication",
    content: "J'ai eu la chance d'accompagner Awa durant sa dernière année d'études supérieures, au sein de M comme Mutuelle, en tant que tutrice. Ce fut un réel plaisir de la voir évoluer professionnellement au fil des mois.\nAu-delà d'être un vrai rayon de soleil au quotidien, Awa a su être un vrai binôme dans les projets de communication : très à l'écoute, qui sait intégrer les retours avec beaucoup de professionnalisme. Toujours réactive, impliquée et volontaire, c'est une personne sur qui on peut compter, les yeux fermés.\n\nJe lui souhaite bien évidemment tout le meilleur pour la suite de son aventure pro.\nEt si vous me lisez, que vous recherchez une collaboratrice en marketing/communication, n'hésitez pas à échanger avec elle pour en savoir plus. Je suis convaincue qu'elle saura apporter un vrai plus dans votre équipe !",
    source: "LinkedIn",
    color: "from-indigo-500 to-blue-500"
  },
  {
    id: 7,
    name: "Anissa ELFITATI",
    role: "Chargée de prévention",
    content: "Awa est une personne toujours partante, enthousiaste et pleinement investie dans son travail. Son attitude positive, sa bonne humeur et son énergie sont de véritables atouts pour l'équipe. C'est une collègue précieuse que chacun apprécie de côtoyer. Ce fut un véritable plaisir de travailler avec elle.",
    source: "LinkedIn",
    color: "from-orange-500 to-amber-500"
  },
  {
    id: 8,
    name: "Amélie PERON",
    role: "Chargée de communication",
    content: "J'ai eu la chance de travailler avec Awa cette année et je n'ai qu'une seule chose à dire : c'est la perle rare.\nElle est toujours pleine d'idées, créative, investie et force de proposition. On sent qu'elle aime ce qu'elle fait et ça se ressent.\nAwa est un vrai rayon de soleil : bonne humeur, énergie et beaucoup d'humour sont à prévoir.\nJe suis persuadée qu'elle ira très loin et qu'elle sera un véritable atout pour sa prochaine équipe, comme elle l'a été pour la nôtre.",
    source: "LinkedIn",
    color: "from-violet-500 to-fuchsia-500"
  },
  {
    id: 9,
    name: "Saïd MAMERI",
    role: "Data Analyst",
    content: "J'ai eu le plaisir de travailler avec Awa et je la recommande sans hésitation. Sérieuse, impliquée et autonome, elle fait preuve d'un grand professionnalisme. Son excellent relationnel lui permet de collaborer efficacement avec les équipes et de relever de nouveaux défis avec enthousiasme.\nJe suis convaincu qu'elle sera un véritable atout pour toute les personnes qui auront l'opportunité de travailler avec elle. Je lui souhaite beaucoup de réussite dans la suite de son parcours.",
    source: "LinkedIn",
    color: "from-cyan-500 to-teal-500"
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
    <div className="testimonial-card group relative h-full">
      <div className="glass-card-strong rounded-3xl p-8 h-full flex flex-col hover-lift border border-white/5 transition-all duration-500">
        <div className="flex items-center gap-4 mb-8 pt-4">
          <div className={`w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center p-0.5`}>
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

        <div className="mt-auto pt-4 flex items-center gap-1">
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      // Scroll by one card width (assuming responsive card width)
      // For a better UX, scroll by 320px (a bit less than typical mobile width)
      const scrollAmount = window.innerWidth < 768 ? 300 : 420;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

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
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-white">
                Ils m'ont fait confiance
              </h2>
              <p className="text-white/40 mt-4 max-w-2xl text-lg italic">
                "Tout au long de mon parcours professionnel, j'ai eu la chance de collaborer avec des employeurs et collègues qui ont reconnu mon savoir-faire."
              </p>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative -mx-4 sm:-mx-8 px-4 sm:px-8 group">
          {/* Floating Navigation Buttons */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-brand-dark/90 border border-white/20 shadow-glow hover:bg-white/10 text-white backdrop-blur-md transition-all"
            aria-label="Avis précédent"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button 
            onClick={() => scroll('right')}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-brand-dark/90 border border-white/20 shadow-glow hover:bg-white/10 text-white backdrop-blur-md transition-all"
            aria-label="Avis suivant"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div 
            ref={scrollContainerRef} 
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((item) => (
              <div 
                key={item.id} 
                className="w-[85vw] sm:w-[400px] shrink-0 snap-center"
              >
                <TestimonialCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
