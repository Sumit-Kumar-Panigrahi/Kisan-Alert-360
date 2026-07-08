import React, { useState } from 'react';
import {
  Upload,
  Volume2,
  Download,
  AlertTriangle,
  XCircle,
  Leaf,
  Eye,
  Settings
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTranslations } from '../i18n/translations';

interface RejectionReason {
  title: string;
  reasons: string[];
  detectedObject?: string;
}

interface DiseaseResult {
  isValid: true;
  crop: string;
  diseaseName: string;
  confidence: number;
  severity: 'Low' | 'Medium' | 'High';
  explanation: string;
  treatment: string;
  recommendation: string;
  prevention: string;
  weatherImpact: string;
}

type AnalysisState =
  | { status: 'idle' }
  | { status: 'analyzing'; stage: 'validating' | 'diagnosing' }
  | { status: 'rejected'; rejection: RejectionReason }
  | { status: 'uncertain'; message: string }
  | { status: 'success'; result: DiseaseResult }
  | { status: 'error'; message: string };

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

/** Convert a File to base64 string (data only, no prefix) */
async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const raw = reader.result as string;
      resolve(raw.split(',')[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/** Call Gemini Vision API with a given prompt and image */
async function callGeminiVision(prompt: string, base64: string, mimeType: string): Promise<string> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: prompt },
            { inlineData: { mimeType, data: base64 } }
          ]
        }],
        generationConfig: { responseMimeType: 'application/json' }
      })
    }
  );
  if (!response.ok) {
    if (response.status === 429) throw new Error('API rate limit exceeded. Please try again in a moment.');
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `Gemini API error ${response.status}`);
  }
  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

const STAGE1_PROMPT = `You are a strict agricultural image classifier. Analyze the uploaded image carefully.

Answer ONLY with a JSON object in the following exact schema (no markdown, no explanation):
{
  "isPlant": boolean,          // true only if a plant or leaf is the main subject
  "isCropLeaf": boolean,       // true only if it is clearly a crop/plant leaf
  "isClearlyVisible": boolean, // true only if the leaf is in focus and well-lit
  "singleLeaf": boolean,       // true only if there is exactly one leaf (not a bunch)
  "detectedObject": string,    // a short label of what was detected (e.g. "airplane", "rice leaf", "car")
  "rejectionReasons": string[] // list reasons if not valid, empty array if valid
}

Common invalid inputs (must return isPlant: false):
- Airplanes, cars, trucks, motorbikes
- Human beings, faces, people
- Dogs, cats, animals, birds
- Buildings, roads, landscapes
- Mobile phones, computers, screens
- Food, fruits (without leaves), vegetables (without leaves)
- Screenshots, documents, memes, random photos
- Blank images, solid colour images

Only set all boolean fields to true for a clearly photographed single crop leaf.`;

const STAGE2_PROMPT = `You are an expert crop disease diagnostic AI. The image shows a valid crop leaf. Diagnose any diseases present.

Respond ONLY with a JSON object in this exact schema (no markdown, no explanation):
{
  "crop": string,              // crop name e.g. "Rice", "Tomato", "Potato", "Cotton", "Wheat", "Maize"
  "diseaseName": string,       // full disease name or "Healthy - No Disease Detected"
  "confidence": number,        // 0 to 100
  "severity": "Low" | "Medium" | "High",
  "explanation": string,       // 2-3 sentence plain explanation of the disease
  "treatment": string,         // specific fungicide/bactericide recommendation
  "recommendation": string,    // fertilizer or pesticide advice
  "prevention": string,        // preventive measures
  "weatherImpact": string      // how current weather conditions could worsen the disease
}

CRITICAL: If you cannot confidently identify a disease, set confidence below 70 and explain why in the explanation field. Do NOT guess or invent diseases.`;

