import { ROBOTO_FONT_URL } from '~/shared/const'
import { publicEnvVariables } from './loaders/env'

import globalStyle from '~/styles/global.css'
import { Box, CssBaseline } from '@mui/material'

import Footer from './src/components/footer'
import Header from './src/components/header'
import GoogleOneTap from './src/components/google-oauth-client'
import { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node'
import {
  useLoaderData,
  Meta,
  Links,
  Outlet,
  ScrollRestoration,
  Scripts,
  LiveReload,
} from '@remix-run/react'
import { authenticator } from './service/auth'

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
  const user = await authenticator.isAuthenticated(request, {})

  return {
    env: publicEnvVariables,
    user,
  }
}

export default function App() {
  const { env } = useLoaderData()

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
          <Outlet />
          <Footer />
        </Box>

        <ScrollRestoration />
        <Scripts />
        <GoogleOneTap />
        <LiveReload />
      </body>
    </html>
  )
}
