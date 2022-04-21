import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

export default function Copyright() {
	return (
		<Typography color='#fffb1b' variant='body2' align='center'>
			{'Copyright © '}
			<Link color='inherit' href='/'>
        Zbroyar
			</Link>{' '}
			{new Date().getFullYear()}.
		</Typography>
	)
}