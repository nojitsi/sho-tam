import { authenticator } from '~/service/auth'
import { ActionFunction } from '@remix-run/node'
import { commitSession, getSession } from '~/service/session'
import { SocialsProvider } from 'remix-auth-socials'

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const redirectTo = formData.get('redirectTo')

  const session = await getSession(request.headers.get('Cookie'))
  session.flash('redirectTo', redirectTo)
  request.headers.set('Cookie', await commitSession(session))

  return await authenticator.authenticate(SocialsProvider.GOOGLE, request)
}
