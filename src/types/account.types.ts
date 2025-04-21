import { TCompany } from './company.types'

type TAccount = {
  id: number
  email: string
  username: string
  role: string
  avatarUrl?: string
  createdAt: Date
  companiesCount?: number
  companies?: TCompany[]
}

type TChangePassword = {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export type { TAccount, TChangePassword }
