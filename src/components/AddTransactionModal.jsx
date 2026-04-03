import { useState } from 'react'
import { useApp } from '../context/AppContext'

const CATEGORIES = ['Salary', 'Freelance', 'Investment', 'Groceries', 'Food', 'Transport', 'Entertainment', 'Rent', 'Utilities', 'Healthcare', 'Shopping']

const defaultForm = { date: '', category: 'Food', type: 'expense', amount: '', note: '' }

export default function AddTransactionModal({ onClose }) {
  const { addTransaction } = useApp()
  const [form, setForm] = useState(defaultForm)
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  function handleSubmit() {
    if (!form.date || !form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0) {
      setError('Please fill in a valid date and amount.')
      return
    }
    addTransaction({ ...form, amount: Number(form.amount) })
    onClose()
  }

  // Close on backdrop click
  function handleBackdrop(e) {
    if (e.target === e.currentTarget) onClose()
  }

  const inputClass = "w-full text-sm border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 placeholder-zinc-300 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 dark:focus:border-indigo-500"
  const labelClass = "block text-xs text-zinc-500 dark:text-zinc-400 mb-1.5 font-medium"

  return (
    <div
      className="fixed inset-0 bg-black/30 dark:bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdrop}
    >
      <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-100 dark:border-zinc-700 p-6 w-full max-w-sm shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Add transaction</h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 text-lg leading-none">×</button>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className={labelClass}>Date</label>
            <input type="date" name="date" value={form.date} onChange={handleChange} className={inputClass} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Type</label>
              <select name="type" value={form.type} onChange={handleChange} className={inputClass}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Category</label>
              <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>Amount (₹)</label>
            <input type="number" name="amount" value={form.amount} onChange={handleChange} placeholder="e.g. 5000" className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Note <span className="text-zinc-300 dark:text-zinc-600 font-normal">(optional)</span></label>
            <input type="text" name="note" value={form.note} onChange={handleChange} placeholder="e.g. Zomato order" className={inputClass} />
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <div className="flex gap-2 mt-1">
            <button onClick={onClose} className="flex-1 text-sm py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-700">
              Cancel
            </button>
            <button onClick={handleSubmit} className="flex-1 text-sm py-2 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90 font-medium">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
