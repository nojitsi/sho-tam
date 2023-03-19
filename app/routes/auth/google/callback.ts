import { authenticator } from '~/service/auth'
import { LoaderFunction, redirect } from '@remix-run/node'
import { auth } from '~/shared/const'
import { commitSession, getSession } from '~/service/session'
import { AuthorizationError } from 'remix-auth'
import { MESSAGE_COLOR_HEADER_KEY, MESSAGE_HEADER_KEY } from '~/components/message'
import { themeColors } from '~/shared/colors'
import { SocialsProvider } from 'remix-auth-socials'

export const loader: LoaderFunction = async ({ request }) => {
  const cookieSession = await getSession(request.headers.get('cookie'))
  const redirectTo = cookieSession.get('redirectTo')
  const successRedirect = redirectTo ?? auth.successRedirect 

  return authenticator.authenticate(SocialsProvider.GOOGLE, request, {
    successRedirect,
    failureRedirect: auth.failureRedirect,
  })
  .catch(async error => {
    if(!(error instanceof AuthorizationError)) {
      const session = await getSession(error.headers.get('set-cookie'))

      session.flash(MESSAGE_HEADER_KEY, 'Ви успішно увійшли в систему')
      session.flash(MESSAGE_COLOR_HEADER_KEY, themeColors.darkGreen)

      return redirect(successRedirect, {
        headers: {
          'set-cookie': await commitSession(session),
        },
      })
    }
    cookieSession.flash(MESSAGE_HEADER_KEY, 'Помилка під час входу у систему')
    cookieSession.flash(MESSAGE_COLOR_HEADER_KEY, themeColors.red)
    return redirect(auth.failureRedirect, {
        headers: {
          'set-cookie': await commitSession(cookieSession),
        },
      }
    )
  })
}
