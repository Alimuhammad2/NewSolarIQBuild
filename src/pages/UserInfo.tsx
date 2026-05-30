import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, User, MapPin, Phone, Mail, Home, Loader2 } from 'lucide-react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import { useSolarStore } from '@/store/solarStore';
import { toast } from 'sonner';

const UserInfo = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo, chosenSpecs, selectedPackage, selectedInstaller, setSavedQuoteId } = useSolarStore();
  const [formData, setFormData] = useState(userInfo);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Strict Fields Validation
    if (!formData.name.trim()) {
      toast.error('Please enter your full name.');
      return;
    }
    if (formData.name.trim().length < 3) {
      toast.error('Name must be at least 3 characters.');
      return;
    }
    if (!formData.email.trim()) {
      toast.error('Please enter your email address.');
      return;
    }
    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      toast.error('Please enter a valid email address.');
      return;
    }
    if (!formData.phone.trim()) {
      toast.error('Please enter your mobile phone number.');
      return;
    }
    // Pakistani Phone Number regex validation (starts with 03 or +923 or 923 followed by 9 digits)
    const pakPhoneRegex = /^((\+92)?(0)?3[0-9]{9})$/;
    if (!pakPhoneRegex.test(formData.phone.trim())) {
      toast.error('Please enter a valid Pakistani mobile number (e.g., 03001234567).');
      return;
    }
    if (!formData.city.trim()) {
      toast.error('Please enter your city.');
      return;
    }
    if (!formData.address.trim()) {
      toast.error('Please enter your residential address.');
      return;
    }

    try {
      setSubmitting(true);
      
      // Calculate individual cost component estimations
      const price = chosenSpecs?.estimatedPricePKR || 560200;
      const breakdown = {
        panelsTotal: Math.round(price * 0.5),
        inverterTotal: Math.round(price * 0.3),
        batteriesTotal: Math.round(price * 0.15),
        structureAndInstallation: Math.round(price * 0.05)
      };

      // Construct backend quotation payload
      const payload = {
        fullName: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: `${formData.address.trim()}, ${formData.city.trim()}`,
        systemSizeKW: chosenSpecs?.systemSizeKW || 5,
        breakdown,
        grandTotal: price,
        selectedInstaller: selectedInstaller ? selectedInstaller.name : 'Not Selected',
        packageType: chosenSpecs?.recommendedPackage || selectedPackage?.toUpperCase() || 'Standard',
        panelSpecs: chosenSpecs?.panelType || 'Mono-Crystalline Panels',
        batterySpecs: chosenSpecs ? `${chosenSpecs.batteryQty}x Batteries` : 'Battery ready',
        installerDetails: selectedInstaller ? {
          name: selectedInstaller.name,
          company: selectedInstaller.company || 'Specialist',
          location: selectedInstaller.location,
          rating: selectedInstaller.rating,
          completedProjects: selectedInstaller.completedProjects || 0
        } : undefined
      };

      // Send Quote to Backend Quotation Collection in MongoDB
      const res = await axios.post('http://localhost:5000/api/quotations', payload);
      
      if (res.data && res.data.success) {
        // Save quotation ID and userInfo inside Zustand store
        setSavedQuoteId(res.data.data._id);
        setUserInfo(formData);
        
        toast.success('Your quote has been calculated and saved successfully!');
        navigate('/final');
      } else {
        toast.error('Quotation could not be saved.');
      }
    } catch (err: any) {
      console.error('Error submitting quotation:', err);
      toast.error(err.response?.data?.message || 'Database error while saving quote.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-10 space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              Your Information
            </h1>
            <p className="text-muted-foreground">
              Enter your details to receive your personalized, database-seeded solar quote.
            </p>
          </div>

          <Card className="rounded-3xl border-2 shadow-xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-black">Contact Details</CardTitle>
              <CardDescription>We'll use this to record your quotation profile and assign the installer.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-semibold">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="e.g. Ali Muhammad"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="pl-10 h-12 rounded-xl"
                      disabled={submitting}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-semibold">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10 h-12 rounded-xl"
                      disabled={submitting}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-semibold">Mobile Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="e.g. 03001234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="pl-10 h-12 rounded-xl"
                      disabled={submitting}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="font-semibold">City</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="city"
                        placeholder="e.g. Karachi"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="pl-10 h-12 rounded-xl"
                        disabled={submitting}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="font-semibold">Home Address</Label>
                    <div className="relative">
                      <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="address"
                        placeholder="e.g. Gulshan-e-Iqbal"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="pl-10 h-12 rounded-xl"
                        disabled={submitting}
                      />
                    </div>
                  </div>
                </div>

                <Button type="submit" disabled={submitting} className="w-full font-bold py-6 rounded-xl solar-gradient border-0 text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-95 text-lg" size="lg">
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 w-5 h-5 animate-spin" /> Saving Quote to Database...
                    </>
                  ) : (
                    <>
                      Get My Quote <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-start mt-6">
            <Link to="/installers">
              <Button variant="ghost" className="font-bold hover:bg-muted text-foreground" disabled={submitting}>
                Back to Installers
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserInfo;
