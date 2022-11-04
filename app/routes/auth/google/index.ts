import { authenticator } from '~/service/auth'
import { SocialsProvider } from 'remix-auth-socials'
import type { LoaderFunction } from 'remix'

export const loader: LoaderFunction = async ({ request }) => {
	return await authenticator.authenticate(SocialsProvider.GOOGLE, request, {
		successRedirect: '/list',
		failureRedirect: '/',
	})
}
