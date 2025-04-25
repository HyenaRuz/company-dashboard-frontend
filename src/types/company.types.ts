import { TAccount } from "./account.types"

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
}

export type { TCompany }
