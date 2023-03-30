import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useActionData, useCatch } from '@remix-run/react'
import { themeColors } from '~/shared/colors'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

export const MESSAGE_HEADER_KEY = 'message'
export const MESSAGE_COLOR_HEADER_KEY = 'message-color'

export default function Message({
  message,
  messageColor,
}: {
  message?: string
  messageColor?: string
}) {
  return message ? (
    <Box
      sx={{
        minWidth: '300px',
        mt: 2,
        alignSelf: 'center',
        padding: '10px 10px 10px 66px',
        minHeight: '45px',
        backgroundColor: messageColor ?? themeColors.orange,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <ErrorOutlineIcon
        sx={{
          position: 'absolute',
          fontSize: '56px',
          left: 0,
          top: '-5px',
          color: '#ffffff',
        }}
      />
      <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
        {message}
      </Typography>
    </Box>
  ) : null
}
