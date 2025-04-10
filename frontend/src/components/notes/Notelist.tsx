'use client'

import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

type Note = {
  id: number
  title: string
  content: string
  completed: boolean
}

export default function NoteList() {
  const { address } = useAccount()
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!address) return

    const fetchNotes = async () => {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch(
          `http://127.0.0.1:8000/notes?address=${address}`
        )

        if (!res.ok) throw new Error('Failed to fetch notes')

        const data = await res.json()
        console.log(data.notes)
        setNotes(data.notes)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [address])

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">My Notes</h2>

      {loading && <p className="text-muted-foreground">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && notes.length === 0 && (
        <p className="text-muted-foreground">You have no notes yet.</p>
      )}

      {!loading && notes.length > 0 && (
        <ul className="space-y-2">
          {notes.map((note) => (
            <li
              key={note.id}
              className="p-4 rounded-md border bg-muted/30 space-y-1"
            >
              <div className="flex justify-between items-center">
                <p className="text-lg font-medium">{note.title}</p>
                {note.completed && (
                  <span className="text-xs text-green-600 font-semibold">
                    ✅ Completed
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{note.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
