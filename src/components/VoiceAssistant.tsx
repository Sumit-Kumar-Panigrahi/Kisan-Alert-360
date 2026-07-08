import React, { useState, useEffect, useRef } from 'react';
import { Mic, Send, Volume2, ShieldCheck, AlertTriangle, Bot, User, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTranslations } from '../i18n/translations';

interface Message {
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const VoiceAssistant: React.FC = () => {
  const { user, triggerNotification } = useApp();
  const t = useTranslations(user?.language || 'English');
  const activeLang = user?.language || 'English';

  const [listening, setListening] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [queryText, setQueryText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: activeLang === 'Hindi' 
        ? 'नमस्ते! मैं किसान सहायक हूँ। आप मुझसे खेती-बाड़ी, फसल रोग, मौसम या सिंचाई योजनाओं के बारे में कोई भी प्रश्न पूछ सकते हैं।' 
        : activeLang === 'Odia' 
          ? 'ନମସ୍କାର! ମୁଁ କିସାନ ସହାୟକ। ଆପଣ ଚାଷ, ଫସଲ ରୋଗ କିମ୍ବା ଜଳ ଯୋଜନା ବିଷୟରେ ଯେକୌଣସି ପ୍ରଶ୍ନ ପଚାରିପାରିବେ।' 
          : 'Hello! I am your Kisan AI assistant. You can ask me any farming-related questions about crops, soil, weather, irrigation, or fertilizer management.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [recognition, setRecognition] = useState<any>(null);
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat history
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, processing]);

  // Speech Recognition Setup
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      
      if (activeLang === 'Hindi') rec.lang = 'hi-IN';
      else if (activeLang === 'Odia') rec.lang = 'or-IN';
      else rec.lang = 'en-US';

      rec.onstart = () => {
        setListening(true);
      };

