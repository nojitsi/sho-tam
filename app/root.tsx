import { publicEnvVariables } from './loaders/env'

import globalStyle from '~/styles/global.css'
import { Box, Container, CssBaseline, Typography } from '@mui/material'

import Footer from './components/footer'
import Header, { headerLinks } from './components/header'
import GoogleOneTap from './components/google-oauth-client'
import { json, LinksFunction, LoaderFunction } from '@remix-run/node'
import {
  useLoaderData,
  Meta,
  Links,
  Outlet,
  ScrollRestoration,
  Scripts,
  LiveReload,
} from '@remix-run/react'
import { getUserAuthData } from './service/auth'
import Message, {
  MESSAGE_COLOR_HEADER_KEY,
  MESSAGE_HEADER_KEY,
} from './components/message'
import { commitSession, getSession } from './service/session'
import { withEmotionCache } from '@emotion/react'
import CookieConsent from 'react-cookie-consent'
import { themeColors } from './shared/colors'
import { useContext } from 'react'
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/material'

import ClientStyleContext from './utils/cache/ClientStyleContext'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: globalStyle }, ...headerLinks()]
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUserAuthData(request)
  const session = await getSession(request.headers.get('cookie'))
  const message = session.get(MESSAGE_HEADER_KEY)
  const messageColor = session.get(MESSAGE_COLOR_HEADER_KEY)

  const url = new URL(request.url)
  const redirectTo = url.searchParams.get('redirectTo') ?? url.pathname

  return json(
    {
      env: publicEnvVariables,
      user,
      message,
      messageColor,
      redirectTo,
    },
    {
      headers: {
        'set-cookie': await commitSession(session),
      },
    },
  )
}

interface DocumentProps {
  children: React.ReactNode
  title?: string
}

const Document = withEmotionCache(
  ({ children, title }: DocumentProps, emotionCache) => {
    const clientStyleData = useContext(ClientStyleContext)
    // Only executed on client
    useEnhancedEffect(() => {
      // // re-link sheet container
      emotionCache.sheet.container = document.head
      // re-inject tags
      const tags = emotionCache.sheet.tags
      emotionCache.sheet.flush()
      tags.forEach(tag => {
        ;(emotionCache.sheet as any)._insertTag(tag)
      })

      // reset cache to reapply global styles
      clientStyleData.reset()
    }, [])

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          {title ? <title>{title}</title> : null}
          <Meta />
          <Links />
          {typeof document === 'undefined' ? '__STYLES__' : null}
        </head>
        <body>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
            }}
          >
            <Header />
            {children}
            <Footer />
          </Box>
          <Scripts />
          <ScrollRestoration />
          <CookieConsent
            location="bottom"
            buttonText="Ок"
            style={{ backgroundColor: themeColors.red }}
            buttonStyle={{
              fontSize: '18px',
              minWidth: '100px',
              backgroundColor: themeColors.yellow,
            }}
          >
            Ми зберігаємо{' '}
            <a
              style={{ color: 'white' }}
              href="https://support.google.com/chrome/answer/95647?hl=uk&co=GENIE.Platform%3DDesktop"
              target="_blank"
            >
              cookie
            </a>{' '}
            для поліпшення досвіду користування сайтом.
          </CookieConsent>
          {process.env.NODE_ENV === 'development' && <LiveReload />}{' '}
        </body>
      </html>
    )
  },
)

export default function App() {
  const { env, message, messageColor, user, redirectTo } = useLoaderData()

  return (
    <Document title="Купити зброю б/в">
      <Message message={message} messageColor={messageColor} />
      <Outlet />
      <GoogleOneTap
        autoprompt={!user?.email}
        redirectTo={redirectTo}
        GOOGLE_OAUTH_CLIENT_ID={env.GOOGLE_OAUTH_CLIENT_ID}
        GOOGLE_OAUTH_ONE_TAP_REDIRECT_PATH={
          env.GOOGLE_OAUTH_ONE_TAP_REDIRECT_PATH
        }
      />
    </Document>
  )
}

export function CatchBoundary() {
  return (
    <Document title="Cторінку не знайдено">
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <Typography
          variant="h3"
          component="h2"
          color="common.white"
          gutterBottom
        >
          {'Сторінку не знайдено'}
        </Typography>
      </Container>
    </Document>
  )
}
