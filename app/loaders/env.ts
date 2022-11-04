export const publicEnvVariables = () => {
	return {
		GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
		GOOGLE_OAUTH_REDIRECT_PATH: process.env.GOOGLE_OAUTH_REDIRECT_PATH,
		GOOGLE_OAUTH_ONE_TAP_REDIRECT_PATH: process.env.GOOGLE_OAUTH_ONE_TAP_REDIRECT_PATH,
	}
}

export const privateEnvVariables = () => {
	return {
		GOOGLE_OAUTH_CLIENT_SECRET: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
	}
}