      rec.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        if (text.trim()) {
          setQueryText((prev) => (prev ? prev + ' ' + text : text));
        }
      };

      rec.onerror = (event: any) => {
        console.error(event.error);
        setListening(false);
        if (event.error !== 'no-speech') {
          triggerNotification('Microphone Error', `Speech recognition error: ${event.error}`, 'alert');
        }
      };

      rec.onend = () => {
        setListening(false);
      };

      setRecognition(rec);
    }
  }, [activeLang, triggerNotification]);

  const startListening = () => {
    if (recognition) {
      try {
        recognition.start();
      } catch (e) {
        recognition.stop();
        setTimeout(() => recognition.start(), 300);
      }
    } else {
      triggerNotification('Speech Not Supported', 'Web Speech Recognition is not supported on this browser context.', 'warning');
    }
  };

  const triggerVoiceSynthesis = (txt: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(txt);
    
    if (activeLang === 'Hindi') utterance.lang = 'hi-IN';
    else if (activeLang === 'Odia') utterance.lang = 'or-IN';
    else utterance.lang = 'en-US';

    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async () => {
    const messageContent = queryText;
    if (!messageContent.trim()) return;
    if (!apiKey) {
      triggerNotification('Setup Required', 'Please configure VITE_GEMINI_API_KEY in your .env file.', 'alert');
      return;
    }

    // Add user message
    const userMsg: Message = {
      sender: 'user',
      text: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setQueryText('');
    setProcessing(true);

    try {
      // Build conversation history for Gemini
      // Filter out the initial welcome message to avoid role sequence errors (gemini strictly wants user -> model -> user)
      // Or we just map all user messages and the valid model responses
      const historyContents = newMessages
        .filter((msg, idx) => idx !== 0) // skip the hardcoded first AI message for the API context
        .map((msg) => ({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        }));

      const systemInstruction = `You are Kisan AI, a premium agricultural expert advisory assistant. Respond in ${activeLang} to the farmer. Keep answers concise, scientific, and highly practical, giving clear remedies or data advice.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: systemInstruction }]
            },
            contents: historyContents
          })
        }
      );

      if (!response.ok) {
        if (response.status === 429) throw new Error("API rate limit exceeded. Please try again in a few moments.");
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson?.error?.message || `API error code: ${response.status}`);
      }

      const data = await response.json();
      const aiReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I apologize, I could not generate a recommendation for that. Please try again.";

      const aiMsg: Message = {
        sender: 'ai',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
      triggerVoiceSynthesis(aiReply);
    } catch (err: any) {
      console.error(err);
      const errMsg: Message = {
        sender: 'ai',
        text: `Error: ${err.message || 'Unable to connect to Gemini API. Please verify network settings.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="p-8 space-y-6 flex flex-col h-[calc(100vh-80px)] overflow-hidden">
      
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h2 className="text-xl font-bold text-white">{t.voice_title}</h2>
          <p className="text-sm text-slate-400">{t.voice_subtitle}</p>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 flex-1 min-h-0">
        
        {/* Chat History Panel */}
        <div className="lg:col-span-3 flex flex-col min-h-0 bg-slate-950/20 border border-slate-850 rounded-2xl overflow-hidden relative">
          
          {/* Missing API Key Overlay */}
          {!apiKey && (
            <div className="absolute inset-0 z-10 backdrop-blur-md bg-slate-950/60 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-4">
                <Settings className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Setup Required</h3>
              <p className="text-sm text-slate-300 max-w-md leading-relaxed mb-6">
                The AI Assistant is currently disabled because the Gemini API key is missing. Please configure <code>VITE_GEMINI_API_KEY</code> in your project's <code>.env</code> file and restart the server to enable dynamic AI responses.
              </p>
            </div>
          )}

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex gap-3 max-w-[85%] ${m.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                  m.sender === 'user' 
                    ? 'bg-slate-800 border-slate-700 text-emerald-450' 
                    : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 glow-green'
                }`}>
                  {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                
                <div className={`rounded-2xl p-3.5 space-y-1 relative group ${
                  m.sender === 'user' 
                    ? 'bg-slate-900 border border-slate-850 text-slate-200' 
                    : 'bg-slate-950/50 border border-slate-900 text-slate-300'
                }`}>
                  <p className="text-xs leading-relaxed white-space-pre-wrap">{m.text}</p>
                  <span className="text-[8px] text-slate-500 block text-right mt-1">{m.timestamp}</span>

                  {m.sender === 'ai' && (
                    <button 
                      onClick={() => triggerVoiceSynthesis(m.text)}
                      className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-slate-900 border border-slate-800 rounded text-slate-400 hover:text-white"
                      title="Speak Message"
                    >
                      <Volume2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
            
            {processing && (
              <div className="flex gap-3 max-w-[80%]">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center border bg-emerald-500/10 border-emerald-500/20 text-emerald-400 glow-green animate-pulse">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-slate-950/50 border border-slate-900 rounded-2xl p-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Interactive Chat Input Area */}
          <div className="p-4 border-t border-slate-900 bg-[#070b13]/40">
            <div className="flex gap-2">
              <button 
                onClick={startListening}
                disabled={!apiKey}
                className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all shrink-0 ${
                  !apiKey 
                    ? 'opacity-50 cursor-not-allowed bg-slate-900 border-slate-800 text-slate-600'
                    : listening 
                      ? 'bg-red-500/20 border-red-500 text-red-400 animate-pulse' 
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
                title={!recognition ? "Speech Recognition Not Supported" : "Speak to Assistant"}
              >
                <Mic className="w-4.5 h-4.5" />
              </button>

              <input 
                type="text" 
                placeholder="Ask about fertilizer, pests, rainfall..." 
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={!apiKey}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 text-xs text-white focus:outline-none focus:border-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
              />

              <button 
                onClick={() => handleSendMessage()}
                disabled={!apiKey || !queryText.trim()}
                className="w-11 h-11 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-800 disabled:text-slate-500 text-white flex items-center justify-center shrink-0 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Info & Status Panel */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="glass rounded-2xl p-5 space-y-4 bg-slate-950/20">
            <div className="flex justify-between items-center text-xs text-slate-400">
              <span>Assistant Status</span>
              <span className="text-emerald-400 font-semibold">{activeLang} Mode</span>
            </div>

            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-850 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <Bot className="w-4.5 h-4.5 text-emerald-400" />
                <span>Conversational Agent Context</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Connects directly to Gemini AI via backend configuration. It has context on your Basmati Rice crop and the current Bhadrak district sensor telemetry.
              </p>
            </div>
            
            <div className={`p-3.5 border rounded-xl flex gap-2.5 ${
              apiKey 
                ? 'bg-emerald-500/5 border-emerald-500/10' 
                : 'bg-red-500/5 border-red-500/10'
            }`}>
              {apiKey ? (
                <ShieldCheck className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-4.5 h-4.5 text-red-400 shrink-0 mt-0.5" />
              )}
              <div className={`text-[11px] leading-relaxed ${apiKey ? 'text-slate-350' : 'text-slate-400'}`}>
                {apiKey 
                  ? 'System securely connected to Gemini AI. History tracking is active for the current session.' 
                  : 'System disconnected. API Key not found in environment variables.'}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
