import { useInsights } from '../hooks/useInsights'

function fmt(n) {
  return '₹' + n.toLocaleString('en-IN')
}

function Card({ label, value, valueClass = '', sub }) {
  return (
    <div className="bg-white dark:bg-zinc-800/60 rounded-2xl border border-zinc-100 dark:border-zinc-700/60 p-5 flex flex-col gap-1 hover:border-zinc-200 dark:hover:border-zinc-600 transition-colors">
      <p className="text-xs text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-medium">{label}</p>
      <p className={`text-2xl font-semibold mt-1 ${valueClass}`}>{value}</p>
      {sub && <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{sub}</p>}
    </div>
  )
}

export default function SummaryCards() {
  const { balance, junIncome, junExpense, savingsRate } = useInsights()

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <Card
        label="Balance"
        value={fmt(balance)}
        valueClass={balance >= 0 ? 'text-zinc-800 dark:text-zinc-100' : 'text-red-500'}
        sub="June 2024"
      />
      <Card
        label="Income"
        value={fmt(junIncome)}
        valueClass="text-emerald-600 dark:text-emerald-400"
        sub="This month"
      />
      <Card
        label="Expenses"
        value={fmt(junExpense)}
        valueClass="text-red-500 dark:text-red-400"
        sub="This month"
      />
      <Card
        label="Savings rate"
        value={savingsRate + '%'}
        valueClass="text-indigo-500 dark:text-indigo-400"
        sub="Of total income"
      />
    </div>
  )
}
