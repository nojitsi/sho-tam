import type { ActionFunction, LoaderFunction } from 'remix'
import { authenticator } from '~/services/auth'
import { SocialsProvider } from 'remix-auth-socials'

export const action: ActionFunction = async ({ request }) => {
	console.log({g: 22, das: await request.formData()})
	// const data = await request.formData()
	// const token = String(data.get('credential')?.toString())
	// const userData = verifyGoogleTokenAndGetInfo(token)
	// console.log(userData)
	// return userData
	return authenticator.authenticate(SocialsProvider.GOOGLE, request, {
		successRedirect: '/list',
		failureRedirect: '/',
	})
}
//
export const loader: LoaderFunction = async ({ request }) => {
	console.log(23)

	return authenticator.authenticate(SocialsProvider.GOOGLE, request, {
		successRedirect: '/list',
		failureRedirect: '/',
	})
}
