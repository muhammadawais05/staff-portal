import React from 'react'
import { Container } from '@toptal/picasso'

import AutocompleteHighlightOptionLabel from '../AutocompleteHighlightOptionLabel'
import AutocompleteHighlightOptionSubLabel from '../AutocompleteHighlightOptionSubLabel'
import * as S from './styles'

export interface Props {
  label?: string | null
  labelHighlight?: string | null
  nodeTypes?: string[]
  titleCase?: boolean
}

const AutocompleteHighlightOption = ({
  labelHighlight,
  label,
  nodeTypes,
  titleCase
}: Props) => {
  const labelContent = (
    <AutocompleteHighlightOptionLabel
      labelHighlight={labelHighlight}
      label={label}
      titleCase={titleCase}
    />
  )

  if (!nodeTypes) {
    return labelContent
  }

  return (
    <Container css={S.optionWrapper}>
      {labelContent}
      <AutocompleteHighlightOptionSubLabel nodeTypes={nodeTypes} />
    </Container>
  )
}

export default AutocompleteHighlightOption
