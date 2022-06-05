import { useLoaderData } from 'remix'
import { loadPublicEnvVariables } from '~/loaders/env'

const ONE_TAP_STYLES = {
	position: 'fixed',
	top: '5px',
	right: '5px',
	zIndex: '1001',
} as React.CSSProperties

export async function loader() {
	return {
		env: loadPublicEnvVariables()
	}
}

export default function GoogleOneTap() {
	const loaderData = useLoaderData()
	const env = loaderData.env
	
	return (
		<div>
			<script src='https://accounts.google.com/gsi/client' async defer></script>
			<div id='g_id_onload'
				data-client_id={env.OAUTH_CLIENT_ID}
				data-login_uri={env.OAUTH_REDIRECT_PATH}
				data-auto_select='false'

				data-auto_prompt='true'
				data-type='standard'
				data-size='small'
				data-theme='outline'
				data-prompt_parent_id='g_id_onload'

				style = {ONE_TAP_STYLES}
			>
			</div>
		</div>
	)
}