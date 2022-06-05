import type { ActionFunction, LoaderFunction } from 'remix'
import { authenticator } from '../../../services/auth'
import { SocialsProvider } from 'remix-auth-socials'
// import { verifyGoogleTokenAndGetInfo } from '~/loaders/auth'

export const action: ActionFunction = async ({ request }) => {
	console.log(await request.formData())
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

export const loader: LoaderFunction = ({ request }) => {
	return authenticator.authenticate(SocialsProvider.GOOGLE, request, {
		successRedirect: '/list',
		failureRedirect: '/',
	})
}