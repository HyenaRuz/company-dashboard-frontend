type SortingParams = {
  name: string
  sortDirection: 'asc' | 'desc'
  sortField: string
}

type SortingPanelProps = {
  onChange: (filters: SortingParams) => void
  onPageReset?: () => void
}

export type { SortingParams, SortingPanelProps }
