import type { MetaFunction} from 'remix'
import { LinksFunction, Form } from 'remix'
import { SocialsProvider } from 'remix-auth-socials'

import {
	Outlet
} from 'remix'

import { Box, Container, Typography, Button } from  '@mui/material'

export const meta: MetaFunction = () => {
	return {
		title: 'Tactical platform',
		viewport: 'width=device-width,initial-scale=1',
		charSet: 'utf-8',
	}
}

const BUTTON_STYLES = {
	padding: '15px 25px',
	background: '#dd4b39',
	border: '0',
	outline: 'none',
	cursor: 'pointer',
	color: 'white',
	fontWeight: 'bold',
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
			<Container component='main' sx={{ mt: 8, mb: 2 }} maxWidth='sm'>
				<Typography variant='h3' component='h2' color='common.white' gutterBottom>
					{'Україна то є сафарі.'}
					{'Сафарі із руснею.'}
				</Typography>
				<Typography  color='common.white' variant='body1'>Обери пушку своєї мрії</Typography>
				<Button variant='contained' href='/list' sx={{
					backgroundColor: '#b5303096',
					ml: 1,
					mt: 2,
				}}>
					Арсенал
				</Button>
				<Button variant='contained' href='/new' sx={{
					backgroundColor: '#b5303096',
					ml: 1,
					mt: 2,
				}}>
					Продати
				</Button>
				<Form
					method='get'
					action={`/auth/${SocialsProvider.GOOGLE}`}
				>
					<button style={BUTTON_STYLES}>Login with Google</button>
				</Form>
				<Form action='/auth/logout' method='post'>
					<button style={BUTTON_STYLES}>Logout</button>
				</Form>
			</Container>
			<Outlet />
		</Box>
	)
}
