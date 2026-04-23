import { useContext, createContext } from 'react'
import { TypographyProps, SpacingType } from '@toptal/picasso'

interface ContextValue {
  labelColumnWidth: number
  leftItemSpacing: SpacingType
  rightItemSpacing: SpacingType
  itemPadding?: SpacingType
  typographySize: TypographyProps['size']
  typographyColor: TypographyProps['color']
  typographyWeight: TypographyProps['weight']
  defaultValue?: string
  isFullWidthLabel: boolean
  hasHalfWidthItems: boolean
  striped?: boolean
  divided?: boolean
}

export const useGetContainerPropsFromContext = () => {
  const {
    defaultValue,
    isFullWidthLabel,
    hasHalfWidthItems,
    itemPadding,
    labelColumnWidth,
    leftItemSpacing,
    rightItemSpacing,
    typographyColor,
    typographySize,
    typographyWeight,
    striped,
    divided
  } = useContext(DetailedListContext) || {}

  return {
    color: typographyColor,
    defaultValue,
    isFullWidthLabel,
    hasHalfWidthItems,
    labelWidth: labelColumnWidth,
    leftSpacing: leftItemSpacing,
    padding: itemPadding,
    rightSpacing: rightItemSpacing,
    size: typographySize,
    weight: typographyWeight,
    striped,
    divided
  }
}

export const DetailedListContext = createContext<ContextValue | null>(null)
