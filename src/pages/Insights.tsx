import { useState, useRef, useEffect } from 'react';
import { Send, TrendingUp, Wallet, PieChart } from 'lucide-react';
import GlassCard from '../components/GlassCard';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const presetQuestions = [
  'Show my top 3 expenses',
  'Predict next month savings',
  'Analyze spending trends',
  'Budget optimization tips',
];

const aiResponses: Record<string, string> = {
  'Show my top 3 expenses': 'Your top 3 expenses this month are: 1) Bills ($1,200), 2) Food & Dining ($850), and 3) Shopping ($620). Together, they account for 67% of your total spending.',
  'Predict next month savings': 'Based on your current spending patterns and income trends, you\'re projected to save approximately $2,250 next month, which is 15% higher than this month.',
  'Analyze spending trends': 'Your spending has increased by 8% compared to last month, primarily due to higher dining expenses. However, your transportation costs have decreased by 12%.',
  'Budget optimization tips': 'I recommend reducing dining expenses by 20% through meal planning, and reallocating $200 from entertainment to your emergency fund to reach your savings goal faster.',
};

export default function Insights() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI financial assistant. I can help you analyze your spending, predict savings, and provide personalized financial advice. What would you like to know?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponses[text] || 'I\'m analyzing your financial data. Based on your spending patterns, I can help you optimize your budget and achieve your savings goals more efficiently.',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)] animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="lg:col-span-2 flex flex-col">
        <GlassCard className="flex-1 flex flex-col p-0 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                style={{
                  animation: `slideIn 0.3s ease-out ${index * 0.1}s both`,
                }}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-br from-cyan-400/20 to-cyan-400/10 border border-cyan-400/30 text-gray-200'
                      : 'bg-gradient-to-br from-purple-500/20 to-purple-500/10 border border-purple-500/30 text-gray-200'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {message.timestamp.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gradient-to-br from-purple-500/20 to-purple-500/10 border border-purple-500/30 rounded-2xl px-4 py-3">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-white/10 p-4">
            <div className="flex flex-wrap gap-2 mb-3">
              {presetQuestions.map((question) => (
                <button
                  key={question}
                  onClick={() => handleSend(question)}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-gray-300 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend(inputValue)}
                placeholder="Ask me anything about your finances..."
                className="flex-1 px-4 py-3 bg-white/[0.06] border border-white/10 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition-colors"
              />
              <button
                onClick={() => handleSend(inputValue)}
                className="px-6 py-3 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 hover:from-cyan-400/30 hover:to-purple-500/30 text-cyan-400 rounded-xl transition-all border border-cyan-400/20"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="space-y-6">
        <GlassCard>
          <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wide">
            This Month Summary
          </h3>

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.04]">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-400/20 to-green-400/10 flex items-center justify-center">
                <TrendingUp size={18} className="text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400">Total Income</p>
                <p className="text-lg font-semibold text-green-400">$5,800</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.04]">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400/20 to-orange-400/10 flex items-center justify-center">
                <PieChart size={18} className="text-orange-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400">Total Expenses</p>
                <p className="text-lg font-semibold text-orange-400">$4,000</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.04]">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400/20 to-cyan-400/10 flex items-center justify-center">
                <Wallet size={18} className="text-cyan-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-400">Net Savings</p>
                <p className="text-lg font-semibold text-cyan-400">$1,800</p>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wide">
            Quick Actions
          </h3>

          <div className="space-y-2">
            <button className="w-full p-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-left text-sm text-gray-300 transition-colors">
              Export financial report
            </button>
            <button className="w-full p-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-left text-sm text-gray-300 transition-colors">
              Set savings goal
            </button>
            <button className="w-full p-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-left text-sm text-gray-300 transition-colors">
              Schedule budget review
            </button>
          </div>
        </GlassCard>
      </div>

      <style>{`
        @keyframes slideIn {
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
