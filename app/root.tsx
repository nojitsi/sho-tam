import { ROBOTO_FONT_URL } from '~/shared/const'
import { publicEnvVariables } from './loaders/env'

import globalStyle from '~/styles/global.css'
import { Box, Container, CssBaseline, Typography } from '@mui/material'

import Footer from './components/footer'
import Header from './components/header'
import GoogleOneTap from './components/google-oauth-client'
import {
  json,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  Response,
} from '@remix-run/node'
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

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: globalStyle },
    { rel: 'stylesheet', href: ROBOTO_FONT_URL },
  ]
}

export const meta: MetaFunction = () => {
  return {
    title: 'New Remix App',
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUserAuthData(request)
  const session = await getSession(request.headers.get('cookie'))
  const message = session.get(MESSAGE_HEADER_KEY)
  const messageColor = session.get(MESSAGE_COLOR_HEADER_KEY)
  const redirectTo = new URL(request.url).pathname
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

export default function App() {
  const { env, message, messageColor, user, redirectTo } = useLoaderData()

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <CssBaseline />
        <Links />
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
          <Message message={message} messageColor={messageColor} />
          <Outlet />
          <Footer />
        </Box>

        <ScrollRestoration />
        <Scripts />
        <GoogleOneTap
          autoprompt={!user?.email}
          redirectTo={redirectTo}
          GOOGLE_OAUTH_CLIENT_ID={env.GOOGLE_OAUTH_CLIENT_ID}
          GOOGLE_OAUTH_ONE_TAP_REDIRECT_PATH={
            env.GOOGLE_OAUTH_ONE_TAP_REDIRECT_PATH
          }
        />
        <LiveReload />
      </body>
    </html>
  )
}

export function CatchBoundary() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <CssBaseline />
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
          <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
            <Typography
              variant="h3"
              component="h2"
              color="common.white"
              gutterBottom
            >
              {'Сторінка не знайдена'}
            </Typography>
          </Container>

          <Footer />
        </Box>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
