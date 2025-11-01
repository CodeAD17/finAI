import { Home, CreditCard, PieChart, Brain, Settings } from 'lucide-react';

type Page = 'dashboard' | 'transactions' | 'budgets' | 'insights' | 'settings';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const menuItems = [
  { id: 'dashboard' as Page, icon: Home, label: 'Dashboard' },
  { id: 'transactions' as Page, icon: CreditCard, label: 'Transactions' },
  { id: 'budgets' as Page, icon: PieChart, label: 'Budgets' },
  { id: 'insights' as Page, icon: Brain, label: 'Insights' },
  { id: 'settings' as Page, icon: Settings, label: 'Settings' },
];

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <div className="fixed left-0 top-0 h-screen w-20 bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col items-center py-8 z-40">
      <div className="mb-12">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
          <span className="text-white font-bold text-lg">F</span>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative group w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-br from-cyan-400/20 to-purple-500/20 shadow-lg shadow-cyan-500/20'
                  : 'hover:bg-white/5'
              }`}
              title={item.label}
            >
              {isActive && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/10 to-purple-500/10 blur-xl" />
              )}
              <Icon
                size={20}
                className={`relative transition-all duration-300 ${
                  isActive
                    ? 'text-cyan-400'
                    : 'text-gray-400 group-hover:text-gray-200'
                }`}
                strokeWidth={isActive ? 2.5 : 2}
              />
            </button>
          );
        })}
      </nav>
    </div>
  );
}
