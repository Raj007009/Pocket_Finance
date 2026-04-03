import { createContext, useContext, useState, useEffect } from 'react'
import { TRANSACTIONS } from '../data/mockData'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  // Load from localStorage on first render, fall back to mock data
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem('pf_transactions')
      return saved ? JSON.parse(saved) : TRANSACTIONS
    } catch {
      return TRANSACTIONS
    }
  })

  const [role, setRole] = useState('viewer')     // 'viewer' | 'admin'
  const [filter, setFilter] = useState('all')    // 'all' | 'income' | 'expense'
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('date')   // 'date' | 'amount'
  const [sortDir, setSortDir] = useState('desc') // 'asc' | 'desc'
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('pf_dark') === 'true'
  })

  // Persist transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('pf_transactions', JSON.stringify(transactions))
  }, [transactions])

  // Apply dark mode class to <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('pf_dark', darkMode)
  }, [darkMode])

  function addTransaction(tx) {
    setTransactions(prev => [{ ...tx, id: Date.now() }, ...prev])
  }

  function deleteTransaction(id) {
    setTransactions(prev => prev.filter(t => t.id !== id))
  }

  function toggleSort(col) {
    if (sortBy === col) {
      setSortDir(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(col)
      setSortDir('desc')
    }
  }

  // Build the filtered + sorted list used by the table
  const visibleTransactions = transactions
    .filter(tx => {
      const matchType = filter === 'all' || tx.type === filter
      const matchSearch = tx.category.toLowerCase().includes(search.toLowerCase()) ||
                          tx.note?.toLowerCase().includes(search.toLowerCase())
      return matchType && matchSearch
    })
    .sort((a, b) => {
      let diff = 0
      if (sortBy === 'date')   diff = new Date(a.date) - new Date(b.date)
      if (sortBy === 'amount') diff = a.amount - b.amount
      return sortDir === 'asc' ? diff : -diff
    })

  return (
    <AppContext.Provider value={{
      transactions,
      visibleTransactions,
      role, setRole,
      filter, setFilter,
      search, setSearch,
      sortBy, sortDir, toggleSort,
      darkMode, setDarkMode,
      addTransaction,
      deleteTransaction,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
