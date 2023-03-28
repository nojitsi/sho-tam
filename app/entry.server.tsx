import 'dotenv/config'
// import 'database/prisma'

import { renderToString } from 'react-dom/server'
import { type EntryContext } from '@remix-run/node'
import { RemixServer } from '@remix-run/react'

import createEmotionServer from '@emotion/server/create-instance'

import { CacheProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { createEmotionCache } from './utils/cache/createEmotionCache'

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const cache = createEmotionCache()
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(cache)

  let html = renderToString(
    <CacheProvider value={cache}>
      <CssBaseline />
      <RemixServer context={remixContext} url={request.url} />
    </CacheProvider>,
  )

  html = '<!DOCTYPE html>' + html

  const emotionCss = constructStyleTagsFromChunks(extractCriticalToChunks(html))
  responseHeaders.set('Content-Type', 'text/html')

  return new Response(html.replace('__STYLES__', emotionCss), {
    status: responseStatusCode,
    headers: responseHeaders,
  })
}
