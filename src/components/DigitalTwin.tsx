import React, { useState } from 'react';
import { Cpu } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DigitalTwin: React.FC = () => {
  const { sensors, user } = useApp();
  const [selectedTimeline, setSelectedTimeline] = useState<'24h' | '48h' | '72h'>('24h');

  // Simulated AI future forecasts
  const predictions = {
    '24h': {
      moisture: 'Dips to 31%',
      temp: '32°C (Peak)',
      status: 'Stable but drying',
      statusColor: 'text-amber-400',
      insight: 'Evapotranspiration is accelerating. Drip irrigation is recommended tomorrow at 05:30 AM.'
    },
    '48h': {
      moisture: 'Rises to 48%',
      temp: '29°C (Rainy)',
      status: 'Precipitation expected',
      statusColor: 'text-sky-400',
      insight: 'Weather models project 60% probability of rain (approx. 4-6mm). Irrigation pumps can remain offline.'
    },
    '72h': {
      moisture: 'Stays at 45%',
      temp: '28°C',
      status: 'Optimal Moisture',
      statusColor: 'text-emerald-400',
      insight: 'Post-rain soil equilibrium. Nutrient absorption (Nitrogen absorption rate) will increase by 14%.'
    }
  };

  const currentPredict = predictions[selectedTimeline];

  // Crop growth stage timeline items
  const growthStages = [
    { name: 'Germination', status: 'completed' },
    { name: 'Seedling', status: 'completed' },
    { name: 'Vegetative', status: 'active' },
    { name: 'Flowering', status: 'upcoming' },
    { name: 'Harvesting', status: 'upcoming' }
  ];

  return (
    <div className="p-8 space-y-8 overflow-y-auto max-h-[calc(100vh-80px)]">
      {/* Page Title Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-white">AI Digital Twin Console</h2>
          <p className="text-sm text-slate-400">Continuous 3D farm simulation powered by Vertex AI Gemini</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-3.5 py-2 rounded-xl font-semibold">
          <Cpu className="w-4 h-4 animate-pulse" />
          <span>Simulation Active</span>
        </div>
      </div>

      {/* Main Layout: 3D Layout vs Stats */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
        {/* Left: Premium 3D-style Farm Illustration */}
        <div className="xl:col-span-3 glass rounded-2xl p-6 flex flex-col justify-between min-h-[420px] relative overflow-hidden bg-gradient-to-br from-[#0c1221] to-[#070b13]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent -z-10" />

          {/* Top Info Banner */}
          <div className="flex justify-between items-center relative z-10">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">3D Farm Layer Simulator</span>
            <div className="flex gap-2">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400">Layer: Soil + Leaf + Atmosphere</span>
            </div>
          </div>

          {/* Premium Vector 3D SVG Farm Drawing */}
          <div className="my-auto flex items-center justify-center p-4">
            <svg viewBox="0 0 600 350" className="w-full max-w-[500px] drop-shadow-[0_20px_40px_rgba(16,185,129,0.1)]">
              {/* Atmosphere Layer */}
              <ellipse cx="300" cy="80" rx="220" ry="30" fill="none" stroke="rgba(20, 184, 166, 0.15)" strokeWidth="1" strokeDasharray="5,5" />
              <text x="300" y="60" textAnchor="middle" fill="#2dd4bf" fontSize="9" fontWeight="bold" letterSpacing="1">ATMOSPHERE LAYER ({sensors.humidity}% RH)</text>

              {/* Rain cloud icon / Sun simulation */}
              <circle cx="150" cy="70" r="12" fill="rgba(16, 185, 129, 0.1)" stroke="rgba(16, 185, 129, 0.4)" />
              <path d="M145 75 Q150 78 155 75" fill="none" stroke="#10b981" strokeWidth="1.5" />

              {/* Connecting virtual nodes lines */}
              <line x1="300" y1="120" x2="200" y2="180" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="1.5" strokeDasharray="3,3" />
              <line x1="300" y1="120" x2="400" y2="180" stroke="rgba(16, 185, 129, 0.2)" strokeWidth="1.5" strokeDasharray="3,3" />
              <line x1="300" y1="120" x2="300" y2="250" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="1.5" />

              {/* 3D Isometric Soil Board - Top Surface Layer */}
              <polygon points="300,100 480,180 300,260 120,180" fill="rgba(16, 185, 129, 0.08)" stroke="rgba(16, 185, 129, 0.5)" strokeWidth="2.5" />
              
              {/* Crop Leaf Mesh/Simulation */}
              <g transform="translate(180, 120)">
                {/* Plants drawing isometric */}
                <path d="M120 40 Q130 10 140 30 T120 40" fill="#10b981" fillOpacity="0.4" stroke="#10b981" strokeWidth="1.5" />
                <path d="M120 40 Q110 20 100 35 T120 40" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="1" />
                <line x1="120" y1="40" x2="120" y2="60" stroke="#059669" strokeWidth="2" />
              </g>

              <g transform="translate(250, 150)">
                <path d="M50 30 Q60 5 70 20 T50 30" fill="#10b981" fillOpacity="0.6" stroke="#10b981" strokeWidth="2" />
                <line x1="50" y1="30" x2="50" y2="55" stroke="#059669" strokeWidth="2.5" />
                <circle cx="50" cy="10" r="4" fill="#67e8f9" className="animate-pulse" />
              </g>

              {/* Dynamic sensor nodes glowing */}
              <g transform="translate(300, 180)">
                <circle cx="0" cy="0" r="6" fill="#10b981" className="animate-pulse" />
                <circle cx="0" cy="0" r="12" fill="none" stroke="#10b981" strokeWidth="1" className="animate-pulse-ring" />
                <text x="0" y="-12" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="semibold">Node 01: Active</text>
              </g>

              {/* Subsoil Layer */}
              <polygon points="300,260 480,180 480,210 300,290" fill="rgba(84, 52, 28, 0.25)" stroke="rgba(255, 255, 255, 0.05)" />
              <polygon points="300,260 120,180 120,210 300,290" fill="rgba(84, 52, 28, 0.2)" stroke="rgba(255, 255, 255, 0.05)" />

              {/* Bedrock Layer */}
              <polygon points="300,290 480,210 480,240 300,320" fill="rgba(40, 25, 12, 0.4)" stroke="rgba(255, 255, 255, 0.05)" />
              <polygon points="300,290 120,210 120,240 300,320" fill="rgba(40, 25, 12, 0.35)" stroke="rgba(255, 255, 255, 0.05)" />

              {/* Bedrock Moisture/Water indicators */}
              <text x="300" y="305" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">ROOT ZONE MOISTURE: {sensors.moisture}%</text>
            </svg>
          </div>

          {/* Bottom telemetry */}
          <div className="flex justify-between items-center text-xs text-slate-400 pt-4 border-t border-slate-900">
            <span>Vertex twin ID: <strong className="text-white">FARM-IND-OD-092</strong></span>
            <span>Last Sync: Just Now</span>
          </div>
        </div>

        {/* Right: Digital Twin AI analytics & Training Info */}
        <div className="xl:col-span-2 space-y-6">
          {/* Farm Growth Stage Progress */}
          <div className="glass rounded-2xl p-6">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-4">Crop Growth Timeline</span>
            
            <div className="flex items-center justify-between relative py-2">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2 -z-10" />
              
              {growthStages.map((stage, i) => (
                <div key={stage.name} className="flex flex-col items-center gap-1.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border ${
                    stage.status === 'completed' 
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' 
                      : stage.status === 'active'
                      ? 'bg-emerald-500 border-emerald-500 text-white animate-pulse'
                      : 'bg-slate-900 border-slate-800 text-slate-500'
                  }`}>
                    {i + 1}
                  </div>
                  <span className={`text-[10px] font-medium ${stage.status === 'active' ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {stage.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl mt-4 text-[11px] text-slate-300 leading-relaxed">
              Active stage: **{user?.growthStage}**. Cumulative duration is **42 Days**. Harvest expected in **35 Days**.
            </div>
          </div>

          {/* AI Learning Progress */}
          <div className="glass rounded-2xl p-6">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-4">AI Model Training Progress</span>
            
            <div className="space-y-3.5">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Soil Moisture Patterns</span>
                  <span className="text-emerald-400 font-semibold">100% (Trained)</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '100%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Daily Transpiration cycles</span>
                  <span className="text-teal-400 font-semibold">78% (Optimizing)</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-teal-500 h-1.5 rounded-full" style={{ width: '78%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300">Pest Threat Indexing</span>
                  <span className="text-amber-400 font-semibold">45% (Learning)</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '45%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Future Prediction Timeline Picker */}
          <div className="glass rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Predictive Weather Horizon</span>
              <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-0.5">
                {(['24h', '48h', '72h'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTimeline(t)}
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-md transition-all ${
                      selectedTimeline === t 
                        ? 'bg-emerald-500 text-white' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-950/60 border border-slate-900 rounded-xl space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-semibold">Moisture Target:</span>
                <span className="text-white font-bold">{currentPredict.moisture}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-semibold">Temperature:</span>
                <span className="text-white font-bold">{currentPredict.temp}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-semibold">State Forecast:</span>
                <span className={`font-bold ${currentPredict.statusColor}`}>{currentPredict.status}</span>
              </div>
              <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-300 leading-relaxed">
                <strong>Gemini Insight:</strong> {currentPredict.insight}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
