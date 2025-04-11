'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import EditNoteDialog from './EditNoteDialog'
import { Pencil, Trash, Check } from 'lucide-react'

type Note = {
  id: number
  title: string
  content: string
  completed: boolean
}

type NoteCardProps = {
  note: Note
  onDelete: () => void
  onComplete: () => void
  onUpdate: (updated: { title: string; content: string }) => void
}

export default function NoteCard({
  note,
  onDelete,
  onComplete,
  onUpdate,
}: NoteCardProps) {
  return (
    <div
      className={cn(
        'p-4 rounded-xl border bg-muted/30 shadow-sm space-y-2',
        note.completed && 'opacity-80 border-green-400'
      )}
    >
      <div className="flex justify-between items-center">
        <p className="text-lg font-medium">{note.title}</p>
        {note.completed && (
          <span className="text-xs text-green-600 font-semibold">✅ Completed</span>
        )}
      </div>

      <p className="text-sm text-muted-foreground">{note.content}</p>

      <div className="flex gap-2 justify-end mt-2">
        {!note.completed && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onComplete}
            title="Mark as Completed"
          >
            <Check className="h-4 w-4" />
          </Button>
        )}

        <EditNoteDialog
          noteId={note.id}
          title={note.title}
          content={note.content}
          onSubmit={onUpdate}
          trigger={
            <Button variant="ghost" size="icon" title="Edit">
              <Pencil className="h-4 w-4" />
            </Button>
          }
        />

        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          title="Delete"
        >
          <Trash className="h-4 w-4 text-red-500" />
        </Button>
      </div>
    </div>
  )
}
