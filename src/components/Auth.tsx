import React, { useState } from 'react';
import { Sparkles, Phone, ShieldCheck, Mail, ArrowRight, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Auth: React.FC = () => {
  const { login } = useApp();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 1000);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login('Ramesh Patel', phone);
    }, 1000);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login('Ramesh Patel', '+91 98765 43210');
    }, 8000); // simulate delay, wait a bit
  };

  const handleGuestLogin = () => {
    login('Ramesh Patel', '+91 98765 43210', true);
  };

  return (
    <div className="min-h-screen bg-[#070b13] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10 animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-md glass rounded-3xl p-8 relative space-y-8">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto glow-green">
            <Sparkles className="w-6 h-6 text-emerald-400" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight font-sans">Kisan Alert 360°</h2>
          <p className="text-xs text-slate-400">Your Farm's Digital Twin Portal</p>
        </div>

        {/* Dynamic Login Form */}
        {step === 'phone' ? (
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <div>
              <label htmlFor="phone-input" className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Mobile Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input
                  id="phone-input"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-900/60 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              Send OTP Verification
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div>
              <label htmlFor="otp-input" className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">Enter 6-Digit OTP</label>
              <div className="relative">
                <ShieldCheck className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input
                  id="otp-input"
                  type="text"
                  maxLength={6}
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full bg-slate-900/60 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              Verify OTP & Sign In
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <button 
              type="button" 
              onClick={() => setStep('phone')}
              className="w-full text-center text-[10px] text-slate-400 hover:text-white"
            >
              Back to Phone Input
            </button>
          </form>
        )}

        {/* Divider */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-900"></div>
          <span className="flex-shrink mx-4 text-[10px] text-slate-500 uppercase font-bold tracking-widest">or sign in with</span>
          <div className="flex-grow border-t border-slate-900"></div>
        </div>

        {/* SSO & Demo Logins */}
        <div className="space-y-3">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-2.5 bg-slate-900/60 hover:bg-slate-900 border border-slate-800 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Mail className="w-4 h-4 text-slate-400" />
            Continue with Google SSO
          </button>

          <button
            onClick={handleGuestLogin}
            className="w-full py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <User className="w-4 h-4" />
            Bypass with Demo Guest Mode
          </button>
        </div>

        {/* Hackathon Footer Info */}
        <p className="text-[10px] text-slate-500 text-center leading-relaxed">
          Google Cloud AI Hackathon Prototype. Under GCP Terms of Service.
        </p>
      </div>
    </div>
  );
};
