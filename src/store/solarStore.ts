import { create } from 'zustand';

export interface Device {
  id: string;
  name: string;
  watts: number;
  icon: string;
  quantity: number;
}

export interface PanelOption {
  id: string;
  name: string;
  watts: number;
  price: number;
  efficiency: string;
}

export interface InverterOption {
  id: string;
  name: string;
  capacity: string;
  price: number;
  type: string;
}

export interface Installer {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  verified: boolean;
  avatar: string;
}

interface SolarState {
  devices: Device[];
  selectedPackage: 'basic' | 'standard' | 'premium' | null;
  selectedPanel: PanelOption | null;
  selectedInverter: InverterOption | null;
  selectedInstaller: Installer | null;
  userInfo: {
    name: string;
    city: string;
    phone: string;
  };
  updateDeviceQuantity: (id: string, quantity: number) => void;
  setSelectedPackage: (pkg: 'basic' | 'standard' | 'premium') => void;
  setSelectedPanel: (panel: PanelOption) => void;
  setSelectedInverter: (inverter: InverterOption) => void;
  setSelectedInstaller: (installer: Installer) => void;
  setUserInfo: (info: { name: string; city: string; phone: string }) => void;
  getTotalLoad: () => number;
}

const defaultDevices: Device[] = [
  { id: '1', name: 'LED Lights', watts: 10, icon: 'Lightbulb', quantity: 0 },
  { id: '2', name: 'Ceiling Fan', watts: 75, icon: 'Fan', quantity: 0 },
  { id: '3', name: 'Air Conditioner', watts: 1500, icon: 'Snowflake', quantity: 0 },
  { id: '4', name: 'Refrigerator', watts: 150, icon: 'Refrigerator', quantity: 0 },
  { id: '5', name: 'Television', watts: 100, icon: 'Tv', quantity: 0 },
  { id: '6', name: 'Washing Machine', watts: 500, icon: 'WashingMachine', quantity: 0 },
  { id: '7', name: 'Computer/Laptop', watts: 200, icon: 'Laptop', quantity: 0 },
  { id: '8', name: 'Water Pump', watts: 750, icon: 'Droplets', quantity: 0 },
];

export const useSolarStore = create<SolarState>((set, get) => ({
  devices: defaultDevices,
  selectedPackage: null,
  selectedPanel: null,
  selectedInverter: null,
  selectedInstaller: null,
  userInfo: { name: '', city: '', phone: '' },

  updateDeviceQuantity: (id, quantity) =>
    set((state) => ({
      devices: state.devices.map((d) =>
        d.id === id ? { ...d, quantity: Math.max(0, quantity) } : d
      ),
    })),

  setSelectedPackage: (pkg) => set({ selectedPackage: pkg }),
  setSelectedPanel: (panel) => set({ selectedPanel: panel }),
  setSelectedInverter: (inverter) => set({ selectedInverter: inverter }),
  setSelectedInstaller: (installer) => set({ selectedInstaller: installer }),
  setUserInfo: (info) => set({ userInfo: info }),

  getTotalLoad: () =>
    get().devices.reduce((total, device) => total + device.watts * device.quantity, 0),
}));
