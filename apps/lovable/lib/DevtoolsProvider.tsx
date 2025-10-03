import { ProductPanel } from "@lovable/routes"
import { Link } from "@tanstack/react-router"
import { ArrowRight } from "lucide-react"
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react"

type DevtoolsContextValue = {
  productPanels: ProductPanel[]
  isOpen: boolean
  isPeeking: boolean
  open: () => void
  close: () => void
  toggle: () => void
  setPeeking: (value: boolean) => void
}

const DevtoolsContext = createContext<DevtoolsContextValue | undefined>(undefined)

export function DevtoolsProvider({ productPanels, children }: { productPanels: ProductPanel[]; children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isPeeking, setIsPeeking] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen((previous) => !previous), [])
  const setPeeking = useCallback((value: boolean) => setIsPeeking(value), [])

  const value = useMemo<DevtoolsContextValue>(
    () => ({ productPanels, isOpen, isPeeking, open, close, toggle, setPeeking }),
    [productPanels, isOpen, isPeeking, open, close, toggle, setPeeking],
  )

  return (
    <DevtoolsContext.Provider value={value}>
      {children}
      <DevtoolsDock />
    </DevtoolsContext.Provider>
  )
}

function useDevtools() {
  const context = useContext(DevtoolsContext)
  if (!context) {
    throw new Error('Devtools context must be used within DevtoolsProvider')
  }
  return context
}

function DevtoolsDock() {
  const { productPanels, isOpen, isPeeking, toggle, close, setPeeking } = useDevtools()

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, close])

  return (
    <>
      <div
        className="fixed bottom-0 left-0 z-40 h-24 w-24 cursor-pointer"
        onMouseEnter={() => setPeeking(true)}
        onMouseLeave={() => setPeeking(false)}
        onFocusCapture={() => setPeeking(true)}
        onBlurCapture={() => setPeeking(false)}
      >
        {(isPeeking || isOpen) && (
          <button
            type="button"
            aria-label={isOpen ? 'Fermer les devtools routes' : 'Ouvrir les devtools routes'}
            onClick={toggle}
            className="group absolute bottom-4 left-4 flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/90 px-4 py-2 text-xs font-mono uppercase tracking-[0.28em] text-slate-300 shadow-[0_20px_40px_-30px_rgba(15,23,42,0.9)] backdrop-blur transition-all duration-300 hover:border-slate-700 hover:text-white"
            style={{ opacity: isOpen || isPeeking ? 1 : 0 }}
          >
            Routes
            <span className="rounded-md border border-slate-800 bg-slate-900 px-2 py-1 text-[0.65rem] tracking-[0.2em] text-slate-400">
              {productPanels.length}
            </span>
          </button>
        )}
      </div>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Fermer le devtools"
            className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm"
            onClick={close}
          />
          <div className="fixed bottom-6 left-6 z-50 w-[420px] max-w-[calc(100vw-3rem)] rounded-3xl border border-slate-800 bg-slate-950/95 p-5 shadow-[0_40px_120px_-60px_rgba(8,47,73,0.9)]">
            <header className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-slate-500">Devtools routes</span>
                <h2 className="text-lg font-semibold text-white">Cosmic routing explorer</h2>
              </div>
              <button
                type="button"
                onClick={close}
                className="rounded-full border border-slate-800 bg-slate-900/80 px-3 py-1 text-xs font-mono uppercase tracking-[0.3em] text-slate-400 transition hover:border-slate-700 hover:text-white"
              >
                Fermer
              </button>
            </header>
            <div className="mt-4 max-h-[60vh] space-y-4 overflow-y-auto pr-1">
              {productPanels.map((panel) => (
                <section key={panel.id} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <span className="inline-flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/70 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-slate-400">
                        <panel.icon className="h-4 w-4 text-slate-200" /> {panel.code}
                      </span>
                      <h3 className="text-sm font-semibold text-white">{panel.title}</h3>
                      <p className="text-xs text-slate-500">{panel.synopsis}</p>
                    </div>
                    <span className="rounded-md border border-slate-800 bg-slate-950 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-slate-400">
                      {panel.routes.length} routes
                    </span>
                  </div>
                  <ul className="mt-3 space-y-2">
                    {panel.routes.map((route) => (
                      <li key={route.path}>
                        <Link
                          to={route.path}
                          preload="intent"
                          onClick={close}
                          className="group flex items-start justify-between gap-3 rounded-xl border border-transparent bg-slate-950/60 px-3 py-2 text-left text-xs text-slate-300 transition hover:border-slate-700 hover:bg-slate-900"
                        >
                          <div className="flex items-start gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-950">
                              <route.icon className="h-4 w-4 text-slate-200" />
                            </span>
                            <div className="space-y-1">
                              <span className="text-sm font-medium text-white">{route.label}</span>
                              <p className="text-[0.7rem] text-slate-500">{route.description}</p>
                              <code className="inline-block rounded bg-slate-900 px-2 py-0.5 text-[0.65rem] text-slate-500">
                                {route.path}
                              </code>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <ArrowRight className="h-4 w-4 text-slate-600 transition group-hover:translate-x-1 group-hover:text-slate-200" />
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}