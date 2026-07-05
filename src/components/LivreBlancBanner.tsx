import { useEffect, useRef, useState } from 'react';
import { BookOpen, X, ArrowRight } from 'lucide-react';

interface LivreBlancBannerProps {
  onOpenModal: () => void;
}

const LivreBlancBanner = ({ onOpenModal }: LivreBlancBannerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Apparaît après 4 secondes si pas encore rejetée
    const dismissedKey = 'lb-banner-dismissed';
    const alreadyDismissed = sessionStorage.getItem(dismissedKey);

    if (alreadyDismissed) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem('lb-banner-dismissed', '1');
    setTimeout(() => setIsVisible(false), 400);
  };

  const handleOpen = () => {
    handleDismiss();
    onOpenModal();
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div
      ref={bannerRef}
      id="livre-blanc-banner"
      className={`fixed bottom-6 right-6 z-[150] transition-all duration-500 ${
        isDismissed
          ? 'opacity-0 translate-y-4 pointer-events-none'
          : 'opacity-100 translate-y-0'
      }`}
      style={{
        animation: isVisible ? 'slideUpBanner 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' : undefined,
      }}
    >
      <div className="relative glass-card-strong rounded-2xl shadow-card border border-white/10 overflow-hidden max-w-[280px] sm:max-w-xs">
        {/* Top gradient bar */}
        <div className="h-0.5 bg-gradient-to-r from-brand-rose to-brand-purple" />

        {/* Close button */}
        <button
          id="livre-blanc-banner-close"
          onClick={handleDismiss}
          className="absolute top-2.5 right-2.5 w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/20 transition-all duration-200"
          aria-label="Fermer"
        >
          <X className="w-3 h-3" />
        </button>

        <div className="px-4 py-4 pr-10">
          {/* Icon + titre */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-rose/20 to-brand-purple/20 border border-brand-rose/20 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-4 h-4 text-brand-rose" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-tight">
                Livre Blanc offert
              </p>
              <p className="text-white/40 text-xs">Communication Digitale</p>
            </div>
          </div>

          <p className="text-white/60 text-xs leading-relaxed mb-3">
            Mon guide stratégique complet — reçu directement dans votre boîte mail.
          </p>

          <button
            id="livre-blanc-banner-cta"
            onClick={handleOpen}
            className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-brand-rose to-brand-purple rounded-xl text-white text-xs font-semibold hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-glow"
          >
            Recevoir gratuitement
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUpBanner {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default LivreBlancBanner;
