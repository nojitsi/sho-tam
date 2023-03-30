import { Box, Container, Typography } from '@mui/material'
import { LoaderFunction, MetaFunction } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { TradeAd } from '~/components/trade-ad'
import { getTradeAdsList } from '~/loaders/tradeAd'
import { getUserAuthData } from '~/service/auth'
import { themeColors } from '~/shared/colors'
import { TradeAdListItemDto } from './list'

const BUTTON_STYLES = {
  padding: '15px 25px',
  background: themeColors.red,
  border: '0',
  outline: 'none',
  cursor: 'pointer',
  color: 'white',
  fontWeight: 'bold',
  width: '100%',
  fontSize: '16px',
}

export const meta: MetaFunction = () => {
  return {
    title: 'Профіль | zbroya.in.ua',
    description: 'Мої оголошення',
    viewport: 'width=device-width,initial-scale=1',
    charSet: 'utf-8',
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const urlParams = new URL(request.url).searchParams
  const redirectTo = urlParams.get('redirectTo') ?? '/'
  const user = await getUserAuthData(request, true)

  const userAds = await getTradeAdsList({
    include: {
      images: true,
      type: true,
    },
    orderBy: [
      {
        updatedAt: 'desc',
      },
      {
        id: 'asc',
      },
    ],
    where: { authorId: user.id },
  })

  return { redirectTo, user, userAds }
}

export default function Profile({ request }: any) {
  const { userAds } = useLoaderData()

  return (
    <>
      <Typography
        variant="h3"
        component="h2"
        color="common.white"
        sx={{ padding: 2 }}
      >
        {userAds.length
          ? 'Мої оголощення'
          : 'Додайте в арсенал свою першу зброю :)'}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'baseline',
          padding: 2,
        }}
        // ref={divHeight}
      >
        {userAds.map((item: TradeAdListItemDto) => (
          <TradeAd key={item.id} tradeAd={item} />
        ))}
      </Box>

      <Container sx={{ mt: 2, mb: 2 }} maxWidth="sm">
        <Form action="/logout" method="post">
          <button style={BUTTON_STYLES}>Вийти</button>
        </Form>
      </Container>
    </>
  )
}
