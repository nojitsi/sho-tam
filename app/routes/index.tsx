import { Box, Container, Typography, Button } from '@mui/material'
import { MetaFunction } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import { themeColors } from '~/shared/colors'

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
          {'Народний портал для продажу зброї'}
        </Typography>
        <Typography color="common.white" align="right" variant="body1">
          Якщо підступності не буде краю, то доведеться битися.
        </Typography>

        <Typography color="common.white" align="right" variant="body1">
          Богдан Хмельницький
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div>
            <Button
              variant="contained"
              href="/list"
              sx={{
                backgroundColor: themeColors.appleRedSemiTransperent,
                ml: 1,
                mt: 2,
              }}
            >
              Арсенал
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              href="/new"
              sx={{
                backgroundColor: themeColors.appleRedSemiTransperent,
                ml: 1,
                mt: 2,
              }}
            >
              Продати
            </Button>
          </div>
        </div>
      </Container>
    </Box>
  )
}
