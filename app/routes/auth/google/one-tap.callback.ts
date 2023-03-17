import { ActionFunction } from '@remix-run/node'
import { authenticator, AuthStrategies } from '~/service/auth'
import { auth } from '~/shared/const'

export const action: ActionFunction = async ({ request }) => {
  return authenticator.authenticate(AuthStrategies.GOOGLE_ONE_TAP, request, {
    successRedirect: auth.successRedirect,
    failureRedirect: auth.failureRedirect,
  })
}

