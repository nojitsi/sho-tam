import { Box } from '@mui/material'
import { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { authenticator } from '~/service/auth'

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/auth/login',
  })

  return {
    user,
  }
}

export default function List() {
  const { user } = useLoaderData()
  console.log({ listUser: user })

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    ></Box>
  )
}
