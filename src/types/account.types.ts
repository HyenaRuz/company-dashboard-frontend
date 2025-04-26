import { ERole } from '@/enums/role.enum'

import { TCompany } from './company.types'
import { THistory } from './history.type'

type TAccount = {
  id: number
  email?: string
  username?: string
  role: ERole
  avatarUrl?: string
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date | null
  companiesCount?: number
  _count?: { companies?: number }
  companies?: TCompany[]
  historyLogs?: THistory[]
  actingHistories?: THistory[]
  targetHistories?: THistory[]
}

type TChangePassword = {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export type { TAccount, TChangePassword }
