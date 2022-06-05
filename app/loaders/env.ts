export const loadPublicEnvVariables  = () => {
	return {
		OAUTH_REDIRECT_PATH: process.env.OAUTH_REDIRECT_PATH,
		OAUTH_CLIENT_ID: process.env.OAUTH_CLIENT_ID
	}
}