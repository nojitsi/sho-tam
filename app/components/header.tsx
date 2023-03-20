import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import { Link, useLoaderData } from '@remix-run/react'
import { themeColors } from '~/shared/colors'

export default function Header() {
  return (
    <AppBar
      position="relative"
      sx={{
        backgroundColor: themeColors.semiTransperentGreen,
      }}
    >
      <Toolbar>
        <Link to="" style={{ textDecoration: 'none' }}>
          <Box
            sx={{
              marginLeft: 'auto',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img src="/img/icons/logo.svg" height={32} />
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
              ZBROYA.IN.UA
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
