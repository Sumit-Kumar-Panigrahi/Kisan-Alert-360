import React from 'react';
import { TrendingUp, Droplets, Zap, TreePine, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid 
} from 'recharts';

export const ImpactDashboard: React.FC = () => {
  const { waterSaved, electricitySaved, yieldImprovement, carbonReduction } = useApp();

  const monthlyImpactData = [
    { month: 'Jan', water: 4200, co2: 24 },
    { month: 'Feb', water: 5100, co2: 30 },
    { month: 'Mar', water: 6800, co2: 38 },
    { month: 'Apr', water: 7400, co2: 42 },
    { month: 'May', water: 8200, co2: 48 },
    { month: 'Jun', water: waterSaved % 10000, co2: carbonReduction % 100 },
  ];

  return (
    <div className="p-8 space-y-8 overflow-y-auto max-h-[calc(100vh-80px)]">
      {/* Title */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-white">Impact & Sustainability Dashboard</h2>
          <p className="text-sm text-slate-400">Track how AI conservation algorithms minimize resources and reduce carbon footprints.</p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl font-bold">
          <Award className="w-4 h-4" />
          <span>Platinum Grade Certificate</span>
        </div>
      </div>

      {/* ESG Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Water Saved Card */}
        <div className="glass rounded-2xl p-6 relative overflow-hidden bg-gradient-to-br from-slate-900/40 to-sky-500/[0.02]">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-4">
            <Droplets className="w-5 h-5 text-sky-400" />
          </div>
          <span className="block text-xs text-slate-400 font-semibold uppercase">Total Water Conserved</span>
          <h3 className="text-2xl font-black text-white mt-1">{(waterSaved).toLocaleString()} <span className="text-xs font-normal text-slate-500">Liters</span></h3>
          <p className="text-[10px] text-emerald-400 mt-2">✓ Aligns with UN SDG Clean Water Goal</p>
        </div>

        {/* Electricity Saved Card */}
        <div className="glass rounded-2xl p-6 relative overflow-hidden bg-gradient-to-br from-slate-900/40 to-amber-500/[0.02]">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
            <Zap className="w-5 h-5 text-amber-400" />
          </div>
          <span className="block text-xs text-slate-400 font-semibold uppercase">Electricity Saved</span>
          <h3 className="text-2xl font-black text-white mt-1">{(electricitySaved).toLocaleString()} <span className="text-xs font-normal text-slate-500">kWh</span></h3>
          <p className="text-[10px] text-emerald-400 mt-2">✓ Decreased utility costs by 18%</p>
        </div>

        {/* Carbon Reduction Card */}
        <div className="glass rounded-2xl p-6 relative overflow-hidden bg-gradient-to-br from-slate-900/40 to-emerald-500/[0.02]">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
            <TreePine className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="block text-xs text-slate-400 font-semibold uppercase">CO2 Offset equivalent</span>
          <h3 className="text-2xl font-black text-white mt-1">{(carbonReduction).toLocaleString()} <span className="text-xs font-normal text-slate-500">kg CO2</span></h3>
          <p className="text-[10px] text-emerald-400 mt-2">✓ Equal to planting 12 pine trees</p>
        </div>

        {/* Crop Yield Improvement */}
        <div className="glass rounded-2xl p-6 relative overflow-hidden bg-gradient-to-br from-slate-900/40 to-indigo-500/[0.02]">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
          </div>
          <span className="block text-xs text-slate-400 font-semibold uppercase">Yield Expansion</span>
          <h3 className="text-2xl font-black text-white mt-1">+{yieldImprovement}% <span className="text-xs font-normal text-slate-500">growth rate</span></h3>
          <p className="text-[10px] text-emerald-400 mt-2">✓ Under optimized NPK saturation</p>
        </div>
      </div>

      {/* Detailed Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cumulative Water Saved */}
        <div className="glass rounded-2xl p-6">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-6">Conservation Trend (Monthly Saved Liters)</span>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyImpactData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" stroke="#475569" fontSize={10} tickLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#090d16', border: '1px solid #1e293b', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '11px' }}
                />
                <Bar dataKey="water" fill="#0ea5e9" name="Water Conserved (L)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CO2 Emissions Offset */}
        <div className="glass rounded-2xl p-6">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-6">Carbon Emissions Offset Trend (kg CO2)</span>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyImpactData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" stroke="#475569" fontSize={10} tickLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#090d16', border: '1px solid #1e293b', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '11px' }}
                />
                <Line type="monotone" dataKey="co2" name="Offset (kg)" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
