'use client'

import AddNoteForm from '@/components/notes/AddNoteForm'
import NoteList from '@/components/notes/Notelist'
import { useAccount } from 'wagmi'
import ConnectWalletNotice from '@/components/ConnectWalletNotice'
import { useState } from 'react'

export default function NotesPage() {
  const { isConnected } = useAccount()
  const [refreshSignal, setRefreshSignal] = useState(0)

  if (!isConnected) {
    return <ConnectWalletNotice />
  }

  return (
    <div className="max-w-2xl mx-auto space-y-10">
      <AddNoteForm onNoteAdded={() => setRefreshSignal((r) => r + 1)} />
      <NoteList refreshSignal={refreshSignal} />
    </div>
  )
}
