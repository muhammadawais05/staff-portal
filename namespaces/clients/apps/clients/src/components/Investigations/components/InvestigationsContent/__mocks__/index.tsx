import React from 'react'

import { Operations } from '../../../types'

const MockComponent = ({
  totalCount,
  operations,
  companyId
}: {
  totalCount: number
  operations: Operations
  companyId: string
}) => (
  <div data-testid='InvestigationsContent'>
    <div data-testid='InvestigationsContent-totalCount'>{totalCount}</div>
    <div data-testid='InvestigationsContent-operations'>
      {JSON.stringify(operations)}
    </div>
    <div data-testid='InvestigationsContent-companyId'>{companyId}</div>
  </div>
)

export default MockComponent
