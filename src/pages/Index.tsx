import { Sun, ArrowRight, Zap, Shield, Leaf, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import heroImage from '@/assets/hero-solar.jpg';

const benefits = [
  {
    icon: Zap,
    title: 'Smart Load Analysis',
    description: 'AI-powered calculation of your exact energy needs based on your appliances and usage patterns.',
  },
  {
    icon: TrendingDown,
    title: 'Cost Savings',
    description: 'Save up to 90% on electricity bills with our optimized solar recommendations.',
  },
  {
    icon: Shield,
    title: 'Verified Installers',
    description: 'Connect with certified, rated installers in your area for worry-free installation.',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly',
    description: 'Reduce your carbon footprint and contribute to a sustainable future.',
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-16 overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-95" />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-6 animate-fade-in">
              <Sun className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Intelligent Solar Solutions</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-secondary-foreground mb-6 animate-slide-up">
              Power Your Home with{' '}
              <span className="text-gradient">Smart Solar</span>
            </h1>
            
            <p className="text-lg md:text-xl text-secondary-foreground/80 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Calculate your energy needs, compare packages, and connect with verified installers. 
              Your journey to clean energy starts here.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/calculator">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Calculator
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/packages">
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  View Packages
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
              className="fill-background"
            />
          </svg>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose SolarIQ?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We make going solar simple, affordable, and efficient with our intelligent advisory platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={benefit.title} className="group hover:border-primary/30" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-2xl solar-gradient flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <Card className="overflow-hidden border-0 solar-gradient">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Go Solar?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                Start your personalized solar journey today. It takes just 5 minutes to get your custom recommendation.
              </p>
              <Link to="/calculator">
                <Button variant="hero" size="lg">
                  Calculate Your Savings
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl solar-gradient flex items-center justify-center">
                <Sun className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-secondary-foreground">SolarIQ</span>
            </div>
            <p className="text-sm text-secondary-foreground/70">
              © 2024 SolarIQ. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
