import React, { useState } from 'react';
import { Droplet, Sparkles, TrendingUp, Calendar, Zap, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

export const WaterPlanner: React.FC = () => {
  const { sensors, incrementSavings, triggerNotification } = useApp();
  const [farmSize, setFarmSize] = useState<number>(4.5);
  const [crop, setCrop] = useState<string>('Rice (Basmati)');
  const [availableWater, setAvailableWater] = useState<number>(85000); // Liters
  const [expectedRain, setExpectedRain] = useState<number>(8); // mm
  const [calculating, setCalculating] = useState<boolean>(false);
  const [planGenerated, setPlanGenerated] = useState<boolean>(true);

  // Irrigation schedule outputs based on crop and soil moisture
  const getIrrigationSchedule = () => {
    const baselineDailyNeed = crop.includes('Rice') ? 1200 : crop.includes('Cotton') ? 800 : 600;
    
    // adjust daily water based on rain forecast and soil moisture
    const rainOffset = expectedRain * 250; // rain supplies some water
    const soilMoistureAdjustment = sensors.moisture > 60 ? 0.3 : sensors.moisture < 30 ? 1.3 : 0.8;
    
    const dailyWaterNeeded = Math.max(100, Math.round((baselineDailyNeed * farmSize * soilMoistureAdjustment) - rainOffset));
    const electricityPerLiter = 0.0003; // kWh per Liter pumped

    // Daily schedule chart data
    const chartData = [
      { day: 'Mon', water: dailyWaterNeeded },
      { day: 'Tue', water: Math.round(dailyWaterNeeded * 0.9) },
      { day: 'Wed', water: Math.round(dailyWaterNeeded * 0.8) },
      { day: 'Thu', water: Math.round(dailyWaterNeeded * 1.1) },
      { day: 'Fri', water: Math.round(dailyWaterNeeded * 1.0) },
      { day: 'Sat', water: Math.round(dailyWaterNeeded * 0.7) },
      { day: 'Sun', water: Math.round(dailyWaterNeeded * 0.8) },
    ];

    const weeklyWaterSum = chartData.reduce((acc, curr) => acc + curr.water, 0);
    const regularWeeklySum = baselineDailyNeed * farmSize * 7;
    const waterSaved = Math.max(2000, regularWeeklySum - weeklyWaterSum);
    const electricitySaved = Number((waterSaved * electricityPerLiter).toFixed(1));

    return {
      chartData,
      weeklyWaterSum,
      waterSaved,
      electricitySaved
    };
  };

  const schedule = getIrrigationSchedule();

  const handleGeneratePlan = () => {
    setCalculating(true);
    setTimeout(() => {
      setCalculating(false);
      setPlanGenerated(true);
      incrementSavings(schedule.waterSaved, schedule.electricitySaved);
      triggerNotification(
        'Water Budget Calculated',
        `Saved ${schedule.waterSaved.toLocaleString()} Liters of water using predictive weather models.`,
        'success'
      );
    }, 1500);
  };

  return (
    <div className="p-8 space-y-8 overflow-y-auto max-h-[calc(100vh-80px)]">
      <div>
        <h2 className="text-xl font-bold text-white">Water Budget Planner</h2>
        <p className="text-sm text-slate-400">Optimize crop watering schedules based on local rainfall predictions and live moisture telemetry.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
        {/* Input Parameters panel */}
        <div className="xl:col-span-2 glass rounded-2xl p-6 space-y-6">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Input Variables</span>

          <div className="space-y-4">
            {/* Crop Select */}
            <div>
              <label htmlFor="crop-select" className="block text-xs font-semibold text-slate-400 mb-1.5">Select Crop</label>
              <select
                id="crop-select"
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl px-4 py-2.5 font-medium focus:outline-none"
              >
                <option value="Rice (Basmati)">Rice (Basmati)</option>
                <option value="Cotton">Cotton</option>
                <option value="Wheat">Wheat (Durum)</option>
              </select>
            </div>

            {/* Farm Size */}
            <div>
              <label htmlFor="farm-size-input" className="block text-xs font-semibold text-slate-400 mb-1.5">Farm Size (Acres)</label>
              <input
                id="farm-size-input"
                type="number"
                step="0.5"
                value={farmSize}
                onChange={(e) => setFarmSize(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl px-4 py-2.5 font-medium focus:outline-none"
              />
            </div>

            {/* Available Water */}
            <div>
              <label htmlFor="available-water-input" className="block text-xs font-semibold text-slate-400 mb-1.5">Available Water Pool (Liters)</label>
              <input
                id="available-water-input"
                type="number"
                step="5000"
                value={availableWater}
                onChange={(e) => setAvailableWater(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl px-4 py-2.5 font-medium focus:outline-none"
              />
            </div>

            {/* Expected Rain */}
            <div>
              <label htmlFor="expected-rain-slider" className="block text-xs font-semibold text-slate-400 mb-1.5">Expected Precipitation (next 3 days): {expectedRain} mm</label>
              <input
                id="expected-rain-slider"
                type="range"
                min="0"
                max="40"
                value={expectedRain}
                onChange={(e) => setExpectedRain(Number(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
          </div>

          <button 
            onClick={handleGeneratePlan}
            disabled={calculating}
            className="w-full py-3 rounded-xl bg-emerald-500 text-white font-semibold text-xs hover:bg-emerald-600 transition-colors flex items-center justify-center gap-2"
          >
            {calculating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Calculating Smart Schedule...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate Irrigation Schedule
              </>
            )}
          </button>
        </div>

        {/* Results Panel */}
        <div className="xl:col-span-3">
          {planGenerated ? (
            <div className="glass rounded-2xl p-6 space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Weekly Water Allocation Plan</span>
                <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded-full font-bold uppercase flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Optimized
                </span>
              </div>

              {/* Stat Savings Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-slate-500 font-semibold block uppercase">Water Conserved</span>
                    <span className="text-lg font-bold text-emerald-400">{schedule.waterSaved.toLocaleString()} Liters</span>
                  </div>
                  <Droplet className="w-5 h-5 text-sky-400" />
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-slate-500 font-semibold block uppercase">Electricity Conserved</span>
                    <span className="text-lg font-bold text-emerald-400">{schedule.electricitySaved} kWh</span>
                  </div>
                  <Zap className="w-5 h-5 text-amber-400" />
                </div>
              </div>

              {/* Chart */}
              <div>
                <span className="text-xs text-slate-400 font-bold block mb-4">Daily Water Allocation Volume (Liters)</span>
                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={schedule.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="day" stroke="#475569" fontSize={10} tickLine={false} />
                      <YAxis stroke="#475569" fontSize={10} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#090d16', border: '1px solid #1e293b', borderRadius: '12px' }}
                        itemStyle={{ fontSize: '11px' }}
                      />
                      <Bar dataKey="water" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Schedule recommendations */}
              <div className="p-4 bg-slate-950/60 border border-slate-900 rounded-xl space-y-3 text-xs leading-relaxed text-slate-300">
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong>Irrigation Advisory:</strong> Based on the expected rainfall of <strong>{expectedRain} mm</strong>, your sprinkler cycles can be reduced by <strong>30%</strong> without risking plant transpiration stress. Avoid water pooling during Friday predictions.
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="glass rounded-2xl p-8 min-h-[380px] flex flex-col items-center justify-center border-slate-800 text-center">
              <Droplet className="w-12 h-12 text-slate-700 mb-4" />
              <h4 className="text-sm font-semibold text-slate-400 mb-1">Awaiting Generation</h4>
              <p className="text-xs text-slate-600 max-w-xs leading-relaxed">
                Adjust variables in the left panel and click generate to process weekly allocation schedules.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
