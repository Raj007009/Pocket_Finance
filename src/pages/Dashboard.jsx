import Header from '../components/Header'
import SummaryCards from '../components/SummaryCards'
import Charts from '../components/Charts'
import TransactionTable from '../components/TransactionTable'
import Insights from '../components/Insights'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <Header />

        <main className="flex flex-col gap-4">
          <SummaryCards />
          <Charts />
          <Insights />
          <TransactionTable />
        </main>
      </div>
    </div>
  )
}
