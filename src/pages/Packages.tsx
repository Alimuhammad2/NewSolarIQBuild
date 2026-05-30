// import { Link } from 'react-router-dom';
// import { ArrowRight, Check, Star } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import Header from '@/components/Header';
// import { useSolarStore } from '@/store/solarStore';

// const packages = [
//   {
//     id: 'basic',
//     name: 'Basic',
//     price: 250000,
//     description: 'Perfect for small households',
//     capacity: '3 kW',
//     panels: '8 Panels',
//     warranty: '10 Years',
//     features: [
//       'Mono-crystalline panels',
//       'Basic inverter',
//       'Standard mounting',
//       'Basic monitoring app',
//       '1-year maintenance',
//     ],
//     popular: false,
//   },
//   {
//     id: 'standard',
//     name: 'Standard',
//     price: 450000,
//     description: 'Ideal for medium-sized homes',
//     capacity: '5 kW',
//     panels: '12 Panels',
//     warranty: '15 Years',
//     features: [
//       'High-efficiency panels',
//       'Hybrid inverter',
//       'Premium mounting',
//       'Smart monitoring app',
//       '3-year maintenance',
//       'Battery ready',
//     ],
//     popular: true,
//   },
//   {
//     id: 'premium',
//     name: 'Premium',
//     price: 750000,
//     description: 'Complete solution for large homes',
//     capacity: '10 kW',
//     panels: '24 Panels',
//     warranty: '25 Years',
//     features: [
//       'Premium bifacial panels',
//       'Advanced hybrid inverter',
//       'Custom mounting solution',
//       'AI-powered monitoring',
//       '5-year maintenance',
//       'Battery included',
//       'EV charger ready',
//     ],
//     popular: false,
//   },
// ];

// const Packages = () => {
//   const { selectedPackage, setSelectedPackage } = useSolarStore();

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
      
//       <main className="container mx-auto px-4 pt-24 pb-12">
//         <div className="max-w-5xl mx-auto">
//           {/* Progress indicator */}
//           <div className="flex items-center justify-center mb-8">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">✓</div>
//               <div className="w-16 h-1 bg-primary rounded-full" />
//               <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">✓</div>
//               <div className="w-16 h-1 bg-primary rounded-full" />
//               <div className="w-10 h-10 rounded-full solar-gradient flex items-center justify-center text-primary-foreground font-semibold">3</div>
//             </div>
//           </div>

//           <div className="text-center mb-10">
//             <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
//               Choose Your Package
//             </h1>
//             <p className="text-muted-foreground">
//               Select the solar package that best fits your energy needs and budget.
//             </p>
//           </div>

//           {/* Package Cards */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             {packages.map((pkg) => (
//               <Card 
//                 key={pkg.id}
//                 className={`relative cursor-pointer transition-all duration-300 ${
//                   selectedPackage === pkg.id 
//                     ? 'border-primary ring-2 ring-primary/20' 
//                     : pkg.popular 
//                     ? 'border-primary/50' 
//                     : ''
//                 }`}
//                 onClick={() => setSelectedPackage(pkg.id as 'basic' | 'standard' | 'premium')}
//               >
//                 {pkg.popular && (
//                   <div className="absolute -top-3 left-1/2 -translate-x-1/2">
//                     <div className="px-4 py-1 rounded-full solar-gradient text-xs font-semibold text-primary-foreground flex items-center gap-1">
//                       <Star className="w-3 h-3" />
//                       Most Popular
//                     </div>
//                   </div>
//                 )}
                
//                 <CardHeader className="text-center pb-4">
//                   <CardTitle className="text-2xl">{pkg.name}</CardTitle>
//                   <CardDescription>{pkg.description}</CardDescription>
//                 </CardHeader>
                
//                 <CardContent className="text-center">
//                   <div className="mb-6">
//                     <span className="text-4xl font-bold text-foreground">Rs{pkg.price.toLocaleString()}</span>
//                     <span className="text-muted-foreground">/system</span>
//                   </div>
                  
//                   <div className="grid grid-cols-3 gap-2 mb-6">
//                     <div className="p-2 rounded-lg bg-muted">
//                       <p className="text-xs text-muted-foreground">Capacity</p>
//                       <p className="font-semibold text-foreground">{pkg.capacity}</p>
//                     </div>
//                     <div className="p-2 rounded-lg bg-muted">
//                       <p className="text-xs text-muted-foreground">Panels</p>
//                       <p className="font-semibold text-foreground">{pkg.panels}</p>
//                     </div>
//                     <div className="p-2 rounded-lg bg-muted">
//                       <p className="text-xs text-muted-foreground">Warranty</p>
//                       <p className="font-semibold text-foreground">{pkg.warranty}</p>
//                     </div>
//                   </div>
                  
