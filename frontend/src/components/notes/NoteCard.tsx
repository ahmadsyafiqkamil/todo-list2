'use client'

import { Button } from '@/components/ui/button'
import ConfirmDeleteDialog from './ConfirmDeleteDialog'
import { useState } from 'react'
import ConfirmCompletedDialog from './ConfirmCompletedDialog'

export type Note = {
  id: number
  title: string
  content: string
  completed: boolean
}

type NoteCardProps = {
  note: Note
  onDelete: () => void
  onComplete: () => void
}

export default function NoteCard({ note, onDelete, onComplete }: NoteCardProps) {
  const [open, setOpen] = useState(false)
  const [openCompleted, setOpenCompleted] = useState(false)

  return (
    <div className="p-4 rounded-xl border bg-muted/30 space-y-2 shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-center">
        <p className="text-lg font-medium">{note.title}</p>
        {note.completed && (
          <span className="text-xs text-green-600 font-semibold">
            ✅ Completed
          </span>
        )}
      </div>
      <p className="text-sm text-muted-foreground">{note.content}</p>

      <div className="flex justify-end gap-2 pt-2">
        {!note.completed && (
          <ConfirmCompletedDialog open={openCompleted} onOpenChange={setOpenCompleted} onConfirm={onComplete}>
            <Button size="sm" variant="outline">
              Complete
            </Button>
          </ConfirmCompletedDialog>
        )}
        <ConfirmDeleteDialog open={open} onOpenChange={setOpen} onConfirm={onDelete}>
          <Button size="sm" variant="destructive">
            Delete
          </Button>
        </ConfirmDeleteDialog>
      </div>
    </div>
  )
}
