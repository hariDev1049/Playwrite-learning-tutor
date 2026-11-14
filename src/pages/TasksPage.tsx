import { useState, type FormEvent } from 'react'

type Task = {
  id: number
  title: string
  done: boolean
}

export function TasksPage() {
  const [title, setTitle] = useState('')
  const [tasks, setTasks] = useState<Task[]>([])
  const remaining = tasks.filter((task) => !task.done).length

  function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextTitle = title.trim()
    if (!nextTitle) {
      return
    }
    setTasks((current) => [
      ...current,
      { id: Date.now(), title: nextTitle, done: false },
    ])
    setTitle('')
  }

  function toggleTask(id: number) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    )
  }

  return (
    <section className="panel">
      <h1>Tasks</h1>
      <p className="lede">Add a task, then mark it done.</p>
      <form onSubmit={addTask}>
        <label htmlFor="task-title">
          New task
          <input
            id="task-title"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Buy milk"
          />
        </label>
        <div>
          <button type="submit" disabled={title.trim().length === 0}>
            Add task
          </button>
        </div>
      </form>
      {tasks.length === 0 ? (
        <p className="meta">No tasks yet.</p>
      ) : (
        <>
          <p className="meta">{remaining} left</p>
          <ul className="tasks">
            {tasks.map((task) => (
              <li key={task.id} className={task.done ? 'done' : undefined}>
                <label className="task">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span>{task.title}</span>
                </label>
              </li>
            ))}
          </ul>
        </>
      )}
      <p className="lesson">
        The test finds the field by its label and the checkbox by the task
        name, the same words a person reads on the page.
      </p>
    </section>
  )
}
