/**
 * DonutChart — simple donut chart using Recharts.
 */
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import styles from './DonutChart.module.css';

const COLORS = [
  'var(--accent-purple)',
  'var(--accent-green)',
  'var(--accent-blue)',
  'var(--accent-orange)',
  'var(--accent-red)',
];

const DonutChart = ({ data, title }) => {
  return (
    <div className={styles.wrapper}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              color: 'var(--text-primary)',
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonutChart;
