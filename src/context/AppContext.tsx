import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'English' | 'Hindi' | 'Odia';
export type ViewType = 
  | 'dashboard' 
  | 'twin' 
  | 'disease' 
  | 'maps' 
  | 'planner' 
  | 'impact' 
  | 'admin' 
  | 'architecture' 
  | 'voice'
  | 'insights'
  | 'weather'
  | 'schemes'
  | 'reports'
  | 'settings'
  | 'notifications'
  | 'profile';

export interface UserProfile {
  name: string;
  phone: string;
  cropType: string;
  farmSize: string;
  growthStage: string;
  location: string;
  district: string;
  language: Language;
}

export interface SensorData {
  moisture: number;
  temperature: number;
  humidity: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  waterLevel: number;
  healthScore: number;
}

export interface DiseaseRecord {
  id: string;
  date: string;
  crop: string;
  diseaseName: string;
  confidence: number;
  cause: string;
  treatment: string;
  prevention: string;
  weatherImpact: string;
  imageUrl: string;
}

export interface AppNotification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'info' | 'warning' | 'alert' | 'success';
  read: boolean;
}

interface AppContextType {
  user: UserProfile | null;
  activeView: ViewType;
  sensors: SensorData;
  notifications: AppNotification[];
  diseaseHistory: DiseaseRecord[];
  pubSubActive: boolean;
  waterSaved: number;
  electricitySaved: number;
  yieldImprovement: number;
  carbonReduction: number;
  darkMode: boolean;
  toggleDarkMode: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  login: (name: string, phone: string, demo?: boolean) => void;
  logout: () => void;
  setActiveView: (view: ViewType) => void;
  setLanguage: (lang: Language) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  setPubSubActive: (active: boolean) => void;
  triggerNotification: (title: string, description: string, type: AppNotification['type']) => void;
  addDiseaseRecord: (record: Omit<DiseaseRecord, 'id' | 'date'>) => void;
  resetSimulationData: () => void;
  incrementSavings: (water: number, electricity: number) => void;
}

const defaultUser: UserProfile = {
  name: 'Ramesh Patel',
  phone: '+91 98765 43210',
  cropType: 'Rice (Basmati)',
  farmSize: '4.5 Acres',
  growthStage: 'Vegetative Stage',
  location: 'Bhadrak, Odisha',
  district: 'Bhadrak',
  language: 'English'
};

const initialSensors: SensorData = {
  moisture: 38,
  temperature: 31,
  humidity: 72,
  nitrogen: 128,
  phosphorus: 42,
  potassium: 195,
  waterLevel: 65,
  healthScore: 82
};

