import React, { useState } from 'react';
import { Brain, Sparkles, RefreshCw, AlertTriangle, ArrowRight, Zap, Target } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AiInsights: React.FC = () => {
  const { sensors, user, triggerNotification } = useApp();
  const [loading, setLoading] = useState(false);
  const [currentInsight, setCurrentInsight] = useState(
    "Based on live telemetry patterns, your soil moisture level is hovering at 38%. The transpiration rate is stable. Fungal spore growth threat indexes are low."
  );

  const handleRecalculate = () => {
    setLoading(true);
    triggerNotification('Recalculating AI Vectors', 'Processing multi-modal inputs, weather charts and NPK balance arrays...', 'info');

    setTimeout(() => {
      setLoading(false);
      setCurrentInsight(
        `Optimized advisory index: Soil moisture is ${sensors.moisture}%. The current nitrogen level is ${sensors.nitrogen} mg/kg. Drip irrigation parameters are calibrated. Keep spray schedules suspended until weather changes.`
      );
      triggerNotification('Advisory Calibrated', 'Advisory recommendations updated successfully.', 'success');
    }, 2000);
  };

  return (
    <div className="p-8 space-y-8 overflow-y-auto max-h-[calc(100vh-80px)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Gemini Crop Advisory Engine</h2>
          <p className="text-sm text-slate-400">Deep learning predictions and predictive health score trends.</p>
        </div>

        <button 
          onClick={handleRecalculate}
          disabled={loading}
          className="bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-350 hover:text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all flex items-center gap-1.5"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Recalculate Insights
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Insight Console */}
        <div className="xl:col-span-2 glass-card p-6 border border-slate-800 rounded-3xl relative overflow-hidden flex flex-col justify-between min-h-[300px]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-10 animate-pulse-slow" />
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-emerald-450 font-bold uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">Advisory active</span>
              <Brain className="w-5 h-5 text-emerald-450" />
            </div>

            <h3 className="text-sm font-bold text-white leading-normal">Dynamic Advisory Insights</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{currentInsight}</p>
          </div>

          <div className="pt-6 border-t border-slate-900 flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase">
            <span>Confidence Index: 96.8%</span>
            <span>Target: Basmati Rice (Plot A)</span>
          </div>
        </div>

        {/* NPK Values Grid */}
        <div className="glass-card p-6 border border-slate-800 rounded-3xl space-y-6">
          <div>
            <span className="text-[10px] text-slate-550 font-bold uppercase tracking-widest block font-sans">Active Nutrients Analysis</span>
            <h3 className="text-sm font-bold text-white mt-1">NPK Sensor Array Vitals</h3>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-semibold">Nitrogen (N)</span>
              <span className="font-bold text-emerald-400">128 mg/kg</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-semibold">Phosphorus (P)</span>
              <span className="font-bold text-amber-400">42 mg/kg</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-semibold">Potassium (K)</span>
              <span className="font-bold text-emerald-400">195 mg/kg</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
