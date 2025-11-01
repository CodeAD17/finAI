import { User } from 'lucide-react';

interface HeaderProps {
  title: string;
  userName?: string;
}

export default function Header({ title, userName }: HeaderProps) {
  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="sticky top-0 z-30 bg-[#0B0B0C]/80 backdrop-blur-xl border-b border-white/5">
      <div className="px-8 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#EAEAEA] mb-1">{title}</h1>
          <p className="text-sm text-gray-400 font-light">{date}</p>
        </div>

        <div className="flex items-center gap-3">
          {userName && (
            <span className="text-sm text-gray-300 font-light">{userName}</span>
          )}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
            <User size={18} className="text-cyan-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
