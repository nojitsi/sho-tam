import { Box, Container, Typography, Button } from '@mui/material'
import { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { themeColors } from '~/shared/colors'

export const meta: MetaFunction = () => {
  return {
    title: 'Умови Використання | zbroya.in.ua',
    description: 'Умови Використання платформи',
    viewport: 'width=device-width,initial-scale=1',
    charSet: 'utf-8',
  }
}

export default function TermsAndConditions() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: 'inherit',
        height: 'inherit',
      }}
    >
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <Typography
          variant="h3"
          component="h1"
          color="common.white"
          gutterBottom
        >
          {'Умови кориcтування платформою'}
        </Typography>
        <Typography color="common.white" variant="body1">
          Ласкаво просимо на Zbroya.in.ua. Цей веб-сайт є інформаційною
          платформою, створеною з метою обміну інформацією, зокрема оголошеннями
          про продаж зброї. Користуючись сайтом, ви гарантуєте його честне
          використання та згодні вкладати лише законні угоди, виконуючі всі
          юридичні умови перш ніж передавати зброю у інші руки, або забирати з
          чужих.
        </Typography>

        <Typography
          sx={{ mt: 2, mb: 2, fontWeight: 'bold' }}
          color="common.white"
          variant="body1"
        >
          Згідно з ст. 263 Кримінального кодексу України: Незаконне зберігання,
          носіння, придбання, передача чи збут вогнепальної зброї, бойових
          припасів, вибухових речовин або вибухових пристрої без передбаченого
          законом дозволу караються позбавленням волі!
        </Typography>

        <Typography color="common.white" variant="body1">
          Також, ви погоджуєтесь ділитися своїм ім’ям, аватаром та контактами в
          межах платформи платформі. Ваші данні можуть бути передані
          правоохоронним органам!
        </Typography>

        <Typography color="common.white" variant="body1">
          Зверніть увагу, що ці умови та положення можуть змінюватися в
          будь-який час і вступають в силу після публікації їх на сайті. Ми
          рекомендуємо перевіряти цю сторінку регулярно, щоб бути в курсі
          будь-яких змін.
        </Typography>

        <Typography color="common.white" variant="body1">
          Якщо у вас є якісь питання або проблеми, не соромтеся{' '}
          <Link to="/contact" style={{ color: 'inherit' }}>
            писати нам
          </Link>
          .
        </Typography>
      </Container>
    </Box>
  )
}
