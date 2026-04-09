import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Instagram,
  CheckCircle,
  ArrowUpRight
} from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content fade in
      gsap.fromTo(
        contentRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 0.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mqapvvep', { // Note: Remplacer par votre Form ID Formspree pour plus de sécurité
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _subject: `Nouveau message de ${formData.name}: ${formData.subject}`
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        toast.success('Message envoyé avec succès ! Je vous répondrai bientôt.');
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Erreur lors de l’envoi');
      }
    } catch (error) {
      console.error('Contact Form Error:', error);
      toast.error('Une erreur est survenue lors de l’envoi du message. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-br from-gray-50 to-white z-50 py-20 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-rose/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-purple/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 will-change-transform">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-1 bg-brand-rose rounded-full" />
            <span className="text-gray-400 text-sm uppercase tracking-widest">Contact</span>
            <div className="w-12 h-1 bg-brand-rose rounded-full" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-gray-900 mb-4">
            Travaillons ensemble
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Vous avez un projet de communication digitale ou de brand content ? Discutons de vos objectifs.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
              <h3 className="text-xl font-heading font-bold text-gray-900">
                Informations de contact
              </h3>
              
              <div className="space-y-4">
                <a 
                  href="mailto:nad82467@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-rose/10 flex items-center justify-center text-brand-rose group-hover:bg-brand-rose group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-gray-900 font-medium">nad82467@gmail.com</p>
                  </div>
                </a>

                <a 
                  href="tel:+33605823277"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-purple/10 flex items-center justify-center text-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Téléphone</p>
                    <p className="text-gray-900 font-medium">06 05 82 32 77</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Localisation</p>
                    <p className="text-gray-900 font-medium">Lille, France</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div>
              <h3 className="text-xl font-heading font-bold text-gray-900 mb-4">
                Réseaux sociaux
              </h3>
              <div className="flex gap-3">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-[#0077B5]/10 flex items-center justify-center text-[#0077B5] hover:bg-[#0077B5] hover:text-white transition-all duration-300"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500/10 flex items-center justify-center text-pink-500 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Availability badge */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-brand-rose/10 to-brand-purple/10 border border-brand-rose/20">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping" />
                </div>
                <div>
                  <p className="text-gray-900 font-medium">Disponible pour de nouveaux projets</p>
                  <p className="text-gray-500 text-sm">Réponse sous 24h</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">
                    Message envoyé !
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Merci pour votre message. Je vous répondrai dans les plus brefs délais.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="text-brand-rose font-medium hover:underline"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-rose focus:ring-2 focus:ring-brand-rose/20 outline-none transition-all text-gray-900"
                        placeholder="Jean Dupont"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-rose focus:ring-2 focus:ring-brand-rose/20 outline-none transition-all text-gray-900"
                        placeholder="jean@exemple.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Sujet *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-rose focus:ring-2 focus:ring-brand-rose/20 outline-none transition-all bg-white text-gray-900"
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="project">Projet de communication</option>
                      <option value="collaboration">Collaboration</option>
                      <option value="consulting">Consulting</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-rose focus:ring-2 focus:ring-brand-rose/20 outline-none transition-all resize-none text-gray-900"
                      placeholder="Décrivez votre projet..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        Envoyer le message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-heading font-bold text-gradient">Awa Diop</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2024 Awa Diop. Tous droits réservés.
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 text-gray-500 hover:text-brand-rose transition-colors"
            >
              <span className="text-sm">Retour en haut</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
