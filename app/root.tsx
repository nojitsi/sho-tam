import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from 'remix'
import type {MetaFunction, LinksFunction} from 'remix'
import {ROBOTO_FONT_URL} from '~/shared/const'
import {useLoaderData} from 'remix'
import {loadPublicEnvVariables} from './loaders/env'

import globalStyle from '~/styles/global.css'
import {Box, CssBaseline} from '@mui/material'

import Footer from './src/components/footer'
import Header from './src/components/header'
import GoogleOneTap from './src/components/googleOneTap'

export const links: LinksFunction = () => {
	return [
		{rel: 'stylesheet', href: globalStyle},
		{rel: 'stylesheet', href: ROBOTO_FONT_URL},
	]
}

export const meta: MetaFunction = () => {
	return {
		title: 'New Remix App'
	}
}

export async function loader() {
	return {
		env: loadPublicEnvVariables()
	}
}

export default function App() {
	const loaderData = useLoaderData()
	const env = loaderData.env

	return (
		<html lang="en">
		<head>
			<meta charSet="utf-8"/>
			<meta name="viewport" content="width=device-width,initial-scale=1"/>
			<Meta/>
			<Links/>
			<CssBaseline/>
		</head>
		<body>

		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				minHeight: '100vh'
			}}
		>
			<Header/>
			<Outlet/>
			<Footer/>
		</Box>

		<ScrollRestoration/>
		<Scripts/>
		<GoogleOneTap/>
		<LiveReload/>
		</body>
		</html>
	)
}
