import { Box, Container, Typography, Button } from '@mui/material'
import { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { themeColors } from '~/shared/colors'

export const meta: MetaFunction = () => {
  return {
    title: 'Tactical platform',
    viewport: 'width=device-width,initial-scale=1',
    charSet: 'utf-8',
  }
}

export default function Contact() {
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
          component="h1"
          color="common.white"
          gutterBottom
        >
          {'Контакт'}
        </Typography>
        <Typography color="common.white" variant="h4">
          <Link to="mailto:magazinzbroi@gmail.com" style={{ color: 'inherit' }}>
            magazinzbroi@gmail.com
          </Link>
        </Typography>
      </Container>
    </Box>
  )
}
