import { useEffect, useState } from 'react';

export default function AppLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#0A0A0A] to-[#111111] flex items-center justify-center z-50">
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center gap-6">
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="44"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="3"
              fill="none"
            />
            <circle
              cx="48"
              cy="48"
              r="44"
              stroke="url(#gradient)"
              strokeWidth="3"
              fill="none"
              strokeDasharray={276}
              strokeDashoffset={276 - (276 * progress) / 100}
              strokeLinecap="round"
              className="transition-all duration-300 ease-out"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(0, 255, 198, 0.6))',
              }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00FFC6" />
                <stop offset="100%" stopColor="#A070FF" />
              </linearGradient>
            </defs>
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 opacity-30 blur-xl animate-pulse" />
          </div>
        </div>

        <div className="text-center space-y-2">
          <p className="text-[#EAEAEA] text-sm font-light tracking-wide animate-pulse">
            Syncing your financial universe
          </p>
          <p className="text-cyan-400/60 text-xs font-light">
            {progress}%
          </p>
        </div>
      </div>
    </div>
  );
}
