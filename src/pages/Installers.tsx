import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, MapPin, Shield, Phone, Loader2, Users } from 'lucide-react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import { useSolarStore, Installer } from '@/store/solarStore';
import { toast } from 'sonner';

const Installers = () => {
  const { selectedInstaller, setSelectedInstaller } = useSolarStore();
  const [installers, setInstallers] = useState<Installer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchInstallers = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await axios.get('http://localhost:5000/api/installers');
        if (res.data && res.data.data) {
          const dbData = res.data.data.map((inst: any) => ({
            _id: inst._id,
            id: inst._id,
            name: inst.name,
            company: inst.company,
            location: inst.location,
            rating: inst.rating,
            views: inst.views || 0,
            reviews: inst.views || 0,
            completedProjects: inst.completedProjects || 0,
            isVerified: inst.isVerified !== undefined ? inst.isVerified : true,
            verified: inst.isVerified !== undefined ? inst.isVerified : true,
            avatar: inst.name.split(' ').map((n: string) => n[0]).join('').toUpperCase() || 'ST'
          }));
          setInstallers(dbData);
          
          // Auto-select first installer if none is selected
          if (dbData.length > 0 && !selectedInstaller) {
            setSelectedInstaller(dbData[0]);
          }
        }
      } catch (err: any) {
        console.error('Error fetching installers:', err);
        setError('Installers profiles database se load nahi ho sake.');
        toast.error('Failed to load installer directory.');
      } finally {
        setLoading(false);
      }
    };

    fetchInstallers();
  }, [selectedInstaller, setSelectedInstaller]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="container mx-auto px-4 flex-1 flex flex-col items-center justify-center pt-24 pb-12">
          <div className="max-w-md w-full text-center space-y-4 p-8 rounded-3xl border border-primary/20 bg-card/60 backdrop-blur-xl shadow-2xl">
            <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto" />
            <h2 className="text-xl font-bold">Verified Installer Directory</h2>
            <p className="text-muted-foreground text-sm">
              Local market professionals retrieve kar rahe hain...
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-black text-foreground tracking-tight">
              Choose Your Installer
            </h1>
            <p className="text-muted-foreground">
              Connect with verified solar installation professionals in Karachi.
            </p>
          </div>

          {error && (
            <Card className="border-destructive/30 bg-destructive/5 text-center p-6 rounded-2xl">
              <p className="text-sm text-destructive">{error}</p>
            </Card>
          )}

          {/* Installer List */}
          <div className="space-y-4 mb-8">
            {installers.map((installer) => (
              <Card
                key={installer.id}
                onClick={() => {
                  setSelectedInstaller(installer);
                  toast.success(`${installer.name} selected as your installer.`);
                }}
                className={`cursor-pointer transition-all duration-300 rounded-3xl border-2 overflow-hidden hover:scale-[1.01] ${
                  selectedInstaller?.id === installer.id 
                    ? 'border-primary ring-2 ring-primary/20 bg-primary/5' 
                    : 'border-border hover:border-primary/20'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
                    {/* Avatar */}
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-black tracking-wider transition-all duration-300 ${
                      selectedInstaller?.id === installer.id 
                        ? 'solar-gradient text-primary-foreground shadow-lg shadow-primary/20' 
                        : 'bg-muted text-foreground/80'
                    }`}>
                      {installer.avatar}
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-lg text-foreground">{installer.name}</h3>
                        <span className="text-xs text-primary font-semibold font-sans px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/25">
                          {installer.company || 'Solar Specialist'}
                        </span>
                        {installer.isVerified && (
                          <div className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-accent/25 text-accent border border-accent/25">
                            <Shield className="w-3 h-3 fill-accent" />
                            <span className="text-[10px] font-black uppercase tracking-wider">Verified</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-x-4 gap-y-1 text-xs text-muted-foreground flex-wrap font-sans">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-primary" />
                          {installer.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          {installer.rating} ({installer.views} reviews)
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-blue-500" />
                          {installer.completedProjects} Completed Projects
                        </span>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center gap-2 ml-auto sm:ml-0 pt-2 sm:pt-0">
                      <Button variant="ghost" size="icon" className="rounded-xl hover:bg-muted text-primary" onClick={(e) => {
                        e.stopPropagation();
                        toast.info(`Contact number: +92-SOLAR-IQ`);
                      }}>
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant={selectedInstaller?.id === installer.id ? 'default' : 'outline'}
                        className={`rounded-xl font-bold ${selectedInstaller?.id === installer.id ? 'solar-gradient text-primary-foreground border-0' : ''}`}
                      >
                        {selectedInstaller?.id === installer.id ? 'Selected' : 'Select'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6 border-t">
            <Link to="/packages">
              <Button variant="ghost" className="font-bold hover:bg-muted text-foreground">
                Back to Packages
              </Button>
            </Link>
            <Link to="/user-info">
              <Button disabled={!selectedInstaller} className="solar-gradient text-primary-foreground font-bold px-6 py-5 shadow-lg shadow-primary/20 hover:opacity-95 transition-all">
                Continue to Contact Info
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Installers;