const initialNotifications: AppNotification[] = [
  {
    id: '1',
    title: 'Rain Alert',
    description: 'Moderate rain (8mm) predicted in Bhadrak region tomorrow afternoon. Adjust your sprinkler schedule.',
    time: '2 hours ago',
    type: 'info',
    read: false
  },
  {
    id: '2',
    title: 'High Disease Outbreak Risk',
    description: 'Yellow Rust alert issued for nearby farms within a 15km radius. Keep monitoring leaf color.',
    time: '4 hours ago',
    type: 'alert',
    read: false
  },
  {
    id: '3',
    title: 'Smart Irrigation Completed',
    description: 'Saved 2,400 Liters of water today by cutting off pump 30 minutes early based on soil humidity thresholds.',
    time: '1 day ago',
    type: 'success',
    read: true
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const stored = localStorage.getItem('kisan_user');
    return stored ? JSON.parse(stored) : null;
  });

  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  
  const [sensors, setSensors] = useState<SensorData>(() => {
    const stored = localStorage.getItem('kisan_sensors');
    return stored ? JSON.parse(stored) : initialSensors;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const stored = localStorage.getItem('kisan_notifications');
    return stored ? JSON.parse(stored) : initialNotifications;
  });

  const [diseaseHistory, setDiseaseHistory] = useState<DiseaseRecord[]>(() => {
    const stored = localStorage.getItem('kisan_diseases');
    return stored ? JSON.parse(stored) : [];
  });

  const [pubSubActive, setPubSubActive] = useState<boolean>(true);

  // Cumulative savings
  const [waterSaved, setWaterSaved] = useState<number>(34200); // in Liters
  const [electricitySaved, setElectricitySaved] = useState<number>(245); // in kWh
  const [yieldImprovement, setYieldImprovement] = useState<number>(14); // in %
  const [carbonReduction, setCarbonReduction] = useState<number>(185); // in kg CO2

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem('kisan_dark_mode');
    return stored ? stored === 'true' : true;
  });
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem('kisan_dark_mode', String(next));
      return next;
    });
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [darkMode]);

  // Save changes to localStorage
  useEffect(() => {
    if (user) localStorage.setItem('kisan_user', JSON.stringify(user));
    else localStorage.removeItem('kisan_user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('kisan_sensors', JSON.stringify(sensors));
  }, [sensors]);

  useEffect(() => {
    localStorage.setItem('kisan_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('kisan_diseases', JSON.stringify(diseaseHistory));
  }, [diseaseHistory]);

  // Simulate Pub/Sub Live Stream
  useEffect(() => {
    if (!pubSubActive) return;

    const interval = setInterval(() => {
      setSensors((prev) => {
        // Subtle random fluctuations
        const moistureDelta = (Math.random() - 0.5) * 1.5;
        const tempDelta = (Math.random() - 0.5) * 0.8;
        const humidityDelta = (Math.random() - 0.5) * 2;
        const waterDelta = (Math.random() - 0.5) * 1.2;

        const newMoisture = Math.max(15, Math.min(95, Math.round(prev.moisture + moistureDelta)));
        const newTemp = Math.max(18, Math.min(48, Math.round((prev.temperature + tempDelta) * 10) / 10));
        const newHumidity = Math.max(30, Math.min(99, Math.round(prev.humidity + humidityDelta)));
        const newWaterLevel = Math.max(0, Math.min(100, Math.round(prev.waterLevel + waterDelta)));

        // Calculate health score dynamically
        let penalty = 0;
        if (newMoisture < 30) penalty += (30 - newMoisture) * 1.2;
        if (newMoisture > 75) penalty += (newMoisture - 75) * 0.8;
        if (newTemp > 38) penalty += (newTemp - 38) * 1.5;
        if (newTemp < 22) penalty += (22 - newTemp) * 1.0;

        const newHealth = Math.max(40, Math.min(100, Math.round(92 - penalty)));

        return {
          ...prev,
          moisture: newMoisture,
          temperature: newTemp,
          humidity: newHumidity,
          waterLevel: newWaterLevel,
          healthScore: newHealth
        };
      });

      // Slowly accumulate savings during simulation
      setWaterSaved((w) => w + Math.round(Math.random() * 5));
      setElectricitySaved((e) => Number((e + Math.random() * 0.05).toFixed(2)));
    }, 4000);

    return () => clearInterval(interval);
  }, [pubSubActive]);

  const login = (name: string, phone: string, demo = false) => {
    if (demo) {
      setUser(defaultUser);
    } else {
      setUser({
        name,
        phone,
        cropType: 'Cotton',
        farmSize: '6.0 Acres',
        growthStage: 'Flowering Stage',
        location: 'Rajkot, Gujarat',
        district: 'Rajkot',
        language: 'English'
      });
    }
    triggerNotification('Welcome to Kisan Alert 360°', `Logged in successfully as ${name}. Digital twin synced.`, 'success');
  };

  const logout = () => {
    setUser(null);
  };

  const setLanguage = (lang: Language) => {
    if (user) {
      setUser({ ...user, language: lang });
    }
  };

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...profile });
    }
  };

  const triggerNotification = (title: string, description: string, type: AppNotification['type']) => {
    const newNotif: AppNotification = {
      id: Date.now().toString(),
      title,
      description,
      time: 'Just Now',
      type,
      read: false
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const addDiseaseRecord = (record: Omit<DiseaseRecord, 'id' | 'date'>) => {
    const newRecord: DiseaseRecord = {
      ...record,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    };
    setDiseaseHistory((prev) => [newRecord, ...prev]);
  };

  const incrementSavings = (water: number, electricity: number) => {
    setWaterSaved(w => w + water);
    setElectricitySaved(e => e + electricity);
    setCarbonReduction(c => c + Math.round(electricity * 0.75)); // roughly 0.75kg CO2 per kWh
  };

  const resetSimulationData = () => {
    setSensors(initialSensors);
    setNotifications(initialNotifications);
    setDiseaseHistory([]);
    setWaterSaved(34200);
    setElectricitySaved(245);
    setYieldImprovement(14);
    setCarbonReduction(185);
    setUser(defaultUser);
    triggerNotification('System Reset', 'Simulation reset to baseline values successfully.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        activeView,
        sensors,
        notifications,
        diseaseHistory,
        pubSubActive,
        waterSaved,
        electricitySaved,
        yieldImprovement,
        carbonReduction,
        darkMode,
        toggleDarkMode,
        searchQuery,
        setSearchQuery,
        login,
        logout,
        setActiveView,
        setLanguage,
        updateUserProfile,
        setPubSubActive,
        triggerNotification,
        addDiseaseRecord,
        resetSimulationData,
        incrementSavings
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
