import { Box, Container, useMediaQuery } from '@mui/material'
import {
  json,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getTradeAdById, upadteTradeAd } from '~/loaders/tradeAd'
import { getUserAuthData } from '~/service/auth'
import imageGalleryStyles from '~/styles/image-gallery.css'
import ImageGallery from 'react-image-gallery'
import { TradeAdImage } from '@prisma/client'
import { themeColors } from '~/shared/colors'
import { Key } from 'react'
import { getSelectorsByUserAgent } from 'react-device-detect'

import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency'

export const loader: LoaderFunction = async ({ request, params }) => {
  const user = await getUserAuthData(request)
  const tradeAd = await getTradeAdById(Number(params.id as string))
  const userAgent = request.headers.get('User-Agent') ?? ''
  const { isMobile: serverIsMobile } = getSelectorsByUserAgent(userAgent)

  if (!tradeAd) {
    throw json({ user }, 404)
  }

  await upadteTradeAd({ id: tradeAd.id }, { views: tradeAd.views + 1 })

  return {
    user,
    tradeAd,
    serverIsMobile,
  }
}

export const meta: MetaFunction = ({ data }) => {
  const adData = data.tradeAd
  return {
    title: `${adData.title} | zbroya.in.ua`,
    description: adData.description,
    viewport: 'width=device-width,initial-scale=1',
    charSet: 'utf-8',
    'og:title': adData.title,
    'og:description': adData.description,
    'og:type': adData.type.name,
    'og:image': adData.images[0].path,
  }
}

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: imageGalleryStyles }]
}

export default function SingleAd() {
  const { user, tradeAd, serverIsMobile } = useLoaderData()

  const isMobileMui = useMediaQuery('(max-width:768px)')
  const isMobile = typeof window === 'undefined' ? serverIsMobile : isMobileMui

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',

        mt: 2,
        mb: 2,
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'antiquewhite',
          width: '95%',
          padding: '0 !important',
          textAlign: 'left',
        }}
      >
        <ImageGallery
          items={tradeAd.images.map((image: TradeAdImage) => ({
            original: image.path,
            thumbnail: image.path,
          }))}
          lazyLoad={true}
          thumbnailPosition={'top'}
          showPlayButton={false}
          showIndex={true}
        />
        <Box
          sx={{
            display: 'flex',
            alignSelf: 'start',
            width: '100%',
            padding: '0px 20px 5px 10px',
            fontSize: '32px',
            backgroundColor: themeColors.red,
            color: 'white',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              flexGrow: 10,
              textAlign: 'center',
            }}
          >
            {tradeAd.title}
          </span>
          {isMobile ? undefined : (
            <span
              style={{
                marginRight: '10px',
              }}
            >
              {tradeAd.type.name}
            </span>
          )}
          <Box
            style={{
              marginRight: '20px',
              display: 'flex',
            }}
          >
            <img src={tradeAd.type.imageUrl} height={42} width={42} />
          </Box>
          <span>{tradeAd.price}</span>
        </Box>
        <Box
          sx={{
            alignSelf: 'start',
            padding: '10px 20px 10px 10px',
            flexFlow: 'row',
            width: '100%',
            display: 'flex',
            fontSize: '22px',

            '@media(max-width:768px)': {
              flexFlow: 'column',
            },
          }}
        >
          <p
            style={{
              width: isMobile ? '100%' : '70%',
            }}
          >
            {tradeAd.description}
          </p>
          <Box
            style={{
              margin: '5px',
              padding: '5px',
              textAlign: 'center',
              display: 'flex',
              borderRadius: '5px',
              border: '2px dashed #45462a',
              backgroundColor: '#fa79217a',
              zIndex: '0',
              position: 'relative',
              minHeight: '100px',
              width: isMobile ? '100%' : '30%',
              flexWrap: 'wrap',
            }}
          >
            <Box
              style={{
                position: 'absolute',
                zIndex: '-1',
                color: '#ffffff40',
                fontWeight: 'bold',
                fontSize: '30px',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              КОМПЛЕКТ
            </Box>
            {tradeAd.kit.map((item: string, index: Key) => (
              <Box
                key={index}
                style={{
                  backgroundColor: themeColors.green,
                  color: 'white',
                  padding: '0px 5px 0px 5px',
                  margin: '5px',
                  fontWeight: '500',
                  borderRadius: '6px',
                  height: '36px',
                }}
              >
                {item}
              </Box>
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignSelf: 'start',
            width: '100%',
            padding: '10px 20px 10px 10px',
            backgroundColor: themeColors.darkGreen,
            color: 'white',
            fontSize: '22px',
            alignItems: 'center',
          }}
        >
          <ContactEmergencyIcon sx={{ fontSize: '32px' }} />
          <span style={{ marginLeft: '10px' }}>{tradeAd.contact}</span>
        </Box>
      </Container>
    </Box>
  )
}
