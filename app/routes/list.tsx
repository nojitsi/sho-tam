import { Box } from '@mui/material'
import type { LoaderFunction} from 'remix'
import { useLoaderData } from 'remix'
import { authenticator } from '~/services/auth'

export const loader: LoaderFunction = async ({ request }) => {
	// authenticator.isAuthenticated function returns the user object if found
	// if user is not authenticated then user would be redirected back to homepage ("/" route)
	const user = await authenticator.isAuthenticated(request, {
		failureRedirect: '/',
	})

	return {
		user,
	}
}

export default function List() {
	const { user } = useLoaderData()
	console.log(user)

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column'
			}}
		>
		</Box>
	)
}