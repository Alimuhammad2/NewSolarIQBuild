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
//       </main>
//     </div>
//   );
// };

// export default Packages;


import { Link } from 'react-router-dom';
import { ArrowRight, Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Header from '@/components/Header';
import { useSolarStore } from '@/store/solarStore';

const packages = [
  {
    id: 'basic',
    name: 'Basic',
    price: 250000,
    description: 'Perfect for small households',
    capacity: '3 kW',
    panels: '8 Panels',
    warranty: '10 Years',
    features: [
      'Mono-crystalline panels',
      'Basic inverter',
      'Standard mounting',
      'Basic monitoring app',
      '1-year maintenance',
    ],
    popular: false,
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 450000,
    description: 'Ideal for medium-sized homes',
    capacity: '5 kW',
    panels: '12 Panels',
    warranty: '15 Years',
    features: [
      'High-efficiency panels',
      'Hybrid inverter',
      'Premium mounting',
      'Smart monitoring app',
      '3-year maintenance',
      'Battery ready',
    ],
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 750000,
    description: 'Complete solution for large homes',
    capacity: '10 kW',
    panels: '24 Panels',
    warranty: '25 Years',
    features: [
      'Premium bifacial panels',
      'Advanced hybrid inverter',
      'Custom mounting solution',
      'AI-powered monitoring',
      '5-year maintenance',
      'Battery included',
      'EV charger ready',
    ],
    popular: false,
  },
];

const Packages = () => {
  const { selectedPackage, setSelectedPackage } = useSolarStore();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-5xl mx-auto">
          {/* Progress indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">✓</div>
              <div className="w-16 h-1 bg-primary rounded-full" />
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">✓</div>
              <div className="w-16 h-1 bg-primary rounded-full" />
              <div className="w-10 h-10 rounded-full solar-gradient flex items-center justify-center text-primary-foreground font-semibold">3</div>
            </div>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Choose Your Package
            </h1>
            <p className="text-muted-foreground">
              Select the solar package that best fits your energy needs and budget.
            </p>
          </div>

          {/* Package Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {packages.map((pkg) => (
              <Card 
                key={pkg.id}
                className={`relative cursor-pointer transition-all duration-300 ${
                  selectedPackage === pkg.id 
                    ? 'border-primary ring-2 ring-primary/20' 
                    : pkg.popular 
                    ? 'border-primary/50' 
                    : ''
                }`}
                onClick={() => setSelectedPackage(pkg.id as 'basic' | 'standard' | 'premium')}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="px-4 py-1 rounded-full solar-gradient text-xs font-semibold text-primary-foreground flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <CardDescription>{pkg.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="text-center">
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-foreground">Rs {pkg.price.toLocaleString()}</span>
                    <span className="text-muted-foreground">/system</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    <div className="p-2 rounded-lg bg-muted">
                      <p className="text-xs text-muted-foreground">Capacity</p>
                      <p className="font-semibold text-foreground">{pkg.capacity}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-muted">
                      <p className="text-xs text-muted-foreground">Panels</p>
                      <p className="font-semibold text-foreground">{pkg.panels}</p>
                    </div>
                    <div className="p-2 rounded-lg bg-muted">
                      <p className="text-xs text-muted-foreground">Warranty</p>
                      <p className="font-semibold text-foreground">{pkg.warranty}</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 text-left mb-6">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    variant={selectedPackage === pkg.id ? 'default' : 'outline'}
                    className="w-full"
                  >
                    {selectedPackage === pkg.id ? 'Selected' : 'Select Package'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="/summary">
              <Button variant="ghost">Back to Summary</Button>
            </Link>
            <Link to="/customize">
              <Button disabled={!selectedPackage}>
                Customize Package
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