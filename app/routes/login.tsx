import { Box, Container, Typography, Button, TextField } from '@mui/material'
import { LoaderFunction, MetaFunction } from '@remix-run/node'
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
  width: '100%',
  fontSize: '16px',
}

export const meta: MetaFunction = () => {
  return {
    title: 'Вхід | zbroya.in.ua',
    description: 'Сторінка входу в систему',
    viewport: 'width=device-width,initial-scale=1',
    charSet: 'utf-8',
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const urlParams = new URL(request.url).searchParams
  const redirectTo = urlParams.get('redirectTo') ?? '/'
  const user = await getUserAuthData(request)

  return { redirectTo, user }
}

export default function Index({ request }: any) {
  const { redirectTo, user } = useLoaderData()
  console.log(user)
  return (
    <Container
      component="main"
      sx={{
        mt: 8,
        mb: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffffcc',
        paddingLeft: '10px !important',
        paddingRight: '10px !important',
        borderRadius: '10px',
      }}
      maxWidth="xs"
    >
      {user?.email ? (
        <Container sx={{ mt: 2, mb: 2 }} maxWidth="sm">
          <Form action="/logout" method="post">
            <button style={BUTTON_STYLES}>Вийти</button>
          </Form>
        </Container>
      ) : (
        <>
          {' '}
          <Box sx={{ mt: 2 }}>
            <Form method="post" action={`/auth/${AuthStrategies.PASSWORDLESS}`}>
              <TextField
                label="Email"
                variant="filled"
                name="email"
                inputProps={{ maxLength: 50 }}
                required
                fullWidth
                type="email"
                // color="error"
                color="success"
                sx={{
                  mb: 1,
                  // backgroundColor: '#fff !important',
                  '& label': {
                    color: '#000',
                  },
                }}
                style={{
                  color: '#000 !important',
                }}
              />
              <input name="redirectTo" value={redirectTo} readOnly hidden />
              <button style={BUTTON_STYLES}>Увійти за допомогою Email</button>
            </Form>
          </Box>
          <Box sx={{ mt: 1, mb: 1, width: '100%' }}>
            <Form method="post" action={`/auth/${SocialsProvider.GOOGLE}`}>
              <input name="redirectTo" value={redirectTo} readOnly hidden />
              <button style={BUTTON_STYLES}>
                Увійти за допомогою гугл аккаунту
              </button>
            </Form>
          </Box>
        </>
      )}
    </Container>
  )
}
