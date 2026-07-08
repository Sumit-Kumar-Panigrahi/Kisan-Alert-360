import React, { useState } from 'react';
import { Landmark, Search, CheckCircle, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTranslations } from '../i18n/translations';

export const GovSchemes: React.FC = () => {
  const { user, triggerNotification } = useApp();
  const t = useTranslations(user?.language || 'English');
  const [searchVal, setSearchVal] = useState('');
  const [selectedScheme, setSelectedScheme] = useState<number | null>(null);

  const schemes = [
    {
      id: 1,
      title: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
      benefit: user?.language === 'Hindi' ? "₹6,000 प्रति वर्ष (₹2,000 की 3 समान किस्तें)" : user?.language === 'Odia' ? "ବାର୍ଷିକ ₹୬,୦୦୦ (₹୨,୦୦୦ ର ୩ଟି କିସ୍ତି)" : "₹6,000 per year (3 equal installments of ₹2,000)",
      eligibility: user?.language === 'Hindi' ? "सभी छोटे और सीमांत भूमिधारक किसान परिवार।" : user?.language === 'Odia' ? "ସମସ୍ତ କ୍ଷୁଦ୍ର ଏବଂ ନାମମାତ୍ର ଚାଷୀ ପରିବାର।" : "All small and marginal landholding farmer families.",
      status: user?.language === 'Hindi' ? "वितरित (17वीं किस्त)" : user?.language === 'Odia' ? "ପ୍ରଦାନ କରାଯାଇଛି (୧୭ତମ କିସ୍ତି)" : "Disbursed (17th Installment)",
      docLink: "pm_kisan_guidelines.pdf"
    },
    {
      id: 2,
      title: "PMFBY (Pradhan Mantri Fasal Bima Yojana)",
      benefit: user?.language === 'Hindi' ? "न्यूनतम प्रीमियम दरों (1.5% - 5%) पर फसल बीमा कवरेज।" : user?.language === 'Odia' ? "ସର୍ବନିମ୍ନ ପ୍ରିମିୟମ ଦରରେ ଫସଲ ବୀମା ସୁବିଧା।" : "Crop insurance coverage with lowest premium rates (1.5% - 5%).",
      eligibility: user?.language === 'Hindi' ? "अधिसूचित क्षेत्रों में अधिसूचित फसलें उगाने वाले सभी किसान।" : user?.language === 'Odia' ? "ବିଜ୍ଞପ୍ତି ଅଞ୍ଚଳରେ ନିର୍ଦ୍ଧାରିତ ଫସଲ ଚାଷ କରୁଥିବା ଚାଷୀ।" : "All farmers growing notified crops in notified areas.",
      status: user?.language === 'Hindi' ? "सक्रिय कवरेज" : user?.language === 'Odia' ? "ସକ୍ରିୟ ବୀମା" : "Active coverage",
      docLink: "pmfby_policy.pdf"
    },
    {
      id: 3,
      title: "KCC (Kisan Credit Card Scheme)",
      benefit: user?.language === 'Hindi' ? "रियायती ब्याज दरों (4%) पर फसल खेती के लिए अल्पकालिक ऋण।" : user?.language === 'Odia' ? "ରିହାତି ସୁଧ ଦରରେ ଫସଲ ଚାଷ ପାଇଁ ସ୍ୱଳ୍ପକାଳୀନ ଋଣ।" : "Short-term credit for crop cultivation at subsidized interest rates (4%).",
      eligibility: user?.language === 'Hindi' ? "भूमि मालिक-काश्तकार, बटाईदार और पट्टेदार किसान।" : user?.language === 'Odia' ? "ନିଜସ୍ୱ ଜମି ଥିବା ଚାଷୀ, ଭାଗଚାଷୀ ଏବଂ ଲିଜ୍‌ଧାରୀ ଚାଷୀ।" : "Owner-cultivators, tenant farmers, and sharecroppers.",
      status: user?.language === 'Hindi' ? "स्वीकृत क्रेडिट सीमा: ₹1.5 लाख" : user?.language === 'Odia' ? "ମଞ୍ଜୁରୀପ୍ରାପ୍ତ ଋଣ ସୀମା: ₹୧.୫ ଲକ୍ଷ" : "Approved Credit Limit: ₹1.5 Lakhs",
      docLink: "kcc_terms.pdf"
    }
  ];

  const filteredSchemes = schemes.filter(s => 
    s.title.toLowerCase().includes(searchVal.toLowerCase())
  );

  const handleApply = (title: string) => {
    const successMsg = user?.language === 'Hindi' 
      ? `आपका आवेदन सहेज लिया गया है। राष्ट्रीय पोर्टल के साथ सिंक हो रहा है।` 
      : user?.language === 'Odia' 
        ? `ଆପଣଙ୍କ ଆବେଦନ ସଂରକ୍ଷିତ ହେଲା। ଜାତୀୟ ପୋର୍ଟାଲ ସହିତ ସିଙ୍କ ହେଉଛି।` 
        : `Your request has been logged. Syncing metadata with national portal.`;
    
    triggerNotification(
      user?.language === 'Hindi' ? 'आवेदन जमा किया गया' : user?.language === 'Odia' ? 'ଆବେଦନ ଦାଖଲ ହେଲା' : 'Application Submitted', 
      successMsg, 
      'success'
    );
  };

  return (
    <div className="p-8 space-y-8 overflow-y-auto max-h-[calc(100vh-80px)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{t.schemes_title}</h2>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Track Direct Benefit Transfers, apply for subsidies, and verify credit limits.</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder={t.schemes_search} 
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="border rounded-xl py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-emerald-500/50"
            style={{ background: 'var(--input-bg)', color: 'var(--text-primary)', borderColor: 'var(--border-subtle)' }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Scheme List */}
        <div className="xl:col-span-2 space-y-4">
          {filteredSchemes.map((s, idx) => (
            <div 
              key={s.id}
              onClick={() => setSelectedScheme(idx)}
              className={`glass rounded-2xl p-5 border cursor-pointer transition-all ${
                selectedScheme === idx 
                  ? 'border-emerald-500/40 bg-slate-900/60' 
                  : 'hover:border-slate-700'
              }`}
              style={{ 
                borderColor: selectedScheme === idx ? undefined : 'var(--border-subtle)', 
                background: selectedScheme === idx ? 'rgba(16,185,129,0.08)' : 'var(--bg-elevated)'
              }}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <h3 className="text-xs font-bold tracking-wide" style={{ color: 'var(--text-primary)' }}>{s.title}</h3>
                  <span className="text-[10px] text-emerald-400 font-bold block">{s.benefit}</span>
                </div>
                <Landmark className="w-5 h-5 text-emerald-400 shrink-0" />
              </div>

              <div className="flex justify-between items-center mt-4 pt-4 border-t text-[10px] font-semibold" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}>
                <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> {s.status}</span>
                <span className="flex items-center gap-0.5 text-emerald-400">View details <ChevronRight className="w-3 h-3" /></span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Scheme Details & Apply Area */}
        <div>
          {selectedScheme !== null ? (
            <div className="glass-card p-6 border rounded-3xl space-y-6" style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-elevated)' }}>
              <div>
                <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{schemes[selectedScheme].title}</h3>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block mt-1">Direct Scheme Overview</span>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider block" style={{ color: 'var(--text-muted)' }}>{t.schemes_eligibility}</span>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{schemes[selectedScheme].eligibility}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider block" style={{ color: 'var(--text-muted)' }}>Current Status</span>
                  <p className="text-xs text-emerald-400 mt-1 font-bold">{schemes[selectedScheme].status}</p>
                </div>
              </div>

              <div className="flex gap-2.5 pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                <button 
                  onClick={() => handleApply(schemes[selectedScheme].title)}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all"
                >
                  {t.schemes_apply}
                </button>
              </div>
            </div>
          ) : (
            <div className="glass rounded-2xl p-6 text-center min-h-[300px] flex flex-col items-center justify-center" style={{ borderColor: 'var(--border-subtle)' }}>
              <Landmark className="w-12 h-12 mb-4" style={{ color: 'var(--text-muted)' }} />
              <h4 className="text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>No Scheme Selected</h4>
              <p className="text-[10px] max-w-[200px] leading-relaxed mx-auto" style={{ color: 'var(--text-muted)' }}>Select any active government program from the feed list to verify eligibility rules.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
