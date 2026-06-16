import Image from 'next/image'

type Props = { params: { id: string } }

export default async function DetailPage({ params }: Props) {
  const { id } = params

  const res = await fetch('https://alkyetest-738240239910.us-central1.run.app/myapp/list/')
  const list = await res.json()
  const item = Array.isArray(list) ? list.find((it: any) => String(it.id) === String(id)) : null

  if (!item) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">Item not found.</div>
      </main>
    )
  }

  const imageUrl = item.image || item.image_url || '/testlogo.png'

  return (
    <main className="min-h-screen w-full bg-slate-50 text-slate-900 py-12">
      <div className="mx-auto max-w-5xl px-4">
        <div className="rounded-[24px] overflow-hidden shadow-lg bg-white">
          <div className="relative">
            <div className="w-full h-[60vw] md:h-[50vh] lg:h-[60vh] bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }} />
          </div>

          <div className="p-8">
            <h1 style={{ fontFamily: 'Test Söhne, sans-serif', fontWeight: 700, fontStyle: 'normal', fontSize: '45px', lineHeight: '70px', letterSpacing: '0%' }} className="mb-6">
              {item.title || 'Title'}
            </h1>

            <div style={{ fontFamily: 'Test Söhne, sans-serif', fontWeight: 500, fontSize: '32px', lineHeight: '62px', letterSpacing: '0%' }}>
              {item.content || item.description || item.short_description || 'No content provided.'}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
