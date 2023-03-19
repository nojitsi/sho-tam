import { Box, Container, Typography, Button } from '@mui/material'
import { LoaderFunction } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { SocialsProvider } from 'remix-auth-socials'
import { AuthStrategies, getUserAuthData } from '~/service/auth'

const BUTTON_STYLES = {
  padding: '15px 25px',
  background: '#dd4b3991',
  border: '0',
  outline: 'none',
  cursor: 'pointer',
  color: 'white',
  fontWeight: 'bold',
}

export const loader: LoaderFunction = async ({ request }) => {
  const urlParams = new URL(request.url).searchParams
  const redirectTo = urlParams.get('redirectTo')
  const user = getUserAuthData(request)

  return { redirectTo }
}

export default function Index({ request }: any) {
  const { redirectTo } = useLoaderData()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: 'inherit',
        height: 'inherit',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container
        component="main"
        sx={{
          mt: 8,
          mb: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        maxWidth="sm"
      >
        <Container sx={{ mt: 2, mb: 2 }} maxWidth="sm">
          <Form method="post" action={`/auth/${AuthStrategies.PASSWORDLESS}`}>
            <input name="email" value="buaueru@gmail.com" readOnly />
            <input name="redirectTo" value={redirectTo} readOnly hidden />
            <button style={BUTTON_STYLES}>Login with Email</button>
          </Form>
        </Container>
        <Container sx={{ mt: 2, mb: 2 }} maxWidth="sm">
          <Form method="post" action={`/auth/${SocialsProvider.GOOGLE}`}>
            <input name="redirectTo" value={redirectTo} readOnly hidden />
            <button style={BUTTON_STYLES}>Login with Google</button>
          </Form>
        </Container>
        <Container sx={{ mt: 2, mb: 2 }} maxWidth="sm">
          <Form action="/auth/logout" method="post">
            <button style={BUTTON_STYLES}>Logout</button>
          </Form>
        </Container>
      </Container>
    </Box>
  )
}
