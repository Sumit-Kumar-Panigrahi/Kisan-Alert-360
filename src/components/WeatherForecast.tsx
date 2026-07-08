import React, { useState } from 'react';
import { CloudSun, Sun, CloudRain, Wind, Droplet, Compass, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTranslations } from '../i18n/translations';

export const WeatherForecast: React.FC = () => {
  const { sensors, user } = useApp();
  const t = useTranslations(user?.language || 'English');
  const [city, setCity] = useState(user?.district || 'Bhadrak');
  const [searchVal, setSearchVal] = useState('');

  const forecastData = [
    { day: 'Today',     temp: `${sensors.temperature}°C / 23°C`, icon: <CloudSun className="w-5 h-5 text-emerald-400" />, desc: 'Scattered Clouds' },
    { day: 'Tomorrow',  temp: '29°C / 22°C', icon: <CloudRain className="w-5 h-5 text-sky-400" />, desc: 'Light Rain Shower' },
    { day: 'Friday',    temp: '32°C / 24°C', icon: <Sun className="w-5 h-5 text-amber-400" />,     desc: 'Clear & Sunny' },
    { day: 'Saturday',  temp: '33°C / 25°C', icon: <Sun className="w-5 h-5 text-amber-400" />,     desc: 'Hot & Humid' },
    { day: 'Sunday',    temp: '30°C / 23°C', icon: <CloudRain className="w-5 h-5 text-sky-400" />, desc: 'Thunderstorms' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) setCity(searchVal.trim());
  };

  const cardStyle = { borderColor: 'var(--border-subtle)', background: 'var(--bg-elevated)' };

  return (
    <div className="p-8 space-y-8 overflow-y-auto max-h-[calc(100vh-80px)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{t.weather_title}</h2>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Real-time weather station metrics and crop spray condition advisories.</p>
        </div>
        <form onSubmit={handleSearch} className="relative flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder={t.weather_search}
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="border rounded-xl py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-emerald-500/50"
              style={{ background: 'var(--input-bg)', color: 'var(--text-primary)', borderColor: 'var(--border-subtle)' }}
            />
          </div>
          <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-xl text-xs font-bold text-white">Search</button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Weather Card */}
        <div className="glass-card p-6 border rounded-3xl relative overflow-hidden flex flex-col justify-between" style={cardStyle}>
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl -z-10" />
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-black" style={{ color: 'var(--text-primary)' }}>{city}</h3>
                <span className="text-[10px] uppercase tracking-widest font-semibold" style={{ color: 'var(--text-muted)' }}>Active Weather Station</span>
              </div>
              <CloudSun className="w-10 h-10 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>{sensors.temperature}°C</span>
              <span className="text-xs font-bold uppercase text-emerald-400">{t.lbl_live}</span>
            </div>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Scattered clouds. Perfect conditions for leaf absorption of standard nutrients.</p>
          </div>
          <div className="grid grid-cols-3 gap-3 border-t pt-6 mt-6" style={{ borderColor: 'var(--border-subtle)' }}>
            {[
              { icon: Wind,    label: 'Wind',    val: '14 km/h',           color: 'var(--text-muted)' },
              { icon: Droplet, label: 'Humidity', val: `${sensors.humidity}%`, color: '#38bdf8' },
              { icon: Compass, label: 'Pressure', val: '1012 hPa',          color: '#34d399' },
            ].map(({ icon: Icon, label, val, color }) => (
              <div key={label} className="rounded-xl p-3.5 text-center space-y-1" style={{ background: 'var(--bg-surface)' }}>
                <Icon className="w-4 h-4 mx-auto" style={{ color }} />
                <span className="text-[9px] uppercase font-bold block" style={{ color: 'var(--text-muted)' }}>{label}</span>
                <span className="text-xs font-bold block" style={{ color: 'var(--text-primary)' }}>{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 5-Day Forecast */}
        <div className="glass-card p-6 border rounded-3xl md:col-span-2 space-y-4" style={cardStyle}>
          <span className="text-[10px] font-bold tracking-widest uppercase block" style={{ color: 'var(--text-muted)' }}>{t.weather_5day}</span>
          <div className="divide-y" style={{ '--tw-divide-opacity': '1' } as any}>
            {forecastData.map((f, i) => (
              <div key={i} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0" style={{ borderColor: 'var(--border-subtle)' }}>
                <span className="text-xs font-bold w-24" style={{ color: 'var(--text-primary)' }}>{f.day}</span>
                <div className="flex items-center gap-3">
                  {f.icon}
                  <span className="text-xs w-32" style={{ color: 'var(--text-secondary)' }}>{f.desc}</span>
                </div>
                <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{f.temp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
