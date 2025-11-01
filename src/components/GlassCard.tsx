import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <div
      className={`bg-white/[0.06] backdrop-blur-xl rounded-2xl border border-white/10 p-6 transition-all duration-300 ${
        hover ? 'hover:bg-white/[0.08] hover:shadow-lg hover:shadow-cyan-500/10' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
