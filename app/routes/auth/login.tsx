import { Box, Container, Typography, Button } from '@mui/material'
import { Form } from '@remix-run/react'
import { SocialsProvider } from 'remix-auth-socials'
import { AuthStrategies } from '~/service/auth'

const BUTTON_STYLES = {
  padding: '15px 25px',
  background: '#dd4b3991',
  border: '0',
  outline: 'none',
  cursor: 'pointer',
  color: 'white',
  fontWeight: 'bold',
}

export default function Index() {
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
            <button style={BUTTON_STYLES}>Login with Email</button>
          </Form>
        </Container>
        <Container sx={{ mt: 2, mb: 2 }} maxWidth="sm">
          <Form method="get" action={`/auth/${SocialsProvider.GOOGLE}`}>
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
