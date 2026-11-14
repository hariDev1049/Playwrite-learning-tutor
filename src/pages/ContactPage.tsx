import { useState, type FormEvent } from 'react'

export function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [sentName, setSentName] = useState<string | null>(null)

  function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    const trimmedMessage = message.trim()

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setSentName(null)
      setError('Name, email, and message are required.')
      return
    }
    if (!trimmedEmail.includes('@')) {
      setSentName(null)
      setError('Enter an email address.')
      return
    }

    setError(null)
    setSentName(trimmedName)
  }

  return (
    <section className="panel">
      <h1>Contact</h1>
      <p className="lede">
        The form stays in the browser. Nothing is sent to a server.
      </p>
      {sentName ? (
        <p className="status" role="status">
          Thanks, {sentName}. We got your message.
        </p>
      ) : (
        <form onSubmit={send}>
          <label htmlFor="name">
            Name
            <input
              id="name"
              name="name"
              value={name}
              autoComplete="name"
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label htmlFor="message">
            Message
            <textarea
              id="message"
              name="message"
              rows={4}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </label>
          {error ? (
            <p className="alert" role="alert">
              {error}
            </p>
          ) : null}
          <div>
            <button type="submit">Send message</button>
          </div>
        </form>
      )}
      <p className="lesson">
        Assertions retry until the confirmation appears, so a slow render does
        not have to be patched with a sleep.
      </p>
    </section>
  )
}
