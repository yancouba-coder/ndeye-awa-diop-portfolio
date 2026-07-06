import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Lock, Users, Download, ArrowLeft, Loader2, Calendar } from 'lucide-react';

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: { seconds: number; nanoseconds: number };
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Mot de passe simple défini via une variable d'environnement ou 'admin123' par défaut pour tester
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Mot de passe incorrect');
    }
  };

  useEffect(() => {
    if (isAuthenticated && db) {
      const fetchLeads = async () => {
        setIsLoading(true);
        try {
          const q = query(collection(db!, 'downloads'), orderBy('createdAt', 'desc'));
          const snapshot = await getDocs(q);
          const data: Lead[] = [];
          snapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() } as Lead);
          });
          setLeads(data);
        } catch (err) {
          console.error("Erreur lors de la récupération :", err);
          setError("Impossible de charger les données. Vérifiez votre configuration Firebase.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchLeads();
    } else if (isAuthenticated && !db) {
        setError("Firebase n'est pas configuré. Veuillez vérifier vos variables d'environnement.");
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4">
        <div className="w-full max-w-md glass-card-strong rounded-3xl p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-rose to-brand-purple" />
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
            <Lock className="w-6 h-6 text-brand-rose" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-white mb-2">Accès restreint</h1>
          <p className="text-white/60 text-sm mb-6">
            Veuillez entrer le mot de passe pour accéder au tableau de bord.
          </p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-brand-rose focus:ring-2 focus:ring-brand-rose/20 outline-none transition-all text-white placeholder:text-white/20"
              />
            </div>
            {error && <p className="text-brand-rose text-xs">{error}</p>}
            <button type="submit" className="w-full btn-primary py-3 flex justify-center items-center">
              Se connecter
            </button>
            <a href="/" className="block text-center text-white/40 text-xs mt-4 hover:text-white transition-colors">
              &larr; Retour au site
            </a>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <a href="/" className="text-white/40 hover:text-white transition-colors flex items-center gap-1 text-sm">
                <ArrowLeft className="w-4 h-4" />
                Retour au site
              </a>
            </div>
            <h1 className="text-3xl font-heading font-bold text-white flex items-center gap-3">
              Tableau de bord
            </h1>
            <p className="text-white/60 mt-1">Statistiques des téléchargements du Livre Blanc</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="glass-card-strong px-6 py-3 rounded-2xl flex items-center gap-4 border border-brand-rose/20">
              <div className="w-10 h-10 rounded-xl bg-brand-rose/10 flex items-center justify-center">
                <Download className="w-5 h-5 text-brand-rose" />
              </div>
              <div>
                <p className="text-white/50 text-xs uppercase tracking-wider font-medium">Téléchargements</p>
                <p className="text-2xl font-bold text-white leading-none mt-1">{leads.length}</p>
              </div>
            </div>
          </div>
        </header>

        {error && (
          <div className="bg-brand-rose/10 border border-brand-rose/30 text-brand-rose px-6 py-4 rounded-2xl mb-8 flex items-center gap-3">
            <Lock className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div className="glass-card-strong rounded-3xl overflow-hidden border border-white/10">
          <div className="px-6 py-4 border-b border-white/10 bg-white/5 flex items-center gap-3">
            <Users className="w-5 h-5 text-brand-purple" />
            <h2 className="text-lg font-heading font-semibold text-white">Contacts collectés</h2>
          </div>
          
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="py-20 flex flex-col items-center justify-center text-white/50">
                <Loader2 className="w-8 h-8 animate-spin mb-4 text-brand-rose" />
                <p>Chargement des données...</p>
              </div>
            ) : leads.length === 0 && !error ? (
              <div className="py-20 text-center text-white/50">
                <p>Aucun téléchargement pour le moment.</p>
              </div>
            ) : (
              <table className="w-full text-left text-sm text-white/70">
                <thead className="text-xs uppercase bg-white/5 text-white/50 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 font-medium">Nom & Prénom</th>
                    <th className="px-6 py-4 font-medium">Email</th>
                    <th className="px-6 py-4 font-medium text-right">Date de téléchargement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {leads.map((lead) => {
                    const date = lead.createdAt ? new Date(lead.createdAt.seconds * 1000) : new Date();
                    return (
                      <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 font-medium text-white">
                          {lead.firstName} {lead.lastName}
                        </td>
                        <td className="px-6 py-4 text-brand-rose font-medium">
                          <a href={`mailto:${lead.email}`}>{lead.email}</a>
                        </td>
                        <td className="px-6 py-4 text-right flex items-center justify-end gap-2 text-white/50">
                          <Calendar className="w-3.5 h-3.5" />
                          {date.toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
