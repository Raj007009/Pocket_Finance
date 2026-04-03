import { useInsights } from '../hooks/useInsights'
import { CATEGORY_COLORS } from '../data/mockData'

export default function Insights() {
  const { topCategory, expenseChange, savingsRate, junExpense, junIncome } = useInsights()

  const insights = [
    {
      label: 'Top spending category',
      value: topCategory[0],
      detail: `₹${topCategory[1].toLocaleString('en-IN')} spent this month`,
      color: CATEGORY_COLORS[topCategory[0]] || '#64748b',
      icon: '↑',
    },
    {
      label: 'Month-over-month expenses',
      value: expenseChange > 0 ? `+${expenseChange}%` : `${expenseChange}%`,
      detail: expenseChange > 0
        ? 'Spending went up compared to May'
        : expenseChange < 0
          ? 'You spent less than last month'
          : 'Same as last month',
      color: expenseChange > 0 ? '#ef4444' : '#16a34a',
      icon: expenseChange > 0 ? '↑' : '↓',
    },
    {
      label: 'Savings this month',
      value: `₹${(junIncome - junExpense).toLocaleString('en-IN')}`,
      detail: `${savingsRate}% of your total income`,
      color: '#2563eb',
      icon: '◎',
    },
    {
      label: 'Expense to income ratio',
      value: junIncome > 0 ? Math.round((junExpense / junIncome) * 100) + '%' : '—',
      detail: 'Of income goes to expenses',
      color: '#7c3aed',
      icon: '%',
    },
  ]

  return (
    <div className="bg-white dark:bg-zinc-800/60 rounded-2xl border border-zinc-100 dark:border-zinc-700/60 p-5">
      <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Insights</p>
      <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-5">Based on your June 2024 data</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {insights.map((ins) => (
          <div
            key={ins.label}
            className="rounded-xl p-4 bg-zinc-50 dark:bg-zinc-700/30 border border-zinc-100 dark:border-zinc-700/40"
          >
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold mb-3"
              style={{ backgroundColor: ins.color }}
            >
              {ins.icon}
            </div>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-1">{ins.label}</p>
            <p className="text-base font-semibold text-zinc-800 dark:text-zinc-100">{ins.value}</p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1 leading-4">{ins.detail}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
