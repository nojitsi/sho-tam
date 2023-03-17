import { authenticator, AuthStrategies } from '~/service/auth'
import { LoaderFunction } from '@remix-run/node'
import { auth } from '~/shared/const'

export const loader: LoaderFunction = async ({ request }) => {
  return authenticator.authenticate(AuthStrategies.GOOGLE, request, {
    successRedirect: auth.successRedirect,
    failureRedirect: auth.failureRedirect,
  })
}
