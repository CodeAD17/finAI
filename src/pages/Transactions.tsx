import { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import Modal from '../components/Modal';

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
}

const mockTransactions: Transaction[] = [
  { id: '1', date: '2024-11-01', description: 'Salary', category: 'Income', amount: 5000, type: 'income' },
  { id: '2', date: '2024-10-31', description: 'Grocery Shopping', category: 'Food & Dining', amount: 120, type: 'expense' },
  { id: '3', date: '2024-10-30', description: 'Uber Ride', category: 'Transportation', amount: 25, type: 'expense' },
  { id: '4', date: '2024-10-29', description: 'Netflix Subscription', category: 'Entertainment', amount: 15, type: 'expense' },
  { id: '5', date: '2024-10-28', description: 'Restaurant Dinner', category: 'Food & Dining', amount: 85, type: 'expense' },
  { id: '6', date: '2024-10-27', description: 'Gas Station', category: 'Transportation', amount: 50, type: 'expense' },
  { id: '7', date: '2024-10-26', description: 'Freelance Project', category: 'Income', amount: 800, type: 'income' },
  { id: '8', date: '2024-10-25', description: 'Electric Bill', category: 'Bills', amount: 120, type: 'expense' },
];

const categories = ['All', 'Food & Dining', 'Transportation', 'Entertainment', 'Bills', 'Income', 'Shopping'];

export default function Transactions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTransactions = mockTransactions.filter((t) => {
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Food & Dining': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      'Transportation': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Entertainment': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      'Bills': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Income': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Shopping': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    };
    return colors[category] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/[0.06] border border-white/10 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition-colors"
          />
        </div>

        <div className="flex gap-3">
          <div className="relative">
            <Filter size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-12 pr-4 py-3 bg-white/[0.06] border border-white/10 rounded-xl text-gray-200 focus:outline-none focus:border-cyan-400/50 transition-colors appearance-none cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-[#0B0B0C]">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 hover:from-cyan-400/30 hover:to-purple-500/30 text-cyan-400 rounded-xl font-medium transition-all flex items-center gap-2 border border-cyan-400/20"
          >
            <Plus size={18} />
            Add
          </button>
        </div>
      </div>

      <GlassCard className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction, index) => (
                <tr
                  key={transaction.id}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group cursor-pointer"
                  style={{
                    animation: `fadeIn 0.3s ease-out ${index * 0.05}s both`,
                  }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {new Date(transaction.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getCategoryColor(transaction.category)}`}>
                      {transaction.category}
                    </span>
                  </td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-semibold ${
                    transaction.type === 'income' ? 'text-green-400' : 'text-orange-400'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Transaction"
      >
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-white/[0.06] border border-white/10 rounded-xl text-gray-200 focus:outline-none focus:border-cyan-400/50"
              placeholder="Enter description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Amount
            </label>
            <input
              type="number"
              className="w-full px-4 py-3 bg-white/[0.06] border border-white/10 rounded-xl text-gray-200 focus:outline-none focus:border-cyan-400/50"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category
            </label>
            <select className="w-full px-4 py-3 bg-white/[0.06] border border-white/10 rounded-xl text-gray-200 focus:outline-none focus:border-cyan-400/50">
              {categories.filter(c => c !== 'All').map((cat) => (
                <option key={cat} value={cat} className="bg-[#0B0B0C]">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Type
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                className="flex-1 py-3 rounded-xl border border-green-500/30 bg-green-500/10 text-green-400 font-medium hover:bg-green-500/20 transition-colors"
              >
                Income
              </button>
              <button
                type="button"
                className="flex-1 py-3 rounded-xl border border-orange-500/30 bg-orange-500/10 text-orange-400 font-medium hover:bg-orange-500/20 transition-colors"
              >
                Expense
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400/20 to-purple-500/20 hover:from-cyan-400/30 hover:to-purple-500/30 text-cyan-400 font-medium transition-all border border-cyan-400/20"
          >
            Add Transaction
          </button>
        </form>
      </Modal>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
