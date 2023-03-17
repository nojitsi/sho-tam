import sgMail, { MailDataRequired } from '@sendgrid/mail'
import { privateEnvVariables } from '~/loaders/env'

sgMail.setApiKey(privateEnvVariables.MAIL_API_KEY as string)

export const sendMail = (data: MailDataRequired) => {
  return sgMail.send(data)
}
