import { OAuth2Client } from 'google-auth-library'
import { privateEnvVariables, publicEnvVariables } from '~/loaders/env'

const oAuth2Client = new OAuth2Client(
  publicEnvVariables.GOOGLE_OAUTH_CLIENT_ID,
  privateEnvVariables.GOOGLE_OAUTH_CLIENT_SECRET,
)

export const verifyGoogleTokenAndGetInfo: any | undefined = async (
  token: string,
) => {
  try {
    const ticket = await oAuth2Client.verifyIdToken({
      idToken: token,
      audience: publicEnvVariables.GOOGLE_OAUTH_CLIENT_ID,
    })
    return ticket.getPayload()
  } catch (exception) {
    console.log(exception)
    return false
  }
}

