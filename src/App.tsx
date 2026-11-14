import { NavLink, Route, Routes } from 'react-router-dom'
import { ContactPage } from './pages/ContactPage.tsx'
import { CounterPage } from './pages/CounterPage.tsx'
import { HomePage } from './pages/HomePage.tsx'
import { TasksPage } from './pages/TasksPage.tsx'

export default function App() {
  return (
    <div className="app">
      <header className="top">
        <NavLink to="/" className="brand" end>
          Playwright Lab
        </NavLink>
        <nav aria-label="Main">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/counter">Counter</NavLink>
          <NavLink to="/tasks">Tasks</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/counter" element={<CounterPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
    </div>
  )
}
