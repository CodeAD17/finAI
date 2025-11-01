import { TrendingUp, TrendingDown, Wallet, Target } from 'lucide-react';
import OverviewCard from '../components/OverviewCard';
import GlassCard from '../components/GlassCard';
import DonutChart from '../components/DonutChart';
import LineChart from '../components/LineChart';

interface DashboardProps {
  income: number;
  expenses: number;
  savings: number;
  currency: string;
}

export default function Dashboard({ income, expenses, savings, currency }: DashboardProps) {
  const expenseData = [
    { name: 'Food & Dining', value: 850, color: '#00FFC6' },
    { name: 'Transportation', value: 450, color: '#A070FF' },
    { name: 'Shopping', value: 620, color: '#FF6B9D' },
    { name: 'Entertainment', value: 380, color: '#FFB84D' },
    { name: 'Bills', value: 1200, color: '#5D9CEC' },
    { name: 'Others', value: 500, color: '#A8E6CF' },
  ];

  const savingsData = [
    { month: 'Jan', actual: 1200 },
    { month: 'Feb', actual: 1450 },
    { month: 'Mar', actual: 1150 },
    { month: 'Apr', actual: 1680 },
    { month: 'May', actual: 1850 },
    { month: 'Jun', actual: 2100, predicted: 2100 },
    { month: 'Jul', predicted: 2250 },
    { month: 'Aug', predicted: 2400 },
  ];

  const insights = [
    {
      type: 'warning',
      message: 'Your dining expenses are 23% higher than last month',
      priority: 'medium',
    },
    {
      type: 'success',
      message: 'Great job! You\'re on track to exceed your savings goal',
      priority: 'high',
    },
    {
      type: 'info',
      message: 'Consider setting up automatic transfers to your savings account',
      priority: 'low',
    },
  ];

  const priorityColors = {
    high: 'border-green-500/30 bg-green-500/5',
    medium: 'border-orange-500/30 bg-orange-500/5',
    low: 'border-cyan-500/30 bg-cyan-500/5',
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <OverviewCard
          title="Total Income"
          value={income}
          icon={TrendingUp}
          color="green"
          currency={currency}
          subtitle="This month"
        />
        <OverviewCard
          title="Total Expenses"
          value={expenses}
          icon={TrendingDown}
          color="orange"
          currency={currency}
          subtitle="This month"
        />
        <OverviewCard
          title="Net Savings"
          value={savings}
          icon={Wallet}
          color="cyan"
          currency={currency}
          subtitle="This month"
        />
        <OverviewCard
          title="Predicted Savings"
          value={savings * 1.15}
          icon={Target}
          color="purple"
          currency={currency}
          subtitle="Next month"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard>
          <h3 className="text-lg font-semibold text-[#EAEAEA] mb-4">
            Expense Breakdown
          </h3>
          <DonutChart data={expenseData} />
          <div className="grid grid-cols-2 gap-3 mt-4">
            {expenseData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-gray-400 flex-1">{item.name}</span>
                <span className="text-xs text-gray-300 font-medium">
                  {currency}{item.value}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-lg font-semibold text-[#EAEAEA] mb-4">
            Savings Forecast
          </h3>
          <LineChart data={savingsData} />
          <div className="flex items-center gap-4 mt-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-cyan-400" />
              <span className="text-gray-400">Actual</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-purple-400 opacity-60" style={{ borderTop: '2px dashed' }} />
              <span className="text-gray-400">Predicted</span>
            </div>
          </div>
        </GlassCard>
      </div>

      <GlassCard>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-[#EAEAEA]">
            Smart Insights
          </h3>
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400/20 to-purple-500/20 text-cyan-400 text-sm font-medium hover:from-cyan-400/30 hover:to-purple-500/30 transition-all">
            Ask AI
          </button>
        </div>

        <div className="space-y-3">
          {insights.map((insight, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border ${priorityColors[insight.priority as keyof typeof priorityColors]} transition-all hover:scale-[1.01]`}
            >
              <p className="text-sm text-gray-300">{insight.message}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
