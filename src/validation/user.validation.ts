import * as yup from 'yup'

const usernameSchema = (t: any) =>
  yup
    .string()
    .required(t('validation.user.username_required'))
    .min(3, t('validation.user.username_min', { length: 3 }))
    .max(30, t('validation.user.username_max', { length: 30 }))
    .test('username', t('validation.user.username_characters'), (value) =>
      new RegExp(/^[a-zA-Z0-9._@-]+$/).test(value),
    )
    .trim()

const emailSchema = (t: any) =>
  yup
    .string()
    .required(t('validation.user.email_required'))
    .email(t('validation.user.email_invalid'))
    .trim()

const passwordSchema = (t: any) =>
  yup
    .string()
    .required(t('validation.user.password_required'))
    .min(8, t('validation.user.password_min', { length: 8 }))
    .max(30, t('validation.user.password_max', { length: 30 }))
    .test('password', t('validation.user.password_characters'), (value) =>
      new RegExp(/^[a-zA-Z0-9._@-]+$/).test(value),
    )
    .trim()

export { usernameSchema, emailSchema, passwordSchema }
