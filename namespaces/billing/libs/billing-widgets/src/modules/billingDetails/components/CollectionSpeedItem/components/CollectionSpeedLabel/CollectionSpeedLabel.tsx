import React, { useMemo } from 'react'
import { keyBy, mapValues } from 'lodash-es'
import { TypographyOverflow } from '@toptal/picasso'
import { ClientCollectionSpeed } from '@staff-portal/graphql/staff'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'

import { collectionSpeedSelectionOptions } from '../../utils'

interface Props {
  collectionSpeed?: ClientCollectionSpeed
}

const displayName = 'CollectionSpeedLabel'
const optionsMap = mapValues(
  keyBy(collectionSpeedSelectionOptions, 'value'),
  'text'
)

const CollectionSpeedLabel = ({ collectionSpeed }: Props) => {
  const label = useMemo(
    () => optionsMap[collectionSpeed as string] || EMPTY_DATA,
    [collectionSpeed]
  )

  return (
    <TypographyOverflow
      weight='semibold'
      size='medium'
      data-testid={`${displayName}-label`}
    >
      {label}
    </TypographyOverflow>
  )
}

CollectionSpeedLabel.displayName = displayName

export default CollectionSpeedLabel
