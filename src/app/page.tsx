'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [count, setCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/click')
      .then(res => res.json())
      .then(data => setCount(data.count))
  }, [])

  const handleClick = async () => {
    setLoading(true)
    const res = await fetch('/api/click', { method: 'POST' })
    const data = await res.json()
    setCount(data.count)
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