//                   <ul className="space-y-2 text-left mb-6">
//                     {pkg.features.map((feature) => (
//                       <li key={feature} className="flex items-center gap-2 text-sm">
//                         <Check className="w-4 h-4 text-primary flex-shrink-0" />
//                         <span className="text-foreground">{feature}</span>
//                       </li>
//                     ))}
//                   </ul>
                  
//                   <Button 
//                     variant={selectedPackage === pkg.id ? 'default' : 'outline'}
//                     className="w-full"
//                   >
//                     {selectedPackage === pkg.id ? 'Selected' : 'Select Package'}
//                   </Button>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {/* Navigation */}
//           <div className="flex justify-between">
//             <Link to="/summary">
//               <Button variant="ghost">Back to Summary</Button>
//             </Link>
//             <Link to="/customize">
//               <Button disabled={!selectedPackage}>
//                 Customize Package
//                 <ArrowRight className="ml-2 w-4 h-4" />
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Packages;


// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowRight, Check, Star, Loader2, Zap, Cpu, Battery } from 'lucide-react';
// import axios from 'axios';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import Header from '@/components/Header';
// import { useSolarStore } from '@/store/solarStore';
// import { toast } from 'sonner';

// // Static Presets Packages (Aapka original array bilkul intact)
// const presetPackages = [
//   {
//     id: 'basic',
//     name: 'Basic',
//     price: 250000,
//     description: 'Perfect for small households',
//     capacity: '3 kW',
//     panels: '8 Panels',
//     warranty: '10 Years',
//     features: [
//       'Mono-crystalline panels',
//       'Basic inverter',
//       'Standard mounting',
//       'Basic monitoring app',
//       '1-year maintenance',
//     ],
//     popular: false,
//   },
//   {
//     id: 'standard',
//     name: 'Standard',
//     price: 450000,
//     description: 'Ideal for medium-sized homes',
//     capacity: '5 kW',
//     panels: '12 Panels',
//     warranty: '15 Years',
//     features: [
//       'High-efficiency panels',
//       'Hybrid inverter',
//       'Premium mounting',
//       'Smart monitoring app',
//       '3-year maintenance',
//       'Battery ready',
//     ],
//     popular: true,
//   },
//   {
//     id: 'premium',
//     name: 'Premium',
//     price: 750000,
//     description: 'Complete solution for large homes',
//     capacity: '10 kW',
//     panels: '24 Panels',
//     warranty: '25 Years',
//     features: [
//       'Premium bifacial panels',
//       'Advanced hybrid inverter',
//       'Custom mounting solution',
//       'AI-powered monitoring',
//       '5-year maintenance',
//       'Battery included',
//       'EV charger ready',
//     ],
//     popular: false,
//   },
// ];

// interface DBProduct {
//   _id: string;
//   name: string;
//   category: 'panel' | 'inverter' | 'battery' | 'structure';
//   capacity: string;
//   price: number;
//   brand: string;
//   efficiency: string;
//   inStock: boolean;
// }

// const Packages = () => {
//   const { selectedPackage, setSelectedPackage } = useSolarStore();
  
//   // Real database dynamic states
//   const [dbProducts, setDbProducts] = useState<DBProduct[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   // Backend API hit karke products catalog sync karne ka logic
//   useEffect(() => {
//     const fetchDatabaseProducts = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get('http://localhost:5000/api/products');
//         if (response.data && response.data.data) {
//           setDbProducts(response.data.data);
//         }
//       } catch (error: any) {
//         console.error('Error fetching data from server:', error);
//         toast.error('Failed to load dynamic hardware components.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDatabaseProducts();
//   }, []);

//   // Helper icon component base on category
//   const getCategoryIcon = (category: string) => {
//     switch (category) {
//       case 'panel': return <Zap className="w-5 h-5 text-amber-500" />;
//       case 'inverter': return <Cpu className="w-5 h-5 text-blue-500" />;
//       case 'battery': return <Battery className="w-5 h-5 text-emerald-500" />;
//       default: return <Check className="w-5 h-5 text-primary" />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
      
