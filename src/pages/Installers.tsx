import { Link } from 'react-router-dom';
import { ArrowRight, Star, MapPin, Shield, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import { useSolarStore, Installer } from '@/store/solarStore';

const installers: Installer[] = [
  {
    id: '1',
    name: 'Welldone Amir',
    location: 'Karachi, Pakistan',
    rating: 4.9,
    reviews: 156,
    verified: true,
    avatar: 'ST',
  },
  {
    id: '2',
    name: 'Solar House',
    location: 'Karachi, Pakistan',
    rating: 4.8,
    reviews: 203,
    verified: true,
    avatar: 'GE',
  },
  {
    id: '3',
    name: 'Eco Solar Experts',
    location: 'Karachi, Pakistan',
    rating: 4.7,
    reviews: 89,
    verified: true,
    avatar: 'SM',
  },
  {
    id: '5',
    name: 'BrightSun Energy',
    location: 'Karachi, Pakistan',
    rating: 4.6,
    reviews: 67,
    verified: true,
    avatar: 'BS',
  },
];

const Installers = () => {
  const { selectedInstaller, setSelectedInstaller } = useSolarStore();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Choose Your Installer
            </h1>
            <p className="text-muted-foreground">
              Connect with verified solar installation professionals in your area.
            </p>
          </div>

          {/* Installer List */}
          <div className="space-y-4 mb-8">
            {installers.map((installer) => (
              <Card
                key={installer.id}
                onClick={() => setSelectedInstaller(installer)}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedInstaller?.id === installer.id 
                    ? 'border-primary ring-2 ring-primary/20' 
                    : 'hover:border-primary/30'
                }`}
              >
                <CardContent className="p-5">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-lg font-bold ${
                      selectedInstaller?.id === installer.id 
                        ? 'solar-gradient text-primary-foreground' 
                        : 'bg-secondary text-secondary-foreground'
                    }`}>
                      {installer.avatar}
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{installer.name}</h3>
                        {installer.verified && (
                          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/20 text-accent">
                            <Shield className="w-3 h-3" />
                            <span className="text-xs font-medium">Verified</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {installer.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-primary fill-primary" />
                          {installer.rating} ({installer.reviews} reviews)
                        </span>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="rounded-xl">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant={selectedInstaller?.id === installer.id ? 'default' : 'outline'}
                        size="sm"
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
          <div className="flex justify-between">
            <Link to="/customize">
              <Button variant="ghost">Back to Customize</Button>
            </Link>
            <Link to="/user-info">
              <Button disabled={!selectedInstaller}>
                Continue
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
