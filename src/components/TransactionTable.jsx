import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { CATEGORY_COLORS } from '../data/mockData'
import AddTransactionModal from './AddTransactionModal'

function fmtDate(str) {
  return new Date(str).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })
}

function SortIcon({ col, sortBy, sortDir }) {
  if (sortBy !== col) return <span className="text-zinc-300 dark:text-zinc-600 ml-1">↕</span>
  return <span className="text-zinc-500 dark:text-zinc-400 ml-1">{sortDir === 'asc' ? '↑' : '↓'}</span>
}

export default function TransactionTable() {
  const { visibleTransactions, role, deleteTransaction, filter, setFilter, search, setSearch, sortBy, sortDir, toggleSort } = useApp()
  const [showModal, setShowModal] = useState(false)

  const thClass = "text-xs text-zinc-400 dark:text-zinc-500 font-medium uppercase tracking-wider pb-3 text-left select-none"
  const thClickable = thClass + " cursor-pointer hover:text-zinc-600 dark:hover:text-zinc-300"

  return (
    <div className="bg-white dark:bg-zinc-800/60 rounded-2xl border border-zinc-100 dark:border-zinc-700/60 p-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Transactions</p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">{visibleTransactions.length} entries</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {role === 'admin' && (
            <button
              onClick={() => setShowModal(true)}
              className="text-xs px-3 py-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-80 font-medium"
            >
              + Add
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-5">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search category or note..."
          className="text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-1.5 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 placeholder-zinc-300 dark:placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-300 dark:focus:ring-zinc-600 w-52"
        />
        {['all', 'income', 'expense'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs px-3 py-1.5 rounded-lg border capitalize transition-all
              ${filter === f
                ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-transparent'
                : 'bg-white dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300'
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      {visibleTransactions.length === 0 ? (
        <div className="text-center py-14 text-sm text-zinc-400 dark:text-zinc-600">
          <p className="text-2xl mb-2">∅</p>
          <p>No transactions found</p>
          {search && <p className="text-xs mt-1 text-zinc-300 dark:text-zinc-700">Try clearing the search</p>}
        </div>
      ) : (
        <div className="overflow-x-auto -mx-1">
          <table className="w-full text-sm min-w-[520px]">
            <thead>
              <tr>
                <th className={thClickable} onClick={() => toggleSort('date')}>
                  Date <SortIcon col="date" sortBy={sortBy} sortDir={sortDir} />
                </th>
                <th className={thClass}>Category</th>
                <th className={thClass}>Type</th>
                <th className={thClass}>Note</th>
                <th className={thClickable + " text-right"} onClick={() => toggleSort('amount')}>
                  Amount <SortIcon col="amount" sortBy={sortBy} sortDir={sortDir} />
                </th>
                {role === 'admin' && <th className={thClass}></th>}
              </tr>
            </thead>
            <tbody>
              {visibleTransactions.map((tx, i) => (
                <tr
                  key={tx.id}
                  className={`group border-t border-zinc-50 dark:border-zinc-700/40 hover:bg-zinc-50/60 dark:hover:bg-zinc-700/20 transition-colors
                    ${i === 0 ? 'border-t-0' : ''}`}
                >
                  <td className="py-3 pr-4 text-zinc-400 dark:text-zinc-500 text-xs whitespace-nowrap">
                    {fmtDate(tx.date)}
                  </td>
                  <td className="py-3 pr-4">
                    <span className="flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: CATEGORY_COLORS[tx.category] || '#94a3b8' }}
                      />
                      <span className="text-zinc-700 dark:text-zinc-300">{tx.category}</span>
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                      ${tx.type === 'income'
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                        : 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-zinc-400 dark:text-zinc-500 text-xs max-w-[140px] truncate">
                    {tx.note || '—'}
                  </td>
                  <td className={`py-3 text-right font-medium whitespace-nowrap
                    ${tx.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
                    {tx.type === 'income' ? '+' : '−'}₹{tx.amount.toLocaleString('en-IN')}
                  </td>
                  {role === 'admin' && (
                    <td className="py-3 pl-3">
                      <button
                        onClick={() => deleteTransaction(tx.id)}
                        className="text-xs text-zinc-300 dark:text-zinc-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        remove
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && <AddTransactionModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
