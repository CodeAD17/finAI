import { LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import GlassCard from './GlassCard';

interface OverviewCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: 'cyan' | 'purple' | 'green' | 'orange';
  currency?: string;
  subtitle?: string;
}

const colorMap = {
  cyan: {
    text: 'text-cyan-400',
    bg: 'from-cyan-400/20 to-cyan-400/5',
    glow: 'shadow-cyan-500/20',
  },
  purple: {
    text: 'text-purple-400',
    bg: 'from-purple-400/20 to-purple-400/5',
    glow: 'shadow-purple-500/20',
  },
  green: {
    text: 'text-green-400',
    bg: 'from-green-400/20 to-green-400/5',
    glow: 'shadow-green-500/20',
  },
  orange: {
    text: 'text-orange-400',
    bg: 'from-orange-400/20 to-orange-400/5',
    glow: 'shadow-orange-500/20',
  },
};

export default function OverviewCard({
  title,
  value,
  icon: Icon,
  color,
  currency = '$',
  subtitle,
}: OverviewCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const colors = colorMap[color];

  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <GlassCard className="relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colors.bg} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-400 mb-2 font-light">{title}</p>
          <p className={`text-3xl font-semibold ${colors.text} mb-1`}>
            {currency}{displayValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}
          </p>
          {subtitle && (
            <p className="text-xs text-gray-500 font-light">{subtitle}</p>
          )}
        </div>

        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.bg} flex items-center justify-center shadow-lg ${colors.glow}`}>
          <Icon size={20} className={colors.text} strokeWidth={2} />
        </div>
      </div>
    </GlassCard>
  );
}
