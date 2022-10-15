import { authenticator } from '~/services/auth'
import { SocialsProvider } from 'remix-auth-socials'
import type { ActionFunction, LoaderFunction } from 'remix'

export const action: ActionFunction = async ({ request }) => {
	console.log('google auth post')
	return await authenticator.authenticate(SocialsProvider.GOOGLE, request, {
		successRedirect: '/list',
		failureRedirect: '/',
	})
}

export const loader: LoaderFunction = async ({ request }) => {
	console.log('Google auth get')
	return await authenticator.authenticate(SocialsProvider.GOOGLE, request, {
		successRedirect: '/list',
		failureRedirect: '/',
	})
}
