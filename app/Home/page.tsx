'use client'

import { useEffect, useState } from 'react'
import Card from '../componets/Card'
import Header from '../componets/Header'

export default function Home() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    const fetchData = async () => {
      try {
        setIsFetching(true)
        // If we have cached data, show it immediately and refresh in background
        if (typeof window !== 'undefined') {
          const cached = sessionStorage.getItem('alkye-list')
          if (cached) {
            try {
              setData(JSON.parse(cached))
              setLoading(false)
            } catch {
              // ignore parse errors
            }
          } else {
            setLoading(true)
          }
        } else {
          setLoading(true)
        }
        const response = await fetch('https://alkyetest-738240239910.us-central1.run.app/myapp/list/', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        const result = await response.json()
        setData(result || [])
        setError(null)
        try {
          if (typeof window !== 'undefined') sessionStorage.setItem('alkye-list', JSON.stringify(result || []))
        } catch {
          // ignore storage errors
        }
      } catch (err: any) {
        if (err.name === 'AbortError') return
        setError(err.message || 'Failed to load data')
        setData([])
      } finally {
        setLoading(false)
        setIsFetching(false)
      }
    }

    fetchData()
    return () => controller.abort()
  }, [])

  return (
    <main className='min-h-screen w-full bg-slate-50 text-slate-900'>
      <div className='mx-auto flex max-w-6xl flex-col px-4 py-8 sm:px-6 lg:px-8'>
        <Header isFetching={isFetching} />

        <section className='mt-12 overflow-x-auto px-2 pb-6 cards-scrollbar'>
          <div className='flex snap-x snap-mandatory gap-6 pb-6'>
            {loading && data.length === 0 ? (
              // show a few skeleton placeholders when no cached data
              [0, 1, 2].map((i) => (
                <div key={i} className={`flex-none w-[220px] h-[320px] rounded-[71px] bg-white/90 p-4 shadow-lg animate-pulse`} />
              ))
            ) : loading && data.length > 0 ? (
              // if we have cached data but still 'loading' (rare), just show cached rows
              data?.map((item: any) => <Card key={item.id} data={item} className='snap-start' />)
            ) : error ? (
              <div className='flex min-h-[320px] w-full items-center justify-center rounded-[71px] bg-white/90 p-10 shadow-lg text-red-600 md:min-h-[500px]'>
                {error}
              </div>
            ) : (
              data?.map((item: any) => (
                <Card key={item.id} data={item} className='snap-start' />
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
