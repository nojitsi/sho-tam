import { Link } from 'remix'
import { Box, Typography } from '@mui/material'

export default function Profile() {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column'
			}}
		>
			<div className='text-center'>
				<Link to='/admin'>
					<Typography variant='subtitle1'  color='aliceblue'>
						Админка
					</Typography>
				</Link>
				
				<Link to='/posts'>
					<Typography variant='subtitle1' color='aliceblue'>
						Posts
					</Typography>  
				</Link>
			</div>
		</Box>
	)
}