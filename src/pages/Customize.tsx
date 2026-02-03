import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import { useSolarStore, PanelOption, InverterOption } from '@/store/solarStore';

const panelOptions: PanelOption[] = [
  { id: 'p1', name: 'Standard Mono', watts: 400, price: 150, efficiency: '20%' },
  { id: 'p2', name: 'High-Efficiency', watts: 450, price: 200, efficiency: '22%' },
  { id: 'p3', name: 'Premium Bifacial', watts: 500, price: 280, efficiency: '24%' },
];

const inverterOptions: InverterOption[] = [
  { id: 'i1', name: 'Basic Grid-Tie', capacity: '5 kW', price: 800, type: 'On-Grid' },
  { id: 'i2', name: 'Hybrid Inverter', capacity: '5 kW', price: 1200, type: 'Hybrid' },
  { id: 'i3', name: 'Premium Hybrid', capacity: '10 kW', price: 2000, type: 'Hybrid+' },
];

const Customize = () => {
  const { selectedPackage, selectedPanel, selectedInverter, setSelectedPanel, setSelectedInverter } = useSolarStore();
  const [panelCount, setPanelCount] = useState(12);

  const basePrice = selectedPackage === 'basic' ? 2500 : selectedPackage === 'standard' ? 4500 : 8000;

  const totalPrice = useMemo(() => {
    let price = basePrice;
    if (selectedPanel) {
      price += (selectedPanel.price - 150) * panelCount; // Adjust from base panel price
    }
    if (selectedInverter) {
      price += selectedInverter.price - 800; // Adjust from base inverter price
    }
    return price;
  }, [basePrice, selectedPanel, selectedInverter, panelCount]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Customize Your System
            </h1>
            <p className="text-muted-foreground">
              Upgrade your components for better performance and savings.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Configuration Panel */}
            <div className="lg:col-span-2 space-y-6">
              {/* Panel Options */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Solar Panels</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {panelOptions.map((panel) => (
                    <div
                      key={panel.id}
                      onClick={() => setSelectedPanel(panel)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        selectedPanel?.id === panel.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            selectedPanel?.id === panel.id ? 'solar-gradient' : 'bg-muted'
                          }`}>
                            {selectedPanel?.id === panel.id && <Check className="w-5 h-5 text-primary-foreground" />}
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{panel.name}</h4>
                            <p className="text-sm text-muted-foreground">{panel.watts}W • {panel.efficiency} efficiency</p>
                          </div>
                        </div>
                        <span className="font-bold text-foreground">${panel.price}/panel</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Inverter Options */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Inverter</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {inverterOptions.map((inverter) => (
                    <div
                      key={inverter.id}
                      onClick={() => setSelectedInverter(inverter)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        selectedInverter?.id === inverter.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            selectedInverter?.id === inverter.id ? 'solar-gradient' : 'bg-muted'
                          }`}>
                            {selectedInverter?.id === inverter.id && <Check className="w-5 h-5 text-primary-foreground" />}
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground">{inverter.name}</h4>
                            <p className="text-sm text-muted-foreground">{inverter.capacity} • {inverter.type}</p>
                          </div>
                        </div>
                        <span className="font-bold text-foreground">${inverter.price}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Panel Count */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Number of Panels</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="4"
                      max="30"
                      value={panelCount}
                      onChange={(e) => setPanelCount(Number(e.target.value))}
                      className="flex-1 h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                    />
                    <span className="w-16 text-center font-bold text-foreground text-xl">{panelCount}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Estimated capacity: {((selectedPanel?.watts || 400) * panelCount / 1000).toFixed(1)} kW
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Price Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 border-primary/30">
                <CardHeader>
                  <CardTitle className="text-lg">Price Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Base Package ({selectedPackage || 'Standard'})</span>
                      <span className="text-foreground">${basePrice.toLocaleString()}</span>
                    </div>
                    
                    {selectedPanel && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Panel Upgrade</span>
                        <span className="text-foreground">+${((selectedPanel.price - 150) * panelCount).toLocaleString()}</span>
                      </div>
                    )}
                    
                    {selectedInverter && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Inverter Upgrade</span>
                        <span className="text-foreground">+${(selectedInverter.price - 800).toLocaleString()}</span>
                      </div>
                    )}
                    
                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between">
                        <span className="font-semibold text-foreground">Total Price</span>
                        <span className="text-2xl font-bold text-gradient">${totalPrice.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="pt-4">
                      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                        <p className="text-sm text-foreground font-medium">Estimated Monthly Savings</p>
                        <p className="text-xl font-bold text-primary">${Math.round(totalPrice * 0.02)}/month</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Link to="/packages">
              <Button variant="ghost">Back to Packages</Button>
            </Link>
            <Link to="/installers">
              <Button>
                Find Installers
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Customize;
