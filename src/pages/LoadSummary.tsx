import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Sun, Battery } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import { useSolarStore } from '@/store/solarStore';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const COLORS = ['#f59e0b', '#1e3a8a', '#0ea5e9', '#10b981', '#8b5cf6', '#f43f5e', '#06b6d4', '#84cc16'];

const LoadSummary = () => {
  const { devices, getTotalLoad } = useSolarStore();
  const totalLoad = getTotalLoad();
  
  const activeDevices = devices.filter(d => d.quantity > 0);
  
  const pieData = activeDevices.map(d => ({
    name: d.name,
    value: d.watts * d.quantity,
  }));

  const barData = activeDevices.map(d => ({
    name: d.name.split(' ')[0],
    watts: d.watts * d.quantity,
  }));

  const dailyKwh = (totalLoad * 8) / 1000;
  const monthlyKwh = dailyKwh * 30;
  const recommendedSystem = totalLoad < 1000 ? 1 : totalLoad < 3000 ? 3 : totalLoad < 5000 ? 5 : 10;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Progress indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">✓</div>
              <div className="w-16 h-1 bg-primary rounded-full" />
              <div className="w-10 h-10 rounded-full solar-gradient flex items-center justify-center text-primary-foreground font-semibold">2</div>
              <div className="w-16 h-1 bg-muted rounded-full" />
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-semibold">3</div>
            </div>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Your Load Summary
            </h1>
            <p className="text-muted-foreground">
              Here's a detailed breakdown of your energy consumption.
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="border-primary/30">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-xl solar-gradient flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-primary-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">Total Load</p>
                <p className="text-2xl font-bold text-foreground">{totalLoad.toLocaleString()} W</p>
              </CardContent>
            </Card>
            
            <Card className="border-accent/30">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mx-auto mb-3">
                  <Battery className="w-6 h-6 text-accent-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">Monthly Usage</p>
                <p className="text-2xl font-bold text-foreground">{monthlyKwh.toFixed(0)} kWh</p>
              </CardContent>
            </Card>
            
            <Card className="border-secondary/30">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-3">
                  <Sun className="w-6 h-6 text-secondary-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mb-1">Recommended System</p>
                <p className="text-2xl font-bold text-foreground">{recommendedSystem} kW</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Load Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                {pieData.length > 0 ? (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {pieData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => [`${value}W`, 'Load']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    No devices selected
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Power by Device</CardTitle>
              </CardHeader>
              <CardContent>
                {barData.length > 0 ? (
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barData} layout="vertical">
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={80} />
                        <Tooltip formatter={(value: number) => [`${value}W`, 'Load']} />
                        <Bar dataKey="watts" fill="hsl(38, 92%, 50%)" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    No devices selected
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Device List */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">Selected Devices</CardTitle>
            </CardHeader>
            <CardContent>
              {activeDevices.length > 0 ? (
                <div className="space-y-3">
                  {activeDevices.map((device, index) => (
                    <div key={device.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                        <span className="font-medium text-foreground">{device.name}</span>
                        <span className="text-sm text-muted-foreground">× {device.quantity}</span>
                      </div>
                      <span className="font-semibold text-foreground">{(device.watts * device.quantity).toLocaleString()} W</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-4">No devices selected yet.</p>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Link to="/calculator">
              <Button variant="ghost">Edit Devices</Button>
            </Link>
            <Link to="/packages">
              <Button disabled={totalLoad === 0}>
                View Packages
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoadSummary;
