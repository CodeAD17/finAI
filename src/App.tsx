import { useState, useEffect } from 'react';
import AppLoader from './components/AppLoader';
import Onboarding from './components/Onboarding';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budgets from './pages/Budgets';
import Insights from './pages/Insights';
import Settings from './pages/Settings';
import { validateOnboardingData } from './utils/validation';

type Page = 'dashboard' | 'transactions' | 'budgets' | 'insights' | 'settings';

interface UserData {
  fullName: string;
  monthlyIncome: number;
  savingsGoal: number;
  onboardingCompleted: boolean;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [userData, setUserData] = useState<UserData>({
    fullName: '',
    monthlyIncome: 0,
    savingsGoal: 0,
    onboardingCompleted: false,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedData = localStorage.getItem('flowbudget_user');
      if (savedData) {
        setUserData(JSON.parse(savedData));
      }
    } catch (err) {
      setError('Failed to load user data');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  const handleOnboardingComplete = (data: { fullName: string; monthlyIncome: number; savingsGoal: number }) => {
    try {
      validateOnboardingData(data);
      const newUserData = { ...data, onboardingCompleted: true };
      setUserData(newUserData);
      localStorage.setItem('flowbudget_user', JSON.stringify(newUserData));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid data provided');
    }
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <AppLoader onComplete={handleLoaderComplete} />;
  }

  if (error) {
    return <div className="p-8 text-red-400">{error}</div>;
  }

  if (!userData.onboardingCompleted) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  const mockExpenses = 4000;
  const mockSavings = Math.max(0, userData.monthlyIncome - mockExpenses);

  const pageComponents = {
    dashboard: (
      <Dashboard
        income={userData.monthlyIncome}
        expenses={mockExpenses}
        savings={mockSavings}
        currency="$"
      />
    ),
    transactions: <Transactions />,
    budgets: <Budgets />,
    insights: <Insights />,
    settings: <Settings />,
  };

  const pageTitles: Record<Page, string> = {
    dashboard: 'Dashboard',
    transactions: 'Transactions',
    budgets: 'Smart Budgets',
    insights: 'AI Insights',
    settings: 'Settings',
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-gray-200">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
      <div className="ml-20">
        <Header title={pageTitles[currentPage]} userName={userData.fullName} />
        <main className="p-8">
          {pageComponents[currentPage]}
        </main>
      </div>
    </div>
  );
}

export default App;