
import { authenticator, AuthStrategies } from '~/service/auth'
import { LoaderFunction } from '@remix-run/node'


export const loader: LoaderFunction = async ({ request }) => {
	return authenticator.authenticate(AuthStrategies.GOOGLE, request, {
		successRedirect: '/list',
		failureRedirect: '/',
	})
}
