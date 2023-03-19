import { Authenticator } from 'remix-auth'
import { sessionStorage } from './session'
import { GoogleStrategy, SocialsProvider } from 'remix-auth-socials'
import { FormStrategy } from 'remix-auth-form'
import { verifyGoogleTokenAndGetInfo } from './google-auth'
import { findOrCreateUser } from '~/loaders/user'
import { privateEnvVariables, publicEnvVariables } from '~/loaders/env'
import { PasswordlessStrategy } from 'remix-auth-passwordless'
import { sendMail } from './mail'
import { User } from '@prisma/client'

type UserDTO = {
  name: string
  email: string
  avatar?: string
}

export enum AuthStrategies {
  GOOGLE = 'google',
  GOOGLE_ONE_TAP = 'google-one-tap',
  PASSWORDLESS = 'passwordless',
}

export const authenticator = new Authenticator(sessionStorage)

const transformGoogleUserData = (userData: any): UserDTO => {
  return {
    name: userData.name,
    email: userData.email,
    avatar: userData.picture,
  }
}

const createUserIfNotExist = async (userDto: UserDTO) => {
  return findOrCreateUser({ email: userDto.email }, userDto)
}

export const getUserAuthData = async (request: any, redirectOnFail = false, redirectTo = '/') => {
  const options = redirectOnFail ? {
    failureRedirect: `/auth/login?redirectTo=${redirectTo}` ,
  } : {}
  return await authenticator.isAuthenticated(request, options as any) as unknown as User
}

authenticator.use(
  new GoogleStrategy(
    {
      clientID: String(publicEnvVariables.GOOGLE_OAUTH_CLIENT_ID),
      clientSecret: String(privateEnvVariables.GOOGLE_OAUTH_CLIENT_SECRET),
      callbackURL:
        `${publicEnvVariables.SERVER_PUBLIC_URL}${publicEnvVariables.GOOGLE_OAUTH_REDIRECT_PATH}`,
    },
    requsetData => {
      const userData = transformGoogleUserData(requsetData.profile._json)
      return createUserIfNotExist(userData)
    },
  ),
  SocialsProvider.GOOGLE,
)

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const token = String(form.get('credential')?.toString())
    const tokenData = await verifyGoogleTokenAndGetInfo(token)
    const userData = transformGoogleUserData(tokenData)

    return await createUserIfNotExist(userData)
  }),
  AuthStrategies.GOOGLE_ONE_TAP,
)

authenticator.use(
  new PasswordlessStrategy(
    {
      sendEmail: async options => {
        await sendMail({
          to: options.email,
          from: 'magazinzbroi@gmail.com',
          subject: 'Вхід Zbroya.in.ua',
          html: `<p><strong>Перейдіть за посиланням для входу</strong></p><p>${options.accessLink}&redirectTo=${options.form.get('redirectTo')}</p><p>Посилання працює 5 хвилин</p>`,
        })
      },
      secret: privateEnvVariables.PASSWORD_LESS_SECRET as string,
      useOneTimeCode: true,
      callbackPath: '/auth/passwordless',
    },
    async data => {
      return createUserIfNotExist({ email: data.email, name: data.email })
    },
  ),
)

// export const loginUser = ()
