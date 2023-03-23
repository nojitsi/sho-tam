import { ActionFunction, LoaderFunction, redirect } from '@remix-run/node'
import { AuthorizationError } from 'remix-auth'
import { MESSAGE_COLOR_HEADER_KEY, MESSAGE_HEADER_KEY } from '~/components/message'
import { authenticator, AuthStrategies } from '~/service/auth'
import { commitSession, getSession } from '~/service/session'
import { themeColors } from '~/shared/colors'
import { auth } from '~/shared/const'

export const loader: LoaderFunction = async ({ request }) => {
  const urlParams = new URL(request.url).searchParams
  const token = urlParams.get('token') ?? ''
  const successRedirect = urlParams.get('redirectTo') ?? auth.successRedirect

  return authenticator.authenticate(AuthStrategies.PASSWORDLESS, request, {
    successRedirect,
    failureRedirect: auth.failureRedirect,
    context: { token }
  }).catch(async error => {
    const session = await getSession(error.headers.get('set-cookie'))
    const errorMessage = session.get('auth:error')
    
    if (errorMessage === undefined) {
      session.flash(MESSAGE_HEADER_KEY, 'Ви успішно увійшли в систему')
      session.flash(MESSAGE_COLOR_HEADER_KEY, themeColors.darkGreen)
      return redirect(successRedirect, {
        headers: {
          ...error.headers,
          'set-cookie': await commitSession(session),
        },
      })
    }

    session.flash(MESSAGE_HEADER_KEY, 'Помилка під час входу в систему')
    session.flash(MESSAGE_COLOR_HEADER_KEY, themeColors.red)
    return redirect(auth.failureRedirect, {
        headers: {
          'set-cookie': await commitSession(session),
        },
      }
    )
  })
}

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'))
  session.flash(MESSAGE_HEADER_KEY, 'Для входу перейдіть за посиланням що надійшшло вам на пошту')
  request.headers.set('Cookie', await commitSession(session))

  const formData = await request.formData()
  return await authenticator.authenticate(
    AuthStrategies.PASSWORDLESS,
    request,
    {
      successRedirect: '/',
      failureRedirect: auth.failureRedirect,
      context: { formData },
    },
  )
}
