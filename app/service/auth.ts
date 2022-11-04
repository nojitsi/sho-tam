import {Authenticator} from 'remix-auth'
import {sessionStorage} from './session'
import {GoogleStrategy, SocialsProvider} from 'remix-auth-socials'
import { FormStrategy } from 'remix-auth-form'
import { verifyGoogleTokenAndGetInfo } from './google-auth'
import { findOrCreateUser } from '~/loaders/user'
import { privateEnvVariables, publicEnvVariables } from '~/loaders/env'

type UserDTO = {
	name: string,
	email: string,
	emailVerified: boolean,
	avatar: string,
}

export enum AuthStrategies {
	GOOGLE = 'google',
	GOOGLE_ONE_TAP = 'google-one-tap'
}

export const authenticator = new Authenticator(sessionStorage)

const transformGoogleUserData = (userData: any): UserDTO => {
	console.log({googleUserDataToTransform: userData})

	return {
		name: userData.name,
		email: userData.email,
		avatar: userData.picture,
		emailVerified: userData.email_verified
	}
}

const createUserIfNotExist = async (userDto: UserDTO) => {
	return findOrCreateUser({ email: userDto.email }, userDto)
}

// Configuring Google Strategy
authenticator.use(
	new GoogleStrategy(
		{
			clientID: String(publicEnvVariables().GOOGLE_OAUTH_CLIENT_ID),
			clientSecret: String(privateEnvVariables().GOOGLE_OAUTH_CLIENT_SECRET),
			callbackURL: `http://localhost:3000` + publicEnvVariables().GOOGLE_OAUTH_REDIRECT_PATH
		},
		(requsetData) => {
			const userData = transformGoogleUserData(requsetData.profile._json)
			return createUserIfNotExist(userData)
		}
	),
	AuthStrategies.GOOGLE
)

authenticator.use(
	new FormStrategy(async ({ form }) => {
		const token = String(form.get('credential')?.toString())
		const tokenData = await verifyGoogleTokenAndGetInfo(token)
		const userData = transformGoogleUserData(tokenData)

		return await createUserIfNotExist(userData)
	}),
	AuthStrategies.GOOGLE_ONE_TAP
)


// export const loginUser = ()
