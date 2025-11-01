import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface LineChartProps {
  data: { month: string; actual: number; predicted?: number }[];
}

export default function LineChart({ data }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <RechartsLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis
          dataKey="month"
          stroke="#666"
          style={{ fontSize: '12px', fill: '#999' }}
        />
        <YAxis
          stroke="#666"
          style={{ fontSize: '12px', fill: '#999' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '8px 12px',
            backdropFilter: 'blur(12px)',
          }}
          itemStyle={{ color: '#EAEAEA', fontSize: '12px' }}
          labelStyle={{ color: '#00FFC6', fontSize: '13px', fontWeight: 600 }}
        />
        <Line
          type="monotone"
          dataKey="actual"
          stroke="#00FFC6"
          strokeWidth={3}
          dot={{ fill: '#00FFC6', r: 4 }}
          activeDot={{ r: 6, fill: '#00FFC6' }}
        />
        {data.some(d => d.predicted !== undefined) && (
          <Line
            type="monotone"
            dataKey="predicted"
            stroke="#A070FF"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: '#A070FF', r: 3 }}
          />
        )}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
