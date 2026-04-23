import React from 'react'
import { EmptyState } from '@toptal/picasso'

import Investigation from '../Investigation'
import {
  Investigation as InvestigationType,
  Operations
} from '../../types'

interface Props {
  investigations: InvestigationType[]
  companyId: string
  isExpanded?: boolean
  operations?: Operations
}

const InvestigationsList = ({
  investigations,
  companyId,
  operations,
  isExpanded
}: Props) => {
  const isEmpty = investigations.length === 0

  return (
    <>
      {isEmpty && (
        <EmptyState.Collection>
          Currently there are no investigations.
        </EmptyState.Collection>
      )}
      {isExpanded &&
        investigations.map(investigation => (
          <Investigation
            key={investigation.id}
            investigation={investigation}
            companyId={companyId}
            operations={operations}
          />
        ))}
    </>
  )
}

export default InvestigationsList
