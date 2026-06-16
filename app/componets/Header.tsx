import Image from "next/image";
export default function Header({ isFetching = false }: { isFetching?: boolean }) {
    return (
        <header className="relative flex flex-col items-center justify-center gap-4 py-6 text-center">
            {isFetching ? (
                <div className="absolute right-6 top-6">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-slate-900" />
                </div>
            ) : null}
            <div className="flex items-center gap-3">
                <Image
                    src="/testlogo.png"
                    alt="Logo"
                    width={129}
                    height={59}
                    className="w-[100px] h-[46px] sm:w-[129px] sm:h-[59px] object-contain"
                />
            </div>
            <div>
                <h1
                    className="text-[48px] sm:text-[64px] text-slate-950"
                    style={{
                        fontFamily: 'Test Söhne, sans-serif',
                        fontWeight: 400,
                        fontStyle: 'normal',
                        lineHeight: '100%',
                        letterSpacing: '0%',
                        textAlign: 'center',
                        textTransform: 'none',
                    }}
                >
                    alkye
                </h1>
                <p className="mt-2 text-base leading-7 text-slate-600 sm:text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
                    The easiest test you will ever do
                </p>
            </div>
        </header>
    )
}