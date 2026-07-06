import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  BookOpen,
  Download,
  X,
  CheckCircle,
  ArrowRight,
  Lock,
  Mail,
  User,
  ChevronRight,
} from 'lucide-react';
import livreBlanCover from '../assets/images/livre-blanc-photo.jpeg';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

gsap.registerPlugin(ScrollTrigger);

// ─── Types ───────────────────────────────────────────────────────────────────
interface LivreBlancModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// ─── Points clés du livre blanc ──────────────────────────────────────────────
const highlights = [
  'Comprendre comment le contenu influence les décisions d’achat en B2B',
  'Construire une stratégie de contenu qui attire les bons prospects',
  'Créer et diffuser des contenus réellement utiles et performants',
  'Transformer son contenu en opportunités commerciales',
];

// ─── Modal Formulaire ─────────────────────────────────────────────────────────
export const LivreBlancModal = ({ isOpen, onClose }: LivreBlancModalProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Trap scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Animate in
      if (modalRef.current && overlayRef.current) {
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
        gsap.fromTo(
          modalRef.current,
          { opacity: 0, y: 40, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out' }
        );
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      if (db) {
        await addDoc(collection(db!, 'downloads'), {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          createdAt: serverTimestamp(),
        });
      } else {
        // Mode simulation si Firebase n'est pas encore configuré
        await new Promise((r) => setTimeout(r, 1200));
        console.warn('[Livre Blanc] Firebase non configuré. Enregistrement simulé.');
      }
      
      setStatus('success');
    } catch (error) {
      console.error('[Livre Blanc] Erreur:', error);
      setErrorMsg(
        error instanceof Error
          ? error.message
          : 'Une erreur est survenue. Veuillez réessayer.'
      );
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-brand-dark/95 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal card */}
      <div
        ref={modalRef}
        className="relative w-full max-w-lg glass-card-strong rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient top bar */}
        <div className="h-1 bg-gradient-to-r from-brand-rose via-brand-purple to-brand-rose" />

        {/* Close button */}
        <button
          id="livre-blanc-modal-close"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-xl glass-card flex items-center justify-center text-white/60 hover:text-white hover:bg-brand-rose/20 transition-all duration-200"
          aria-label="Fermer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-8">
          {status === 'success' ? (
            /* ── État succès ──────────────────────────────────────────────── */
            <div className="text-center py-8 animate-in fade-in duration-500">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-rose/20 to-brand-purple/20 border border-brand-rose/30 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-brand-rose" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-white mb-3">
                Merci <span className="text-white font-medium">{formData.firstName}</span> !
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-8">
                Votre demande a bien été enregistrée. Vous pouvez maintenant télécharger le livre blanc.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="/LIVRE BLANC - Ndeye Awa DIOP.pdf"
                  download="LIVRE BLANC - Ndeye Awa DIOP.pdf"
                  className="btn-primary py-3 px-6 text-sm flex justify-center items-center gap-2 no-underline"
                >
                  <Download className="w-4 h-4" />
                  Télécharger le PDF
                </a>
                <button
                  onClick={onClose}
                  className="btn-outline py-3 px-6 text-sm flex justify-center items-center"
                >
                  Fermer
                </button>
              </div>
            </div>
          ) : (
            /* ── Formulaire ───────────────────────────────────────────────── */
            <>
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-rose/20 to-brand-purple/20 border border-brand-rose/20 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-brand-rose" />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-white">
                    Recevoir le livre blanc
                  </h3>
                  <p className="text-white/50 text-xs mt-0.5">
                    Envoi immédiat par email · 100% gratuit
                  </p>
                </div>
              </div>

              <form
                id="livre-blanc-form"
                onSubmit={handleSubmit}
                className="space-y-4"
                noValidate
              >
                {/* Prénom + Nom */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="lb-firstName"
                      className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider"
                    >
                      Prénom *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <input
                        type="text"
                        id="lb-firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Marie"
                        className="w-full pl-9 pr-3 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-brand-rose focus:ring-2 focus:ring-brand-rose/20 outline-none transition-all text-white placeholder:text-white/20 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="lb-lastName"
                      className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider"
                    >
                      Nom *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <input
                        type="text"
                        id="lb-lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Dupont"
                        className="w-full pl-9 pr-3 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-brand-rose focus:ring-2 focus:ring-brand-rose/20 outline-none transition-all text-white placeholder:text-white/20 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="lb-email"
                    className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider"
                  >
                    Adresse e-mail *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="email"
                      id="lb-email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="marie@exemple.com"
                      className="w-full pl-9 pr-3 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-brand-rose focus:ring-2 focus:ring-brand-rose/20 outline-none transition-all text-white placeholder:text-white/20 text-sm"
                    />
                  </div>
                </div>

                {/* Error state */}
                {status === 'error' && (
                  <p className="text-brand-rose text-xs bg-brand-rose/10 border border-brand-rose/20 rounded-xl px-4 py-3">
                    ⚠ {errorMsg || 'Une erreur est survenue. Veuillez réessayer.'}
                  </p>
                )}

                {/* Submit button */}
                <button
                  id="livre-blanc-submit"
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Envoi en cours…
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Recevoir le livre blanc
                    </>
                  )}
                </button>

                {/* Trust signal */}
                <p className="text-center text-white/30 text-xs flex items-center justify-center gap-1.5">
                  <Lock className="w-3 h-3" />
                  Vos données sont confidentielles · Aucun spam
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Section Livre Blanc ──────────────────────────────────────────────────────
interface LivreBlancProps {
  onOpenModal: () => void;
}

const LivreBlanc = ({ onOpenModal }: LivreBlancProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content slide in from left
      gsap.fromTo(
        contentRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );

      // Image slide in from right
      gsap.fromTo(
        imageRef.current,
        { x: 60, opacity: 0, rotateY: 15 },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
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
      id="livreblanc"
      className="relative py-24 bg-brand-dark overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-brand-rose/8 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-brand-purple/8 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Contenu ────────────────────────────────────────────────────── */}
          <div ref={contentRef} className="will-change-transform">
            {/* Label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-1 bg-brand-rose rounded-full" />
              <span className="text-white/50 text-sm uppercase tracking-widest">
                Ressource gratuite
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4 leading-tight">
              Mon{' '}
              <span className="text-gradient">Livre Blanc</span>
            </h2>

            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Un guide pratique pour transformer votre contenu en véritable levier d’acquisition client avec une méthode claire, des exemples concrets et des conseils directement applicables.
            </p>

            {/* Points clés */}
            <ul className="space-y-3 mb-10">
              {highlights.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-2xl bg-white/3 border border-white/5 hover:border-brand-rose/20 hover:bg-brand-rose/5 transition-all duration-300"
                >
                  <ChevronRight className="w-4 h-4 text-brand-rose mt-0.5 flex-shrink-0" />
                  <span className="text-white/70 text-sm leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>

            {/* Badge "gratuit" + CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                id="livre-blanc-section-cta"
                onClick={onOpenModal}
                className="btn-primary flex items-center gap-2 group"
              >
                <BookOpen className="w-4 h-4" />
                Recevoir le livre blanc
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* ── Visuel ─────────────────────────────────────────────────────── */}
          <div ref={imageRef} className="will-change-transform flex justify-center lg:justify-end">
            <div className="relative group cursor-pointer" onClick={onOpenModal}>
              {/* Glow effect derrière l'image */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-rose/30 to-brand-purple/30 rounded-3xl blur-2xl scale-95 group-hover:scale-100 transition-transform duration-500" />

              {/* Card mockup */}
              <div className="relative glass-card-strong rounded-3xl overflow-hidden shadow-card group-hover:shadow-card-hover hover-lift border border-white/10">
                {/* Gradient bar */}
                <div className="h-1.5 bg-gradient-to-r from-brand-rose to-brand-purple" />

                <div className="p-2">
                  <img
                    src={livreBlanCover}
                    alt="Livre Blanc — Communication Digitale par Awa Diop"
                    className="w-full max-w-md rounded-2xl object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>

                {/* Overlay CTA au hover */}
                <div className="absolute inset-0 bg-brand-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-3xl">
                  <div className="flex items-center gap-2 px-6 py-3 bg-brand-rose rounded-2xl text-white font-semibold text-sm shadow-glow">
                    <Download className="w-4 h-4" />
                    Recevoir gratuitement
                  </div>
                </div>
              </div>

              {/* Badge flottant */}
              <div className="absolute -top-4 -right-4 px-4 py-2 bg-gradient-to-r from-brand-rose to-brand-purple rounded-2xl text-white text-xs font-bold shadow-glow animate-pulse-glow">
                GRATUIT
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LivreBlanc;
