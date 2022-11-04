import { ActionFunction } from "remix"
import { authenticator, AuthStrategies } from "~/service/auth"

export const action: ActionFunction = async ({ request }) => {
	return authenticator.authenticate(AuthStrategies.GOOGLE_ONE_TAP, request, {
		// successRedirect: '/list',
		failureRedirect: '/',
	})
}