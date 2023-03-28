import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { User } from '@prisma/client'
import { LinksFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { themeColors } from '~/shared/colors'
import LoginIcon from '@mui/icons-material/Login'

const LOGO_PATH = '/img/icons/logo.svg'

export const headerLinks: LinksFunction = () => {
  return [{ rel: 'preload', href: LOGO_PATH, as: 'image' }]
}

export default function Header({ user }: { user?: User }) {
  return (
    <AppBar
      position="relative"
      style={{
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
                height: '44px',
                width: '44px',
              }}
              alt=""
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
            mr: 2,
          }}
        >
          {user ? (
            <Link to="/my-ads">
              <img
                src={user.avatar ?? '/img/icons/user.webp'}
                style={{
                  height: '34px',
                  width: '34px',
                  borderRadius: '17px',
                }}
              />
            </Link>
          ) : (
            <Link to="/login">
              <LoginIcon
                sx={{
                  fontSize: '1.5rem',
                  color: 'common.white',
                  display: 'block',
                }}
              />
            </Link>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
