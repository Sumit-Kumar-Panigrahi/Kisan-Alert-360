import React, { useState } from 'react';
import { Settings, Save, ToggleLeft, ToggleRight, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTranslations } from '../i18n/translations';

export const SystemSettings: React.FC = () => {
  const { darkMode, toggleDarkMode, resetSimulationData, triggerNotification, user, setLanguage } = useApp();
  const t = useTranslations(user?.language || 'English');
  const [iotSyncInterval, setIotSyncInterval] = useState('4s');
  const [voiceVol, setVoiceVol] = useState(80);
  const [criticalNotifs, setCriticalNotifs] = useState(true);

  const handleSave = () => {
    triggerNotification(t.settings_save, 'System configurations updated successfully.', 'success');
  };

  const handleReset = () => {
    resetSimulationData();
  };

  return (
    <div className="p-8 space-y-8 overflow-y-auto max-h-[calc(100vh-80px)] max-w-3xl mx-auto">
      <div>
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{t.settings_title}</h2>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Configure IoT polling intervals, voice synthesis settings, and threshold alarm modes.</p>
      </div>

      <div className="glass-card p-6 border rounded-3xl space-y-6" style={{ borderColor: 'var(--border-subtle)' }}>
        
        {/* Language Selector */}
        <div className="flex justify-between items-center py-4 border-b gap-4 flex-wrap" style={{ borderColor: 'var(--border-subtle)' }}>
          <div>
            <h3 className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>Application Language</h3>
            <p className="text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>Sets the interface and AI response language across all modules.</p>
          </div>
          <div className="flex gap-2">
            {(['English', 'Hindi', 'Odia'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  user?.language === lang
                    ? 'bg-emerald-500 text-white border-emerald-600'
                    : 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10'
                }`}
              >
                {lang === 'English' ? 'EN' : lang === 'Hindi' ? 'HI' : 'OD'}
              </button>
            ))}
          </div>
        </div>

        {/* Theme Settings */}
        <div className="flex justify-between items-center py-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
          <div>
            <h3 className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{t.settings_dark_mode}</h3>
            <p className="text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>Optimize display readability. Disable for light mode.</p>
          </div>
          <button 
            onClick={toggleDarkMode}
            className="p-1 rounded"
          >
            {darkMode ? <ToggleRight className="w-9 h-9 text-emerald-400" /> : <ToggleLeft className="w-9 h-9 text-slate-400" />}
          </button>
        </div>

        {/* Telemetry Polling Speed */}
        <div className="flex justify-between items-center py-4 border-b gap-4 flex-wrap" style={{ borderColor: 'var(--border-subtle)' }}>
          <div>
            <h3 className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{t.settings_iot_interval}</h3>
            <p className="text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>Adjust telemetry collection polling interval.</p>
          </div>
          <select 
            value={iotSyncInterval}
            onChange={(e) => {
              setIotSyncInterval(e.target.value);
              triggerNotification('Sync Interval Updated', `IoT streams will sync every ${e.target.value}.`, 'info');
            }}
            className="border rounded-xl px-3 py-1.5 text-xs font-semibold focus:outline-none focus:border-emerald-500/50"
            style={{ background: 'var(--input-bg)', color: 'var(--text-primary)', borderColor: 'var(--border-muted)' }}
          >
            <option value="2s">Fast (2s)</option>
            <option value="4s">Normal (4s)</option>
            <option value="10s">Slow (10s)</option>
          </select>
        </div>

        {/* Voice Volume */}
        <div className="flex justify-between items-center py-4 border-b gap-4 flex-wrap" style={{ borderColor: 'var(--border-subtle)' }}>
          <div>
            <h3 className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{t.settings_voice_vol}</h3>
            <p className="text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>Adjust sound pressure output for multilingual reading summaries.</p>
          </div>
          <div className="flex items-center gap-3">
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={voiceVol}
              onChange={(e) => setVoiceVol(Number(e.target.value))}
              className="accent-emerald-500 h-1 rounded-lg cursor-pointer"
            />
            <span className="text-xs font-bold w-8 text-right" style={{ color: 'var(--text-primary)' }}>{voiceVol}%</span>
          </div>
        </div>

        {/* Critical Alerts */}
        <div className="flex justify-between items-center py-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
          <div>
            <h3 className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{t.settings_alerts}</h3>
            <p className="text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>Notify regional spray cooperatives immediately when outbreaks are identified.</p>
          </div>
          <button 
            onClick={() => setCriticalNotifs(!criticalNotifs)}
            className="p-1 rounded"
          >
            {criticalNotifs ? <ToggleRight className="w-9 h-9 text-emerald-400" /> : <ToggleLeft className="w-9 h-9 text-slate-400" />}
          </button>
        </div>

        {/* Reset */}
        <div className="flex justify-between items-center py-4 gap-4 flex-wrap">
          <div>
            <h3 className="text-xs font-bold text-red-400">{t.settings_reset}</h3>
            <p className="text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>Erase crop analysis logs and reset cumulative water savings to defaults.</p>
          </div>
          <button 
            onClick={handleReset}
            className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-bold text-xs py-2 px-4 rounded-xl transition-all flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" />
            {t.settings_reset}
          </button>
        </div>

        {/* Save */}
        <div className="pt-6 border-t flex justify-end" style={{ borderColor: 'var(--border-subtle)' }}>
          <button 
            onClick={handleSave}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs py-2.5 px-6 rounded-xl transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {t.settings_save}
          </button>
        </div>
      </div>
    </div>
  );
};
