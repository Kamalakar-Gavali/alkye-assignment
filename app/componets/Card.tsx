"use client"

import { useEffect, useRef, useState, useMemo } from 'react'
import Link from 'next/link'
import { memo } from 'react'

type CardProps = {
    data: any
    className?: string
}

const TITLE_STYLE: React.CSSProperties = {
    fontFamily: 'Test Söhne, sans-serif',
    fontWeight: 400,
    fontSize: '24px',
    lineHeight: '100%',
    color: '#ffffff',
    textAlign: 'left',
}

const DESC_STYLE: React.CSSProperties = {
    fontFamily: 'Test Söhne, sans-serif',
    fontWeight: 500,
    fontStyle: 'normal',
    lineHeight: '100%',
    letterSpacing: '0%',
    color: '#ffffff',
    maxWidth: '100%',
    marginTop: '8px',
}

function Card({ data, className = '' }: CardProps) {
    const imageUrl = data?.image || data?.image_url || ''
    const title = data?.title || 'Card'
    const shortDesc = useMemo(() => (Array.isArray(data) ? `${data.length} items` : data?.short_description || data?.description || ''), [data])

    const ref = useRef<HTMLDivElement | null>(null)
    const [inView, setInView] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setInView(true)
                        if (obs && el) obs.unobserve(el)
                    }
                })
            },
            { threshold: 0.2 }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [])

    const [imgLoaded, setImgLoaded] = useState(false)

    return (
        <div
            ref={ref}
            className={`relative card-root shadow overflow-hidden mx-auto flex-none aspect-square w-[280px] rounded-[71px] bg-center md:w-[420px] lg:w-[500px] transform transition-all duration-500 ease-out will-change-transform ${className} ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{
                transitionProperty: 'transform, opacity',
            }}
        >
            {/* background image as <img> so browser can cache/load it efficiently */}
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    onLoad={() => setImgLoaded(true)}
                />
            ) : (
                <div className="absolute inset-0 bg-gray-100" />
            )}

            {/* overlay */}
            <div className="absolute inset-0 bg-black/30" style={{ opacity: imgLoaded ? 1 : 0.9 }} />

            {/* image loader placeholder */}
            {!imgLoaded && imageUrl ? (
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white" />
                </div>
            ) : null}

            <div className="relative z-30 flex flex-col items-start justify-start text-white p-[20px] md:pt-[95px] md:pr-[69px] md:pb-[95px] md:pl-[69px]" style={{ gap: '12px' }}>
                <div
                    className="inline-flex items-start justify-start w-full"
                    style={{
                        background: '#000000',
                        borderRadius: '40px',
                        padding: '10px 40px',
                    }}
                >
                    <h2 className="text-left w-full" style={TITLE_STYLE}>
                        {title}
                    </h2>
                </div>

                <p className="text-sm md:text-base text-left" style={DESC_STYLE}>
                    {shortDesc}
                </p>
            </div>

            {data?.id ? (
                <Link href={`/details/${data.id}`} className="absolute inset-0 z-40" aria-label={`View ${title}`}>
                    <span className="sr-only">View {title}</span>
                </Link>
            ) : null}

            <style>{`.card-root:hover{ transform: translateY(-6px) scale(1.03);} `}</style>
        </div>
    )
}

export default memo(Card)