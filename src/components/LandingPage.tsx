import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Leaf, 
  Brain, 
  ShieldCheck, 
  CloudSun, 
  Droplet, 
  TrendingUp, 
  Mic, 
  Landmark, 
  MessageSquare, 
  HelpCircle, 
  Mail, 
  Phone, 
  MapPin, 
  Users, 
  CheckCircle,
  Play,
  Calendar,
  Layers,
  Activity,
  Cpu,
  Star,
  ChevronDown
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const features = [
    {
      icon: <Leaf className="w-6 h-6 text-emerald-400" />,
      title: "Digital Twin Visualization",
      desc: "An interactive, real-time 3D grid layout showcasing soil parameters, moisture vectors, and vegetative health levels of your farm."
    },
    {
      icon: <Brain className="w-6 h-6 text-emerald-400" />,
      title: "Gemini Crop Intelligence",
      desc: "Leverage advanced AI algorithms to generate hyper-local yield predictions, risk alerts, and real-time advisory logs."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: "Disease Identification",
      desc: "Upload a photo of crop leaves to analyze symptoms. Instantly receive explainable diagnoses and treatment recommendations."
    },
    {
      icon: <CloudSun className="w-6 h-6 text-emerald-400" />,
      title: "Telemetry Weather Diagnostics",
      desc: "Integrate weather stations and micro-climate forecasting to dynamic crop planning models for precise planning."
    },
    {
      icon: <Droplet className="w-6 h-6 text-emerald-400" />,
      title: "Smart Water Budget Planner",
      desc: "Optimize irrigation schedules using deep learning and soil hydration thresholds to save thousands of liters of water."
    },
    {
      icon: <Landmark className="w-6 h-6 text-emerald-400" />,
      title: "Government Schemes Portal",
      desc: "Instantly check eligibility, track application status, and view transaction details for programs like PM-KISAN."
    },
    {
      icon: <Mic className="w-6 h-6 text-emerald-400" />,
      title: "Multilingual AI Voice Assistant",
      desc: "Interact naturally in English, Hindi, or Odia to query farm vitals, schedule pumps, or fetch scheme details hands-free."
    },
    {
      icon: <Users className="w-6 h-6 text-emerald-400" />,
      title: "Community Intelligence Mapping",
      desc: "Interactive spatial map tracking regional pest outbreaks, canal water releases, and cooperative management updates."
    }
  ];

  const stats = [
    { value: "35k+", label: "Liters Water Saved / Farm" },
    { value: "14%", label: "Average Crop Yield Increase" },
    { value: "240+", label: "kWh Saved in Pump Operations" },
    { value: "96.8%", label: "AI Diagnostic Accuracy" }
  ];

  const faqs = [
    {
      q: "What is KisanAlert 360°?",
      a: "KisanAlert 360° is an advanced AI-powered farm management platform and Digital Twin system. It leverages Google Cloud IoT, hyper-local sensor telemetry, and advanced machine learning models (like Gemini) to optimize crop yield, monitor soil health, automate irrigation, and detect crop diseases."
    },
    {
      q: "How does the Crop Disease Detection work?",
      a: "By using computer vision, our AI analyzes uploaded photos of leaves to identify pests, deficiencies, and infections (like Yellow Rust or Brown Spot). It provides explainable confidence levels, treatment options, and chemical recipes."
    },
    {
      q: "Is the voice assistant available in regional languages?",
      a: "Yes! The platform is designed with multilingual inclusivity in mind. The voice assistant and complete dashboard fully support English, Hindi, and Odia, allowing farmers to query metrics verbally."
    },
    {
      q: "How does the Water Budget Planner optimize irrigation?",
      a: "It monitors live soil moisture telemetry, transpiration rates, and forecast precipitation. The system then automatically calculates exact water requirements, preventing over-watering or under-watering."
    }
  ];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans overflow-x-hidden selection:bg-emerald-500/30 selection:text-emerald-400">
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -z-10 animate-pulse-slow" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[150px] -z-10" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] -z-10" />

      {/* Header / Navbar */}
      <header className="h-20 border-b border-slate-900 bg-[#070b14]/70 backdrop-blur-xl sticky top-0 z-50 transition-all">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center glow-green shrink-0">
              <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight text-white font-sans flex items-center gap-1.5">
                Kisan Alert <span className="text-emerald-400 text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 font-bold">360°</span>
              </h1>
              <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">AI Digital Twin Portal</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-350">
            <a href="#about" className="hover:text-emerald-400 transition-colors">About</a>
            <a href="#features" className="hover:text-emerald-400 transition-colors">Features</a>
            <a href="#twin-preview" className="hover:text-emerald-400 transition-colors">Digital Twin</a>
            <a href="#testimonials" className="hover:text-emerald-400 transition-colors">Success Stories</a>
            <a href="#faq" className="hover:text-emerald-400 transition-colors">FAQs</a>
          </div>

          <button 
            onClick={onGetStarted}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 flex items-center gap-1.5 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
          >
            Launch Command Center
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-24 px-6 relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
              Revolutionizing Agriculture with Gemini AI
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] font-sans">
              The Next Gen <br />
              <span className="gradient-emerald-text">Digital Twin</span> for <br />
              Smart Farming.
            </h1>
            
            <p className="text-base text-slate-400 leading-relaxed max-w-xl">
              Monitor soil telemetry, forecast regional disease spreads, optimize water budgets, and chat with your AI crop advisor hands-free. All in one cohesive real-time cockpit.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={onGetStarted}
                className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-extrabold transition-all shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30 flex items-center gap-2 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
              >
                Access Dashboard
                <ArrowRight className="w-4.5 h-4.5" />
              </button>
              <a 
                href="#features"
                className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer hover:border-slate-700"
              >
                Explore Modules
              </a>
            </div>

            {/* Micro Badges */}
            <div className="pt-8 border-t border-slate-900 grid grid-cols-3 gap-6 max-w-lg">
              <div>
                <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-extrabold">Powered by</span>
                <span className="text-xs font-bold text-slate-300 block mt-1">Google Cloud IoT</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-extrabold">AI Advisor</span>
                <span className="text-xs font-bold text-emerald-450 block mt-1">Gemini Pro 1.5</span>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-extrabold">Inclusivity</span>
                <span className="text-xs font-bold text-slate-300 block mt-1">3 Native Languages</span>
              </div>
            </div>
          </div>

          {/* Interactive Mockup Grid */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-[80px] -z-10 animate-pulse" />
            <div className="glass-card p-5 border border-slate-800 rounded-3xl relative overflow-hidden shadow-2xl scale-102 hover:scale-105 transition-transform duration-500">
              
              {/* Mock Dashboard Top */}
              <div className="flex items-center justify-between border-b border-slate-900 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                <div className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  LIVE STREAM ACTIVE
                </div>
              </div>

              {/* Mock telemetry blocks */}
              <div className="grid grid-cols-2 gap-3.5 mb-4">
                <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-3.5 space-y-2">
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase">
                    <span>Moisture</span>
                    <Droplet className="w-3.5 h-3.5 text-sky-400" />
                  </div>
                  <div className="text-xl font-black text-white">38%</div>
                  <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
                    <div className="bg-sky-400 h-full rounded-full" style={{width: '38%'}} />
                  </div>
                </div>

                <div className="bg-slate-950/60 border border-slate-900 rounded-xl p-3.5 space-y-2">
                  <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase">
                    <span>Yield Index</span>
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-xl font-black text-white">+14.2%</div>
                  <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full" style={{width: '78%'}} />
                  </div>
                </div>
              </div>

              {/* Mock Map / Plot View */}
              <div className="w-full h-36 bg-slate-950/80 rounded-xl border border-slate-900 overflow-hidden relative flex items-center justify-center p-4">
                <div className="absolute inset-0 map-placeholder opacity-60" />
                <div className="w-28 h-18 border border-emerald-500/30 bg-emerald-500/5 rounded-lg flex flex-col justify-between p-1.5 [transform:rotateX(55deg)_rotateZ(-20deg)] transform-gpu">
                  <div className="flex justify-between">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/20 border border-emerald-450 flex items-center justify-center text-[6px] text-emerald-300 font-bold">1</div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/20 border border-emerald-450 flex items-center justify-center text-[6px] text-emerald-300 font-bold">2</div>
                  </div>
                  <div className="h-0.5 bg-emerald-500/30 w-full border-t border-dashed" />
                  <div className="flex justify-between items-end">
                    <div className="w-1.5 h-1.5 rounded bg-blue-500/50 animate-bounce" />
                    <div className="w-2 h-2 bg-emerald-500 rounded-sm" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-slate-900/90 border border-slate-850 px-2 py-0.5 rounded text-[8px] text-emerald-400 font-bold">
                  <Activity className="w-2.5 h-2.5" /> Sensor Grid Normal
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 border-t border-slate-950 bg-[#0b0f19]/20 relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 relative order-last lg:order-first">
            <div className="glass-card p-6 rounded-3xl border border-slate-850 bg-slate-950/40 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 font-bold">
                  RP
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Ramesh Patel</h4>
                  <p className="text-[9px] text-slate-500 uppercase tracking-wider font-semibold">Basmati Rice Cultivator</p>
                </div>
              </div>
              <p className="text-xs text-slate-350 italic leading-relaxed">
                "By using KisanAlert's Digital Twin, I could easily see which sections of my farm were thirsty. It automatically cut irrigation pump runs based on soil saturation levels, saving me water and power."
              </p>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-emerald-400 stroke-none" />)}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="text-[10px] text-emerald-400 font-extrabold uppercase tracking-widest block">About KisanAlert 360°</span>
            <h2 className="text-3xl font-black text-white tracking-tight leading-tight">
              Bridging Traditional Agriculture with Cloud AI and Digital Twins.
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              KisanAlert 360° acts as the virtual replica of your physical farm, combining localized IoT telemetry (soil moisture, temperature, humidity, light intensity) with advanced AI analysis. Designed to promote sustainable resource management, reduce carbon footprints, and maximize overall output.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Hyper-Local Diagnostics</h4>
                  <p className="text-[11px] text-slate-450 mt-1 leading-relaxed">Continuous telemetry processing on GCP rather than static regional forecasts.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Explainable AI Recommendations</h4>
                  <p className="text-[11px] text-slate-450 mt-1 leading-relaxed">Don't just get predictions: receive clear actionable advice on how to treat or optimize.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* AI Features Section */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center space-y-3 mb-16">
          <span className="text-[10px] text-emerald-400 font-extrabold uppercase tracking-widest block">Core Capabilities</span>
          <h2 className="text-3xl font-black text-white tracking-tight">AI-Powered Farming Modules</h2>
          <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">
            Every feature is fine-tuned to keep your crops growing optimally while conserving water, electricity, and time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => (
            <div 
              key={idx} 
              className="glass rounded-2xl p-5 border border-slate-850 flex flex-col justify-between hover:border-emerald-500/30 transition-all hover:translate-y-[-4px] duration-300 relative group overflow-hidden"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5 glow-green">
                  {feat.icon}
                </div>
                <h3 className="text-sm font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-[11px] text-slate-405 leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Digital Twin Showcase */}
      <section id="twin-preview" className="py-24 border-t border-slate-950 bg-[#0b0f19]/25 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-[10px] text-emerald-400 font-extrabold uppercase tracking-widest block">Interactive Live Sandbox</span>
            <h2 className="text-3xl font-black text-white tracking-tight">Your Farm's Virtual Twin replica</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Our Digital Twin engine integrates with GCP IoT telemetry streams. The grid changes state, visualizing soil moisture sectors, nitrogen levels, and potential risk thresholds dynamically so you can adjust schedules before signs of stress develop.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 p-3 bg-slate-900/40 border border-slate-850 rounded-xl">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-200">Moisture Index: Normal Growth Stage Range</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-900/40 border border-slate-850 rounded-xl">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400 shrink-0" />
                <span className="text-xs font-semibold text-slate-200">Dynamic Water Pump calibration algorithms active</span>
              </div>
            </div>
          </div>

          {/* Interactive Demo Twin UI */}
          <div className="lg:col-span-6">
            <div className="glass-card p-6 border border-slate-800 rounded-3xl space-y-6 relative overflow-hidden bg-slate-950/20">
              <div className="absolute inset-0 map-placeholder opacity-20 pointer-events-none" />
              <div className="flex justify-between items-center relative z-10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">Zone A-4 Telemetry</span>
                </div>
                <span className="text-[9px] bg-emerald-500/15 text-emerald-450 border border-emerald-500/20 px-2 py-0.5 rounded font-bold">OPTIMAL</span>
              </div>

              {/* Interactive sliders/controls demo */}
              <div className="space-y-4 relative z-10">
                <div>
                  <div className="flex justify-between text-[10px] font-bold text-slate-450 uppercase mb-1.5">
                    <span>Soil Moisture Level</span>
                    <span className="text-emerald-400">38%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '38%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-bold text-slate-450 uppercase mb-1.5">
                    <span>Nitrogen (N) Content</span>
                    <span className="text-emerald-400">128 mg/kg</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '68%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-bold text-slate-450 uppercase mb-1.5">
                    <span>Phosphorus (P) Content</span>
                    <span className="text-amber-450">42 mg/kg</span>
                  </div>
                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full" style={{ width: '42%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Previews Grid: Weather, Disease, Water Planner, Schemes, Voice */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center space-y-3 mb-16">
          <span className="text-[10px] text-emerald-400 font-extrabold uppercase tracking-widest block">Interactive Previews</span>
          <h2 className="text-3xl font-black text-white tracking-tight">Inside the Platform</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Weather Preview */}
          <div className="bg-slate-950/40 border border-slate-900 p-6 rounded-2xl relative space-y-4">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Live Weather Preview</span>
              <CloudSun className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-extrabold text-white">31°C</span>
              <div>
                <span className="text-xs font-semibold text-slate-350 block">Scattered Clouds</span>
                <span className="text-[9px] text-slate-500">Bhadrak district, Odisha</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-450 leading-relaxed">
              Vitals synced 2 minutes ago. Precipitation probability is 12% for the afternoon. Adjusting drip schedules.
            </p>
          </div>

          {/* Disease Detection Preview */}
          <div className="bg-slate-950/40 border border-slate-900 p-6 rounded-2xl relative space-y-4">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Disease Identification</span>
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="bg-slate-900/60 border border-slate-850 p-3 rounded-xl space-y-2">
              <div className="flex justify-between text-[10px] font-bold">
                <span className="text-white">Brown Spot Diagnosis</span>
                <span className="text-amber-400">94.2% Match</span>
              </div>
              <p className="text-[9px] text-slate-400">Apply target spray formula and adjust localized irrigation levels.</p>
            </div>
            <p className="text-[11px] text-slate-450 leading-relaxed">
              Provides detailed recommendations for rice, wheat, cotton, and auxiliary crop categories.
            </p>
          </div>

          {/* Water Budget Planner Preview */}
          <div className="bg-slate-950/40 border border-slate-900 p-6 rounded-2xl relative space-y-4">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Smart Water Planner</span>
              <Droplet className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-sky-400">34.2k Liters</span>
              <span className="text-[9px] text-slate-500 font-bold uppercase">Saved to date</span>
            </div>
            <p className="text-[11px] text-slate-450 leading-relaxed">
              Automated scheduler monitors moisture changes and turns off pumps dynamically before wastage occurs.
            </p>
          </div>

          {/* Government Schemes Preview */}
          <div className="bg-slate-950/40 border border-slate-900 p-6 rounded-2xl relative space-y-4">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Government Schemes</span>
              <Landmark className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold border-b border-slate-900 pb-1.5">
                <span className="text-white">PM-KISAN Installment</span>
                <span className="text-emerald-400">DISBURSED</span>
              </div>
              <div className="flex justify-between text-[10px] font-semibold">
                <span className="text-slate-400">Value Received</span>
                <span className="text-white">₹2,000</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-450 leading-relaxed">
              Integrates directly to direct-benefit portal records to view updates and verify status records.
            </p>
          </div>

          {/* Voice Assistant Preview */}
          <div className="bg-slate-950/40 border border-slate-900 p-6 rounded-2xl relative space-y-4 md:col-span-2">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">AI Voice Assistant</span>
              <Mic className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="bg-slate-900/60 border border-slate-850 p-2.5 rounded-xl self-start text-[10px] text-slate-300 max-w-[80%]">
                "What is my soil moisture levels right now?"
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/10 p-2.5 rounded-xl self-end text-[10px] text-emerald-400 max-w-[80%] text-right font-semibold">
                "Soil moisture is currently at 38%. Condition is optimal."
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 border-y border-slate-950 bg-[#0b0f19]/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center space-y-1">
                <h3 className="text-4xl sm:text-5xl font-black text-white tracking-tight">{stat.value}</h3>
                <p className="text-[11px] text-slate-450 font-bold uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center space-y-3 mb-16">
          <span className="text-[10px] text-emerald-400 font-extrabold uppercase tracking-widest block">Success Stories</span>
          <h2 className="text-3xl font-black text-white tracking-tight">What Farmers Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950/40 border border-slate-900 p-6 rounded-2xl space-y-4">
            <p className="text-xs text-slate-400 leading-relaxed italic">
              "Being able to upload a leaf photograph and immediately learn it was Bacterial Blight saved my cotton field. The chemical ratio advice was precise."
            </p>
            <div>
              <h4 className="text-xs font-bold text-white">Anil Mandavi</h4>
              <p className="text-[9px] text-slate-500 font-bold uppercase mt-0.5">Gujarat Region</p>
            </div>
          </div>

          <div className="bg-slate-950/40 border border-slate-900 p-6 rounded-2xl space-y-4">
            <p className="text-xs text-slate-400 leading-relaxed italic">
              "The voice assistant is extremely convenient. I can ask about PM-KISAN scheme updates in Hindi while working out in the field."
            </p>
            <div>
              <h4 className="text-xs font-bold text-white">Devendra Singh</h4>
              <p className="text-[9px] text-slate-500 font-bold uppercase mt-0.5">Punjab Region</p>
            </div>
          </div>

          <div className="bg-slate-950/40 border border-slate-900 p-6 rounded-2xl space-y-4">
            <p className="text-xs text-slate-400 leading-relaxed italic">
              "We've reduced overall power usage by 20% on our tube wells by following the scheduler. The water saved metrics are real."
            </p>
            <div>
              <h4 className="text-xs font-bold text-white">Sarat Chandra</h4>
              <p className="text-[9px] text-slate-500 font-bold uppercase mt-0.5">Odisha Region</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 border-t border-slate-950 bg-[#0b0f19]/20 px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-[10px] text-emerald-400 font-extrabold uppercase tracking-widest block">Got Questions?</span>
            <h2 className="text-3xl font-black text-white tracking-tight">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-slate-950/40 border border-slate-900 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left font-bold text-xs text-white hover:text-emerald-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${activeFaq === idx ? 'rotate-180 text-emerald-400' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className="px-5 pb-4 text-[11px] text-slate-400 leading-relaxed border-t border-slate-900/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-[#070b14] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>
            <span className="text-xs font-bold text-white">Kisan Alert 360°</span>
          </div>

          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex gap-8">
            <a href="#about" className="hover:text-emerald-400 transition-colors">About</a>
            <a href="#features" className="hover:text-emerald-400 transition-colors">Features</a>
            <a href="#faq" className="hover:text-emerald-400 transition-colors">FAQs</a>
          </div>

          <p className="text-[10px] text-slate-500">
            © {new Date().getFullYear()} KisanAlert 360°. Built for the Google Cloud Hackathon.
          </p>
        </div>
      </footer>

    </div>
  );
};
