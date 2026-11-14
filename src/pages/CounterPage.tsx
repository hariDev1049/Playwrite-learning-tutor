import { useState } from 'react'

export function CounterPage() {
  const [count, setCount] = useState(0)

  return (
    <section className="panel">
      <h1>Counter</h1>
      <p className="lede">
        Increment adds one. Decrement is available only after the count leaves
        zero. Reset returns to zero.
      </p>
      <p className="count" aria-live="polite">
        Count is {count}
      </p>
      <div className="actions">
        <button type="button" onClick={() => setCount((value) => value + 1)}>
          Increment
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => setCount((value) => value - 1)}
          disabled={count === 0}
        >
          Decrement
        </button>
        <button
          type="button"
          className="secondary"
          onClick={() => setCount(0)}
        >
          Reset
        </button>
      </div>
      <p className="lesson">
        Each test gets a fresh page, so a click in one test cannot change the
        count another test sees.
      </p>
    </section>
  )
}
