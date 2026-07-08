import React, { useState } from 'react';
import { User, Phone, MapPin, Leaf, Landmark, Save } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTranslations } from '../i18n/translations';

export const FarmerProfile: React.FC = () => {
  const { user, updateUserProfile, triggerNotification } = useApp();
  const t = useTranslations(user?.language || 'English');

  const [formData, setFormData] = useState({
    name: user?.name || 'Ramesh Patel',
    phone: user?.phone || '+91 98765 43210',
    cropType: user?.cropType || 'Rice (Basmati)',
    farmSize: user?.farmSize || '4.5 Acres',
    location: user?.location || 'Bhadrak, Odisha',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(formData);
    triggerNotification('Profile Updated', 'Farmer credentials and cropping patterns saved.', 'success');
  };

  const fieldStyle = {
    background: 'var(--input-bg)',
    color: 'var(--text-primary)',
    borderColor: 'var(--border-muted)'
  };

  return (
    <div className="p-8 space-y-8 overflow-y-auto max-h-[calc(100vh-80px)] max-w-3xl mx-auto">
      <div>
        <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{t.profile_title}</h2>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Manage cropping patterns, acreage registry, and regional system localization.</p>
      </div>

      <form onSubmit={handleSave} className="glass-card p-6 border rounded-3xl space-y-6" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center gap-4 border-b pb-6 mb-6" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xl glow-green shrink-0">
            {formData.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{formData.name}</h3>
            <p className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider mt-0.5">{formData.cropType} • Verified Owner</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { label: t.profile_name, key: 'name', icon: User, type: 'text' },
            { label: t.profile_phone, key: 'phone', icon: Phone, type: 'text' },
            { label: t.profile_crop, key: 'cropType', icon: Leaf, type: 'text' },
            { label: t.profile_farm_size, key: 'farmSize', icon: Landmark, type: 'text' },
          ].map(({ label, key, icon: Icon, type }) => (
            <div key={key} className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider block" style={{ color: 'var(--text-muted)' }}>{label}</label>
              <div className="relative">
                <Icon className="absolute left-3 top-3 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                <input
                  type={type}
                  value={(formData as any)[key]}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                  className="w-full border rounded-xl py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:border-emerald-500/50"
                  style={fieldStyle}
                  required
                />
              </div>
            </div>
          ))}

          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-bold uppercase tracking-wider block" style={{ color: 'var(--text-muted)' }}>{t.profile_location}</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full border rounded-xl py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:border-emerald-500/50"
                style={fieldStyle}
                required
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t flex justify-end" style={{ borderColor: 'var(--border-subtle)' }}>
          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs py-2.5 px-6 rounded-xl transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {t.profile_save}
          </button>
        </div>
      </form>
    </div>
  );
};
