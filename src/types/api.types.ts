type TPagination = {
  page: number
  limit: number
}

type TSorting = {
  sortDirection: 'asc' | 'desc'
  sortField: string
}

export type { TPagination, TSorting }
