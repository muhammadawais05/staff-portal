import { TypographyProps } from '@toptal/picasso'
import { ReactNode } from 'react'

export type DetailedListValueViewOptions = {
  size: TypographyProps['size']
  color: TypographyProps['color']
  weight: TypographyProps['weight']
}

export type DetailedListValue =
  | ReactNode
  | ((options: DetailedListValueViewOptions) => ReactNode)

export type DetailedListItem = {
  label: ReactNode
  value?: DetailedListValue
  isFullWidthLabel?: boolean
  hasHalfWidthItems?: boolean
  hidden?: boolean
}
export type DetailedListRow =
  | (DetailedListItem | undefined)[]
  | DetailedListItem

export type DetailedListItems = DetailedListRow[]
