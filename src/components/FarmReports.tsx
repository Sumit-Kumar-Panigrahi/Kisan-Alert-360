import React, { useState } from 'react';
import { FileBarChart, Sparkles, FileText, Download, Play, Search, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FarmReports: React.FC = () => {
  const { user, waterSaved, electricitySaved, yieldImprovement, triggerNotification } = useApp();
  const [generating, setGenerating] = useState(false);
  const [reports, setReports] = useState([
    { id: 'R-9081', date: '01-Jul-2026', type: 'Monthly Audit', size: '14 KB' },
    { id: 'R-8124', date: '15-Jun-2026', type: 'Irrigation Planner', size: '10 KB' },
  ]);
  const [searchVal, setSearchVal] = useState('');

  const handleGenerateReport = () => {
    setGenerating(true);
    triggerNotification('Report Generator Initialized', 'Gathering IoT telemetry streams and model vectors...', 'info');

    setTimeout(() => {
      const newId = `R-${Math.floor(Math.random() * 9000) + 1000}`;
      const newReport = {
        id: newId,
        date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        type: 'AI Yield Advisory',
        size: '12 KB'
      };

      setReports([newReport, ...reports]);
      setGenerating(false);
      triggerNotification('AI Report Generated', `Report ${newId} is compiled and ready for download.`, 'success');
    }, 2500);
  };

  const handleDownload = (id: string) => {
    const reportText = `
=============================================
KISAN ALERT 360° - FARM REPORT SUMMARY
=============================================
Report ID: ${id}
Date: ${new Date().toLocaleDateString()}
Crop Profile: ${user?.cropType || 'Rice'}
Farm Acreage: ${user?.farmSize || '4.5 Acres'}
Location: ${user?.location || 'Bhadrak, Odisha'}

Resource Conservation Stats:
----------------------------
- Total Water Conserved: ${waterSaved} Liters
- Grid Electricity Saved: ${electricitySaved} kWh
- Yield Optimization Index: +${yieldImprovement}%

AI Diagnostic Overview:
-----------------------
Soil conditions are optimal. Favorable weather forecasts permit reduced irrigation run times. Disease propagation risk is minimal.

=============================================
Google Cloud AI & Gemini Pro - Hackathon MVP
=============================================
    `;

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Farm_Report_${id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    triggerNotification('File Download Initiated', `File Farm_Report_${id}.txt downloaded successfully.`, 'success');
  };

  const filteredReports = reports.filter(r => 
    r.id.toLowerCase().includes(searchVal.toLowerCase()) ||
    r.type.toLowerCase().includes(searchVal.toLowerCase())
  );

  return (
    <div className="p-8 space-y-8 overflow-y-auto max-h-[calc(100vh-80px)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">AI Farm Reports</h2>
          <p className="text-sm text-slate-400">Compile resource tracking, soil summaries, and yield forecasts into exportable briefs.</p>
        </div>

        <button 
          onClick={handleGenerateReport}
          disabled={generating}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          {generating ? 'Compiling AI Summary...' : 'Generate New Report'}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Reports History Feed */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex justify-between items-center bg-slate-950/60 p-4 rounded-xl border border-slate-900">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Reports Log</span>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-450" />
              <input 
                type="text" 
                placeholder="Search logs..." 
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-xl py-2 pl-9 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredReports.map((r) => (
              <div key={r.id} className="glass rounded-xl p-4 border border-slate-850 flex items-center justify-between gap-4 bg-slate-900/20">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <FileText className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">{r.type} ({r.id})</span>
                    <span className="text-[9px] text-slate-550 block mt-0.5">{r.date} • {r.size}</span>
                  </div>
                </div>

                <button 
                  onClick={() => handleDownload(r.id)}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-white"
                  title="Download File"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick analytics summary card */}
        <div>
          <div className="glass-card p-6 border border-slate-800 rounded-3xl space-y-6">
            <div>
              <span className="text-[10px] text-slate-550 font-bold uppercase tracking-widest block">Resource Savings Summary</span>
              <h3 className="text-sm font-bold text-white mt-1">Telemetry Metrics</h3>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Water Conserved</span>
                <span className="font-bold text-emerald-450">{waterSaved.toLocaleString()} L</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Grid Power Savings</span>
                <span className="font-bold text-emerald-450">{electricitySaved} kWh</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Yield Index Growth</span>
                <span className="font-bold text-emerald-450">+{yieldImprovement}%</span>
              </div>
            </div>

            <div className="p-3 bg-red-500/5 border border-red-500/15 rounded-xl flex gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <p className="text-[10px] text-slate-400 leading-normal">
                Monthly reports are signed via Google Cloud secure ledger and are fully compatible with local agricultural audit standards.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
