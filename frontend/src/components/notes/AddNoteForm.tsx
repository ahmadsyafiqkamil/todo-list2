'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useAccount, useWalletClient } from 'wagmi'
import { toast } from 'sonner'

export default function AddNoteForm() {
  const { address } = useAccount()
  const { data: walletClient } = useWalletClient()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!walletClient || !address) {
      toast.error('Wallet not connected')
      return
    }

    try {
      setLoading(true)
      const res = await fetch('/api/notes/tx', {
        method: 'POST',
        body: JSON.stringify({ title, content, address }),
        headers: { 'Content-Type': 'application/json' },
      })
      const { tx } = await res.json()

      const txHash = await walletClient.sendTransaction(tx)

      toast.success('Transaction sent', { description: txHash })
      setTitle('')
      setContent('')
    } catch (err: any) {
      toast.error('Failed to add note', { description: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold">Add New Note</h2>

      <Input
        placeholder="Note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <Textarea
        placeholder="Note content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <Button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Add Note'}
      </Button>
    </form>
  )
}
