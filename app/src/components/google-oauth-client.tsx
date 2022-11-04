import { useLoaderData } from '@remix-run/react'

const ONE_TAP_STYLES = {
  position: 'fixed',
  top: '5px',
  right: '5px',
  zIndex: '1001',
} as React.CSSProperties

export default function GoogleOneTap() {
  const { env, user } = useLoaderData()
  return (
    <div>
      <script src="https://accounts.google.com/gsi/client" async defer></script>
      <div
        id="g_id_onload"
        data-client_id={env.GOOGLE_OAUTH_CLIENT_ID}
        data-login_uri={env.GOOGLE_OAUTH_ONE_TAP_REDIRECT_PATH}
        data-auto_select="false"
        data-auto_prompt={user ? 'false' : 'true'}
        data-type="standard"
        data-size="small"
        data-theme="outline"
        data-prompt_parent_id="g_id_onload"
        data-ux_mode="redirect"
        style={ONE_TAP_STYLES}
      ></div>
    </div>
  )
}
