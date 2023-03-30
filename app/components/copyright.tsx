import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { themeColors } from '~/shared/colors'

export default function Copyright() {
  return (
    <Typography color={themeColors.yellow} variant="body2" align="center">
      {'™ '}
      <Link color="inherit" href="/">
        Zbroya.in.ua
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  )
}
