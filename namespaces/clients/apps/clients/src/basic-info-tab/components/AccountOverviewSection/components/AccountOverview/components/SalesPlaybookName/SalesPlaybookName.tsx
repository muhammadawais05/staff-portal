import React from 'react'
import { TypographyOverflow } from '@toptal/picasso'

interface Props {
  salesPlaybookName?: string | null
}

const SalesPlaybookName = ({ salesPlaybookName }: Props) => {
  return salesPlaybookName ? (
    <TypographyOverflow size='medium'>{salesPlaybookName}</TypographyOverflow>
  ) : null
}

export default SalesPlaybookName
