import React, { ReactNode, PropsWithChildren, memo } from 'react'
import { Container } from '@toptal/picasso'

import { useGetContainerPropsFromContext } from '../../DetailedListContext'
import { useDetailedListRowContext } from '../DetailedListRow/DetailedListRowContext'
import { getColumnWidth } from './utils'
import DetailedListItemContent from '../DetailedListItemContent'
import * as S from './styles'

interface Props {
  label?: ReactNode
  isFullWidthLabel?: boolean
  hasHalfWidthItems?: boolean
  value?: ReactNode
  multilines?: boolean
  titleCaseLabels?: boolean
  disableLabel?: boolean
  hideLabel?: boolean
}
// eslint-disable-next-line complexity
const DetailedListItem = ({
  label,
  value,
  multilines = false,
  titleCaseLabels,
  disableLabel,
  children,
  hideLabel = false,
  ...props
}: PropsWithChildren<Props>) => {
  const rowContext = useDetailedListRowContext()
  const {
    labelWidth,
    defaultValue,
    isFullWidthLabel: isFullWidthLabelFromContainer,
    hasHalfWidthItems: hasHalfWidthItemsFromContainer
  } = useGetContainerPropsFromContext()

  const numberOfRowItems = rowContext?.numberOfRowItems ?? 1
  const isFullWidthLabel =
    props.isFullWidthLabel || isFullWidthLabelFromContainer
  const hasHalfWidthItems =
    props.hasHalfWidthItems || hasHalfWidthItemsFromContainer
  const { adjustedLabelWidth, adjustedValueWidth } = getColumnWidth({
    labelWidth,
    hasHalfWidthItems,
    isFullWidthLabel
  })
  const collapseMargins = !isFullWidthLabel && !disableLabel

  return (
    <Container
      flex={!isFullWidthLabel}
      css={S.listItem(100 / numberOfRowItems)}
      {...(typeof label === 'string' && {
        'data-testid': `item-field: ${label}`
      })}
    >
      {!hideLabel && (
        <DetailedListItemContent
          content={label}
          isLabel
          titleCaseLabels={titleCaseLabels}
          width={disableLabel ? '0' : adjustedLabelWidth}
          multilines={multilines}
          collapseMargins={collapseMargins}
        />
      )}

      <DetailedListItemContent
        content={children || value || defaultValue}
        defaultValue={defaultValue}
        width={disableLabel ? '100%' : adjustedValueWidth}
        multilines={multilines}
        collapseMargins={collapseMargins}
      />
    </Container>
  )
}

export default memo(DetailedListItem)