//       <main className="container mx-auto px-4 pt-24 pb-12">
//         <div className="max-w-5xl mx-auto">
//           {/* Progress indicator */}
//           <div className="flex items-center justify-center mb-8">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">✓</div>
//               <div className="w-16 h-1 bg-primary rounded-full" />
//               <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">✓</div>
//               <div className="w-16 h-1 bg-primary rounded-full" />
//               <div className="w-10 h-10 rounded-full solar-gradient flex items-center justify-center text-primary-foreground font-semibold">3</div>
//             </div>
//           </div>

//           <div className="text-center mb-10">
//             <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
//               Choose Your Package
//             </h1>
//             <p className="text-muted-foreground">
//               Select the solar package that best fits your energy needs and budget.
//             </p>
//           </div>

//           {/* Package Cards - (Aapka Pure layout untouched) */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//             {presetPackages.map((pkg) => (
//               <Card 
//                 key={pkg.id}
//                 className={`relative cursor-pointer transition-all duration-300 ${
//                   selectedPackage === pkg.id 
//                     ? 'border-primary ring-2 ring-primary/20' 
//                     : pkg.popular 
//                     ? 'border-primary/50' 
//                     : ''
//                 }`}
//                 onClick={() => setSelectedPackage(pkg.id as 'basic' | 'standard' | 'premium')}
//               >
//                 {pkg.popular && (
//                   <div className="absolute -top-3 left-1/2 -translate-x-1/2">
//                     <div className="px-4 py-1 rounded-full solar-gradient text-xs font-semibold text-primary-foreground flex items-center gap-1">
//                       <Star className="w-3 h-3" />
//                       Most Popular
//                     </div>
//                   </div>
//                 )}
                
//                 <CardHeader className="text-center pb-4">
//                   <CardTitle className="text-2xl">{pkg.name}</CardTitle>
//                   <CardDescription>{pkg.description}</CardDescription>
//                 </CardHeader>
                
//                 <CardContent className="text-center">
//                   <div className="mb-6">
//                     <span className="text-4xl font-bold text-foreground">Rs {pkg.price.toLocaleString()}</span>
//                     <span className="text-muted-foreground">/system</span>
//                   </div>
                  
//                   <div className="grid grid-cols-3 gap-2 mb-6">
//                     <div className="p-2 rounded-lg bg-muted">
//                       <p className="text-xs text-muted-foreground">Capacity</p>
//                       <p className="font-semibold text-foreground">{pkg.capacity}</p>
//                     </div>
//                     <div className="p-2 rounded-lg bg-muted">
//                       <p className="text-xs text-muted-foreground">Panels</p>
//                       <p className="font-semibold text-foreground">{pkg.panels}</p>
//                     </div>
//                     <div className="p-2 rounded-lg bg-muted">
//                       <p className="text-xs text-muted-foreground">Warranty</p>
//                       <p className="font-semibold text-foreground">{pkg.warranty}</p>
//                     </div>
//                   </div>
                  
//                   <ul className="space-y-2 text-left mb-6">
//                     {pkg.features.map((feature) => (
//                       <li key={feature} className="flex items-center gap-2 text-sm">
//                         <Check className="w-4 h-4 text-primary flex-shrink-0" />
//                         <span className="text-foreground">{feature}</span>
//                       </li>
//                     ))}
//                   </ul>
                  
//                   <Button 
//                     variant={selectedPackage === pkg.id ? 'default' : 'outline'}
//                     className="w-full"
//                   >
//                     {selectedPackage === pkg.id ? 'Selected' : 'Select Package'}
//                   </Button>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>

//           {/* New Section: Dynamic Hardware Inventory Catalog from Backend */}
//           <div className="mt-16 mb-12 border-t border-border pt-10">
//             <div className="mb-6">
//               <h2 className="text-2xl font-bold text-foreground">Available System Hardware Components</h2>
//               <p className="text-sm text-muted-foreground">Real-time inventory directly verified from database.</p>
//             </div>

