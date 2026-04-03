// Realistic-looking mock data across 3 months
// Kept intentionally readable so anyone reviewing the code can follow it easily

export const TRANSACTIONS = [
  // June 2024
  { id: 1,  date: '2024-06-01', category: 'Salary',        type: 'income',  amount: 58000, note: 'Monthly salary' },
  { id: 2,  date: '2024-06-03', category: 'Rent',          type: 'expense', amount: 14000, note: 'June rent' },
  { id: 3,  date: '2024-06-05', category: 'Groceries',     type: 'expense', amount: 3400,  note: 'Big Bazaar run' },
  { id: 4,  date: '2024-06-07', category: 'Food',          type: 'expense', amount: 850,   note: 'Zomato orders' },
  { id: 5,  date: '2024-06-09', category: 'Transport',     type: 'expense', amount: 1100,  note: 'Ola, metro' },
  { id: 6,  date: '2024-06-11', category: 'Freelance',     type: 'income',  amount: 15000, note: 'Design project' },
  { id: 7,  date: '2024-06-13', category: 'Food',          type: 'expense', amount: 1200,  note: 'Team lunch' },
  { id: 8,  date: '2024-06-15', category: 'Entertainment', type: 'expense', amount: 999,   note: 'Netflix + Spotify' },
  { id: 9,  date: '2024-06-17', category: 'Groceries',     type: 'expense', amount: 2100,  note: 'Weekly groceries' },
  { id: 10, date: '2024-06-20', category: 'Healthcare',    type: 'expense', amount: 650,   note: 'Pharmacy' },
  { id: 11, date: '2024-06-22', category: 'Food',          type: 'expense', amount: 780,   note: 'Dinner out' },
  { id: 12, date: '2024-06-25', category: 'Investment',    type: 'income',  amount: 4000,  note: 'Mutual fund return' },
  { id: 13, date: '2024-06-27', category: 'Utilities',     type: 'expense', amount: 1350,  note: 'Electricity + water' },
  { id: 14, date: '2024-06-29', category: 'Shopping',      type: 'expense', amount: 2800,  note: 'Clothes' },

  // May 2024
  { id: 15, date: '2024-05-01', category: 'Salary',        type: 'income',  amount: 58000, note: 'Monthly salary' },
  { id: 16, date: '2024-05-02', category: 'Rent',          type: 'expense', amount: 14000, note: 'May rent' },
  { id: 17, date: '2024-05-06', category: 'Groceries',     type: 'expense', amount: 2900,  note: 'Grocery store' },
  { id: 18, date: '2024-05-09', category: 'Food',          type: 'expense', amount: 1100,  note: 'Food delivery' },
  { id: 19, date: '2024-05-12', category: 'Transport',     type: 'expense', amount: 800,   note: 'Cab rides' },
  { id: 20, date: '2024-05-15', category: 'Entertainment', type: 'expense', amount: 1500,  note: 'Movie + OTT' },
  { id: 21, date: '2024-05-18', category: 'Freelance',     type: 'income',  amount: 8000,  note: 'Logo design' },
  { id: 22, date: '2024-05-21', category: 'Shopping',      type: 'expense', amount: 1800,  note: 'Online order' },
  { id: 23, date: '2024-05-24', category: 'Utilities',     type: 'expense', amount: 1200,  note: 'Bills' },
  { id: 24, date: '2024-05-28', category: 'Healthcare',    type: 'expense', amount: 900,   note: 'Doctor visit' },

  // April 2024
  { id: 25, date: '2024-04-01', category: 'Salary',        type: 'income',  amount: 58000, note: 'Monthly salary' },
  { id: 26, date: '2024-04-02', category: 'Rent',          type: 'expense', amount: 14000, note: 'April rent' },
  { id: 27, date: '2024-04-05', category: 'Groceries',     type: 'expense', amount: 3100,  note: 'Groceries' },
  { id: 28, date: '2024-04-10', category: 'Food',          type: 'expense', amount: 950,   note: 'Dining' },
  { id: 29, date: '2024-04-14', category: 'Transport',     type: 'expense', amount: 650,   note: 'Metro + cabs' },
  { id: 30, date: '2024-04-18', category: 'Investment',    type: 'income',  amount: 3500,  note: 'Dividend' },
  { id: 31, date: '2024-04-22', category: 'Entertainment', type: 'expense', amount: 800,   note: 'Subscriptions' },
  { id: 32, date: '2024-04-25', category: 'Utilities',     type: 'expense', amount: 1100,  note: 'Monthly bills' },
  { id: 33, date: '2024-04-28', category: 'Shopping',      type: 'expense', amount: 3200,  note: 'Electronics' },
]

// Consistent dot colors per category — used in charts + table badges
export const CATEGORY_COLORS = {
  Salary:        '#16a34a',
  Freelance:     '#2563eb',
  Investment:    '#7c3aed',
  Groceries:     '#d97706',
  Food:          '#ea580c',
  Transport:     '#64748b',
  Entertainment: '#db2777',
  Rent:          '#dc2626',
  Utilities:     '#0891b2',
  Healthcare:    '#059669',
  Shopping:      '#9333ea',
}
