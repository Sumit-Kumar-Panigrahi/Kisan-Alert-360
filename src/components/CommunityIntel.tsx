import React, { useState } from 'react';
import { MapPin, ShieldAlert, Users, Radio, ZoomIn, ZoomOut } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface Hotspot {
  id: string;
  farmOwner: string;
  crop: string;
  disease: string;
  distance: string;
  severity: 'high' | 'medium' | 'low';
  lat: number;
  lng: number;
}

const mockHotspots: Hotspot[] = [
  { id: '1', farmOwner: 'Harish Das', crop: 'Rice', disease: 'Brown Spot Fungus', distance: '3.2 km', severity: 'high', lat: 210, lng: 180 },
  { id: '2', farmOwner: 'Subhas Mohanty', crop: 'Rice', disease: 'Rice Blast', distance: '5.8 km', severity: 'medium', lat: 310, lng: 320 },
  { id: '3', farmOwner: 'Kamal Kant', crop: 'Cotton', disease: 'Bacterial Blight', distance: '12.4 km', severity: 'low', lat: 150, lng: 420 },
];

export const CommunityIntel: React.FC = () => {
  const { triggerNotification } = useApp();
  const [selectedRadius, setSelectedRadius] = useState<number>(10); // in km
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'high'>('all');
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);

  const handleHotspotClick = (spot: Hotspot) => {
    setSelectedHotspot(spot);
    triggerNotification(
      'Outbreak Detail Visited',
      `Inspecting ${spot.disease} hotspot at ${spot.farmOwner}'s farm (${spot.distance} away).`,
      'info'
    );
  };

  const filteredSpots = mockHotspots.filter(spot => {
    if (filterSeverity === 'high' && spot.severity !== 'high') return false;
    return true;
  });

  return (
    <div className="p-8 space-y-8 overflow-y-auto max-h-[calc(100vh-80px)]">
      {/* Title */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Community Intelligence Map</h2>
          <p className="text-sm text-slate-400">Google Maps Platform showing neighborhood disease outbreaks and warning circles</p>
        </div>
        
        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs font-semibold">
            <button 
              onClick={() => setFilterSeverity('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${filterSeverity === 'all' ? 'bg-emerald-500 text-white' : 'text-slate-400'}`}
            >
              All Outbreaks
            </button>
            <button 
              onClick={() => setFilterSeverity('high')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${filterSeverity === 'high' ? 'bg-emerald-500 text-white' : 'text-slate-400'}`}
            >
              High Severity
            </button>
          </div>

          <select
            value={selectedRadius}
            onChange={(e) => setSelectedRadius(Number(e.target.value))}
            className="bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 font-semibold focus:outline-none"
          >
            <option value={5}>5 km Alert Radius</option>
            <option value={10}>10 km Alert Radius</option>
            <option value={15}>15 km Alert Radius</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map Simulator Panel */}
        <div className="lg:col-span-2 glass rounded-3xl p-4 min-h-[460px] relative overflow-hidden bg-slate-950/40 flex flex-col justify-between">
          
          {/* Map Controls Floating Overlay */}
          <div className="absolute top-6 left-6 z-20 bg-slate-900/90 border border-slate-800 rounded-xl p-2 flex flex-col gap-1.5 backdrop-blur-md">
            <button className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white" title="Zoom In"><ZoomIn className="w-4 h-4" /></button>
            <button className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white" title="Zoom Out"><ZoomOut className="w-4 h-4" /></button>
          </div>

          {/* Alert Broadcast Floating Banner */}
          <div className="absolute top-6 right-6 z-20 bg-red-500/10 border border-red-500/30 rounded-xl px-3 py-1.5 text-[10px] text-red-400 font-bold tracking-wide uppercase flex items-center gap-1.5 backdrop-blur-md animate-pulse">
            <Radio className="w-3.5 h-3.5" />
            <span>Alert Circle Active</span>
          </div>

          {/* Interactive Custom SVG Map */}
          <div className="w-full flex-1 flex items-center justify-center p-4 min-h-[360px]">
            <svg viewBox="0 0 600 350" className="w-full h-full bg-[#0c1221] rounded-2xl border border-slate-900 relative">
              {/* Map grid lines */}
              <defs>
                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="600" height="350" fill="url(#grid)" />

              {/* Your Farm (Center Pin) */}
              <g transform="translate(300, 175)">
                {/* Alert radius boundary circle */}
                <circle 
                  cx="0" 
                  cy="0" 
                  r={selectedRadius * 12} 
                  fill="rgba(16, 185, 129, 0.02)" 
                  stroke="rgba(16, 185, 129, 0.25)" 
                  strokeWidth="1.5" 
                  strokeDasharray="4,4" 
                  className="transition-all duration-300"
                />
                
                {/* Outermost Threat Circle (danger radius) */}
                <circle 
                  cx="0" 
                  cy="0" 
                  r={selectedRadius * 12} 
                  fill="none" 
                  stroke="rgba(239, 68, 68, 0.08)" 
                  strokeWidth="8" 
                  className="animate-pulse"
                />

                {/* Farm marker */}
                <circle cx="0" cy="0" r="10" fill="#10b981" fillOpacity="0.2" />
                <circle cx="0" cy="0" r="5" fill="#10b981" />
                <text x="0" y="-15" textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="bold">My Farm</text>
              </g>

              {/* Neighbors & Hotspots Markers */}
              {filteredSpots.map((spot) => (
                <g 
                  key={spot.id} 
                  transform={`translate(${spot.lng}, ${spot.lat})`}
                  onClick={() => handleHotspotClick(spot)}
                  className="cursor-pointer group"
                >
                  {/* Pulse zone */}
                  <circle 
                    cx="0" 
                    cy="0" 
                    r="12" 
                    fill={spot.severity === 'high' ? '#ef4444' : spot.severity === 'medium' ? '#f59e0b' : '#3b82f6'} 
                    fillOpacity="0.15" 
                    className="animate-ping" 
                  />
                  <circle 
                    cx="0" 
                    cy="0" 
                    r="6" 
                    fill={spot.severity === 'high' ? '#ef4444' : spot.severity === 'medium' ? '#f59e0b' : '#3b82f6'} 
                  />
                  <text 
                    x="0" 
                    y="-12" 
                    textAnchor="middle" 
                    fill="#94a3b8" 
                    fontSize="8" 
                    fontWeight="semibold" 
                    className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900"
                  >
                    {spot.farmOwner} ({spot.distance})
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="text-[10px] text-slate-500 p-2 flex justify-between items-center border-t border-slate-900">
            <span>Latitude: 20.84° N | Longitude: 86.43° E</span>
            <span>Radius scale: 1px = ~0.1km</span>
          </div>
        </div>

        {/* Info panel */}
        <div className="space-y-6">
          {/* Active Hotspot Inspector details */}
          <div className="glass rounded-2xl p-6 space-y-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Hotspot Investigator</span>
            
            {selectedHotspot ? (
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-bold text-white">{selectedHotspot.farmOwner}'s Farm</h4>
                    <span className="text-xs text-slate-400">{selectedHotspot.distance} away</span>
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    selectedHotspot.severity === 'high' ? 'bg-red-500/15 text-red-400 border border-red-500/20' :
                    selectedHotspot.severity === 'medium' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20' :
                    'bg-blue-500/15 text-blue-400 border border-blue-500/20'
                  }`}>
                    {selectedHotspot.severity} alert
                  </span>
                </div>

                <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Crop Affected:</span>
                    <span className="text-white font-semibold">{selectedHotspot.crop}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Pathogen:</span>
                    <span className="text-red-400 font-semibold">{selectedHotspot.disease}</span>
                  </div>
                </div>

                <div className="p-3 bg-red-500/5 border border-red-500/15 rounded-xl text-[11px] text-slate-300 leading-relaxed">
                  <strong>Outbreak Advisory:</strong> Rain splashes and wind vector models indicate <strong>{selectedHotspot.disease}</strong> may migrate within your {selectedRadius}km farm perimeter in the next 48 hours. Ensure crop leaves are coated with protective organic sprays.
                </div>
              </div>
            ) : (
              <div className="text-center py-10">
                <MapPin className="w-8 h-8 text-slate-700 mx-auto mb-3" />
                <p className="text-xs text-slate-500">Click a neighborhood marker on the map to run threat migration forecasts.</p>
              </div>
            )}
          </div>

          {/* Community stats */}
          <div className="glass rounded-2xl p-6 space-y-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">District Registry Stats</span>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                <Users className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Farmers Online</span>
                <span className="text-base font-extrabold text-white">412</span>
              </div>
              
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                <ShieldAlert className="w-5 h-5 text-red-400 mx-auto mb-1" />
                <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Active Threats</span>
                <span className="text-base font-extrabold text-red-400">3 Zones</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
