import { Box } from '@mui/material'
import { themeColors } from '~/shared/colors'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import { Link } from '@remix-run/react'
import { TradeAdListItemDto } from '~/routes/list'

export function TradeAd({ tradeAd }: { tradeAd: TradeAdListItemDto }) {
  return (
    <Box
      sx={{
        minHeight: '150px',
        padding: '0px',
        margin: '10px',
        borderRadius: '5px',
        borderStartEndRadius: '10px',
        borderEndEndRadius: '0px',
        width: '350px',
      }}
    >
      <Link style={{ textDecoration: 'none' }} to={`${tradeAd.id}`}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            color: 'black',
            backgroundColor: 'rgb(255 254 223)',
            borderRadius: '5px',
            borderEndEndRadius: '1px',
            height: '100%',
            boxShadow: 'rgba(0, 0, 0, 0.5) 10px 10px 8px',
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
              backgroundColor: themeColors.red,
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
              backgroundColor: themeColors.darkGreen,
              display: 'flex',
              textAlign: 'center',
              borderEndStartRadius: '5px',
              lineHeight: '32px',
            }}
          >
            <Box
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img src={tradeAd.type.imageUrl} height={28} width={28} />
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
                  right: '2px',
                  transform: 'translateY(-50%)',
                  textAlign: 'center',
                }}
              />
              {tradeAd.views}
            </Box>
          </Box>
        </Box>
      </Link>
    </Box>
  )
}
