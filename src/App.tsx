import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { FarmerDashboard } from './components/FarmerDashboard';
import { DigitalTwin } from './components/DigitalTwin';
import { DiseaseDetection } from './components/DiseaseDetection';
import { CommunityIntel } from './components/CommunityIntel';
import { WaterPlanner } from './components/WaterPlanner';
import { ImpactDashboard } from './components/ImpactDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { ArchitectureDiagram } from './components/ArchitectureDiagram';
import { VoiceAssistant } from './components/VoiceAssistant';
import { Auth } from './components/Auth';
import { LandingPage } from './components/LandingPage';
import { AiInsights } from './components/AiInsights';
import { WeatherForecast } from './components/WeatherForecast';
import { GovSchemes } from './components/GovSchemes';
import { FarmReports } from './components/FarmReports';
import { SystemSettings } from './components/SystemSettings';
import { NotificationsCenter } from './components/NotificationsCenter';
import { FarmerProfile } from './components/FarmerProfile';
import { 
  Sparkles, 
  CloudSun, 
  Landmark, 
  FileBarChart, 
  Settings, 
  Bell, 
  UserCircle 
} from 'lucide-react';

const DashboardContent: React.FC = () => {
  const { user, activeView } = useApp();
  const [showAuth, setShowAuth] = React.useState(false);

  if (!user) {
    if (showAuth) {
      return <Auth />;
    }
    return <LandingPage onGetStarted={() => setShowAuth(true)} />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#070b13]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-hidden bg-[#0b0f19]/30">
          {activeView === 'dashboard' && <FarmerDashboard />}
          {activeView === 'twin' && <DigitalTwin />}
          {activeView === 'disease' && <DiseaseDetection />}
          {activeView === 'maps' && <CommunityIntel />}
          {activeView === 'planner' && <WaterPlanner />}
          {activeView === 'impact' && <ImpactDashboard />}
          {activeView === 'admin' && <AdminDashboard />}
          {activeView === 'architecture' && <ArchitectureDiagram />}
          {activeView === 'voice' && <VoiceAssistant />}
          
          {/* Real Operational Views */}
          {activeView === 'insights' && <AiInsights />}
          {activeView === 'weather' && <WeatherForecast />}
          {activeView === 'schemes' && <GovSchemes />}
          {activeView === 'reports' && <FarmReports />}
          {activeView === 'settings' && <SystemSettings />}
          {activeView === 'notifications' && <NotificationsCenter />}
          {activeView === 'profile' && <FarmerProfile />}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <DashboardContent />
    </AppProvider>
  );
}
