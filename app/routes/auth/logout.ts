import type { ActionFunction } from 'remix'
import { authenticator } from '~/services/auth'

export const action: ActionFunction = async ({ request }) => {
	await authenticator.logout(request, { redirectTo: '/' })
}
