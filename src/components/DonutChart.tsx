import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface DonutChartProps {
  data: { name: string; value: number; color: string }[];
}

export default function DonutChart({ data }: DonutChartProps) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={110}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
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
      </PieChart>
    </ResponsiveContainer>
  );
}
