import { useState } from 'react';
import { ArrowRight, Wallet, TrendingUp, Target, Sparkles } from 'lucide-react';

interface OnboardingProps {
  onComplete: (data: { fullName: string; monthlyIncome: number; savingsGoal: number }) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    monthlyIncome: 5000,
    savingsGoal: 1000,
  });

  const handleComplete = () => {
    onComplete(formData);
  };

  const steps = [
    {
      title: 'Welcome to FlowBudget',
      subtitle: 'Your intelligent financial companion',
      icon: Wallet,
      color: 'from-cyan-400 to-blue-500',
      content: (
        <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-3xl blur-2xl opacity-40 animate-pulse" />
            <div className="relative w-32 h-32 rounded-3xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-2xl">
              <Wallet size={48} className="text-white" strokeWidth={1.5} />
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-[#EAEAEA]">Welcome to FlowBudget</h2>
            <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
              Take control of your finances with AI-powered insights, smart budgeting, and personalized recommendations
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto pt-4">
            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
              <TrendingUp size={24} className="text-cyan-400 mx-auto mb-2" />
              <p className="text-xs text-gray-400">Track Income</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
              <Target size={24} className="text-purple-400 mx-auto mb-2" />
              <p className="text-xs text-gray-400">Set Goals</p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
              <Sparkles size={24} className="text-pink-400 mx-auto mb-2" />
              <p className="text-xs text-gray-400">AI Insights</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Tell us about yourself',
      subtitle: 'Let\'s personalize your experience',
      icon: Target,
      color: 'from-purple-400 to-pink-500',
      content: (
        <div className="space-y-6 max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-400/20 to-pink-500/20 flex items-center justify-center mx-auto mb-4 border border-purple-400/30">
              <Target size={32} className="text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-[#EAEAEA] mb-2">Tell us about yourself</h2>
            <p className="text-gray-400">This helps us provide personalized insights</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              What's your name?
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="John Doe"
              className="w-full px-4 py-3 bg-white/[0.06] border border-white/10 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-400/50 transition-colors"
            />
          </div>
        </div>
      ),
    },
    {
      title: 'Set your monthly income',
      subtitle: 'Help us understand your financial situation',
      icon: TrendingUp,
      color: 'from-green-400 to-cyan-500',
      content: (
        <div className="space-y-6 max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-400/20 to-cyan-500/20 flex items-center justify-center mx-auto mb-4 border border-green-400/30">
              <TrendingUp size={32} className="text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-[#EAEAEA] mb-2">Monthly Income</h2>
            <p className="text-gray-400">This helps us create a realistic budget</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-4">
              Average Monthly Income
            </label>
            <div className="relative">
              <div className="text-center mb-4">
                <span className="text-5xl font-bold text-green-400">
                  ${formData.monthlyIncome.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="20000"
                step="100"
                value={formData.monthlyIncome}
                onChange={(e) => setFormData({ ...formData, monthlyIncome: parseInt(e.target.value) })}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #00FFC6 0%, #00FFC6 ${((formData.monthlyIncome - 1000) / 19000) * 100}%, rgba(255,255,255,0.1) ${((formData.monthlyIncome - 1000) / 19000) * 100}%, rgba(255,255,255,0.1) 100%)`,
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>$1,000</span>
                <span>$20,000</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Set your savings goal',
      subtitle: 'What would you like to save each month?',
      icon: Sparkles,
      color: 'from-cyan-400 to-purple-500',
      content: (
        <div className="space-y-6 max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4 border border-cyan-400/30">
              <Sparkles size={32} className="text-cyan-400" />
            </div>
            <h2 className="text-2xl font-bold text-[#EAEAEA] mb-2">Savings Goal</h2>
            <p className="text-gray-400">Set a realistic monthly savings target</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-4">
              Monthly Savings Goal
            </label>
            <div className="relative">
              <div className="text-center mb-4">
                <span className="text-5xl font-bold text-cyan-400">
                  ${formData.savingsGoal.toLocaleString()}
                </span>
                <p className="text-sm text-gray-500 mt-2">
                  {((formData.savingsGoal / formData.monthlyIncome) * 100).toFixed(0)}% of your income
                </p>
              </div>
              <input
                type="range"
                min="100"
                max={Math.floor(formData.monthlyIncome * 0.5)}
                step="50"
                value={formData.savingsGoal}
                onChange={(e) => setFormData({ ...formData, savingsGoal: parseInt(e.target.value) })}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #A070FF 0%, #A070FF ${((formData.savingsGoal - 100) / (Math.floor(formData.monthlyIncome * 0.5) - 100)) * 100}%, rgba(255,255,255,0.1) ${((formData.savingsGoal - 100) / (Math.floor(formData.monthlyIncome * 0.5) - 100)) * 100}%, rgba(255,255,255,0.1) 100%)`,
                }}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>$100</span>
                <span>${Math.floor(formData.monthlyIncome * 0.5).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-cyan-400/5 border border-cyan-400/20">
            <p className="text-sm text-cyan-400/80">
              Recommended: Save at least 20% of your income for a healthy financial future
            </p>
          </div>
        </div>
      ),
    },
  ];

  const currentStep = steps[step];
  const Icon = currentStep.icon;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#0A0A0A] to-[#111111] z-50 overflow-auto">
      <div className="absolute inset-0 opacity-10">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative min-h-screen flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-2xl">
          <div className="mb-12">
            <div className="flex gap-2 mb-8">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                    index <= step
                      ? 'bg-gradient-to-r ' + currentStep.color
                      : 'bg-white/10'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="bg-white/[0.06] backdrop-blur-xl rounded-3xl border border-white/10 p-12 shadow-2xl">
            {currentStep.content}
          </div>

          <div className="flex justify-between items-center mt-8">
            {step > 0 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-medium transition-colors"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={() => {
                if (step < steps.length - 1) {
                  setStep(step + 1);
                } else {
                  handleComplete();
                }
              }}
              disabled={step === 1 && !formData.fullName}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-400/20 to-purple-500/20 hover:from-cyan-400/30 hover:to-purple-500/30 text-cyan-400 font-medium transition-all flex items-center gap-2 border border-cyan-400/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step < steps.length - 1 ? (
                <>
                  Next
                  <ArrowRight size={18} />
                </>
              ) : (
                <>
                  Launch My Dashboard
                  <Sparkles size={18} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00FFC6, #A070FF);
          cursor: pointer;
          box-shadow: 0 0 12px rgba(0, 255, 198, 0.8);
        }

        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00FFC6, #A070FF);
          cursor: pointer;
          border: none;
          box-shadow: 0 0 12px rgba(0, 255, 198, 0.8);
        }
      `}</style>
    </div>
  );
}
