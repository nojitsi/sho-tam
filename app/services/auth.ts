import {Authenticator} from 'remix-auth'
import {sessionStorage} from './session'
import {GoogleStrategy, SocialsProvider} from 'remix-auth-socials'

type UserDTO = {
	name: string,
	email: string,
	verified: boolean,
	avatar: string,
}

export enum AuthStrategies {
	GOOGLE = 'google',
	LOCAL = 'local'
}

export const authenticator = new Authenticator(sessionStorage)

const transformUserData = async (data: any) => {
	console.log(data)
	// create user in your db here
	// profile object contains all the user data like image, displayName, id
	const userData = data.profile._json

	return {
		name: userData.name,
		email: userData.email
	}
}

// Configuring Google Strategy
authenticator.use(
	new GoogleStrategy(
		{
			clientID: String(process.env.OAUTH_CLIENT_ID),
			clientSecret: String(process.env.OAUTH_CLIENT_SECRET),
			callbackURL: `http://localhost:3000/auth/${AuthStrategies.GOOGLE}/callback`
		},
		transformUserData
	),
	AuthStrategies.GOOGLE
)

// export const loginUser = ()
