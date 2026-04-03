# PocketFinance Dashboard

A finance dashboard built as part of a frontend internship assignment.

I wanted to keep this simple and focused rather than trying to cram in too many things. The goal was a clean interface where someone can actually understand their spending at a glance — not just a bunch of charts thrown together.

---

## What it does

- **Summary cards** — balance, income, expenses, and savings rate for the current month
- **Two charts** — monthly income vs expense comparison (bar), and a category breakdown for the current month (donut)
- **Transaction list** — searchable, filterable by type, sortable by date or amount
- **Insights section** — top spending category, month-over-month change, savings rate
- **Role-based UI** — switch between Viewer (read only) and Admin (can add/delete transactions) using the dropdown in the header
- **Dark mode** — toggle in the top right, persists across sessions
- **Local storage** — transactions you add or delete survive page refresh

---

## Tech used

- React + Vite
- Tailwind CSS
- Recharts for the charts
- Context API for state (transactions, role, filters, dark mode)

I kept state management simple — everything lives in one context file. For something this size, Redux or Zustand would honestly be overkill.

---

## How to run it

```bash
git clone <your-repo-url>
cd pocketfinance
npm install
npm run dev
```

Opens at `http://localhost:5173`

---

## Folder structure

```
src/
├── components/       # all UI pieces, one concern per file
├── context/          # AppContext — global state
├── data/             # mock transactions + category colors
├── hooks/            # useInsights — computed stats derived from transactions
└── pages/            # Dashboard page, ties everything together
```

---

## Decisions I made along the way

**Mock data across 3 months** — I wanted the month-over-month insight to actually be meaningful, so I added April, May, and June data instead of just one month.

**useInsights as a custom hook** — all the derived calculations (top category, savings rate, expense change %) are in one place. Makes the components much cleaner to read.

**Local storage for persistence** — felt like a natural thing to add. Transactions you add during the session don't disappear on refresh.

**Kept the modal simple** — I almost added category creation but decided against it. The form does what it needs to do without getting complicated.

**Dark mode on `<html>`** — Tailwind's dark mode needs the `.dark` class on the root element, so I apply it there via `useEffect` when the toggle changes.

---

## If I had more time

- Add a month picker so you can view any month, not just June
- CSV export for transactions
- A balance trend line chart over time
- Better mobile layout for the charts specifically

---

## Notes

This uses mock data only — no backend, no auth. The role switcher is frontend-only, just to demonstrate how UI behavior would differ between roles.
