'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [count, setCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  // Fetch count from API
  const fetchCount = async () => {
    try {
      const res = await fetch('/api/click')
      const data = await res.json()
      setCount(data.count)
    } catch (err) {
      console.error('Error fetching count:', err)
    }
  }

  // Initial fetch + polling every 1 second
  useEffect(() => {
    fetchCount() // initial fetch

    const interval = setInterval(() => {
      fetchCount()
    }, 1000)

    return () => clearInterval(interval) // cleanup on unmount
  }, [])

  // Handle button click
  const handleClick = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/click', { method: 'POST' })
      const data = await res.json()
      setCount(data.count)
    } catch (err) {
      console.error('Error clicking:', err)
    }
    setLoading(false)
  }

  return (
    <main style={{ textAlign: 'center', paddingTop: '100px' }}>
      <h1 style={{ fontSize: '40px' }}>Global Click Count: {count ?? 'Loading...'}</h1>
      <button
        onClick={handleClick}
        disabled={loading}
        style={{ fontSize: '30px', padding: '10px 20px', marginTop: '20px', cursor: 'pointer' }}
      >
        {loading ? 'Clicking...' : 'Click Me!'}
      </button>
    </main>
  )
}
