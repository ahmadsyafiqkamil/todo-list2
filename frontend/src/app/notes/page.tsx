'use client'

import AddNoteForm from '@/components/notes/AddNoteForm'
import NoteList from '@/components/notes/Notelist'
import { useAccount } from 'wagmi'
import ConnectWalletNotice from '@/components/ConnectWalletNotice'

export default function NotesPage() {
  const { isConnected } = useAccount()

  if (!isConnected) {
    return <ConnectWalletNotice />
  }

  return (
    <div className="max-w-2xl mx-auto space-y-10">
      <AddNoteForm />
      <NoteList />
    </div>
  )
}
