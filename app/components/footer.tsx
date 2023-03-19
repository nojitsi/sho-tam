import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { themeColors } from '~/shared/colors'
import Copyright from './copyright'
import Credits from './credits'

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: themeColors.semiTransperentGreen,
      }}
    >
      <Container maxWidth="sm">
        <Typography
          color="common.white"
          variant="body1"
          sx={{ textAlign: 'center' }}
        >
          Тут може бути знайдена дуже важлива інформація
        </Typography>
        <Copyright />
        <Credits />
      </Container>
    </Box>
  )
}