export const DiseaseDetection: React.FC = () => {
  const { user, addDiseaseRecord, triggerNotification } = useApp();
  const t = useTranslations(user?.language || 'English');

  const [state, setState] = useState<AnalysisState>({ status: 'idle' });
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const resetState = () => {
    setState({ status: 'idle' });
    setFilePreview(null);
    setFileName(null);
    // Reset the file input so the same file can be re-uploaded
    const input = document.getElementById('leaf-upload-input') as HTMLInputElement;
    if (input) input.value = '';
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ── Basic client-side validation ──────────────────────────────────────────
    const MAX_SIZE = 8 * 1024 * 1024; // 8 MB
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

    if (!ALLOWED_TYPES.includes(file.type)) {
      setState({
        status: 'rejected',
        rejection: {
          title: 'Unsupported File Format',
          reasons: ['Only JPG, PNG and WebP images are accepted.'],
          detectedObject: 'Non-image file'
        }
      });
      return;
    }

    if (file.size > MAX_SIZE) {
      setState({
        status: 'rejected',
        rejection: {
          title: 'File Too Large',
          reasons: ['Image must be smaller than 8 MB.'],
          detectedObject: 'Oversized file'
        }
      });
      return;
    }

    // ── Preview ───────────────────────────────────────────────────────────────
    setFileName(file.name);
    const objectUrl = URL.createObjectURL(file);
    setFilePreview(objectUrl);

    // ── Check API key ─────────────────────────────────────────────────────────
    if (!GEMINI_API_KEY) {
      setState({
        status: 'error',
        message: 'VITE_GEMINI_API_KEY is not configured. Please add it to your .env file and restart the dev server.'
      });
      return;
    }

    // ── Stage 1: Image Validation ─────────────────────────────────────────────
    setState({ status: 'analyzing', stage: 'validating' });

    let base64: string;
    try {
      base64 = await fileToBase64(file);
    } catch {
      setState({ status: 'error', message: 'Failed to read the image file. Please try again.' });
      return;
    }

    let stage1Raw: string;
    try {
      stage1Raw = await callGeminiVision(STAGE1_PROMPT, base64, file.type);
    } catch (err: any) {
      setState({ status: 'error', message: err.message });
      triggerNotification('API Error', err.message, 'alert');
      return;
    }

    let stage1: any;
    try {
      stage1 = JSON.parse(stage1Raw);
    } catch {
      setState({ status: 'error', message: 'Received an unexpected response from the AI. Please try again.' });
      return;
    }

    // Determine if image passes validation
    const isValid =
      stage1.isPlant === true &&
      stage1.isCropLeaf === true &&
      stage1.isClearlyVisible === true &&
      stage1.singleLeaf !== false;

    if (!isValid) {
      const reasons: string[] = [];

      if (!stage1.isPlant) reasons.push('No plant detected in this image.');
      else if (!stage1.isCropLeaf) reasons.push('No crop leaf detected (a plant was found, but not a crop leaf).');

      if (!stage1.isClearlyVisible) reasons.push('Image is too blurry, dark, or overexposed for reliable analysis.');
      if (stage1.singleLeaf === false) reasons.push('Multiple leaves detected. Please photograph a single leaf in close-up.');

      if (stage1.rejectionReasons?.length) {
        stage1.rejectionReasons.forEach((r: string) => {
          if (!reasons.includes(r)) reasons.push(r);
        });
      }

      if (!reasons.length) reasons.push('The image does not contain a valid, clearly visible crop leaf.');

      setState({
        status: 'rejected',
        rejection: {
          title: 'Invalid Image Detected',
          reasons,
          detectedObject: stage1.detectedObject || 'Unknown object'
        }
      });
      triggerNotification('Image Rejected', `Detected: ${stage1.detectedObject || 'non-plant object'}`, 'warning');
      return;
    }

    // ── Stage 2: Disease Diagnosis ────────────────────────────────────────────
    setState({ status: 'analyzing', stage: 'diagnosing' });

    let stage2Raw: string;
    try {
      stage2Raw = await callGeminiVision(STAGE2_PROMPT, base64, file.type);
    } catch (err: any) {
      setState({ status: 'error', message: err.message });
      triggerNotification('API Error', err.message, 'alert');
      return;
    }

    let stage2: any;
    try {
      stage2 = JSON.parse(stage2Raw);
    } catch {
      setState({ status: 'error', message: 'Received an unexpected response from the diagnosis AI. Please try again.' });
      return;
    }

    // Low confidence → honest uncertainty instead of fake result
    if ((stage2.confidence ?? 0) < 70) {
      setState({
        status: 'uncertain',
        message: stage2.explanation || 'Unable to confidently identify this disease. Please upload a clearer image of the affected leaf.'
      });
      return;
    }

    const result: DiseaseResult = {
      isValid: true,
      crop: stage2.crop || 'Unknown Crop',
      diseaseName: stage2.diseaseName || 'Unknown Disease',
      confidence: stage2.confidence,
      severity: stage2.severity || 'Low',
      explanation: stage2.explanation || '',
      treatment: stage2.treatment || '',
      recommendation: stage2.recommendation || '',
      prevention: stage2.prevention || '',
      weatherImpact: stage2.weatherImpact || ''
    };

    setState({ status: 'success', result });

    addDiseaseRecord({
      crop: result.crop,
      diseaseName: result.diseaseName,
      confidence: result.confidence,
      cause: result.explanation,
      treatment: result.treatment,
      prevention: result.prevention,
      weatherImpact: result.weatherImpact,
      imageUrl: objectUrl
    });

    triggerNotification(
      'Analysis Complete',
      `Gemini diagnosed ${result.diseaseName} in ${result.crop} with ${result.confidence}% confidence.`,
      'success'
    );
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove('border-emerald-500');
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const fakeEvt = { target: { files: [file] } } as any;
      handleFileUpload(fakeEvt);
    }
  };

  const handleVoiceExplain = (result: DiseaseResult) => {
    window.speechSynthesis.cancel();
    const lang = user?.language || 'English';
    const text = `Diagnosis complete. Crop: ${result.crop}. Disease: ${result.diseaseName}. Confidence: ${result.confidence} percent. Severity: ${result.severity}. ${result.explanation}`;
    const utterance = new SpeechSynthesisUtterance(text);
    if (lang === 'Hindi') utterance.lang = 'hi-IN';
    else if (lang === 'Odia') utterance.lang = 'or-IN';
    else utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const handleDownloadReport = (result: DiseaseResult) => {
    const content = `
========================================
KISAN ALERT 360° - CROP DISEASE REPORT
========================================
Date       : ${new Date().toLocaleDateString()}
Report ID  : KA-${Math.floor(Math.random() * 90000) + 10000}

Crop       : ${result.crop}
Disease    : ${result.diseaseName}
Confidence : ${result.confidence}%
Severity   : ${result.severity}

EXPLANATION
-----------
${result.explanation}

FERTILIZERS & PESTICIDES
------------------------
${result.recommendation}

TREATMENT PLAN
--------------
${result.treatment}

PREVENTION
----------
${result.prevention}

WEATHER IMPACT
--------------
${result.weatherImpact}

========================================
Powered by Google Gemini Vision AI
========================================
`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `KisanAlert_Report_${result.crop.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    triggerNotification('Report Downloaded', 'Disease report saved successfully.', 'success');
  };

  return (
    <div className="p-8 space-y-8 overflow-y-auto max-h-[calc(100vh-80px)]">

      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white">{t.disease_title}</h2>
        <p className="text-sm text-slate-400">{t.disease_subtitle}</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">

        {/* Upload Zone */}
        <div className="xl:col-span-2 space-y-5">

          {/* Drop zone */}
          <div
            onClick={() => document.getElementById('leaf-upload-input')?.click()}
            onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('border-emerald-500'); }}
            onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove('border-emerald-500'); }}
            onDrop={handleDrop}
            className="glass rounded-2xl p-6 flex flex-col items-center justify-center border-dashed border-2 border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer min-h-[240px]"
          >
            <input
              id="leaf-upload-input"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleFileUpload}
            />
            {filePreview ? (
              <img src={filePreview} alt="preview" className="max-h-36 rounded-xl mb-3 object-contain" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-4">
                <Upload className="w-6 h-6 text-slate-400" />
              </div>
            )}
            <h4 className="text-sm font-semibold text-white mb-1">{fileName || t.disease_upload}</h4>
            <p className="text-xs text-slate-500 mb-4 text-center">JPG, PNG, WebP · Max 8 MB</p>
            <span className="text-xs px-3 py-1.5 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors">
              {t.disease_browse}
            </span>
          </div>

          {/* Requirements card */}
          <div className="glass rounded-2xl p-5 space-y-3 border border-slate-900/50">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">AI Validation Criteria</span>
            </div>
            <ul className="space-y-1.5 text-[11px] text-slate-400 leading-relaxed">
              {[
                'Single crop leaf — clearly visible',
                'In focus and well-lit',
                'No animals, vehicles, or people',
                'JPG, PNG or WebP format, under 8 MB',
                'Confidence ≥ 70% required for diagnosis',
              ].map((req, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">✓</span>
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {/* API Key status */}
          {!GEMINI_API_KEY && (
            <div className="rounded-2xl p-4 border border-red-500/20 bg-red-500/5 flex gap-3">
              <Settings className="w-5 h-5 text-red-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-red-400">Setup Required</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Add <code>VITE_GEMINI_API_KEY=your_key</code> to your <code>.env</code> file and restart the dev server to enable real AI analysis.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Results Panel */}
        <div className="xl:col-span-3">

          {/* Idle state */}
          {state.status === 'idle' && (
            <div className="glass rounded-2xl p-8 min-h-[420px] flex flex-col items-center justify-center text-center border border-slate-900/50">
              <Leaf className="w-14 h-14 text-slate-700 mb-4" />
              <h4 className="text-sm font-semibold text-slate-400 mb-2">Awaiting Crop Leaf Photo</h4>
              <p className="text-xs text-slate-600 max-w-xs leading-relaxed">
                Upload a clear photo of a single crop leaf. Gemini Vision will first validate the image, then diagnose any disease.
              </p>
            </div>
          )}

          {/* Analyzing state */}
          {state.status === 'analyzing' && (
            <div className="glass rounded-2xl p-8 min-h-[420px] flex flex-col items-center justify-center space-y-5 border border-slate-900/50">
              <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
              <div className="text-center">
                <span className="font-semibold text-sm text-white block">
                  {state.stage === 'validating' ? 'Stage 1 — Image Validation' : 'Stage 2 — Disease Diagnosis'}
                </span>
                <span className="text-xs text-slate-400 mt-1 block">
                  {state.stage === 'validating'
                    ? 'Gemini Vision is checking whether the image contains a valid crop leaf…'
                    : 'Analyzing disease patterns, infection sites, and severity levels…'}
                </span>
              </div>
              <div className="flex gap-1.5">
                {['validation', 'diagnosis'].map((step, i) => (
                  <div key={step} className={`h-1.5 rounded-full transition-all ${
                    (state.stage === 'validating' && i === 0) || (state.stage === 'diagnosing')
                      ? 'bg-emerald-400 w-16' : 'bg-slate-800 w-8'
                  }`} />
                ))}
              </div>
            </div>
          )}

          {/* Rejected state */}
          {state.status === 'rejected' && (
            <div className="glass rounded-2xl p-8 min-h-[420px] flex flex-col items-center text-center space-y-5 border border-red-500/20 bg-red-500/5">
              <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                <XCircle className="w-9 h-9" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">❌ {state.rejection.title}</h3>
                {state.rejection.detectedObject && (
                  <p className="text-xs text-red-400 font-semibold mt-1 uppercase tracking-wider">
                    Detected: {state.rejection.detectedObject}
                  </p>
                )}
              </div>
              <div className="bg-slate-950/40 rounded-xl p-4 text-left space-y-2 w-full max-w-sm">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Reasons for Rejection:</p>
                <ul className="space-y-1">
                  {state.rejection.reasons.map((r, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-red-400 shrink-0">•</span> {r}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                Please upload a clear, close-up photograph of a <strong>single crop leaf</strong> for disease analysis.
              </p>
              <button
                onClick={resetState}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-semibold text-white transition-colors"
              >
                Upload Another Image
              </button>
            </div>
          )}

          {/* Low confidence state */}
          {state.status === 'uncertain' && (
            <div className="glass rounded-2xl p-8 min-h-[420px] flex flex-col items-center text-center space-y-5 border border-amber-500/20 bg-amber-500/5">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <AlertTriangle className="w-9 h-9" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Low Confidence — Cannot Diagnose</h3>
                <p className="text-xs text-amber-400 font-semibold mt-1 uppercase tracking-wider">Confidence below 70%</p>
              </div>
              <p className="text-sm text-slate-300 max-w-sm leading-relaxed">{state.message}</p>
              <button
                onClick={resetState}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-semibold text-white transition-colors"
              >
                Upload Clearer Image
              </button>
            </div>
          )}

          {/* Error state */}
          {state.status === 'error' && (
            <div className="glass rounded-2xl p-8 min-h-[420px] flex flex-col items-center text-center space-y-4 border border-red-500/20 bg-red-500/5">
              <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">Error</h3>
              <p className="text-xs text-slate-300 max-w-sm leading-relaxed">{state.message}</p>
              <button
                onClick={resetState}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-semibold text-white transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Success state */}
          {state.status === 'success' && (
            <div className="glass rounded-2xl p-6 space-y-6 border border-slate-900/50">

              {/* Header row */}
              <div className="flex justify-between items-start gap-4 flex-wrap">
                <div>
                  <span className={`text-[10px] border px-2.5 py-0.5 rounded-full font-bold uppercase ${
                    state.result.severity === 'High'
                      ? 'bg-red-500/10 border-red-500/30 text-red-400'
                      : state.result.severity === 'Medium'
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                        : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  }`}>
                    {state.result.severity} Severity
                  </span>
                  <h3 className="text-lg font-bold text-white mt-2">{state.result.diseaseName}</h3>
                  <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">
                    Crop: {state.result.crop}
                  </span>
                </div>

                {/* Confidence ring */}
                <div className="flex flex-col items-center">
                  <div className="relative w-14 h-14">
                    <svg viewBox="0 0 36 36" className="w-14 h-14 -rotate-90">
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#1e293b" strokeWidth="3" />
                      <circle
                        cx="18" cy="18" r="14" fill="none"
                        stroke={state.result.confidence >= 90 ? '#10b981' : state.result.confidence >= 75 ? '#f59e0b' : '#ef4444'}
                        strokeWidth="3"
                        strokeDasharray={`${state.result.confidence * 0.88} 88`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-white">
                      {state.result.confidence}%
                    </span>
                  </div>
                  <span className="text-[9px] text-slate-500 mt-1 uppercase tracking-wider">Confidence</span>
                </div>
              </div>

              {/* Detail sections */}
              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-slate-400 font-bold block mb-1">Explanation</span>
                  <p className="text-slate-300 leading-relaxed">{state.result.explanation}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block mb-1">Fertilizers & Pesticides</span>
                  <p className="text-emerald-400 font-semibold leading-relaxed">{state.result.recommendation}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block mb-1">Treatment Plan</span>
                  <p className="text-slate-300 leading-relaxed">{state.result.treatment}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block mb-1">Preventive Measures</span>
                  <p className="text-slate-300 leading-relaxed">{state.result.prevention}</p>
                </div>
                <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl flex gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div className="text-[11px] text-slate-300">
                    <strong className="text-amber-400">Weather Impact: </strong>{state.result.weatherImpact}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-slate-900 flex gap-3 justify-end flex-wrap">
                <button
                  onClick={() => handleVoiceExplain(state.result)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5" /> {t.disease_speak}
                </button>
                <button
                  onClick={() => handleDownloadReport(state.result)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold text-white hover:border-slate-700 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> {t.disease_download}
                </button>
                <button
                  onClick={resetState}
                  className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  New Analysis
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
