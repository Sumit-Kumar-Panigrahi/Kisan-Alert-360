import React, { useState, useEffect } from 'react';
import { 
  Droplet, Droplets, Thermometer, CloudRain, Sun, Wind, Activity, 
  Upload, Mic, Map, FileBarChart, FileText, Bell, Eye, PlusCircle as PlusCircleIcon,
  Sparkles, ArrowRight, AlertCircle, CheckCircle2, ShieldAlert, Calendar
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  ComposedChart,
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from 'recharts';

export const FarmerDashboard: React.FC = () => {
  const { 
    sensors, 
    user, 
    waterSaved, 
    electricitySaved, 
    yieldImprovement, 
    carbonReduction, 
    notifications,
    setActiveView,
    triggerNotification
  } = useApp();

  const [activeChartTab, setActiveChartTab] = useState<string>('soil');
  const [alertRadius, setAlertRadius] = useState<number>(15);
  const [pulseCount, setPulseCount] = useState<number>(0);

  // Live pulse for mock sensor stream
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseCount(p => p + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // 1. Chart Data Definitions
  const soilMoistureHistory = [
    { time: '06:00 AM', moisture: 35, optimalMin: 35, optimalMax: 50 },
    { time: '09:00 AM', moisture: 34, optimalMin: 35, optimalMax: 50 },
    { time: '12:00 PM', moisture: 32, optimalMin: 35, optimalMax: 50 },
    { time: '03:00 PM', moisture: 35, optimalMin: 35, optimalMax: 50 },
    { time: '06:00 PM', moisture: 38, optimalMin: 35, optimalMax: 50 },
    { time: '09:00 PM', moisture: 37, optimalMin: 35, optimalMax: 50 },
    { time: '12:00 AM', moisture: 39, optimalMin: 35, optimalMax: 50 },
  ];

  const tempTrendData = [
    { time: 'Mon', dayTemp: 29, nightTemp: 22, humidity: 70 },
    { time: 'Tue', dayTemp: 31, nightTemp: 23, humidity: 72 },
    { time: 'Wed', dayTemp: 32, nightTemp: 24, humidity: 75 },
    { time: 'Thu', dayTemp: 30, nightTemp: 22, humidity: 71 },
    { time: 'Fri', dayTemp: 33, nightTemp: 25, humidity: 73 },
    { time: 'Sat', dayTemp: 34, nightTemp: 26, humidity: 74 },
    { time: 'Sun', dayTemp: sensors.temperature, nightTemp: 23, humidity: sensors.humidity },
  ];

  const waterUsageData = [
    { week: 'Week 1', budget: 12000, actual: 11200 },
    { week: 'Week 2', budget: 12000, actual: 9800 },
    { week: 'Week 3', budget: 12000, actual: 10400 },
    { week: 'Week 4', budget: 12000, actual: 8900 },
  ];

  const cropGrowthData = [
    { day: 'Day 10', riceHeight: 15, cottonHeight: 12, target: 14 },
    { day: 'Day 20', riceHeight: 28, cottonHeight: 22, target: 25 },
    { day: 'Day 30', riceHeight: 45, cottonHeight: 38, target: 40 },
    { day: 'Day 40', riceHeight: 62, cottonHeight: 51, target: 58 },
    { day: 'Day 50', riceHeight: 78, cottonHeight: 68, target: 75 },
  ];

  const yieldForecastData = [
    { stage: 'Seedling', currentEst: 92, potentialMax: 100 },
    { stage: 'Vegetative', currentEst: 95, potentialMax: 100 },
    { stage: 'Flowering', currentEst: 97, potentialMax: 100 },
    { stage: 'Fruit Setting', currentEst: 96, potentialMax: 100 },
    { stage: 'Maturity', currentEst: 98, potentialMax: 100 },
  ];

  const diseaseProbabilityData = [
    { date: '07/02', blastProb: 12, blightProb: 8 },
    { date: '07/03', blastProb: 15, blightProb: 10 },
    { date: '07/04', blastProb: 24, blightProb: 14 },
    { date: '07/05', blastProb: 22, blightProb: 11 },
    { date: '07/06', blastProb: 18, blightProb: 9 },
    { date: '07/07', blastProb: 14, blightProb: 7 },
    { date: 'Today', blastProb: 9, blightProb: 5 },
  ];

  const weeklyPerformanceData = [
    { day: 'Mon', efficiency: 82, soilScore: 85, waterIndex: 78 },
    { day: 'Tue', efficiency: 85, soilScore: 84, waterIndex: 82 },
    { day: 'Wed', efficiency: 88, soilScore: 88, waterIndex: 85 },
    { day: 'Thu', efficiency: 80, soilScore: 81, waterIndex: 79 },
    { day: 'Fri', efficiency: 91, soilScore: 92, waterIndex: 90 },
    { day: 'Sat', efficiency: 94, soilScore: 95, waterIndex: 92 },
    { day: 'Sun', efficiency: sensors.healthScore, soilScore: sensors.healthScore + 2, waterIndex: sensors.waterLevel },
  ];

  // Helper to generate dynamic AI status details
  const getAiPrediction = () => {
    if (sensors.moisture < 30) {
      return {
        threat: 'Mild Moisture Stress Detected',
        status: 'warning',
        color: 'text-amber-400 border-amber-500/20 bg-amber-500/5',
        description: `Soil moisture drops to ${sensors.moisture}%, approaching critical crop wilting levels. Transpiration rate is elevated due to ${sensors.temperature}°C temperatures.`,
        recommendation: 'Initiate localized drip irrigation for 35 mins during early morning.',
        confidence: 94,
        savings: 'Est. Water saved: 400L (via targeted drip)',
        yieldImpact: '+8% Yield Retention'
      };
    } else if (sensors.moisture > 75) {
      return {
        threat: 'High Water Saturation / Saturated Zone',
        status: 'danger',
        color: 'text-red-400 border-red-500/20 bg-red-500/5',
        description: `High soil saturation (${sensors.moisture}%) under current humidity levels may cause oxygen deficiency in root zone.`,
        recommendation: 'Suspend scheduled evening sprinklers. Activate field drainage gate 2.',
        confidence: 89,
        savings: 'Est. Electricity saved: 4.2 kWh (pump bypass)',
        yieldImpact: 'Avoids 12% yield loss'
      };
    } else {
      return {
        threat: 'Optimal Crop Vitality Index',
        status: 'success',
        color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
        description: 'Sensor streams show optimal parameters. The moisture level (35-50%) aligns with vegetative growth stage guidelines.',
        recommendation: 'No irrigation needed. Keep monitoring the rain forecast.',
        confidence: 96,
        savings: 'Eco-mode active. Resources fully optimized.',
        yieldImpact: 'On track for peak yield'
      };
    }
  };

  const prediction = getAiPrediction();

  // Export simulator
  const handleExport = () => {
    triggerNotification('Analytics Export Started', 'Compiling complete farm metrics into PDF report format.', 'info');
    setTimeout(() => {
      triggerNotification('Analytics Export Success', 'PDF report downloaded successfully.', 'success');
      // Simulate file download
      const element = document.createElement("a");
      const file = new Blob(["Kisan Alert 360 - Farm Report Summary\nCrop: " + user?.cropType + "\nFarm Size: " + user?.farmSize + "\nHealth Score: " + sensors.healthScore + "/100\nWater Saved: " + waterSaved + " Liters\nElectricity Saved: " + electricitySaved + " kWh\n"], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = "kisan_farm_report.txt";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1500);
  };

  const handleRegisterFarm = () => {
    triggerNotification(
      'Access Denied', 
      'Adding auxiliary farms requires a premium enterprise membership. Contact system admin.', 
      'warning'
    );
  };

  return (
    <div className="p-8 space-y-8 overflow-y-auto max-h-[calc(100vh-80px)] bg-[#070b13]/40">
      
      {/* ─── HERO SECTION ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch animate-fade-in-up">
        
        {/* Farm Overview Welcome and Circle Gauge */}
        <div className="lg:col-span-8 glass-card p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shimmer-container">
          <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10 animate-pulse-slow" />
          
          <div className="flex-1 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              AI Digital Twin Active
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Farm Command Center: {user?.name}</h2>
              <p className="text-xs text-slate-400 leading-relaxed mt-1">
                Synchronized 3 seconds ago via **Google Cloud IoT Pub/Sub**. Running predictive analysis on <strong className="text-emerald-400 font-bold">{user?.cropType || 'Rice'}</strong>.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
                <span className="block text-[9px] text-slate-500 uppercase tracking-widest font-bold">Crop Stage</span>
                <span className="text-xs font-bold text-white block mt-0.5">{user?.growthStage || 'Vegetative Stage'}</span>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
                <span className="block text-[9px] text-slate-500 uppercase tracking-widest font-bold">Soil Health</span>
                <span className="text-xs font-bold text-emerald-400 block mt-0.5">Optimal</span>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3">
                <span className="block text-[9px] text-slate-500 uppercase tracking-widest font-bold">Next Run</span>
                <span className="text-xs font-bold text-white block mt-0.5">09-Jul 06:00 AM</span>
              </div>
            </div>
          </div>

          {/* Circle Gauge Score */}
          <div className="flex flex-col items-center justify-center shrink-0 p-4 bg-slate-950/40 rounded-2xl border border-slate-900 w-full md:w-56 text-center">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3 block">Farm Vitality Score</span>
            <div className="relative w-36 h-36 flex items-center justify-center">
              {/* SVG Ring */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  className="stroke-slate-800/80"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  className="stroke-emerald-500 animate-gauge"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray="440"
                  strokeDashoffset={440 - (440 * (sensors.healthScore || 85)) / 100}
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-3xl font-extrabold text-white tracking-tight">{sensors.healthScore}</span>
                <span className="text-slate-500 text-xs block font-semibold">/100</span>
              </div>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold tracking-wider mt-3 block uppercase">
              {sensors.healthScore >= 80 ? '✓ Excel Growth State' : '⚠ Resource deficit detected'}
            </span>
          </div>

        </div>

        {/* AI Farm Status Recommendation Banner */}
        <div className="lg:col-span-4 glass-card p-6 flex flex-col justify-between border-l-4 border-l-emerald-500 relative">
          <div className="absolute right-4 top-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase">
            Gemini Daily Advisory
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${prediction.status === 'warning' ? 'bg-amber-400 animate-ping' : prediction.status === 'danger' ? 'bg-red-400 animate-ping' : 'bg-emerald-400'}`} />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">{prediction.threat}</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {prediction.description}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800/80 mt-4 space-y-3">
            <div className="flex gap-2">
              <div className="flex-1 bg-slate-900/60 p-2 rounded-xl border border-slate-850">
                <span className="block text-[8px] text-slate-500 uppercase font-bold">Confidence</span>
                <span className="text-xs font-bold text-white">{prediction.confidence}%</span>
              </div>
              <div className="flex-1 bg-slate-900/60 p-2 rounded-xl border border-slate-850">
                <span className="block text-[8px] text-slate-500 uppercase font-bold">Risk Level</span>
                <span className={`text-xs font-bold ${prediction.status === 'danger' ? 'text-red-400' : prediction.status === 'warning' ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {prediction.status === 'danger' ? 'High' : prediction.status === 'warning' ? 'Medium' : 'Low'}
                </span>
              </div>
            </div>

            <button 
              onClick={() => setActiveView('planner')}
              className="w-full flex items-center justify-between px-3 py-2 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 rounded-xl text-xs font-bold hover:bg-emerald-500 hover:text-white transition-all cursor-pointer group"
            >
              <span>Apply Recommended Action</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

      </div>

      {/* ─── LIVE MONITORING CARDS ──────────────────────────────── */}
      <div className="space-y-3 animate-fade-in-up-1">
        <div className="flex items-center justify-between px-1">
          <span className="section-label">Live Telemetry Diagnostics</span>
          <span className="badge-live">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-sensor-pulse" />
            Receiving telemetry stream
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          
          {/* Card 1: Soil Moisture */}
          <div className="glass glass-hover rounded-2xl p-4 flex flex-col justify-between min-h-[140px]">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[10px] text-slate-450 font-bold uppercase">Moisture</span>
                <Droplets className="w-4 h-4 text-sky-400" />
              </div>
              <h4 className="text-xl font-black text-white mt-2">{sensors.moisture}%</h4>
            </div>
            <div className="mt-2">
              <svg viewBox="0 0 100 20" className="w-full h-5">
                <path d="M0,10 Q25,3 50,15 T100,5" fill="none" stroke="#0ea5e9" strokeWidth="1.5" />
              </svg>
              <div className="flex justify-between text-[8px] text-slate-500 mt-1 font-semibold">
                <span>Optimal (35-50%)</span>
                <span className="text-emerald-400">Stable</span>
              </div>
            </div>
          </div>

          {/* Card 2: Soil Temp */}
          <div className="glass glass-hover rounded-2xl p-4 flex flex-col justify-between min-h-[140px]">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[10px] text-slate-450 font-bold uppercase">Temperature</span>
                <Thermometer className="w-4 h-4 text-amber-400" />
              </div>
              <h4 className="text-xl font-black text-white mt-2">{sensors.temperature}°C</h4>
            </div>
            <div className="mt-2">
              <svg viewBox="0 0 100 20" className="w-full h-5">
                <path d="M0,15 Q25,8 50,12 T100,6" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
              </svg>
              <div className="flex justify-between text-[8px] text-slate-500 mt-1 font-semibold">
                <span>Normal (22-38°C)</span>
                <span className="text-emerald-400">Warm</span>
              </div>
            </div>
          </div>

          {/* Card 3: Air Humidity */}
          <div className="glass glass-hover rounded-2xl p-4 flex flex-col justify-between min-h-[140px]">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[10px] text-slate-450 font-bold uppercase">Humidity</span>
                <CloudRain className="w-4 h-4 text-teal-400" />
              </div>
              <h4 className="text-xl font-black text-white mt-2">{sensors.humidity}%</h4>
            </div>
            <div className="mt-2">
              <svg viewBox="0 0 100 20" className="w-full h-5">
                <path d="M0,8 Q25,18 50,5 T100,12" fill="none" stroke="#14b8a6" strokeWidth="1.5" />
              </svg>
              <div className="flex justify-between text-[8px] text-slate-500 mt-1 font-semibold">
                <span>Humidex 34°C</span>
                <span className="text-emerald-400">Good</span>
              </div>
            </div>
          </div>

          {/* Card 4: Light Intensity */}
          <div className="glass glass-hover rounded-2xl p-4 flex flex-col justify-between min-h-[140px]">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[10px] text-slate-450 font-bold uppercase">Solar Light</span>
                <Sun className="w-4 h-4 text-amber-300" />
              </div>
              <h4 className="text-xl font-black text-white mt-2">680 <span className="text-[9px] text-slate-500">W/m²</span></h4>
            </div>
            <div className="mt-2">
              <svg viewBox="0 0 100 20" className="w-full h-5">
                <path d="M0,5 Q25,12 50,3 T100,15" fill="none" stroke="#fef08a" strokeWidth="1.5" />
              </svg>
              <div className="flex justify-between text-[8px] text-slate-500 mt-1 font-semibold">
                <span>Peak daylight</span>
                <span className="text-teal-400">Optimal</span>
              </div>
            </div>
          </div>

          {/* Card 5: Water Level */}
          <div className="glass glass-hover rounded-2xl p-4 flex flex-col justify-between min-h-[140px]">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[10px] text-slate-450 font-bold uppercase">Tank Level</span>
                <Droplet className="w-4 h-4 text-blue-400" />
              </div>
              <h4 className="text-xl font-black text-white mt-2">{sensors.waterLevel}%</h4>
            </div>
            <div className="mt-2">
              <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden mt-1.5">
                <div className="bg-blue-500 h-full rounded-full transition-all duration-500" style={{ width: `${sensors.waterLevel}%` }} />
              </div>
              <div className="flex justify-between text-[8px] text-slate-500 mt-1.5 font-semibold">
                <span>Capacity 15k L</span>
                <span className="text-amber-400">Refill soon</span>
              </div>
            </div>
          </div>

          {/* Card 6: Rain Probability */}
          <div className="glass glass-hover rounded-2xl p-4 flex flex-col justify-between min-h-[140px]">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[10px] text-slate-450 font-bold uppercase">Rain Prob</span>
                <CloudRain className="w-4 h-4 text-sky-300" />
              </div>
              <h4 className="text-xl font-black text-white mt-2">12%</h4>
            </div>
            <div className="mt-2">
              <svg viewBox="0 0 100 20" className="w-full h-5">
                <path d="M0,18 Q25,18 50,15 T100,10" fill="none" stroke="#7dd3fc" strokeWidth="1.5" />
              </svg>
              <div className="flex justify-between text-[8px] text-slate-500 mt-1 font-semibold">
                <span>Sky: clear</span>
                <span className="text-slate-400">Dry day</span>
              </div>
            </div>
          </div>

          {/* Card 7: Wind Speed */}
          <div className="glass glass-hover rounded-2xl p-4 flex flex-col justify-between min-h-[140px]">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[10px] text-slate-450 font-bold uppercase">Wind Speed</span>
                <Wind className="w-4 h-4 text-slate-300" />
              </div>
              <h4 className="text-xl font-black text-white mt-2">14 <span className="text-[9px] text-slate-500">km/h</span></h4>
            </div>
            <div className="mt-2">
              <svg viewBox="0 0 100 20" className="w-full h-5">
                <path d="M0,8 Q25,2 50,14 T100,6" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
              </svg>
              <div className="flex justify-between text-[8px] text-slate-500 mt-1 font-semibold">
                <span>Direction: East</span>
                <span className="text-emerald-400">Gentle</span>
              </div>
            </div>
          </div>

          {/* Card 8: Air Quality */}
          <div className="glass glass-hover rounded-2xl p-4 flex flex-col justify-between min-h-[140px]">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[10px] text-slate-450 font-bold uppercase">Air Quality</span>
                <Activity className="w-4 h-4 text-emerald-400" />
              </div>
              <h4 className="text-xl font-black text-white mt-2">42 <span className="text-[9px] text-slate-500">AQI</span></h4>
            </div>
            <div className="mt-2">
              <svg viewBox="0 0 100 20" className="w-full h-5">
                <path d="M0,5 Q25,8 50,5 T100,5" fill="none" stroke="#10b981" strokeWidth="1.5" />
              </svg>
              <div className="flex justify-between text-[8px] text-slate-500 mt-1 font-semibold">
                <span>PM2.5: Good</span>
                <span className="text-emerald-450">Clean</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ─── AI INSIGHTS & DIGITAL TWIN ─────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch animate-fade-in-up-2">
        
        {/* Left: AI Insight Panel */}
        <div className="lg:col-span-7 glass-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="section-label">Gemini Crop Intelligence</span>
              <span className="badge-ai">Real-time prediction</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              
              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] text-slate-500 font-bold uppercase block">Disease Risk</span>
                  <span className="text-lg font-extrabold text-amber-400 block mt-1">9.2% Risk</span>
                  <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                    Favorable weather parameters reduce fungal spore replication forecast.
                  </p>
                </div>
                <button 
                  onClick={() => setActiveView('disease')}
                  className="text-[9px] text-emerald-400 font-bold uppercase flex items-center gap-1 mt-3 hover:text-emerald-300"
                >
                  Diagnose Leaf <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] text-slate-500 font-bold uppercase block">Yield Prediction</span>
                  <span className="text-lg font-extrabold text-emerald-400 block mt-1">+{yieldImprovement}% Est</span>
                  <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                    AI models indicate peak harvest volume under current growth stages.
                  </p>
                </div>
                <button 
                  onClick={() => setActiveView('impact')}
                  className="text-[9px] text-emerald-400 font-bold uppercase flex items-center gap-1 mt-3 hover:text-emerald-300"
                >
                  View Yield <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] text-slate-500 font-bold uppercase block">Water Saving</span>
                  <span className="text-lg font-extrabold text-sky-400 block mt-1">{(waterSaved/1000).toFixed(1)}k Liters</span>
                  <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                    Saved via automated smart-irrigation scheduler & soil telemetry triggers.
                  </p>
                </div>
                <button 
                  onClick={() => setActiveView('planner')}
                  className="text-[9px] text-emerald-400 font-bold uppercase flex items-center gap-1 mt-3 hover:text-emerald-300"
                >
                  Open Budget <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] text-slate-500 font-bold uppercase block">Electricity Saving</span>
                  <span className="text-lg font-extrabold text-amber-500 block mt-1">{electricitySaved} kWh</span>
                  <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                    Pump bypass operations optimized by avoiding overwatering stress.
                  </p>
                </div>
                <button 
                  onClick={() => setActiveView('impact')}
                  className="text-[9px] text-emerald-400 font-bold uppercase flex items-center gap-1 mt-3 hover:text-emerald-300"
                >
                  Analytics <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] text-slate-500 font-bold uppercase block">Carbon Reduction</span>
                  <span className="text-lg font-extrabold text-teal-400 block mt-1">{carbonReduction} kg CO₂</span>
                  <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                    Reduced carbon impact calculated from offset grid electricity usage.
                  </p>
                </div>
                <button 
                  onClick={() => setActiveView('impact')}
                  className="text-[9px] text-emerald-400 font-bold uppercase flex items-center gap-1 mt-3 hover:text-emerald-300"
                >
                  Eco Report <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] text-slate-500 font-bold uppercase block">AI Confidence</span>
                  <span className="text-lg font-extrabold text-indigo-400 block mt-1">96.8% Score</span>
                  <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                    High precision score based on hyper-local weather + soil data sync.
                  </p>
                </div>
                <button 
                  onClick={() => setActiveView('architecture')}
                  className="text-[9px] text-emerald-400 font-bold uppercase flex items-center gap-1 mt-3 hover:text-emerald-300"
                >
                  ML Architecture <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Right: Digital Twin Preview Card */}
        <div className="lg:col-span-5 glass-card p-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 to-transparent pointer-events-none" />
          
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="section-label">Digital Twin Sandbox</span>
              <span className="text-[9px] px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-md font-bold uppercase">
                Active Simulation
              </span>
            </div>
            
            {/* Visual 3D Grid Mockup */}
            <div className="relative w-full h-36 bg-slate-950/80 rounded-xl border border-slate-900 overflow-hidden flex items-center justify-center p-4 [perspective:800px]">
              <div className="absolute inset-0 map-placeholder opacity-60" />
              
              {/* Plot grid with 3D rotation */}
              <div className="w-36 h-24 border border-emerald-500/30 bg-emerald-500/5 rounded-lg flex flex-col justify-between p-2 [transform:rotateX(60deg)_rotateZ(-25deg)] transform-gpu transition-all duration-700 group-hover:[transform:rotateX(50deg)_rotateZ(-15deg)] group-hover:bg-emerald-500/10 group-hover:border-emerald-500/50">
                <div className="flex justify-between">
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-400/20 border border-emerald-400 flex items-center justify-center text-[8px] text-emerald-300 font-bold animate-pulse">1</div>
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-400/20 border border-emerald-400 flex items-center justify-center text-[8px] text-emerald-300 font-bold animate-pulse">2</div>
                </div>
                <div className="h-0.5 bg-emerald-500/40 w-full border-t border-dashed" />
                <div className="flex justify-between items-end">
                  <div className="w-2.5 h-2.5 rounded bg-blue-500/50 animate-bounce" />
                  <div className="w-3 h-3 bg-emerald-500 rounded-sm" />
                </div>
              </div>

              {/* Hologram overlay labels */}
              <div className="absolute top-2 left-2 text-[8.5px] font-bold text-slate-500 uppercase tracking-widest">Zone A-4 Plot</div>
              <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-slate-900/90 border border-slate-800 px-2 py-0.5 rounded text-[8px] text-emerald-400 font-bold">
                <Activity className="w-2.5 h-2.5" /> Normal
              </div>
            </div>
            
            {/* Timeline */}
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-[10px] font-bold">
                <span className="text-slate-400">Vegetative Stage</span>
                <span className="text-emerald-400">72% Completed</span>
              </div>
              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '72%' }} />
              </div>
              <div className="flex justify-between text-[8px] text-slate-500 uppercase tracking-wider font-semibold">
                <span>Sowing (Day 0)</span>
                <span>Tillering</span>
                <span>Harvest (Day 110)</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveView('twin')}
            className="w-full py-2.5 mt-4 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer group"
          >
            <Eye className="w-4 h-4 text-emerald-400 group-hover:scale-115 transition-transform" />
            Enter Complete Digital Twin Page
          </button>
        </div>

      </div>

      {/* ─── QUICK ACTIONS ──────────────────────────────────────── */}
      <div className="space-y-3 animate-fade-in-up-3">
        <span className="section-label px-1">Quick Commands Shortcuts</span>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          
          <div 
            onClick={() => setActiveView('disease')}
            className="glass quick-action-card rounded-2xl p-4 text-center flex flex-col items-center justify-center min-h-[110px]"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-2.5 text-emerald-400">
              <Upload className="w-4.5 h-4.5" />
            </div>
            <span className="text-[10px] font-bold text-white tracking-wide leading-tight">Upload Crop Image</span>
          </div>

          <div 
            onClick={() => setActiveView('voice')}
            className="glass quick-action-card rounded-2xl p-4 text-center flex flex-col items-center justify-center min-h-[110px]"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-2.5 text-purple-400">
              <Mic className="w-4.5 h-4.5" />
            </div>
            <span className="text-[10px] font-bold text-white tracking-wide leading-tight">Talk to AI Assistant</span>
          </div>

          <div 
            onClick={() => setActiveView('planner')}
            className="glass quick-action-card rounded-2xl p-4 text-center flex flex-col items-center justify-center min-h-[110px]"
          >
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-2.5 text-sky-400">
              <Droplet className="w-4.5 h-4.5" />
            </div>
            <span className="text-[10px] font-bold text-white tracking-wide leading-tight">Open Water Planner</span>
          </div>

          <div 
            onClick={() => setActiveView('maps')}
            className="glass quick-action-card rounded-2xl p-4 text-center flex flex-col items-center justify-center min-h-[110px]"
          >
            <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-2.5 text-teal-400">
              <Map className="w-4.5 h-4.5" />
            </div>
            <span className="text-[10px] font-bold text-white tracking-wide leading-tight">Community Map</span>
          </div>

          <div 
            onClick={() => setActiveView('reports')}
            className="glass quick-action-card rounded-2xl p-4 text-center flex flex-col items-center justify-center min-h-[110px]"
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-2.5 text-indigo-400">
              <FileBarChart className="w-4.5 h-4.5" />
            </div>
            <span className="text-[10px] font-bold text-white tracking-wide leading-tight">Generate AI Report</span>
          </div>

          <div 
            onClick={handleExport}
            className="glass quick-action-card rounded-2xl p-4 text-center flex flex-col items-center justify-center min-h-[110px]"
          >
            <div className="w-9 h-9 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center mb-2.5 text-pink-400">
              <FileText className="w-4.5 h-4.5" />
            </div>
            <span className="text-[10px] font-bold text-white tracking-wide leading-tight">Export Analytics</span>
          </div>

          <div 
            onClick={handleRegisterFarm}
            className="glass quick-action-card rounded-2xl p-4 text-center flex flex-col items-center justify-center min-h-[110px]"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-2.5 text-amber-400">
              <PlusCircleIcon />
            </div>
            <span className="text-[10px] font-bold text-white tracking-wide leading-tight">Register New Farm</span>
          </div>

          <div 
            onClick={() => setActiveView('notifications')}
            className="glass quick-action-card rounded-2xl p-4 text-center flex flex-col items-center justify-center min-h-[110px]"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-2.5 text-blue-400">
              <Bell className="w-4.5 h-4.5" />
            </div>
            <span className="text-[10px] font-bold text-white tracking-wide leading-tight">View Notifications</span>
          </div>

        </div>
      </div>

      {/* ─── ANALYTICS DASHBOARD ────────────────────────────────── */}
      <div className="glass-card p-6 space-y-6 animate-fade-in-up-4">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-900 pb-4">
          <div>
            <span className="section-label">Interactive Analytics Panel</span>
            <h3 className="text-base font-bold text-white tracking-tight mt-1">Farm Performance & Diagnostic Charts</h3>
          </div>
          
          <div className="flex flex-wrap bg-slate-950/60 p-1.5 rounded-xl border border-slate-900 gap-1">
            {[
              { id: 'soil', label: 'Soil Moisture' },
              { id: 'temp', label: 'Temperature' },
              { id: 'water', label: 'Water Usage' },
              { id: 'growth', label: 'Crop Growth' },
              { id: 'yield', label: 'Yield Forecast' },
              { id: 'disease', label: 'Disease Prob' },
              { id: 'performance', label: 'Efficiency Index' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveChartTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all uppercase tracking-wider ${
                  activeChartTab === tab.id
                    ? 'bg-emerald-500/15 border border-emerald-500/20 text-emerald-400'
                    : 'text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Chart Rendering */}
        <div className="h-80 w-full bg-slate-950/20 p-4 rounded-2xl border border-slate-900/60 relative">
          
          <ResponsiveContainer width="100%" height="100%">
            {activeChartTab === 'soil' ? (
              <AreaChart data={soilMoistureHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="moistureGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.01}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} />
                <XAxis dataKey="time" stroke="#475569" fontSize={10} tickLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} domain={[0, 100]} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '10px', marginTop: '10px' }} />
                <Area type="monotone" dataKey="moisture" name="Soil Moisture (%)" stroke="#0ea5e9" strokeWidth={2.5} fillOpacity={1} fill="url(#moistureGradient)" />
                <Line type="monotone" dataKey="optimalMin" name="Threshold Min" stroke="#ef4444" strokeWidth={1} strokeDasharray="4 4" dot={false} />
                <Line type="monotone" dataKey="optimalMax" name="Threshold Max" stroke="#10b981" strokeWidth={1} strokeDasharray="4 4" dot={false} />
              </AreaChart>
            ) : activeChartTab === 'temp' ? (
              <LineChart data={tempTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} />
                <XAxis dataKey="time" stroke="#475569" fontSize={10} tickLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} domain={[10, 45]} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '10px', marginTop: '10px' }} />
                <Line type="monotone" dataKey="dayTemp" name="Day Temp (°C)" stroke="#f59e0b" strokeWidth={2.5} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="nightTemp" name="Night Temp (°C)" stroke="#6366f1" strokeWidth={2} />
              </LineChart>
            ) : activeChartTab === 'water' ? (
              <BarChart data={waterUsageData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} />
                <XAxis dataKey="week" stroke="#475569" fontSize={10} tickLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '10px', marginTop: '10px' }} />
                <Bar dataKey="budget" name="Water Budget (L)" fill="#1e293b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actual" name="Actual Consumption (L)" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : activeChartTab === 'growth' ? (
              <AreaChart data={cropGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} />
                <XAxis dataKey="day" stroke="#475569" fontSize={10} tickLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '10px', marginTop: '10px' }} />
                <Area type="monotone" dataKey="riceHeight" name="Basmati Rice Height (cm)" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#growthGrad)" />
                <Line type="monotone" dataKey="target" name="Target Height Curve" stroke="#64748b" strokeWidth={1.5} strokeDasharray="3 3" />
              </AreaChart>
            ) : activeChartTab === 'yield' ? (
              <AreaChart data={yieldForecastData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="yieldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} />
                <XAxis dataKey="stage" stroke="#475569" fontSize={10} tickLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} domain={[50, 110]} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '10px', marginTop: '10px' }} />
                <Area type="monotone" dataKey="currentEst" name="Yield Estimate Index" stroke="#14b8a6" strokeWidth={2.5} fillOpacity={1} fill="url(#yieldGrad)" />
                <Line type="monotone" dataKey="potentialMax" name="Max Bio Yield Curve" stroke="#10b981" strokeWidth={1} strokeDasharray="5 5" />
              </AreaChart>
            ) : activeChartTab === 'disease' ? (
              <LineChart data={diseaseProbabilityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} />
                <XAxis dataKey="date" stroke="#475569" fontSize={10} tickLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} domain={[0, 50]} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '10px', marginTop: '10px' }} />
                <Line type="monotone" dataKey="blastProb" name="Leaf Blast Prob (%)" stroke="#ef4444" strokeWidth={2} />
                <Line type="monotone" dataKey="blightProb" name="Bacterial Blight (%)" stroke="#f59e0b" strokeWidth={2} />
              </LineChart>
            ) : (
              <ComposedChart data={weeklyPerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.3} />
                <XAxis dataKey="day" stroke="#475569" fontSize={10} tickLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: '10px', marginTop: '10px' }} />
                <Bar dataKey="waterIndex" name="Water Efficiency (%)" fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={20} />
                <Line type="monotone" dataKey="soilScore" name="Soil Condition Score" stroke="#f59e0b" strokeWidth={2} />
                <Line type="monotone" dataKey="efficiency" name="Overall Efficiency" stroke="#10b981" strokeWidth={2.5} />
              </ComposedChart>
            )}
          </ResponsiveContainer>
        </div>

      </div>

      {/* ─── COMMUNITY INTELLIGENCE ─────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch animate-fade-in-up-5">
        
        {/* Left: Alerts & Updates Feed */}
        <div className="lg:col-span-7 glass-card p-6 flex flex-col justify-between">
          <div>
            <span className="section-label mb-4 block">Regional Alert Updates</span>
            <div className="space-y-4">
              
              <div className="flex items-start gap-3 p-3 bg-red-500/5 border border-red-500/15 rounded-xl">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">Yellow Rust Infection Alert</span>
                    <span className="text-[8px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded font-bold uppercase">Spotted 3km S</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                    Spore spread detected in neighboring paddy plots. Maintain soil moisture levels above 38% and treat leaves with copper oxychloride if spotting emerges.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-amber-500/5 border border-amber-500/15 rounded-xl">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">Bhadrak Canals Release Change</span>
                    <span className="text-[8px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-bold uppercase">Govt Scheme</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                    Local irrigation branch notified a temporary 12h canal shutoff starting Thursday. Adjust water tank level simulations and planner buffers accordingly.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-emerald-500/5 border border-emerald-500/15 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">Community Spray Completed</span>
                    <span className="text-[8px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-bold uppercase">Resolved</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                    Cooperative pest suppression completed across 45 contiguous acres in North Block. Outbreak risk decreased significantly.
                  </p>
                </div>
              </div>

            </div>
          </div>

          <button 
            onClick={() => setActiveView('maps')}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-350 hover:text-white rounded-xl text-xs font-bold mt-6 transition-all"
          >
            Access Community Intel Feed
          </button>
        </div>

        {/* Right: Map and Radius Slider */}
        <div className="lg:col-span-5 glass-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="section-label">Active Alert Radius Map</span>
              <span className="text-xs text-white font-bold">{alertRadius} km Radius</span>
            </div>
            
            {/* Dynamic Map Visualization */}
            <div className="relative w-full h-40 rounded-xl border border-slate-900 overflow-hidden flex items-center justify-center bg-slate-950/80">
              <div className="absolute inset-0 map-placeholder opacity-50" />
              
              {/* Radius circle indicator */}
              <div 
                className="rounded-full border border-emerald-500/40 bg-emerald-500/5 flex items-center justify-center transition-all duration-300 relative"
                style={{
                  width: `${Math.min(100, Math.max(30, alertRadius * 6))}%`,
                  height: `${Math.min(100, Math.max(30, alertRadius * 6))}%`,
                }}
              >
                {/* Ping radar line */}
                <div className="absolute inset-0 rounded-full border border-emerald-500/60 animate-sensor-pulse" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 glow-green" />
                
                {/* Infection dots */}
                <div className="absolute top-1/4 left-1/3 w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.7)]" title="Fungal infection spot" />
                <div className="absolute bottom-1/3 right-1/4 w-2 h-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.7)]" title="Waterlogging spot" />
              </div>

              {/* Holographic overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-slate-950/90 border-t border-slate-900 p-2 flex justify-between items-center text-[9px]">
                <span className="text-slate-500">Center: Bhadrak Node</span>
                <span className="text-red-400 font-bold">1 Danger Spot</span>
              </div>
            </div>
            
            {/* Radius slider control */}
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-[10px] font-semibold text-slate-400">
                <span>Filter Distance</span>
                <span>Max 50 km</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                value={alertRadius}
                onChange={(e) => setAlertRadius(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800 rounded-lg cursor-pointer h-1.5"
              />
            </div>
          </div>

          <button 
            onClick={() => setActiveView('maps')}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-350 hover:text-white rounded-xl text-xs font-bold mt-4 transition-all"
          >
            Maximize Map Grid
          </button>
        </div>

      </div>

      {/* ─── TIMELINE & NOTIFICATION DETAILS ─────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left: Activity Timeline */}
        <div className="lg:col-span-7 glass-card p-6">
          <span className="section-label mb-6 block">Farm Activity Timeline</span>
          
          <div className="relative pl-8 space-y-6">
            
            {/* Entry 1 */}
            <div className="relative">
              <div className="timeline-connector" />
              <div className="absolute -left-8 top-0.5 w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/35 flex items-center justify-center z-10">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-white">Smart Irrigation scheduler active</span>
                  <span className="text-[9px] text-slate-500 font-semibold">Today 06:12 AM</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                  Triggered pump 2 execution for Basmati Plot 4. Discharged 420 liters in 20 minutes before automated soil humidity shutdown cut-off threshold.
                </p>
              </div>
            </div>

            {/* Entry 2 */}
            <div className="relative">
              <div className="timeline-connector" />
              <div className="absolute -left-8 top-0.5 w-6 h-6 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center z-10">
                <span className="w-2 h-2 rounded-full bg-red-500" />
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-white">Leaf Disease Spotting analysis</span>
                  <span className="text-[9px] text-slate-500 font-semibold">Yesterday 04:35 PM</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                  AI analyzed leaf photo uploaded by Ramesh Patel. Identified **Brown Spot** with 94.2% diagnostic confidence. Emailed recipe sheet.
                </p>
              </div>
            </div>

            {/* Entry 3 */}
            <div className="relative">
              <div className="timeline-connector" />
              <div className="absolute -left-8 top-0.5 w-6 h-6 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center z-10">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-white">Soil sensor calibration sync</span>
                  <span className="text-[9px] text-slate-500 font-semibold">Yesterday 11:00 AM</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                  GCP IoT telemetry sync updated calibration constants. Moisture offset corrected by +1.5% to sync baseline parameters.
                </p>
              </div>
            </div>

            {/* Entry 4 */}
            <div className="relative">
              <div className="absolute -left-8 top-0.5 w-6 h-6 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center z-10">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-white">PM-KISAN installment query</span>
                  <span className="text-[9px] text-slate-500 font-semibold">05-Jul 02:24 PM</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                  Voice Assistant answered query regarding status of 17th scheme installment. Synced direct transfer transaction update details.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Right: Notification Alerts Details */}
        <div className="lg:col-span-5 glass-card p-6 flex flex-col justify-between">
          <div>
            <span className="section-label mb-4 block">Active Notification Center</span>
            
            <div className="space-y-3">
              
              <div className="p-3 bg-slate-900/60 border border-slate-850 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/15 flex items-center justify-center text-sky-400">
                    <CloudRain className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Rain Forecast (8mm)</span>
                    <span className="text-[9px] text-slate-500">Expected: Tomorrow afternoon</span>
                  </div>
                </div>
                <span className="text-[9px] text-emerald-400 font-bold uppercase">Incoming</span>
              </div>

              <div className="p-3 bg-slate-900/60 border border-slate-850 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/15 flex items-center justify-center text-red-400">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Disease Outbreak Alert</span>
                    <span className="text-[9px] text-slate-500">Yellow Rust within 15km</span>
                  </div>
                </div>
                <span className="text-[9px] text-red-400 font-bold uppercase">Danger</span>
              </div>

              <div className="p-3 bg-slate-900/60 border border-slate-850 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-400">
                    <Droplets className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Low Moisture Alert</span>
                    <span className="text-[9px] text-slate-500">Zone B moisture: 28%</span>
                  </div>
                </div>
                <span className="text-[9px] text-amber-450 font-bold uppercase">Warning</span>
              </div>

              <div className="p-3 bg-slate-900/60 border border-slate-850 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Irrigation Scheduled</span>
                    <span className="text-[9px] text-slate-500">Scheduled: 09-Jul 06:00 AM</span>
                  </div>
                </div>
                <span className="text-[9px] text-emerald-400 font-bold uppercase">Ready</span>
              </div>

              <div className="p-3 bg-slate-900/60 border border-slate-850 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/15 flex items-center justify-center text-indigo-400">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Harvest Reminder Alert</span>
                    <span className="text-[9px] text-slate-500">Est. harvest in 4 weeks</span>
                  </div>
                </div>
                <span className="text-[9px] text-indigo-400 font-bold uppercase">Notified</span>
              </div>

            </div>
          </div>

          <button 
            onClick={() => setActiveView('notifications')}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-350 hover:text-white rounded-xl text-xs font-bold mt-4 transition-all"
          >
            Review All System Alerts
          </button>
        </div>

      </div>

    </div>
  );
};

