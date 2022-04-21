import { Link } from 'remix'
import type { MetaFunction, LinksFunction } from 'remix'
import {
	Links,
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
			</Container>
			<Outlet />
		</Box>
	)
}
