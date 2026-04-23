import React, { RefObject } from 'react'
import { Tooltip, Typography, TypographyProps } from '@toptal/picasso'
import DOMPurify from 'dompurify'
import { toTitleCase } from '@toptal/picasso/utils'

import * as S from './styles'
import { parseLabelHighlightAsHtml } from '../../utils'
import { useEllipsis } from '../../hooks'

export interface Props extends TypographyProps {
  label?: string | null
  labelHighlight?: string | null
  titleCase?: boolean
}

const AutocompleteHighlightOptionLabel = ({
  labelHighlight,
  label,
  titleCase,
  ...restProps
}: Props) => {
  const { ref, isEllipsis } = useEllipsis()
  const htmlLabel = (labelHighlight || label) ?? ''
  const sanitizedHtmlLabel = parseLabelHighlightAsHtml(
    DOMPurify.sanitize(
      titleCase ? (toTitleCase(htmlLabel) as string) : htmlLabel,
      { ALLOWED_TAGS: ['strong'] }
    )
  )

  const labelEl = (
    <Typography
      {...restProps}
      size='xsmall'
      color='dark-grey'
      css={S.autocompleteHighlight}
      ref={ref as RefObject<HTMLElement>}
      data-testid='go-to-user-label'
      dangerouslySetInnerHTML={{ __html: sanitizedHtmlLabel }}
    />
  )

  return isEllipsis ? <Tooltip content={label}>{labelEl}</Tooltip> : labelEl
}

export default AutocompleteHighlightOptionLabel
