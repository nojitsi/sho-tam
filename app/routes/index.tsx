import { Box, Container, Typography, Button } from '@mui/material'
import { MetaFunction } from '@remix-run/node'
import { themeColors } from '~/shared/colors'

export const meta: MetaFunction = () => {
  return {
    title: 'Продати бу зброю | zbroya.in.ua',
    description:
      'Покупайте і продавайте вашу зброю онлайн! Zbroya.in.ua це народна платформа для продажу зброї, де ви можете як продати, так і купити бу зброю.',
    viewport: 'width=device-width,initial-scale=1',
    charSet: 'utf-8',
  }
}

export default function Index() {
  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      <Container component="main" sx={{ mt: 8 }} maxWidth="sm">
        <Typography
          variant="h3"
          component="h1"
          color="common.white"
          gutterBottom
        >
          {'Народна платформа для продажу зброї'}
        </Typography>
        <Typography color="common.white" align="right" variant="body1">
          Якщо підступності не буде краю, то доведеться битися.
        </Typography>

        <Typography color="common.white" align="right" variant="body1">
          Богдан Хмельницький
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div>
            <h2>
              <Button
                variant="contained"
                href="/list"
                sx={{
                  backgroundColor: themeColors.appleRedSemiTransperent,
                  '&:hover': {
                    backgroundColor: themeColors.green,
                  },
                  ml: 1,
                  mt: 2,
                }}
              >
                Купити
              </Button>
            </h2>
          </div>
          <div>
            <h2>
              <Button
                variant="contained"
                href="/new"
                sx={{
                  backgroundColor: themeColors.appleRedSemiTransperent,
                  '&:hover': {
                    backgroundColor: themeColors.green,
                  },
                  ml: 1,
                  mt: 2,
                }}
              >
                Продати
              </Button>
            </h2>
          </div>
        </div>
        <img
          src="/img/sirko.webp"
          alt="hero"
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            zIndex: -2,
            maxWidth: '90%',
          }}
        />
      </Container>
    </Box>
  )
}