//             {loading ? (
//               <div className="flex flex-col items-center justify-center py-12 gap-3">
//                 <Loader2 className="w-8 h-8 text-primary animate-spin" />
//                 <p className="text-sm text-muted-foreground">Fetching components database details...</p>
//               </div>
//             ) : dbProducts.length === 0 ? (
//               <div className="text-center p-8 bg-muted rounded-xl">
//                 <p className="text-muted-foreground">No custom individual components loaded. Please check seed files.</p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {dbProducts.map((product) => (
//                   <div key={product._id} className="p-4 rounded-xl border border-border bg-card hover:shadow-md transition-all flex items-start gap-3">
//                     <div className="p-2 rounded-lg bg-muted">
//                       {getCategoryIcon(product.category)}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <h4 className="font-semibold text-sm text-foreground truncate">{product.name}</h4>
//                       <p className="text-xs text-muted-foreground mb-1">Brand: {product.brand} | Cap: {product.capacity}</p>
//                       <div className="flex items-center justify-between mt-2">
//                         <span className="text-sm font-bold text-primary">Rs {product.price.toLocaleString()}</span>
//                         <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${product.inStock ? 'bg-emerald-500/10 text-emerald-600' : 'bg-destructive/10 text-destructive'}`}>
//                           {product.inStock ? 'In Stock' : 'Out of Stock'}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Navigation */}
//           <div className="flex justify-between mt-8">
//             <Link to="/summary">
//               <Button variant="ghost">Back to Summary</Button>
//             </Link>
//             <Link to="/customize">
//               <Button disabled={!selectedPackage}>
//                 Customize Package
//                 <ArrowRight className="ml-2 w-4 h-4" />
//               </Button>
//             </Link>
//           </div>
//         </div>
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Star, Loader2, Sparkles, Zap, Cpu, Battery, ShieldAlert } from 'lucide-react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Header from '@/components/Header';
import { useSolarStore, ChosenSpecs } from '@/store/solarStore';
import { toast } from 'sonner';

interface DBContext {
  _id: string;
  minLoadKW: number;
  maxLoadKW: number;
  standardPackageType: string;
  recommendedSystemSizeKW: number;
  panelsCount: number;
  panelSpecs: string;
  batteryCount: number;
  batterySpecs: string;
  estimatedCostPKR: number;
}

interface RAGRecommendation {
  recommendedPackage: string;
  systemSizeKW: number;
  panelQty: number;
  panelType: string;
  batteryQty: number;
  estimatedPricePKR: number;
  aiJustification: string;
}

