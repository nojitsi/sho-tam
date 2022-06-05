// import { OAuth2Client } from 'google-auth-library'

// const oAuth2Client = new OAuth2Client(process.env.OAUTH_CLIENT_ID)

// export const verifyGoogleTokenAndGetInfo: any | undefined = async (token: string) => {
// 	try {
// 		const ticket = await oAuth2Client.verifyIdToken({
// 			idToken: token,
// 			audience: process.env.OAUTH_CLIENT_ID,
// 		})
// 		return ticket.getPayload()
// 	} catch (exception) {
// 		return false
// 	}
// }