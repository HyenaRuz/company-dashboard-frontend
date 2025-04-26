type THistory = {
  id: number
  createdAt: Date
  actingAccountId: number
  targetAccountId?: number
  objectCompanyId?: number
  objectAccountId?: number
  objectType: string
  ip: string
}

export type { THistory }
