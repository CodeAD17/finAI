import { useState } from 'react';
import GlassCard from '../components/GlassCard';
import { Sparkles } from 'lucide-react';

interface BudgetCategory {
  id: string;
  category: string;
  limit: number;
  spent: number;
  color: string;
}

const initialBudgets: BudgetCategory[] = [
  { id: '1', category: 'Food & Dining', limit: 1000, spent: 850, color: '#00FFC6' },
  { id: '2', category: 'Transportation', limit: 500, spent: 450, color: '#A070FF' },
  { id: '3', category: 'Shopping', limit: 800, spent: 620, color: '#FF6B9D' },
  { id: '4', category: 'Entertainment', limit: 400, spent: 380, color: '#FFB84D' },
  { id: '5', category: 'Bills', limit: 1500, spent: 1200, color: '#5D9CEC' },
];

export default function Budgets() {
  const [budgets, setBudgets] = useState(initialBudgets);
  const [showAiModal, setShowAiModal] = useState(false);

  const totalLimit = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);

  const handleSliderChange = (id: string, newLimit: number) => {
    setBudgets(budgets.map(b => b.id === id ? { ...b, limit: newLimit } : b));
  };

  const getPercentage = (spent: number, limit: number) => {
    return Math.min((spent / limit) * 100, 100);
  };

  const getStatusColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-400';
    if (percentage >= 70) return 'text-orange-400';
    return 'text-green-400';
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard>
          <p className="text-sm text-gray-400 mb-2">Total Budget</p>
          <p className="text-3xl font-semibold text-cyan-400">${totalLimit}</p>
        </GlassCard>

        <GlassCard>
          <p className="text-sm text-gray-400 mb-2">Total Spent</p>
          <p className="text-3xl font-semibold text-orange-400">${totalSpent}</p>
        </GlassCard>

        <GlassCard>
          <p className="text-sm text-gray-400 mb-2">Remaining</p>
          <p className="text-3xl font-semibold text-green-400">${totalLimit - totalSpent}</p>
        </GlassCard>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[#EAEAEA]">Category Budgets</h2>
        <button
          onClick={() => setShowAiModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 hover:from-cyan-400/30 hover:to-purple-500/30 text-cyan-400 rounded-xl font-medium transition-all flex items-center gap-2 border border-cyan-400/20"
        >
          <Sparkles size={18} />
          Rebalance with AI
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {budgets.map((budget, index) => {
          const percentage = getPercentage(budget.spent, budget.limit);
          const circumference = 2 * Math.PI * 70;
          const strokeDashoffset = circumference - (circumference * percentage) / 100;

          return (
            <GlassCard
              key={budget.id}
              className="relative"
              style={{
                animation: `fadeIn 0.4s ease-out ${index * 0.1}s both`,
              }}
            >
              <div className="flex items-start gap-6">
                <div className="relative w-40 h-40 flex-shrink-0">
                  <svg className="w-40 h-40 -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke={budget.color}
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      className="transition-all duration-500"
                      style={{
                        filter: `drop-shadow(0 0 8px ${budget.color}60)`,
                      }}
                    />
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className={`text-2xl font-bold ${getStatusColor(percentage)}`}>
                      {percentage.toFixed(0)}%
                    </p>
                    <p className="text-xs text-gray-500">spent</p>
                  </div>
                </div>

                <div className="flex-1 pt-2">
                  <h3 className="text-lg font-semibold text-[#EAEAEA] mb-4">
                    {budget.category}
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Spent</span>
                        <span className="text-gray-200 font-medium">${budget.spent}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-4">
                        <span className="text-gray-400">Limit</span>
                        <span className="text-gray-200 font-medium">${budget.limit}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-400 mb-2">
                        Adjust Limit
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        step="50"
                        value={budget.limit}
                        onChange={(e) => handleSliderChange(budget.id, parseInt(e.target.value))}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                        style={{
                          background: `linear-gradient(to right, ${budget.color} 0%, ${budget.color} ${(budget.limit / 2000) * 100}%, rgba(255,255,255,0.1) ${(budget.limit / 2000) * 100}%, rgba(255,255,255,0.1) 100%)`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {showAiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowAiModal(false)}
          />
          <div className="relative bg-[#0B0B0C] border border-white/10 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 flex items-center justify-center">
                <Sparkles size={20} className="text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-[#EAEAEA]">AI Budget Plan</h3>
            </div>

            <p className="text-sm text-gray-400 mb-6">
              Based on your spending patterns, here's a recommended budget allocation:
            </p>

            <div className="space-y-3 mb-6">
              {budgets.map((budget) => {
                const recommended = Math.round(budget.spent * 1.2);
                const difference = recommended - budget.limit;

                return (
                  <div
                    key={budget.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/[0.04] border border-white/5"
                  >
                    <span className="text-sm text-gray-300">{budget.category}</span>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-cyan-400">
                        ${recommended}
                      </p>
                      <p className={`text-xs ${difference > 0 ? 'text-orange-400' : 'text-green-400'}`}>
                        {difference > 0 ? '+' : ''}{difference}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowAiModal(false)}
                className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setBudgets(budgets.map(b => ({ ...b, limit: Math.round(b.spent * 1.2) })));
                  setShowAiModal(false);
                }}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-400/20 to-purple-500/20 hover:from-cyan-400/30 hover:to-purple-500/30 text-cyan-400 font-medium transition-all border border-cyan-400/20"
              >
                Apply Plan
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #00FFC6;
          cursor: pointer;
          box-shadow: 0 0 8px rgba(0, 255, 198, 0.6);
        }

        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #00FFC6;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 8px rgba(0, 255, 198, 0.6);
        }
      `}</style>
    </div>
  );
}
