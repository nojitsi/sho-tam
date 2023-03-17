import AccountBoxIcon from '@mui/icons-material/AccountBox'
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward'
import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import { Link, useLoaderData } from '@remix-run/react'
import { themeColors } from '~/shared/colors'

export default function Header() {
  const user = useLoaderData()

  return (
    <AppBar
      position="relative"
      sx={{
        backgroundColor: themeColors.semiTransperentGreen,
      }}
    >
      <Toolbar>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Box
            sx={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img src="/img/icons/ukraine.webp" />
            <Typography
              variant="h6"
              sx={{
                ml: 1,
                fontSize: '1.5rem',
                color: 'common.white',
                lineHeight: 1,
                textDecoration: 'none',
              }}
              noWrap
            >
              Zbroya.in.ua
            </Typography>
          </Box>
        </Link>

        <Box
          sx={{
            marginLeft: 'auto',
          }}
        >
          <Link to="/profile">
            <AccountBoxIcon
              sx={{
                mr: 2,
                fontSize: '1.5rem',
                color: 'common.white',
                display: 'block',
              }}
            />
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
