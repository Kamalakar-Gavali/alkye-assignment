import dynamic from 'next/dynamic'

const HomeClient = dynamic(() => import('./Home/page'), { ssr: false })

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <HomeClient />
    </main>
  )
}
