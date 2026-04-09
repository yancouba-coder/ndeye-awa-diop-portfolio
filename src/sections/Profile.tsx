import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Instagram, Mail, Download, MapPin, Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Profile = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle entrance
      gsap.fromTo(
        cardRef.current,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Image reveal
      gsap.fromTo(
        imageRef.current,
        { scale: 1.1, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-container bg-brand-dark pt-0 pb-20 z-20"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 via-transparent to-brand-rose/5" />

      {/* Main card */}
      <div
        ref={cardRef}
        className="relative w-full max-w-5xl mx-auto will-change-transform"
      >
        <div className="glass-card-strong rounded-3xl overflow-hidden shadow-card">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image side */}
            <div className="relative h-80 md:h-96 lg:h-auto overflow-hidden">
              <div
                ref={imageRef}
                className="absolute inset-0 will-change-transform"
              >
                <img
                  src="/profile-photo.jpg"
                  alt="Awa Diop"
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent md:bg-gradient-to-r" />
              </div>
              
              {/* Current position badge */}
              <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-auto">
                <div className="glass-card rounded-xl px-4 py-3">
                  <div className="flex items-center gap-2 text-white/60 text-xs uppercase tracking-wider mb-1">
                    <Briefcase className="w-3 h-3" />
                    <span>Actuellement</span>
                  </div>
                  <p className="text-white font-semibold text-sm">M comme Mutuelle</p>
                  <p className="text-white/70 text-xs">Chargée de Communication Digitale</p>
                </div>
              </div>
            </div>

            {/* Content side */}
            <div
              ref={contentRef}
              className="p-6 sm:p-8 md:p-10 flex flex-col justify-center"
            >
              <div className="space-y-6">
                {/* Header */}
                <div>
                  <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-2">
                    Profil
                  </h2>
                  <p className="text-brand-rose font-medium text-lg">
                    Chargée de Communication Digitale & Brand Content
                  </p>
                </div>

                {/* Bio */}
                <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                  Passionnée par la création de récits numériques qui connectent. 
                  Je construis des ponts entre les marques et leurs audiences à travers 
                  un contenu stratégique, une maîtrise des réseaux sociaux et des 
                  insights basés sur les données.
                </p>

                {/* Location */}
                <div className="flex items-center gap-2 text-white/50">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Lille, France</span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 py-4 border-y border-white/10">
                  <div className="text-center">
                    <p className="text-2xl sm:text-3xl font-heading font-bold text-gradient">2</p>
                    <p className="text-xs text-white/50 mt-1">Certifications</p>
                  </div>
                  <div className="text-center border-x border-white/10">
                    <p className="text-2xl sm:text-3xl font-heading font-bold text-gradient">12+</p>
                    <p className="text-xs text-white/50 mt-1">Outils maîtrisés</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl sm:text-3xl font-heading font-bold text-gradient">3+</p>
                    <p className="text-xs text-white/50 mt-1">Années d'exp.</p>
                  </div>
                </div>

                {/* Social links */}
                <div className="flex items-center gap-3">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-white/70 hover:text-white hover:bg-brand-rose/20 transition-all duration-300"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-white/70 hover:text-white hover:bg-brand-rose/20 transition-all duration-300"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="mailto:nad82467@gmail.com"
                    className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-white/70 hover:text-white hover:bg-brand-rose/20 transition-all duration-300"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>

                {/* CTA */}
                <button className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Télécharger mon CV
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
