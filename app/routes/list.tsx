import { Box } from '@mui/material'
import { Container } from '@mui/system'
import { GoodTypes, TradeAd, TradeAdImage } from '@prisma/client'
import { LoaderFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { getTradeAdsList } from '~/loaders/tradeAd'
import { authenticator } from '~/service/auth'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import { themeColors } from '~/shared/colors'

const INITIAL_PAGE = 1
const LIST_PAGE_LENGTH = 50

export const loader: LoaderFunction = async ({ request }) => {
  let user
  try {
    user = await authenticator.isAuthenticated(request, {
      failureRedirect: '/auth/login',
    })
  } catch (ignored) {}

  const tradeAdsPage = await getTradeAdsList({
    include: {
      images: true,
      type: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
    take: LIST_PAGE_LENGTH,
    skip: LIST_PAGE_LENGTH * (INITIAL_PAGE - 1),
  })

  return {
    user,
    tradeAdsPage,
  }
}

export default function List() {
  const { user, tradeAdsPage: tradeAds } = useLoaderData()
  console.log({ listUser: user, tradeAds })

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      {tradeAds.map(
        (tradeAd: TradeAd & { images: TradeAdImage[]; type: GoodTypes }) => (
          <Box
            key={tradeAd.id}
            sx={{
              minHeight: '150px',
              padding: '0px',
              margin: '10px',
              borderRadius: '5px',
              borderStartEndRadius: '10px',
              borderEndEndRadius: '0px',
              width: '380px',
            }}
          >
            <Link style={{ textDecoration: 'none' }} to={`ad/${tradeAd.id}`}>
              <Box
                sx={{
                  height: 'inherit',
                  display: 'flex',
                  flexDirection: 'column',
                  color: 'black',
                  backgroundColor: 'rgb(255 254 223)',
                  borderRadius: '5px',
                  borderEndEndRadius: '1px',
                  height: '100%',
                }}
              >
                <Box
                  sx={{
                    height: '200px',
                  }}
                >
                  <img
                    src={tradeAd.images[0]?.path ?? ''}
                    style={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                      borderStartStartRadius: '5px',
                      borderStartEndRadius: '5px',
                    }}
                  />
                </Box>
                <Box
                  style={{
                    textAlign: 'center',
                    fontSize: '20px',
                    backgroundColor: themeColors.darkGreen,
                    color: 'white',
                    fontWeight: 500,
                    overflowWrap: 'break-word',
                  }}
                >
                  {tradeAd.title}
                </Box>
                <Box
                  style={{
                    margin: '5px',
                    height: '100%',
                    padding: '5px',
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    borderRadius: '5px',
                    border: '2px dashed #45462a',
                    backgroundColor: '#fa79217a',
                    zIndex: '0',
                    position: 'relative',
                    minHeight: '45px',
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
                  {tradeAd.kit.map((item, index) => (
                    <Box
                      key={index}
                      style={{
                        backgroundColor: themeColors.green,
                        color: 'white',
                        padding: '0px 5px 0px 5px',
                        margin: '5px',
                        fontWeight: '500',
                        borderRadius: '6px',
                        height: '26px',
                      }}
                    >
                      {item}
                    </Box>
                  ))}
                </Box>
                <Box
                  style={{
                    color: 'white',
                    backgroundColor: themeColors.red,
                    display: 'flex',
                    textAlign: 'center',
                    borderEndStartRadius: '5px',
                    lineHeight: '32px',
                  }}
                >
                  <Box
                    style={{
                      width: '100%',
                    }}
                  >
                    <img
                      src={tradeAd.type.imageUrl}
                      style={{
                        verticalAlign: 'middle',
                      }}
                      height={32}
                      width={32}
                    />
                  </Box>
                  <Box
                    style={{
                      borderLeft: '1px solid white',
                      borderRight: '1px solid white',
                      width: '100%',
                      fontWeight: 'bold',
                      borderEndEndRadius: '4px',
                    }}
                  >
                    {tradeAd.price}
                  </Box>
                  <Box
                    style={{
                      width: '100%',
                      position: 'relative',
                      fontWeight: 500,
                    }}
                  >
                    <RemoveRedEyeOutlinedIcon
                      fontSize="inherit"
                      style={{
                        position: 'absolute',
                        top: '25%',
                        transform: 'translateY(-50%)',
                        textAlign: 'center',
                        marginLeft: '45px',
                      }}
                    />
                    {tradeAd.views}
                  </Box>
                </Box>
              </Box>
            </Link>
          </Box>
        ),
      )}
    </Box>
  )
}
