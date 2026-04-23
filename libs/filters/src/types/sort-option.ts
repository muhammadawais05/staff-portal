import { ReactNode } from 'react'

import { SortOrder } from './sort-order'

export interface SortOption {
  text: string
  value: string
  defaultSort?: SortOrder
  disabled?: boolean
  tooltipContent?: ReactNode
  hidden?: boolean
}
