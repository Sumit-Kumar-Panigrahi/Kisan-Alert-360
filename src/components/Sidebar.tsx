import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Leaf, 
  Brain,
  ShieldCheck, 
  Mic, 
  Map, 
  CloudSun,
  Droplet, 
  TrendingUp, 
  Bell,
  UserCircle,
  Landmark,
  FileBarChart,
  Settings,
  LogOut,
  Sparkles,
  RefreshCw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { ViewType } from '../context/AppContext';
import { useTranslations } from '../i18n/translations';

export const Sidebar: React.FC = () => {
  const { 
    activeView, 
    setActiveView, 
    user, 
    logout, 
    resetSimulationData, 
    pubSubActive, 
    setPubSubActive 
  } = useApp();

  const t = useTranslations(user?.language || 'English');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuSections = [
    {
      title: t.nav_core,
      items: [
        { id: 'dashboard', label: t.nav_dashboard, icon: LayoutDashboard },
        { id: 'twin', label: t.nav_digital_twin, icon: Leaf, badge: 'AI' },
        { id: 'insights', label: t.nav_ai_insights, icon: Brain },
        { id: 'disease', label: t.nav_disease, icon: ShieldCheck },
        { id: 'voice', label: t.nav_voice, icon: Mic },
      ]
    },
    {
      title: t.nav_operations,
      items: [
        { id: 'maps', label: t.nav_community, icon: Map },
        { id: 'weather', label: t.nav_weather, icon: CloudSun },
        { id: 'planner', label: t.nav_water, icon: Droplet },
        { id: 'impact', label: t.nav_impact, icon: TrendingUp },
      ]
    },
    {
      title: t.nav_portal,
      items: [
        { id: 'notifications', label: t.nav_notifications, icon: Bell },
        { id: 'profile', label: t.nav_profile, icon: UserCircle },
        { id: 'schemes', label: t.nav_schemes, icon: Landmark },
        { id: 'reports', label: t.nav_reports, icon: FileBarChart },
        { id: 'settings', label: t.nav_settings, icon: Settings },
      ]
    }
  ];

  return (
    <aside 
      className={`border-r flex flex-col h-screen sticky top-0 transition-all duration-300 z-50 ${
        isCollapsed ? 'w-20' : 'w-72'
      }`}
      style={{ 
        background: 'var(--sidebar-bg)', 
        borderColor: 'var(--border-subtle)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
      }}
    >
      {/* Brand Header */}
      <div className="p-4 border-b flex items-center justify-between min-h-[80px]" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center glow-green shrink-0">
            <Sparkles className="w-5 h-5 text-emerald-400" />
          </div>
          {!isCollapsed && (
            <div className="animate-slide-in-left">
              <h1 className="text-sm font-bold tracking-tight flex items-center gap-1.5" style={{ color: 'var(--text-primary)' }}>
                Kisan Alert <span className="text-emerald-400 text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 font-bold">360°</span>
              </h1>
              <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Your Farm's Command Center</p>
            </div>
          )}
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg border text-slate-400 hover:text-white transition-all absolute -right-3 top-6 z-10"
          style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
        >
          {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        {menuSections.map((section, idx) => (
          <div key={idx} className="space-y-1.5">
            {!isCollapsed && (
              <h3 className="px-3 text-[10px] font-bold uppercase tracking-widest block mb-2 select-none" style={{ color: 'var(--text-muted)' }}>
                {section.title}
              </h3>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveView(item.id as ViewType)}
                    title={isCollapsed ? item.label : undefined}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group sidebar-item ${
                      isActive 
                        ? 'sidebar-active text-emerald-400 active' 
                        : 'border border-transparent hover:bg-emerald-500/5'
                    }`}
                    style={{ color: isActive ? undefined : 'var(--text-secondary)' }}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 shrink-0 ${isActive ? 'text-emerald-400' : ''}`} />
                      {!isCollapsed && <span className="truncate text-xs font-semibold">{item.label}</span>}
                    </div>
                    {!isCollapsed && item.badge && (
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wider ${
                        item.badge === 'AI' 
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                          : 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* IoT Stream Status */}
      {!isCollapsed && (
        <div className="p-3 mx-3 mb-3 rounded-xl border" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[9px] font-bold tracking-wider uppercase" style={{ color: 'var(--text-muted)' }}>GCP IoT Stream</span>
            <span className={`w-1.5 h-1.5 rounded-full ${pubSubActive ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
          </div>
          <div className="flex gap-1.5">
            <button 
              onClick={() => setPubSubActive(!pubSubActive)}
              className={`flex-1 text-[10px] py-1 px-2 rounded-lg border transition-all truncate font-semibold ${
                pubSubActive 
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                  : 'border text-slate-400'
              }`}
              style={pubSubActive ? {} : { borderColor: 'var(--border-muted)', color: 'var(--text-secondary)' }}
            >
              {pubSubActive ? t.hdr_live_stream : t.hdr_resume_stream}
            </button>
            <button 
              onClick={resetSimulationData}
              title="Reset Simulation Data"
              className="p-1.5 rounded-lg border text-slate-400 hover:text-white transition-colors shrink-0"
              style={{ borderColor: 'var(--border-muted)', background: 'var(--bg-elevated)' }}
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* User profile section */}
      {user && (
        <div className="p-3 border-t flex items-center justify-between gap-2 shrink-0" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 font-bold text-sm shrink-0 glow-green">
              {user.name.charAt(0)}
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden animate-slide-in-left">
                <h4 className="text-xs font-bold truncate" style={{ color: 'var(--text-primary)' }}>{user.name}</h4>
                <p className="text-[10px] truncate" style={{ color: 'var(--text-muted)' }}>{user.cropType}</p>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <button 
              onClick={logout}
              className="p-1.5 text-slate-450 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </aside>
  );
};
