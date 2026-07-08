import React from 'react';
import { Bell, AlertTriangle, ShieldCheck, Info, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTranslations } from '../i18n/translations';

export const NotificationsCenter: React.FC = () => {
  const { notifications, triggerNotification, user } = useApp();
  const t = useTranslations(user?.language || 'English');

  const handleClearAll = () => {
    triggerNotification(t.notif_archive, 'All alerts successfully archived.', 'success');
  };

  const typeConfig = {
    alert:   { icon: AlertTriangle, bg: 'bg-red-500/10',     border: 'border-red-500/20',     text: 'text-red-400'   },
    warning: { icon: AlertTriangle, bg: 'bg-amber-500/10',   border: 'border-amber-500/20',   text: 'text-amber-400' },
    success: { icon: ShieldCheck,   bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400'},
    info:    { icon: Info,          bg: 'bg-sky-500/10',     border: 'border-sky-500/20',     text: 'text-sky-400'   },
  };

  return (
    <div className="p-8 space-y-8 overflow-y-auto max-h-[calc(100vh-80px)] max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{t.notif_title}</h2>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Review IoT station alerts and local pest outbreak messages.</p>
        </div>
        <button
          onClick={handleClearAll}
          className="border font-bold text-xs py-2 px-4 rounded-xl transition-all flex items-center gap-1.5 hover:text-white hover:border-slate-600"
          style={{ borderColor: 'var(--border-muted)', color: 'var(--text-secondary)', background: 'var(--bg-elevated)' }}
        >
          <Trash2 className="w-4 h-4" />
          {t.notif_archive}
        </button>
      </div>

      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((n) => {
            const cfg = typeConfig[n.type] || typeConfig.info;
            const Icon = cfg.icon;
            return (
              <div
                key={n.id}
                className={`glass rounded-2xl p-5 border flex items-start gap-4 transition-all ${
                  !n.read ? 'border-emerald-500/20' : ''
                }`}
                style={{ borderColor: n.read ? 'var(--border-subtle)' : undefined }}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${cfg.bg} ${cfg.border} ${cfg.text}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-center gap-4 flex-wrap">
                    <h3 className="text-xs font-bold tracking-wide" style={{ color: 'var(--text-primary)' }}>{n.title}</h3>
                    <span className="text-[9px] font-semibold" style={{ color: 'var(--text-muted)' }}>{n.time}</span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{n.description}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="glass rounded-2xl p-8 text-center min-h-[300px] flex flex-col items-center justify-center">
            <Bell className="w-12 h-12 mb-4 animate-bounce" style={{ color: 'var(--text-muted)' }} />
            <h4 className="text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Inbox Archived</h4>
            <p className="text-[10px] max-w-[200px] leading-relaxed mx-auto" style={{ color: 'var(--text-muted)' }}>{t.notif_empty}</p>
          </div>
        )}
      </div>
    </div>
  );
};
