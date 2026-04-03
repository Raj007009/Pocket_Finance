import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend,
} from 'recharts'
import { useInsights } from '../hooks/useInsights'
import { CATEGORY_COLORS } from '../data/mockData'

function fmt(n) {
  if (n >= 1000) return '₹' + (n / 1000).toFixed(0) + 'k'
  return '₹' + n
}

function BarTip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs shadow-md">
      <p className="text-zinc-400 mb-1">{label}</p>
      <p className="text-emerald-600 dark:text-emerald-400 font-medium">Income: {fmt(payload[0]?.value || 0)}</p>
      <p className="text-red-500 dark:text-red-400 font-medium">Expense: {fmt(payload[1]?.value || 0)}</p>
    </div>
  )
}

function PieTip({ active, payload }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs shadow-md">
      <p className="text-zinc-500">{payload[0].name}</p>
      <p className="font-medium text-zinc-800 dark:text-zinc-200 mt-0.5">
        ₹{payload[0].value.toLocaleString('en-IN')}
      </p>
    </div>
  )
}

const panel = "bg-white dark:bg-zinc-800/60 rounded-2xl border border-zinc-100 dark:border-zinc-700/60 p-5"

export default function Charts() {
  const { monthlyData, pieData } = useInsights()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

      {/* Monthly income vs expense bar chart */}
      <div className={panel}>
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Monthly overview</p>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-5">Income vs expenses by month</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={monthlyData} barGap={4}>
            <CartesianGrid vertical={false} stroke="#f0f0ee" strokeDasharray="0" className="dark:stroke-zinc-700/50" />
            <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#a1a1aa' }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={fmt} tick={{ fontSize: 11, fill: '#a1a1aa' }} axisLine={false} tickLine={false} width={42} />
            <Tooltip content={<BarTip />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
            <Bar dataKey="income"  fill="#16a34a" radius={[4, 4, 0, 0]} maxBarSize={28} opacity={0.85} />
            <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={28} opacity={0.75} />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex gap-4 mt-3">
          <span className="flex items-center gap-1.5 text-xs text-zinc-400"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-600 inline-block"></span>Income</span>
          <span className="flex items-center gap-1.5 text-xs text-zinc-400"><span className="w-2.5 h-2.5 rounded-sm bg-red-500 inline-block"></span>Expense</span>
        </div>
      </div>

      {/* Category breakdown donut */}
      <div className={panel}>
        <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Spending by category</p>
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-4">June 2024 breakdown</p>
        {pieData.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-sm text-zinc-400">No expense data</div>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="45%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={CATEGORY_COLORS[entry.name] || '#94a3b8'}
                    opacity={0.85}
                  />
                ))}
              </Pie>
              <Tooltip content={<PieTip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(val) => <span style={{ fontSize: 11, color: '#a1a1aa' }}>{val}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

    </div>
  )
}
