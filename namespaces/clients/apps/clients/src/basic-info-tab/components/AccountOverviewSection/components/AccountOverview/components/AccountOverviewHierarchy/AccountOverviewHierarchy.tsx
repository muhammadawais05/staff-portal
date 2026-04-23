import React from 'react'
import { TypographyOverflow } from '@toptal/picasso'

interface Props {
  hierarchyCategory?: string | null
}

const AccountOverviewHierarchy = ({ hierarchyCategory }: Props) => {
  return hierarchyCategory ? (
    <TypographyOverflow size='medium'>{hierarchyCategory}</TypographyOverflow>
  ) : null
}

export default AccountOverviewHierarchy
