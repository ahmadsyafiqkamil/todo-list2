'use client'

import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

export default function NoteList() {
  const { address } = useAccount()
  const [notes, setNotes] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!address) return

    const fetchNotes = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/notes?address=${address}`)
        const data = await res.json()
        setNotes(data.notes || [])
      } catch (err) {
        console.error('Failed to fetch notes:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [address])

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">My Notes</h2>
      {loading ? (
        <p className="text-muted-foreground">Loading notes...</p>
      ) : notes.length === 0 ? (
        <p className="text-muted-foreground">You have no notes yet.</p>
      ) : (
        <ul className="space-y-2">
          {notes.map((note, index) => (
            <li
              key={index}
              className="p-4 rounded-md border bg-muted/30 space-y-1"
            >
              <p className="text-lg font-medium">{note.title}</p>
              <p className="text-sm text-muted-foreground">{note.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
