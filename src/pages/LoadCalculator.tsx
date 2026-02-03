import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, ArrowRight, Lightbulb, Fan, Snowflake, Tv, Laptop, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import { useSolarStore } from '@/store/solarStore';

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Lightbulb,
  Fan,
  Snowflake,
  Tv,
  Laptop,
  Droplets,
  Refrigerator: Snowflake,
  WashingMachine: Droplets,
};

const LoadCalculator = () => {
  const { devices, updateDeviceQuantity, getTotalLoad } = useSolarStore();
  const totalLoad = getTotalLoad();

  const getIcon = (iconName: string) => {
    const Icon = iconMap[iconName] || Lightbulb;
    return Icon;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-3xl mx-auto">
          {/* Progress indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full solar-gradient flex items-center justify-center text-primary-foreground font-semibold">1</div>
              <div className="w-16 h-1 bg-primary rounded-full" />
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-semibold">2</div>
              <div className="w-16 h-1 bg-muted rounded-full" />
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-semibold">3</div>
            </div>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Calculate Your Load
            </h1>
            <p className="text-muted-foreground">
              Select your appliances and quantities to calculate your daily energy consumption.
            </p>
          </div>

          {/* Device Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {devices.map((device) => {
              const Icon = getIcon(device.icon);
              return (
                <Card key={device.id} className={`transition-all duration-300 ${device.quantity > 0 ? 'border-primary/50 bg-primary/5' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${device.quantity > 0 ? 'solar-gradient' : 'bg-muted'}`}>
                          <Icon className={`w-6 h-6 ${device.quantity > 0 ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{device.name}</h3>
                          <p className="text-sm text-muted-foreground">{device.watts}W</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 rounded-lg"
                          onClick={() => updateDeviceQuantity(device.id, device.quantity - 1)}
                          disabled={device.quantity === 0}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center font-semibold text-foreground">{device.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 rounded-lg"
                          onClick={() => updateDeviceQuantity(device.id, device.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Total Load Card */}
          <Card className="mb-8 border-primary/30 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Daily Load</p>
                  <p className="text-3xl font-bold text-foreground">{totalLoad.toLocaleString()} W</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">Monthly Consumption</p>
                  <p className="text-xl font-semibold text-primary">{((totalLoad * 8) / 1000 * 30).toFixed(0)} kWh</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="/">
              <Button variant="ghost">Back to Home</Button>
            </Link>
            <Link to="/summary">
              <Button disabled={totalLoad === 0}>
                View Summary
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoadCalculator;
