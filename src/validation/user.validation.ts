import * as yup from 'yup'

const USERNAME_REGEX = /^[a-zA-Z0-9._@-]+$/
const PASSWORD_REGEX = /^[a-zA-Z0-9._@-]+$/

const usernameSchema = yup
  .string()
  .required('Username is required.')
  .min(3, 'Username must be at least 3 characters.')
  .max(30, 'Username must be at most 30 characters.')
  .matches(
    USERNAME_REGEX,
    'Username can only contain letters, numbers, dots, underscores, @ and hyphens.',
  )
  .trim()

const emailSchema = yup
  .string()
  .required('Email is required.')
  .email('Email must be a valid email address.')
  .trim()

const passwordSchema = yup
  .string()
  .required('Password is required.')
  .min(8, 'Password must be at least 8 characters.')
  .max(30, 'Password must be at most 30 characters.')
  .matches(
    PASSWORD_REGEX,
    'Password can only contain letters, numbers, dots, underscores, @ and hyphens.',
  )
  .trim()

export { usernameSchema, emailSchema, passwordSchema }
