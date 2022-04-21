import AccountBoxIcon from '@mui/icons-material/AccountBox'
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward'
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material'
import { Link } from 'remix'



export default function Header() {
	return (
		<AppBar position='relative' sx={{
			backgroundColor: '#56ae3d91'
		}}>
			<Toolbar>
				<Link to='/' style={{ textDecoration: 'none' }}>
					<Box sx={{
						marginLeft: 'auto',
						display: 'flex',
						alignItems: 'center'
					}}>
						<AccessibleForwardIcon
							sx={{ 
								mr: 1,
								fontSize: '1.5rem',
								color: 'common.white',
								display: 'block'
							}} 
						/>
						<Typography variant='h6' sx={{
							fontSize: '1.5rem',
							color: 'common.white',
							lineHeight: 1,
							textDecoration: 'none',
						}} noWrap>
							Zbroyar
						</Typography>
					</Box>
				</Link>

				<Box sx={{
					marginLeft: 'auto'
				}}>
					<Link to='/profile'>
						<AccountBoxIcon sx={{
							mr: 2,
							fontSize: '1.5rem',
							color: 'common.white',
							display: 'block'
						}}/>
					</Link>
				</Box>
			</Toolbar>
		</AppBar>
	)
}