const Packages = () => {
  const { selectedPackage, setSelectedPackage, setChosenSpecs, getTotalLoad } = useSolarStore();
  
  const [packages, setPackages] = useState<DBContext[]>([]);
  const [recommendation, setRecommendation] = useState<RAGRecommendation | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const rawLoadWatts = getTotalLoad();
  const calculatedLoadKW = rawLoadWatts > 0 ? rawLoadWatts / 1000 : 3.2; // Fallback to 3.2 kW standard if calculator is empty

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. Fetch all packages baselines from database
        const contextsRes = await axios.get('http://localhost:5000/api/calculator/contexts');
        let dbPackages: DBContext[] = [];
        if (contextsRes.data && contextsRes.data.data) {
          // Select representatives for Basic (3kW), Standard (5kW), and Premium (10kW)
          const allData: DBContext[] = contextsRes.data.data;
          const basic = allData.find(c => c.standardPackageType === 'Basic' && c.recommendedSystemSizeKW === 3) || allData.find(c => c.standardPackageType === 'Basic');
          const standard = allData.find(c => c.standardPackageType === 'Standard' && c.recommendedSystemSizeKW === 5) || allData.find(c => c.standardPackageType === 'Standard');
          const premium = allData.find(c => c.standardPackageType === 'Premium' && c.recommendedSystemSizeKW === 10) || allData.find(c => c.standardPackageType === 'Premium');
          
          if (basic) dbPackages.push(basic);
          if (standard) dbPackages.push(standard);
          if (premium) dbPackages.push(premium);
          
          setPackages(dbPackages);
        }

        // 2. Fetch AI Custom Orchestrated Recommendation
        const predictRes = await axios.post('http://localhost:5000/api/calculator/predict-llm', {
          calculatedLoadKW
        });
        
        if (predictRes.data && predictRes.data.recommendation) {
          const rec: RAGRecommendation = predictRes.data.recommendation;
          setRecommendation(rec);
          
          // Pre-select the AI recommended package and save its specifications
          if (rec.recommendedPackage) {
            const pkgId = rec.recommendedPackage.toLowerCase() as 'basic' | 'standard' | 'premium';
            setSelectedPackage(pkgId);
            
            // Find matched specs in database packages or fallback to AI specs
            const matchedDb = dbPackages.find(p => p.standardPackageType.toLowerCase() === pkgId);
            const specs: ChosenSpecs = {
              recommendedPackage: rec.recommendedPackage,
              systemSizeKW: rec.systemSizeKW || matchedDb?.recommendedSystemSizeKW || 5,
              panelQty: rec.panelQty || matchedDb?.panelsCount || 12,
              panelType: rec.panelType || matchedDb?.panelSpecs || '450W panels',
              batteryQty: rec.batteryQty !== undefined ? rec.batteryQty : (matchedDb?.batteryCount || 4),
              estimatedPricePKR: rec.estimatedPricePKR || matchedDb?.estimatedCostPKR || 560200
            };
            setChosenSpecs(specs);
          }
        }
      } catch (err: any) {
        console.error('Error connecting to backend RAG systems:', err);
        setError('Backend server ya MongoDB connected nahi hai. Please ensure backend is running.');
        toast.error('AI Packages data load nahi ho saka.');
        
        // Fallback structures so flow doesn't break
        setSelectedPackage('standard');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [calculatedLoadKW, setSelectedPackage, setChosenSpecs]);

  const handleSelectPackage = (pkg: DBContext) => {
    const pkgId = pkg.standardPackageType.toLowerCase() as 'basic' | 'standard' | 'premium';
    setSelectedPackage(pkgId);
    
    // Save selected specifications to Zustand store
    const specs: ChosenSpecs = {
      recommendedPackage: pkg.standardPackageType,
      systemSizeKW: pkg.recommendedSystemSizeKW,
      panelQty: pkg.panelsCount,
      panelType: pkg.panelSpecs,
      batteryQty: pkg.batteryCount,
      estimatedPricePKR: pkg.estimatedCostPKR
    };
    setChosenSpecs(specs);
    toast.success(`${pkg.standardPackageType} Package successfully selected!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="container mx-auto px-4 flex-1 flex flex-col items-center justify-center pt-24 pb-12">
          <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl border border-primary/20 bg-card/60 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
            
            <div className="relative flex justify-center">
              <div className="relative">
                <Loader2 className="w-16 h-16 text-primary animate-spin" />
                <Sparkles className="w-6 h-6 text-amber-500 absolute top-0 right-0 animate-bounce" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">SolarIQ AI Recommendation</h2>
              <p className="text-muted-foreground text-sm">
                MongoDB baselines analyze kar rahe hain aur Mistral AI RAG recommendations fetch kar rahe hain...
              </p>
            </div>
            
            <div className="w-full bg-muted h-1 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-amber-500 h-full rounded-full animate-pulse w-full" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || packages.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div className="max-w-md mx-auto text-center p-8 border border-destructive/20 bg-card rounded-2xl shadow-xl space-y-4">
            <ShieldAlert className="w-12 h-12 text-destructive mx-auto" />
            <h2 className="text-xl font-bold text-destructive">System Offline</h2>
            <p className="text-muted-foreground text-sm">
              Mongoose database baselines load nahi ho sakin. Please backend check karein aur ensure karein it is running.
            </p>
            <Button onClick={() => window.location.reload()} className="w-full">
              Retry Connecting
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-all duration-300">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-5xl mx-auto space-y-10">
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">✓</div>
              <div className="w-16 h-1 bg-primary rounded-full" />
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">✓</div>
              <div className="w-16 h-1 bg-primary rounded-full" />
              <div className="w-10 h-10 rounded-full solar-gradient flex items-center justify-center text-primary-foreground font-semibold">3</div>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              Generative RAG Engine Active
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground bg-gradient-to-r from-foreground via-primary to-amber-500 bg-clip-text text-transparent">
              Choose Your Solar Package
            </h1>
            <p className="text-muted-foreground text-base max-w-xl mx-auto">
              Sourced directly from MongoDB Pakistani standards, customized for your active daily load of <span className="font-bold text-foreground">{calculatedLoadKW.toFixed(2)} kW</span>.
            </p>
          </div>

          {/* Dynamic 3-Column Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {packages.map((pkg) => {
              const isAiRecommended = recommendation && recommendation.recommendedPackage.toLowerCase() === pkg.standardPackageType.toLowerCase();
              const isSelected = selectedPackage === pkg.standardPackageType.toLowerCase();

              return (
                <Card 
                  key={pkg._id}
                  onClick={() => handleSelectPackage(pkg)}
                  className={`relative cursor-pointer transition-all duration-300 flex flex-col h-full rounded-3xl overflow-hidden hover:scale-[1.02] ${
                    isSelected 
                      ? 'border-primary ring-2 ring-primary/20 bg-gradient-to-b from-primary/5 via-card to-card shadow-xl' 
                      : isAiRecommended 
                      ? 'border-primary/50 bg-primary/5' 
                      : 'border-border'
                  }`}
                >
                  {isAiRecommended && (
                    <div className="absolute top-0 right-0">
                      <div className="px-3 py-1 bg-gradient-to-r from-amber-500 to-primary text-[9px] font-black tracking-widest text-primary-foreground uppercase rounded-bl-xl flex items-center gap-0.5">
                        <Star className="w-2.5 h-2.5 fill-primary-foreground" />
                        AI Choice
                      </div>
                    </div>
                  )}

                  <CardHeader className="pb-4 space-y-1">
                    <CardTitle className="text-2xl font-extrabold flex items-center gap-2">
                      {pkg.standardPackageType}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {pkg.standardPackageType === 'Basic' 
                        ? 'Perfect for small households' 
                        : pkg.standardPackageType === 'Standard' 
                        ? 'Ideal for medium-sized homes' 
                        : 'Complete solution for large homes'}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6 flex-1 flex flex-col justify-between">
                    <div className="p-4 rounded-2xl bg-muted border border-border/80">
                      <span className="text-3xl font-black tracking-tight text-foreground">
                        Rs {pkg.estimatedCostPKR.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground text-xs ml-1">/ PKR</span>
                    </div>

                    {/* Specs List */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-2 rounded-xl bg-muted/40 border text-center">
                        <Zap className="w-4 h-4 mx-auto mb-0.5 text-amber-500" />
                        <p className="text-[9px] text-muted-foreground font-semibold">Capacity</p>
                        <p className="font-bold text-xs">{pkg.recommendedSystemSizeKW} kW</p>
                      </div>
                      <div className="p-2 rounded-xl bg-muted/40 border text-center">
                        <Cpu className="w-4 h-4 mx-auto mb-0.5 text-blue-500" />
                        <p className="text-[9px] text-muted-foreground font-semibold">Panels</p>
                        <p className="font-bold text-xs">{pkg.panelsCount} Pcs</p>
                      </div>
                      <div className="p-2 rounded-xl bg-muted/40 border text-center">
                        <Battery className="w-4 h-4 mx-auto mb-0.5 text-emerald-500" />
                        <p className="text-[9px] text-muted-foreground font-semibold">Batteries</p>
                        <p className="font-bold text-xs">{pkg.batteryCount} Pcs</p>
                      </div>
                    </div>

                    <ul className="space-y-2 flex-1 pt-2">
                      <li className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span className="font-sans">Panels: {pkg.panelSpecs}</span>
                      </li>
                      <li className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span className="font-sans">Batteries: {pkg.batteryCount > 0 ? `${pkg.batteryCount}x ${pkg.batterySpecs}` : "No Battery"}</span>
                      </li>
                      <li className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                        <span>Professional Structure & Mounting</span>
                      </li>
                    </ul>

                    {/* AI Speech Bubble inside Recommended Card */}
                    {isAiRecommended && recommendation && (
                      <div className="pt-3 mt-3 border-t border-primary/10">
                        <div className="p-3 rounded-xl bg-primary/10 border border-primary/10 relative text-left">
                          <p className="text-[9px] font-bold text-primary uppercase mb-0.5 flex items-center gap-0.5">
                            <Sparkles className="w-2.5 h-2.5" /> Advisor Note:
                          </p>
                          <p className="text-[11px] leading-snug text-foreground/90 italic font-medium">
                            "{recommendation.aiJustification}"
                          </p>
                        </div>
                      </div>
                    )}

                    <Button 
                      variant={isSelected ? 'default' : 'outline'}
                      className={`w-full mt-4 font-bold py-4 rounded-xl shadow-sm transition-all duration-300 ${
                        isSelected 
                          ? 'solar-gradient border-0 text-primary-foreground hover:opacity-95' 
                          : 'hover:bg-primary/5'
                      }`}
                    >
                      {isSelected ? 'Selected' : 'Select Package'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-10 pt-6 border-t border-border/80">
            <Link to="/summary">
              <Button variant="ghost" className="font-bold hover:bg-muted text-foreground">
                Back to Summary
              </Button>
            </Link>
            <Link to="/installers">
              <Button disabled={!selectedPackage} className="solar-gradient text-primary-foreground font-bold px-6 py-5 shadow-lg shadow-primary/20 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98] transition-all">
                Select Installer & Continue
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Packages;