import { Tag, Typography, TypographyOverflow } from '@toptal/picasso'
import React from 'react'

import * as S from './styles'
import { SearchBarOption } from '../SearchBar/types'

interface Props {
  onDelete: () => void
  selectedOption: SearchBarOption
}

const getBadgeLabel = ({ value, category }: SearchBarOption) => {
  const label = category.getBadgeLabel(value)

  return (
    <>
      "
      <TypographyOverflow
        forwardedAs='span'
        weight='semibold'
        css={S.badgeLabel}
      >
        {label}
      </TypographyOverflow>
      " {category.label || category.name}
    </>
  )
}

export const SearchBarBadge = ({ onDelete, selectedOption }: Props) => (
  <Tag data-testid='search-bar-badge' titleCase={false} onDelete={onDelete}>
    <Typography weight='semibold' css={S.badge}>
      {getBadgeLabel(selectedOption)}
    </Typography>
  </Tag>
)
