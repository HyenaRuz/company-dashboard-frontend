import { TAccount } from './account.types'
import { THistory } from './history.type'

type TCompany = {
  id: number
  name: string
  service: string
  capital: number
  logoUrl?: string
  accountId: number
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date
  account: TAccount
  historyLogs?: THistory[]
}

export type { TCompany }
