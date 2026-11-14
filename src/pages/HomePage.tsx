import { useState } from 'react'

export function HomePage() {
  const [tip, setTip] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function loadTip() {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/tip')
      if (!response.ok) {
        throw new Error(`Request failed with ${response.status}`)
      }
      const data = (await response.json()) as { text?: string }
      if (!data.text) {
        throw new Error('Tip response had no text')
      }
      setTip(data.text)
    } catch {
      setTip(null)
      setError('Could not load a tip.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="panel">
      <h1>Playwright Lab</h1>
      <p className="lede">
        Four small screens. The tests in <code>tests/</code> open them in a real
        browser, click and type, then check what the page shows.
      </p>
      <div className="actions">
        <button type="button" onClick={loadTip} disabled={loading}>
          {loading ? 'Loading tip…' : 'Load a tip'}
        </button>
      </div>
      {tip ? (
        <p className="status" role="status">
          {tip}
        </p>
      ) : null}
      {error ? (
        <p className="alert" role="alert">
          {error}
        </p>
      ) : null}
      <p className="lesson">
        One test calls the dev server. Another replaces <code>/api/tip</code>{' '}
        with <code>page.route</code>, so the UI can be checked without depending
        on that response.
      </p>
    </section>
  )
}
