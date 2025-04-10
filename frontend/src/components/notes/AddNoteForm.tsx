'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useAccount, useWalletClient } from 'wagmi'
import { toast } from 'sonner'
import { parseUnits } from 'viem'

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

      // 1. Ambil tx dari backend
      const res = await fetch('/api/notes/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, address }),
      })

      const data = await res.json()

      if (!data?.tx) {
        throw new Error('No transaction object returned from backend')
      }

      const { tx } = data

      console.log('TX from backend:', tx)

      // 2. Convert necessary fields to BigInt
      const txToSend = {
        ...tx,
        value: BigInt(tx.value ?? 0),
        gas: BigInt(tx.gas),
        maxFeePerGas: BigInt(tx.maxFeePerGas),
        maxPriorityFeePerGas: BigInt(tx.maxPriorityFeePerGas),
      }

      console.log('Prepared TX for walletClient:', txToSend)

      // 3. Kirim ke wallet untuk ditandatangani dan dikirim
      const txHash = await walletClient.sendTransaction(txToSend)

      toast.success('Transaction sent', { description: txHash })
      setTitle('')
      setContent('')
    } catch (err: any) {
      console.error(err)
      toast.error('Transaction failed', { description: err.message || 'Unknown error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 border p-6 rounded-xl shadow-sm"
    >
      <h2 className="text-xl font-semibold">Add New Note</h2>
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Add Note'}
      </Button>
    </form>
  )
}
