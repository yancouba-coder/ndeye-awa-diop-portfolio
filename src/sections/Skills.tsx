import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  TrendingUp, 
  Share2, 
  Palette, 
  FileText, 
  BarChart3, 
  PenTool,
  Users,
  Image,
  Figma,
  Video,
  Megaphone,
  Search,
  Mail,
  Globe,
  Lightbulb
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  icon: React.ReactNode;
  level: number;
  category: string;
}

const skills: Skill[] = [
  { name: "SEO", icon: <Search className="w-5 h-5" />, level: 90, category: "Digital" },
  { name: "Social Media", icon: <Share2 className="w-5 h-5" />, level: 95, category: "Digital" },
  { name: "Brand Strategy", icon: <Lightbulb className="w-5 h-5" />, level: 88, category: "Strategy" },
  { name: "Content Marketing", icon: <FileText className="w-5 h-5" />, level: 92, category: "Content" },
  { name: "Analytics", icon: <BarChart3 className="w-5 h-5" />, level: 85, category: "Data" },
  { name: "Copywriting", icon: <PenTool className="w-5 h-5" />, level: 90, category: "Content" },
  { name: "Community", icon: <Users className="w-5 h-5" />, level: 88, category: "Digital" },
  { name: "Photoshop", icon: <Image className="w-5 h-5" />, level: 82, category: "Design" },
  { name: "Figma", icon: <Figma className="w-5 h-5" />, level: 78, category: "Design" },
  { name: "Video", icon: <Video className="w-5 h-5" />, level: 75, category: "Content" },
  { name: "Advertising", icon: <Megaphone className="w-5 h-5" />, level: 85, category: "Digital" },
  { name: "Email Marketing", icon: <Mail className="w-5 h-5" />, level: 80, category: "Digital" },
  { name: "Web Strategy", icon: <Globe className="w-5 h-5" />, level: 87, category: "Strategy" },
  { name: "Growth", icon: <TrendingUp className="w-5 h-5" />, level: 83, category: "Data" },
  { name: "Visual Design", icon: <Palette className="w-5 h-5" />, level: 76, category: "Design" },
];

const categories = ["Tout", "Digital", "Content", "Strategy", "Data", "Design"];

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const orbsContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("Tout");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredSkills = activeCategory === "Tout" 
    ? skills 
    : skills.filter(s => s.category === activeCategory);

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

      // Orbs entrance
      const orbs = orbsContainerRef.current?.querySelectorAll('.skill-orb');
      if (orbs) {
        gsap.fromTo(
          orbs,
          { 
            scale: 0, 
            opacity: 0,
            rotateY: 180,
          },
          {
            scale: 1,
            opacity: 1,
            rotateY: 0,
            stagger: {
              amount: 0.8,
              from: "random",
            },
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "top 20%",
              scrub: 0.5,
            },
          }
        );

        // Continuous floating animation
        orbs.forEach((orb, i) => {
          gsap.to(orb, {
            y: `+=${Math.sin(i) * 15}`,
            x: `+=${Math.cos(i) * 10}`,
            duration: 3 + Math.random() * 2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        });
      }

      // Exit animation
      gsap.to(orbsContainerRef.current, {
        opacity: 0,
        filter: "blur(20px)",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Mouse repulsion effect
  useEffect(() => {
    const container = orbsContainerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const orbs = container.querySelectorAll('.skill-orb');
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      orbs.forEach((orb) => {
        const orbRect = orb.getBoundingClientRect();
        const orbX = orbRect.left - rect.left + orbRect.width / 2;
        const orbY = orbRect.top - rect.top + orbRect.height / 2;

        const dx = orbX - mouseX;
        const dy = orbY - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        if (distance < maxDistance) {
          const force = (1 - distance / maxDistance) * 30;
          const angle = Math.atan2(dy, dx);
          const moveX = Math.cos(angle) * force;
          const moveY = Math.sin(angle) * force;

          gsap.to(orb, {
            x: `+=${moveX}`,
            y: `+=${moveY}`,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, [filteredSkills]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-brand-dark z-40 overflow-hidden py-20"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-rose/10 via-brand-dark to-brand-purple/10" />
        {/* Animated circles */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-rose/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-purple/5 rounded-full blur-3xl animate-pulse animation-delay-500" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-12 will-change-transform">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-1 bg-brand-rose rounded-full" />
            <span className="text-white/50 text-sm uppercase tracking-widest">Expertise</span>
            <div className="w-12 h-1 bg-brand-rose rounded-full" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-white mb-4">
            Compétences
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Un ensemble de compétences variées pour créer des stratégies digitales complètes et efficaces.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-brand-rose text-white shadow-glow"
                  : "glass-card text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills cloud */}
        <div
          ref={orbsContainerRef}
          className="relative min-h-[500px] flex flex-wrap justify-center items-center gap-4 sm:gap-6"
        >
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="skill-orb will-change-transform"
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div
                className={`relative px-5 py-3 sm:px-6 sm:py-4 rounded-2xl glass-card-strong cursor-pointer
                  transition-all duration-300 hover:scale-110 hover:shadow-glow
                  ${hoveredSkill === skill.name ? 'scale-110 shadow-glow z-10' : ''}`}
              >
                {/* Glow effect on hover */}
                <div 
                  className={`absolute inset-0 rounded-2xl bg-brand-rose/20 blur-xl transition-opacity duration-300 ${
                    hoveredSkill === skill.name ? 'opacity-100' : 'opacity-0'
                  }`} 
                />
                
                <div className="relative flex items-center gap-3">
                  <span className="text-brand-rose">{skill.icon}</span>
                  <span className="text-white font-medium text-sm sm:text-base whitespace-nowrap">
                    {skill.name}
                  </span>
                </div>

                {/* Level indicator on hover */}
                <div 
                  className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap
                    transition-all duration-300 ${
                    hoveredSkill === skill.name 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-2 pointer-events-none'
                  }`}
                >
                  <div className="glass-card px-3 py-1.5 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-white/20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-brand-rose rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <span className="text-xs text-white/70">{skill.level}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats summary */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Compétences", value: "15+" },
            { label: "Certifications", value: "2" },
            { label: "Outils maîtrisés", value: "12+" },
            { label: "Langues", value: "3" },
          ].map((stat, i) => (
            <div key={i} className="glass-card rounded-2xl p-4 text-center">
              <p className="text-2xl sm:text-3xl font-heading font-bold text-gradient">{stat.value}</p>
              <p className="text-white/50 text-xs sm:text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
