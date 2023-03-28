import { Container, Typography } from '@mui/material'

export default function NotFound() {
  return (
    <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
      <Typography variant="h3" component="h2" color="common.white" gutterBottom>
        {'Сторінку не знайдено'}
      </Typography>
    </Container>
  )
}
