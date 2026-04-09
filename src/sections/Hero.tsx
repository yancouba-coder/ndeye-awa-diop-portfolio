import { MapPin } from 'lucide-react';

const Hero = () => {
  return (
    <section
      className="relative bg-gradient-to-br from-brand-purple via-brand-dark to-brand-dark z-10 pt-24 pb-12 sm:pt-28 sm:pb-16 flex items-center justify-center px-4 sm:px-6 lg:px-8"
    >
      {/* Background grain overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {/* Main heading */}
        <h1
          className="font-heading font-black text-white leading-none select-none"
        >
          <span
            className="block tracking-tighter"
            style={{
              fontSize: 'clamp(3rem, 12vw, 10rem)',
              lineHeight: 0.9,
            }}
          >
            NDEYE AWA
          </span>
          <span
            className="block tracking-tighter text-gradient -mt-1 sm:-mt-3"
            style={{
              fontSize: 'clamp(3rem, 12vw, 10rem)',
              lineHeight: 0.9,
            }}
          >
            DIOP
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 sm:mt-8 text-lg sm:text-xl md:text-2xl text-white/80 font-body font-light tracking-wide">
          Chargée de Communication Digitale & Brand Content
        </p>

        {/* Location badge */}
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card">
          <MapPin className="w-4 h-4 text-brand-rose" />
          <span className="text-sm text-white/70">Lille, France</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
