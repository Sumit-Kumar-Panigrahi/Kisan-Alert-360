import React, { useState, useRef, useEffect } from 'react';
import { 
  Bell, 
  MapPin, 
  Sun, 
  Moon, 
  Search, 
  Mic, 
  User, 
  Settings, 
  ChevronDown,
  CloudSun,
  ShieldAlert,
  Calendar,
  LogOut
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { Language, ViewType } from '../context/AppContext';
import { useTranslations } from '../i18n/translations';

export const Header: React.FC = () => {
  const { 
    user, 
    notifications, 
    setLanguage, 
    triggerNotification, 
    sensors, 
    darkMode, 
    toggleDarkMode,
    searchQuery,
    setSearchQuery,
    setActiveView,
    logout
  } = useApp();

  const t = useTranslations(user?.language || 'English');

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    const msgs: Record<string, string> = {
      English: 'Language set to English. Voice and AI will respond in English.',
      Hindi: 'भाषा हिंदी में बदल दी गई है। वॉयस और AI हिंदी में जवाब देंगे।',
      Odia: 'ଭାଷା ଓଡ଼ିଆକୁ ପରିବର୍ତ୍ତନ ହେଲା। ଭଏସ ଓ AI ଓଡ଼ିଆରେ ଉତ୍ତର ଦେବ।'
    };
    triggerNotification('Language Updated', msgs[lang], 'info');
  };

  const handleVoiceSearch = () => {
    setIsListening(true);
    triggerNotification('Voice Search Activated', 'Listening for speech input...', 'info');
    setTimeout(() => {
      setIsListening(false);
      // Automatically redirect to Voice Assistant page
      setActiveView('voice');
      triggerNotification('Voice Assistant Opened', 'Ready to take command.', 'success');
    }, 2000);
  };

  return (
    <header className="h-20 border-b px-8 flex items-center justify-between sticky top-0 z-40 backdrop-blur-xl" style={{ background: 'var(--header-bg)', borderColor: 'var(--border-subtle)' }}>
      
      {/* Left section: Search Bar and Location */}
      <div className="flex items-center gap-6 flex-1 max-w-xl">
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </span>
          <input
            type="text"
            placeholder={t.hdr_search_placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-12 text-xs font-medium placeholder-slate-500 border rounded-xl focus:outline-none focus:border-emerald-500/50 transition-all"
            style={{ background: 'var(--input-bg)', color: 'var(--text-primary)', borderColor: 'var(--border-subtle)' }}
          />
          <kbd className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <span className="px-1.5 py-0.5 text-[9px] font-semibold text-slate-500 bg-slate-800/80 rounded border border-slate-700">⌘K</span>
          </kbd>
        </div>

        {/* Voice Search Button */}
        <button
          onClick={handleVoiceSearch}
          title="Voice Search"
          className={`h-11 w-11 rounded-xl flex items-center justify-center border transition-all shrink-0 ${
            isListening 
              ? 'bg-red-500/20 border-red-500 text-red-400 animate-pulse' 
              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
          }`}
        >
          <Mic className={`h-4.5 w-4.5 ${isListening ? 'animate-bounce' : ''}`} />
        </button>
      </div>

      {/* Right section: Info, Language, DarkMode, Alerts, Profile */}
      <div className="flex items-center gap-6">
        
        {/* Weather Briefing */}
        <div className="hidden xl:flex items-center gap-3 bg-slate-900/40 border border-slate-800/50 py-1.5 px-3 rounded-xl text-[11px] text-slate-350 font-medium">
          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
          <span className="truncate max-w-[100px]">{user?.location || 'Bhadrak, Odisha'}</span>
          <div className="w-1 h-1 rounded-full bg-slate-700" />
          <CloudSun className="w-4 h-4 text-amber-400" />
          <span>{sensors.temperature}°C</span>
        </div>

        {/* Language Selection Pills */}
        <div className="flex bg-slate-900/60 p-1 rounded-xl border border-slate-800">
          {(['English', 'Hindi', 'Odia'] as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={`px-3 py-1 rounded-lg text-[10px] font-bold tracking-wide transition-all ${
                user?.language === lang
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm'
                  : 'text-slate-450 hover:text-slate-200 border border-transparent'
              }`}
            >
              {lang === 'English' ? 'EN' : lang === 'Hindi' ? 'HI' : 'OD'}
            </button>
          ))}
        </div>

        {/* Dark/Light Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="h-10 w-10 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-all"
        >
          {darkMode ? <Sun className="h-4.5 w-4.5 text-amber-400" /> : <Moon className="h-4.5 w-4.5 text-indigo-400" />}
        </button>

        {/* Notification Bell Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-10 h-10 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-all relative"
          >
            <Bell className="w-4.5 h-4.5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-[9px] text-white flex items-center justify-center font-bold ring-2 ring-[#070b13] animate-glow-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-[400px] rounded-2xl bg-slate-950/95 border border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl overflow-hidden z-50 animate-fade-in-up">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between gradient-card-header">
                <span className="font-bold text-xs text-white uppercase tracking-wider">Live System Alerts</span>
                {unreadCount > 0 && (
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold uppercase">
                    {unreadCount} New
                  </span>
                )}
              </div>
              <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-900">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-500">
                    No recent warnings
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div 
                      key={notif.id} 
                      className={`p-4 hover:bg-slate-900/20 transition-colors ${!notif.read ? 'bg-emerald-500/[0.01]' : ''}`}
                    >
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${
                            notif.type === 'alert' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' :
                            notif.type === 'warning' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]' :
                            notif.type === 'success' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' :
                            'bg-blue-500'
                          }`} />
                          <h5 className="font-bold text-xs text-white">{notif.title}</h5>
                        </div>
                        <span className="text-[9px] text-slate-550 font-medium">{notif.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed pl-4">{notif.description}</p>
                    </div>
                  ))
                )}
              </div>
              <button 
                onClick={() => { setActiveView('notifications'); setShowNotifications(false); }}
                className="w-full py-3 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white transition-all text-xs font-bold text-center border-t border-slate-800"
              >
                Enter Notifications Command Center
              </button>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button 
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-extrabold text-sm shrink-0 glow-green">
              {user?.name.charAt(0)}
            </div>
            <div className="hidden md:block pr-1">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-white max-w-[90px] truncate">{user?.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>
          </button>

          {showProfileDropdown && (
            <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-slate-950/95 border border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl overflow-hidden z-50 animate-fade-in-up">
              <div className="p-4 border-b border-slate-800 bg-[#04060b]/40">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Signed in as</p>
                <p className="text-xs font-bold text-white mt-0.5 truncate">{user?.name}</p>
                <p className="text-[10px] text-slate-450 mt-1 truncate">{user?.phone}</p>
              </div>
              <div className="p-1">
                <button
                  onClick={() => { setActiveView('profile'); setShowProfileDropdown(false); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl transition-all font-medium"
                >
                  <User className="w-4 h-4 text-slate-500" />
                  Farmer Profile
                </button>
                <button
                  onClick={() => { setActiveView('settings'); setShowProfileDropdown(false); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-400 hover:text-white hover:bg-slate-900 rounded-xl transition-all font-medium"
                >
                  <Settings className="w-4 h-4 text-slate-500" />
                  Account Settings
                </button>
              </div>
              <div className="p-1 border-t border-slate-900 bg-[#04060b]/20">
                <button
                  onClick={() => { logout(); setShowProfileDropdown(false); }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-bold"
                >
                  <LogOut className="w-4 h-4 text-red-400" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

    </header>
  );
};
