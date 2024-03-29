import { useLoaderData } from '@remix-run/react'

const ONE_TAP_STYLES = {
  position: 'fixed',
  top: '5px',
  right: '5px',
  zIndex: '1001',
} as React.CSSProperties

export default function GoogleOneTap({
  autoprompt,
  redirectTo,
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_ONE_TAP_REDIRECT_PATH,
}: {
  autoprompt: boolean
  redirectTo: string
  GOOGLE_OAUTH_CLIENT_ID: string
  GOOGLE_OAUTH_ONE_TAP_REDIRECT_PATH: string
}) {
  return (
    <div>
      <script src="https://accounts.google.com/gsi/client" async defer></script>
      <div
        id="g_id_onload"
        data-client_id={GOOGLE_OAUTH_CLIENT_ID}
        data-login_uri={`${GOOGLE_OAUTH_ONE_TAP_REDIRECT_PATH}?redirectTo=${redirectTo}`}
        data-auto_select="false"
        data-auto_prompt={autoprompt}
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
