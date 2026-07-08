import React, { useState } from 'react';
import { Database, Cpu, Sparkles, Radio, Network, BellRing } from 'lucide-react';

interface Node {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  service: string;
  icon: React.ComponentType<any>;
  color: string;
}

const gcpNodes: Node[] = [
  {
    id: '1',
    title: 'IoT Sensor Stream',
    subtitle: 'Moisture & Temperature Telemetry',
    description: 'Soil and air sensors continuously send telemetry metrics at 4s intervals to the server.',
    service: 'Edge Devices',
    icon: Radio,
    color: 'border-emerald-500 text-emerald-400 bg-emerald-500/5'
  },
  {
    id: '2',
    title: 'Cloud Pub/Sub',
    subtitle: 'Message Queue Broker',
    description: 'Ingests massive high-velocity data streams from millions of sensor units simultaneously.',
    service: 'GCP Pub/Sub',
    icon: Network,
    color: 'border-sky-500 text-sky-400 bg-sky-500/5'
  },
  {
    id: '3',
    title: 'Cloud Functions / Run',
    subtitle: 'Serverless Stream Processor',
    description: 'Listens to Pub/Sub queues and processes payload data, triggering database updates.',
    service: 'Cloud Functions',
    icon: Cpu,
    color: 'border-teal-500 text-teal-400 bg-teal-500/5'
  },
  {
    id: '4',
    title: 'Firebase Firestore',
    subtitle: 'NoSQL Realtime Database',
    description: 'Persists telemetry packets and disease registry histories. Syncs state to frontend client sockets.',
    service: 'Firestore',
    icon: Database,
    color: 'border-amber-500 text-amber-400 bg-amber-500/5'
  },
  {
    id: '5',
    title: 'Vertex AI Gemini API',
    subtitle: 'Multimodal Predictive Engine',
    description: 'Processes leaf image scans, parses ambient micro-climates, and forecasts crop pathogen risks.',
    service: 'Vertex AI Gemini',
    icon: Sparkles,
    color: 'border-purple-500 text-purple-400 bg-purple-500/5'
  },
  {
    id: '6',
    title: 'Notification Dispatcher',
    subtitle: 'FCM push alert gateways',
    description: 'Broadcasts SMS alerts and mobile push notifications to all farmers in adjacent outbreak zones.',
    service: 'Firebase Cloud Messaging',
    icon: BellRing,
    color: 'border-red-500 text-red-400 bg-red-500/5'
  }
];

export const ArchitectureDiagram: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<Node>(gcpNodes[0]);

  return (
    <div className="p-8 space-y-8 overflow-y-auto max-h-[calc(100vh-80px)]">
      <div>
        <h2 className="text-xl font-bold text-white">Google Cloud AI System Architecture</h2>
        <p className="text-sm text-slate-400">Interactive data ingestion pipeline visualizer for the Kisan Alert 360° platform.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
        {/* Visual Workflow Flow */}
        <div className="xl:col-span-3 glass rounded-2xl p-6 flex flex-col justify-between min-h-[460px] bg-slate-950/20">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-6">Data Pipeline Flow</span>
          
          <div className="flex flex-col gap-6 relative">
            {/* Dotted indicator line running down */}
            <div className="absolute left-[27px] top-6 bottom-6 w-0.5 border-l border-dashed border-slate-800 -z-10" />

            {gcpNodes.map((node) => {
              const Icon = node.icon;
              const isSelected = selectedNode.id === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`w-full flex items-center gap-4 text-left p-3.5 rounded-2xl border transition-all duration-200 ${
                    isSelected 
                      ? 'border-emerald-500/40 bg-emerald-500/[0.04] shadow-[0_0_20px_rgba(16,185,129,0.06)]' 
                      : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' : 'border-slate-800 text-slate-400 bg-slate-950'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold text-white truncate">{node.title}</h4>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-500 font-semibold">{node.service}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5 truncate">{node.subtitle}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Node Investigator Panel */}
        <div className="xl:col-span-2 space-y-6">
          <div className="glass rounded-2xl p-6 space-y-6 bg-slate-900/20 sticky top-6">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Service Inspector</span>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${selectedNode.color}`}>
                  {React.createElement(selectedNode.icon, { className: 'w-6 h-6' })}
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-white">{selectedNode.title}</h3>
                  <span className="text-[10px] text-emerald-400 font-semibold">{selectedNode.service}</span>
                </div>
              </div>

              <div className="h-px bg-slate-800" />

              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold block mb-1">Functional Description</span>
                <p className="text-xs text-slate-300 leading-relaxed">{selectedNode.description}</p>
              </div>

              <div className="p-3 bg-slate-950/80 border border-slate-900 rounded-xl text-xs space-y-2">
                <span className="text-[10px] text-slate-500 font-bold block uppercase">Ingested Payload Schema</span>
                <pre className="text-[10px] text-emerald-400 font-mono overflow-x-auto leading-relaxed">
{selectedNode.id === '1' && `{
  "sensor_id": "ND-092",
  "soil_moisture": 38,
  "ambient_temp": 31,
  "humidity": 72,
  "timestamp": "2026-07-08T10:24Z"
}`}
{selectedNode.id === '2' && `{
  "message_id": "pubsub-msg-9102",
  "topic": "projects/kisan-360/topics/iot",
  "publish_time": 1783491029,
  "data_payload": "eyJzZW5zb3JfaWQi..."
}`}
{selectedNode.id === '3' && `def process_telemetry(event, context):
    payload = base64.b64decode(event['data'])
    db.collection('sensors').add(payload)
    predict_risk(payload)`}
{selectedNode.id === '4' && `{
  "farm_id": "FARM-092",
  "district": "Bhadrak",
  "soil_health_score": 82,
  "water_saved_liters": 34200
}`}
{selectedNode.id === '5' && `{
  "model": "gemini-1.5-pro",
  "prompt": "Analyze crop health parameters",
  "prediction": "Yellow Rust Outbreak: 89%"
}`}
{selectedNode.id === '6' && `{
  "recipient_topic": "district-bhadrak",
  "notification": {
    "title": "Rust advisory alert",
    "body": "Disease warning within 15km"
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
