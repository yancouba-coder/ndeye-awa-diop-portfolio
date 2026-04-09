import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface EducationItem {
  school: string;
  degree: string;
  period: string;
  location: string;
  color: string;
}

const education: EducationItem[] = [
  {
    school: "ESP Lille",
    degree: "Mastère 2 Brand content et stratégie de marque",
    period: "2025 - 2026",
    location: "Lille",
    color: "from-brand-rose to-purple-600",
  },
  {
    school: "ESP Bordeaux",
    degree: "Mastère 1 Marketing d'influence et communication",
    period: "2024 - 2025",
    location: "Bordeaux",
    color: "from-blue-500 to-cyan-600",
  },
  {
    school: "Efrei Bordeaux",
    degree: "Bachelor 3 Marketing digital et communication (Diplôme chef de projet digital)",
    period: "2023 - 2024",
    location: "Bordeaux",
    color: "from-emerald-500 to-teal-600",
  },
];

const Formation = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const windowWidth = window.innerWidth;
        return -(trackWidth - windowWidth + 64); // +64 for padding
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
                <div className="glass-card-strong rounded-3xl p-6 sm:p-8 h-full hover-lift group border border-white/10">
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

                  <div className="flex flex-col gap-2 mt-auto">
                    <div className="flex items-center gap-2 text-white/50 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{edu.period}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/50 text-sm">
                      <MapPin className="w-4 h-4" />
                      <span>{edu.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* End spacer */}
            <div className="flex-shrink-0 w-8 sm:w-16" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Formation;
