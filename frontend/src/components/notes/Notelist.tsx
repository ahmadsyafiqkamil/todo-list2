'use client'

import { useEffect, useState, useCallback } from 'react'
import { useAccount, useWalletClient, usePublicClient } from 'wagmi'
import NoteCard from './NoteCard'
import { toast } from 'sonner'
import { Skeleton } from '@/components/ui/skeleton'

type Note = {
  id: number
  title: string
  content: string
  completed: boolean
}

type Props = {
  refreshSignal: number
}

export default function NoteList({ refreshSignal }: Props) {
  const { address } = useAccount()
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { data: walletClient } = useWalletClient()
  const publicClient = usePublicClient()

  const fetchNotes = useCallback(async () => {
    if (!address) return

    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`http://127.0.0.1:8000/notes?address=${address}`)
      if (!res.ok) throw new Error('Failed to fetch notes')
      const data = await res.json()
      setNotes(data.notes)
    } catch (err: any) {
      setError(err.message || 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [address])

  useEffect(() => {
    fetchNotes()
  }, [address, refreshSignal, fetchNotes])

  const handleDelete = async (id: number) => {
    if (!walletClient || !address) {
      toast.error('Wallet not connected')
      return
    }

    try {
      setLoading(true)
      const res = await fetch(`http://127.0.0.1:8000/notes/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
      })

      if (!res.ok) throw new Error('Failed to delete note')
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

      if (!publicClient) throw new Error('Public client not found')
      await publicClient.waitForTransactionReceipt({ hash: txHash })

      toast.success('Transaction confirmed on blockchain ✅')
      fetchNotes()
    } catch (err: any) {
      console.error(err)
      toast.error('Transaction failed', { description: err.message })
    } finally {
      setLoading(false)
    }
  }

  const handleComplete = async (id: number) => {
    if (!walletClient || !address) {
      toast.error('Wallet not connected')
      return
    }

    try {
      setLoading(true)
      const res = await fetch(`http://127.0.0.1:8000/notes/${id}/complete`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address }),
      })

      if (!res.ok) throw new Error('Failed to complete note')
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

      if (!publicClient) throw new Error('Public client not found')
      await publicClient.waitForTransactionReceipt({ hash: txHash })

      toast.success('Transaction confirmed on blockchain ✅')
      fetchNotes()
    } catch (err: any) {
      console.error(err)
      toast.error('Transaction failed', { description: err.message })
    } finally {
      setLoading(false)
    }
  }

  const SkeletonNoteCard = () => (
    <div className="p-4 rounded-xl border space-y-2 shadow-sm">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  )

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">My Notes</h2>

      {error && <p className="text-red-500">Error: {error}</p>}

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonNoteCard key={i} />
          ))}
        </div>
      ) : notes.length === 0 ? (
        <p className="text-muted-foreground">You have no notes yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onDelete={() => handleDelete(note.id)}
              onComplete={() => handleComplete(note.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
