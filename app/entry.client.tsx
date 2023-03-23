import { CacheProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { RemixBrowser } from '@remix-run/react'
import { useState } from 'react'
import { hydrate } from 'react-dom'
import ClientStyleContext from './utils/cache/ClientStyleContext'
import { createEmotionCache } from './utils/cache/createEmotionCache'

interface ClientCacheProviderProps {
  children: React.ReactNode
}

function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const [cache, setCache] = useState(createEmotionCache())

  function reset() {
    setCache(createEmotionCache())
  }

  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  )
}

hydrate(
  <ClientCacheProvider>
    <CssBaseline />
    <RemixBrowser />
  </ClientCacheProvider>,
  document,
)
