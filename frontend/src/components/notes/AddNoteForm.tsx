'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useAccount, useWalletClient, usePublicClient } from 'wagmi'
import { toast } from 'sonner'

type Props = {
  onNoteAdded?: () => void
}

export default function AddNoteForm({ onNoteAdded }: Props) {
  const { address } = useAccount()
  const { data: walletClient } = useWalletClient()
  const publicClient = usePublicClient()

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

      const res = await fetch('http://127.0.0.1:8000/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, address }),
      })

      const data = await res.json()
      if (!data?.tx) throw new Error('No transaction object returned')

      const { tx } = data

      const txToSend = {
        ...tx,
        value: BigInt(tx.value ?? 0),
        gas: BigInt(tx.gas),
        maxFeePerGas: BigInt(tx.maxFeePerGas),
        maxPriorityFeePerGas: BigInt(tx.maxPriorityFeePerGas),
      }

      const txHash = await walletClient.sendTransaction(txToSend)
      toast.success('Transaction sent', { description: txHash })

      // ✅ Tunggu sampai transaksi dikonfirmasi di blockchain
      if (!publicClient) throw new Error('Public client not found')
      await publicClient.waitForTransactionReceipt({ hash: txHash })
      toast.success('Transaction confirmed on blockchain ✅')

      setTitle('')
      setContent('')

      if (onNoteAdded) onNoteAdded() // 🔄 Trigger refresh NoteList
    } catch (err: any) {
      console.error(err)
      toast.error('Transaction failed', { description: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold">Add New Note</h2>
      <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <Textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required />
      <Button type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Add Note'}
      </Button>
    </form>
  )
}
