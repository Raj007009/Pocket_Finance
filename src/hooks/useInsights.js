import { useApp } from '../context/AppContext'

// Pulls out all the computed numbers so components stay simple
export function useInsights() {
  const { transactions } = useApp()

  const jun = transactions.filter(t => t.date.startsWith('2024-06'))
  const may = transactions.filter(t => t.date.startsWith('2024-05'))

  const junIncome  = jun.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const junExpense = jun.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  const mayExpense = may.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)

  const balance = junIncome - junExpense

  // spending by category in June
  const byCat = {}
  jun.filter(t => t.type === 'expense').forEach(t => {
    byCat[t.category] = (byCat[t.category] || 0) + t.amount
  })
  const topCategory = Object.entries(byCat).sort((a, b) => b[1] - a[1])[0] || ['—', 0]

  const expenseChange = mayExpense > 0
    ? Math.round(((junExpense - mayExpense) / mayExpense) * 100)
    : 0

  const savingsRate = junIncome > 0
    ? Math.round(((junIncome - junExpense) / junIncome) * 100)
    : 0

  // Monthly bar chart data
  const months = [
    { label: 'Apr', key: '2024-04' },
    { label: 'May', key: '2024-05' },
    { label: 'Jun', key: '2024-06' },
  ]
  const monthlyData = months.map(({ label, key }) => {
    const income  = transactions.filter(t => t.date.startsWith(key) && t.type === 'income').reduce((s, t) => s + t.amount, 0)
    const expense = transactions.filter(t => t.date.startsWith(key) && t.type === 'expense').reduce((s, t) => s + t.amount, 0)
    return { label, income, expense }
  })

  // Pie chart data — June expenses by category
  const pieData = Object.entries(byCat).map(([name, value]) => ({ name, value }))

  return {
    junIncome,
    junExpense,
    balance,
    topCategory,
    expenseChange,
    savingsRate,
    monthlyData,
    pieData,
  }
}
