import { Link } from 'react-router-dom';
import { Download, CheckCircle, Sun, Zap, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import { useSolarStore } from '@/store/solarStore';
import { toast } from 'sonner';

const FinalScreen = () => {
  const { userInfo, selectedPackage, selectedInstaller, getTotalLoad } = useSolarStore();
  
  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    toast.success('Your quote PDF is being generated!');
    
    // Simulate PDF download
    setTimeout(() => {
      const element = document.createElement('a');
      const content = `
SolarIQ Quote Summary
=====================

Customer: ${userInfo.name}
Location: ${userInfo.city}
Phone: ${userInfo.phone}

Package: ${selectedPackage?.toUpperCase() || 'Standard'}
Total Load: ${getTotalLoad()} W
Selected Installer: ${selectedInstaller?.name || 'Not selected'}

Thank you for choosing SolarIQ!
      `;
      const file = new Blob([content], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = 'SolarIQ_Quote.txt';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      
      toast.success('Quote downloaded successfully!');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Animation */}
          <div className="mb-8">
            <div className="w-24 h-24 rounded-full solar-gradient flex items-center justify-center mx-auto mb-6 animate-pulse-slow">
              <CheckCircle className="w-12 h-12 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Your Quote is Ready!
            </h1>
            <p className="text-lg text-muted-foreground">
              Thank you, {userInfo.name || 'valued customer'}! Your personalized solar quote has been prepared.
            </p>
          </div>

          {/* Summary Card */}
          <Card className="mb-8 text-left">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Quote Summary</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Total Load</p>
                      <p className="text-sm text-muted-foreground">Daily consumption</p>
                    </div>
                  </div>
                  <span className="font-bold text-foreground">{getTotalLoad().toLocaleString()} W</span>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Sun className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Package Selected</p>
                      <p className="text-sm text-muted-foreground">Solar system</p>
                    </div>
                  </div>
                  <span className="font-bold text-foreground capitalize">{selectedPackage || 'Standard'}</span>
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Installer</p>
                      <p className="text-sm text-muted-foreground">{selectedInstaller?.location || 'Your area'}</p>
                    </div>
                  </div>
                  <span className="font-bold text-foreground">{selectedInstaller?.name || 'To be assigned'}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Download Button */}
          <Button size="lg" onClick={handleDownload} className="mb-6">
            <Download className="mr-2 w-5 h-5" />
            Download Quote PDF
          </Button>

          {/* Next Steps */}
          <Card className="bg-muted/50 border-dashed">
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-3">What's Next?</h3>
              <ul className="text-sm text-muted-foreground space-y-2 text-left">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full solar-gradient flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-primary-foreground font-bold">1</span>
                  </span>
                  Your installer will contact you within 24-48 hours
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full solar-gradient flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-primary-foreground font-bold">2</span>
                  </span>
                  Schedule a site visit for accurate assessment
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full solar-gradient flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-primary-foreground font-bold">3</span>
                  </span>
                  Receive final quote and installation timeline
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Back to Home */}
          <div className="mt-8">
            <Link to="/">
              <Button variant="ghost">
                Back to Home
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FinalScreen;
