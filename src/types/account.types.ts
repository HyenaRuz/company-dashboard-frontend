import { ERole } from '@/enums/role.enum'

import { TCompany } from './company.types'

type TAccount = {
  id: number
  email?: string
  username?: string
  role?: ERole
  avatarUrl?: string
  createdAt: Date
  updatedAt: Date
  companiesCount?: number
  _count?: { companies?: number }
  companies?: TCompany[]
}

type TChangePassword = {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export type { TAccount, TChangePassword }
