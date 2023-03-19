import { ActionFunction } from '@remix-run/node'
import { redirect } from 'react-router'
import { AuthorizationError } from 'remix-auth'
import { MESSAGE_COLOR_HEADER_KEY, MESSAGE_HEADER_KEY } from '~/components/message'
import { authenticator, AuthStrategies } from '~/service/auth'
import { commitSession, getSession } from '~/service/session'
import { themeColors } from '~/shared/colors'
import { auth } from '~/shared/const'

export const action: ActionFunction = async ({ request }) => {
  const urlParams = new URL(request.url).searchParams
  const successRedirect = urlParams.get('redirectTo') ?? auth.successRedirect 

  return authenticator.authenticate(AuthStrategies.GOOGLE_ONE_TAP, request, {
    successRedirect,
    failureRedirect: auth.failureRedirect,
  }).catch(async error => {
    if(!(error instanceof AuthorizationError)) {
      const session = await getSession(error.headers.get('set-cookie'))
      
      session.flash(MESSAGE_HEADER_KEY, 'Ви успішно увійшли в систему')
      session.flash(MESSAGE_COLOR_HEADER_KEY, themeColors.darkGreen)
      return redirect(successRedirect, {
        headers: {
          ...error.headers,
          'set-cookie': await commitSession(session),
        },
      })
    }
    const session = await getSession(request.headers.get('cookie'))
    session.flash(MESSAGE_HEADER_KEY, 'Помилка під час входу у систему')
    session.flash(MESSAGE_COLOR_HEADER_KEY, themeColors.red)
    return redirect(auth.failureRedirect, {
        headers: {
          'set-cookie': await commitSession(session),
        },
      }
    )
  })
}

