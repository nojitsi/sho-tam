import { type LinksFunction, type MetaFunction } from '@remix-run/node'
import { Link, Links, Outlet } from '@remix-run/react'

import { Box, Container, Typography, Button } from '@mui/material'

export const meta: MetaFunction = () => {
  return {
    title: 'Tactical platform',
    viewport: 'width=device-width,initial-scale=1',
    charSet: 'utf-8',
  }
}

export default function Index() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: 'inherit',
        height: 'inherit',
      }}
    >
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <Typography
          variant="h3"
          component="h2"
          color="common.white"
          gutterBottom
        >
          {
            'Посилання на авторів чудового контенту, що допомогли своєю роботою у створенні цього сайту.'
          }
        </Typography>
      </Container>
      <Container component="main" sx={{ mt: 2, mb: 2 }} maxWidth="sm">
        <Typography color="common.white" gutterBottom>
          {'фавіконка: '}
        </Typography>
        <Typography color="common.white" gutterBottom>
          {'Іконка пістоля, man with gun: https://www.freepik.com'}
        </Typography>
        <Typography color="common.white" gutterBottom>
          {'Іконка дробовіка: https://www.flaticon.com/authors/smalllikeart'}
        </Typography>
        <Typography color="common.white" gutterBottom>
          {'Іконка снайпера: https://www.flaticon.com/authors/maxicons'}
        </Typography>
        <Typography color="common.white" gutterBottom>
          {'Іконка карабіну: https://www.flaticon.com/authors/smashingstocks'}
        </Typography>
        <Typography color="common.white" gutterBottom>
          {'Іконка снайпера: https://www.flaticon.com/authors/maxicons'}
        </Typography>
      </Container>
    </Box>
  )
}
