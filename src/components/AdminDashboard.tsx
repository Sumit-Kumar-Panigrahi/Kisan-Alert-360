import React from 'react';
import { Users, Droplet, AlertTriangle, Activity, MapPin, Download } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid
} from 'recharts';

export const AdminDashboard: React.FC = () => {
  // District analytics
  const districtData = [
    { name: 'Bhadrak', farmers: 412, water: 42000, diseaseRisk: 'Medium' },
    { name: 'Balasore', farmers: 580, water: 54000, diseaseRisk: 'High' },
    { name: 'Cuttack', farmers: 320, water: 31000, diseaseRisk: 'Low' },
    { name: 'Puri', farmers: 210, water: 22000, diseaseRisk: 'Low' },
    { name: 'Khordha', farmers: 320, water: 34000, diseaseRisk: 'Medium' },
  ];

  const diseaseDistribution = [
    { name: 'Rice Blast', value: 45, color: '#ef4444' },
    { name: 'Yellow Rust', value: 30, color: '#f59e0b' },
    { name: 'Bacterial Blight', value: 15, color: '#3b82f6' },
    { name: 'Healthy Crops', value: 10, color: '#10b981' }
  ];

  return (
    <div className="p-8 space-y-8 overflow-y-auto max-h-[calc(100vh-80px)]">
      {/* Title */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-white">Government & District Admin Panel</h2>
          <p className="text-sm text-slate-400">Regional crop distribution, water reserves allocation, and disease migration analytics.</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold text-white hover:border-slate-700 transition-colors">
          <Download className="w-3.5 h-3.5" />
          Export District Registry
        </button>
      </div>

      {/* Admin stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass rounded-2xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-bold">Total Farmers Enrolled</span>
            <span className="text-xl font-black text-white">1,842</span>
          </div>
        </div>

        <div className="glass rounded-2xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
            <Droplet className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-bold">Water Allocation Pool</span>
            <span className="text-xl font-black text-white">1.83M Liters</span>
          </div>
        </div>

        <div className="glass rounded-2xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-bold">Outbreak Areas</span>
            <span className="text-xl font-black text-red-400">4 Hotspots</span>
          </div>
        </div>

        <div className="glass rounded-2xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-bold">Active Twin Models</span>
            <span className="text-xl font-black text-white">1,510</span>
          </div>
        </div>
      </div>

      {/* Grid: Charts & Regional mapping */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* District Water Allocation bar */}
        <div className="lg:col-span-2 glass rounded-2xl p-6">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-6">District Water Consumption Registry</span>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={districtData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="#475569" fontSize={10} tickLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#090d16', border: '1px solid #1e293b', borderRadius: '12px' }}
                  itemStyle={{ fontSize: '11px' }}
                />
                <Bar dataKey="water" fill="#0ea5e9" name="Water Used (L)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Disease outbreak pie chart */}
        <div className="glass rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-4">Outbreak Pathogen Distribution</span>
            <div className="h-48 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={diseaseDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {diseaseDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#090d16', border: '1px solid #1e293b', borderRadius: '12px' }}
                    itemStyle={{ fontSize: '11px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute text-center">
                <span className="text-xs text-slate-500 font-semibold block uppercase">Total Cases</span>
                <span className="text-base font-bold text-white">128</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 mt-4">
            {diseaseDistribution.map((item) => (
              <div key={item.name} className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-400">{item.name}</span>
                </div>
                <span className="font-bold text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Regional Grid Table */}
      <div className="glass rounded-2xl p-6">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-4">District Outbreak Severity Registry</span>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 font-bold">
                <th className="pb-3">District</th>
                <th className="pb-3">Active Farmers</th>
                <th className="pb-3">Estimated Water Reserve</th>
                <th className="pb-3">Outbreak Threat Index</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900 text-slate-300">
              {districtData.map((row) => (
                <tr key={row.name} className="hover:bg-slate-900/20">
                  <td className="py-3.5 font-semibold text-white flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    {row.name}
                  </td>
                  <td className="py-3.5">{row.farmers} Registered</td>
                  <td className="py-3.5">{row.water.toLocaleString()} Liters</td>
                  <td className="py-3.5">
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                      row.diseaseRisk === 'High' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                      row.diseaseRisk === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {row.diseaseRisk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
