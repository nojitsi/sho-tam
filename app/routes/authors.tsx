import { type MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'

import { Box, Container, Typography } from '@mui/material'

export const meta: MetaFunction = () => {
  return {
    title: 'Автори | zbroya.in.ua',
    description: 'Посилання на ресурси',
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
          variant="h2"
          component="h1"
          color="common.white"
          gutterBottom
        >
          {'Автори'}
        </Typography>
      </Container>

      <Container component="main" sx={{ mb: 2 }} maxWidth="sm">
        <Typography color="common.white" variant="body1">
          Сторінка містить посилання на ресурси що були використані для
          створення сайту
        </Typography>
      </Container>

      <Container
        component="main"
        sx={{
          mt: 2,
          mb: 2,
          '& li': { color: 'white' },
          '& a': { color: 'white' },
        }}
        maxWidth="sm"
      >
        <Typography
          variant="h3"
          component="h2"
          color="common.white"
          gutterBottom
        >
          {'Іконки'}
        </Typography>
        <ul>
          <li>
            <Typography color="common.white" gutterBottom>
              <Link to={'https://www.flaticon.com'}>Favicon</Link>
            </Typography>
          </li>
          <li>
            <Typography color="common.white" gutterBottom>
              <Link to={'https://www.freepik.com'}>Іконка пістолету</Link>
            </Typography>
          </li>
          <li>
            <Typography color="common.white" gutterBottom>
              <Link to={'https://www.flaticon.com/authors/smalllikeart'}>
                Іконка рушниці
              </Link>
            </Typography>
          </li>
          <li>
            <Typography color="common.white" gutterBottom>
              <Link to={'https://www.flaticon.com/authors/smashingstocks'}>
                Іконка караабіну
              </Link>
            </Typography>
          </li>
        </ul>
        <Typography
          variant="h3"
          component="h2"
          color="common.white"
          gutterBottom
        >
          {'Кольори'}
        </Typography>
        <ul>
          <li>
            <Typography color="common.white" gutterBottom>
              <Link
                to={
                  'https://www.svgbackgrounds.com/set/free-svg-backgrounds-and-patterns/'
                }
              >
                Задній фон
              </Link>
            </Typography>
          </li>
          <li>
            <Typography color="common.white" gutterBottom>
              <Link to={'https://coolors.co/'}>Палітра</Link>
            </Typography>
          </li>
        </ul>
        <Typography
          variant="h3"
          component="h2"
          color="common.white"
          gutterBottom
        >
          {'Інструменти'}
        </Typography>
        <ul>
          <li>
            <Typography color="common.white" gutterBottom>
              <Link to={'https://mui.com/'}>Фронтенд</Link>
            </Typography>
          </li>
          <li>
            <Typography color="common.white" gutterBottom>
              <Link to={'https://remix.run/'}>Бекенд</Link>
            </Typography>
          </li>
        </ul>
      </Container>
    </Box>
  )
}
