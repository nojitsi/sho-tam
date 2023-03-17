import { ActionFunction, LoaderFunction } from '@remix-run/node'
import { authenticator, AuthStrategies } from '~/service/auth'
import { auth } from '~/shared/const'

export const loader: LoaderFunction = async ({ request }) => {
  const urlParams = new URL(request.url).searchParams
  const token = urlParams.get('token')
  return await authenticator.authenticate(
    AuthStrategies.PASSWORDLESS,
    request,
    {
      successRedirect: auth.successRedirect,
      failureRedirect: auth.failureRedirect,
      context: {
        token,
      },
    },
  )
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  return await authenticator.authenticate(
    AuthStrategies.PASSWORDLESS,
    request,
    {
      successRedirect: auth.successRedirect,
      failureRedirect: auth.failureRedirect,
      context: { formData },
    },
  )
}
