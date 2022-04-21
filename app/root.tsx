import {
	Links,
	LinksFunction,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from 'remix'
import type { MetaFunction } from 'remix'
import { ROBOTO_FONT_URL } from '~/shared/const'

import globalStyle from '~/styles/global.css'
import { Box, CssBaseline, Link } from '@mui/material'

import Footer from './src/components/footer'
import Header from './src/components/header'

export const links: LinksFunction = () => {
	return [
		{ rel: 'stylesheet', href: globalStyle },
		{ rel: 'stylesheet', href: ROBOTO_FONT_URL },
	]
}

export const meta: MetaFunction = () => {
	return { 
		title: 'New Remix App'
	}
}

export default function App() {
	return (
		<html lang='en'>
			<head>
				<meta charSet='utf-8' />
				<meta name='viewport' content='width=device-width,initial-scale=1' />
				<Meta />
				<Links />
				<CssBaseline />
			</head>
			<body>

				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						minHeight: '100vh'
					}}
				>
					<Header />
					<Outlet />
					<Footer />
				</Box>

				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}
