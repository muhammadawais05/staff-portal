import React, { isValidElement, cloneElement } from 'react'
import { Container, Typography, TypographyOverflow } from '@toptal/picasso'
import { isString, toTitleCase } from '@toptal/picasso/utils'

import { useGetContainerPropsFromContext } from '../../DetailedListContext'
import type { DetailedListValue } from '../../types'
import * as S from './styles'

interface Props {
  content: DetailedListValue
  defaultValue?: string
  isLabel?: boolean
  width: string
  multilines?: boolean
  titleCaseLabels?: boolean
  collapseMargins?: boolean
}

// eslint-disable-next-line complexity
const DetailedListItemContent = ({
  content,
  defaultValue,
  isLabel = false,
  width,
  multilines = false,
  titleCaseLabels = true,
  collapseMargins = false
}: Props) => {
  const { leftSpacing, rightSpacing, padding, size, color, weight } =
    useGetContainerPropsFromContext()

  let adjustedValueProps = {
    color,
    weight,
    size
  }
  const conditionalProps = isLabel
    ? {
        titleCase: titleCaseLabels,
        size
      }
    : adjustedValueProps

  let adjustedContent

  if (isLabel || isString(content)) {
    adjustedContent = (
      <TypographyOverflow
        data-testid='item-field-typographyOverflow'
        noWrap
        as='div'
        tooltipContent={
          titleCaseLabels && isLabel ? toTitleCase(content) : content
        }
        {...conditionalProps}
      >
        {content}
      </TypographyOverflow>
    )
  } else if (typeof content === 'function') {
    // TODO: Temporary workaround to be able to declare size, color and weight
    // Remove when Typography supports 'inherit' for all props
    // https://toptal-core.atlassian.net/browse/FX-1561
    adjustedContent = content(adjustedValueProps)
  } else {
    // TODO: Temporary workaround to be able to declare size, color and weight
    // Remove when Typography supports 'inherit' for all props
    // https://toptal-core.atlassian.net/browse/FX-1561

    if (isValidElement(content)) {
      adjustedValueProps = {
        color: content.props.color || adjustedValueProps.color,
        size: content.props.size || adjustedValueProps.size,
        weight: content.props.weight || adjustedValueProps.weight
      }

      adjustedContent = cloneElement(content, adjustedValueProps)
    } else {
      adjustedContent = content
    }
  }

  return (
    <Container
      data-testid={`item-field-${isLabel ? 'label' : 'value'}__wrapper`}
      css={S.listItem(width)}
    >
      {/* This Typography is required for styling of defaultValue of children Container
       (only for cases when adjustedContent HTML content is empty) */}
      <Typography as='div' {...conditionalProps}>
        <Container
          css={S.listItemContent({ isLabel, multilines, defaultValue })}
          data-testid={`item-field-${isLabel ? 'label' : 'value'}`}
          padded={padding}
          left={collapseMargins && !isLabel ? 0 : leftSpacing}
          right={collapseMargins && isLabel ? 0 : rightSpacing}
        >
          {adjustedContent}
        </Container>
      </Typography>
    </Container>
  )
}

export default DetailedListItemContent
