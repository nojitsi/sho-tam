import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import { LinksFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { themeColors } from '~/shared/colors'

const LOGO_PATH = '/img/icons/logo.svg'

export const headerLinks: LinksFunction = () => {
  return [{ rel: 'preload', href: LOGO_PATH, as: 'image' }]
}

export default function Header() {
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
            <img
              src={LOGO_PATH}
              style={{
                height: '52px',
                width: '52px',
              }}
            />

            <Typography
              sx={{
                ml: 1,
                fontSize: '28px',
                color: 'common.white',
                textDecoration: 'none',
                fontWeight: 400,
                // lineHeight: 0,
                boxSizing: 'content-box',
                // paddingTop: '27px',
                // height: '32px',
              }}
              display="inline-block"
              component="span"
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
