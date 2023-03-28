import { type ActionFunction, LoaderFunction } from "@remix-run/node";
import { authenticator } from '~/service/auth'

export const loader: LoaderFunction = async ({ request }) => {
	await authenticator.logout(request, { redirectTo: '/' })
}

export const action: ActionFunction = async ({ request }) => {
	await authenticator.logout(request, { redirectTo: '/' })
}
