import React from 'react'

import { CompanyOverviewFragment } from '../../../../../data'

const MockComponent = ({
  operationDisabled,
  country,
  city,
  clientId,
  'data-testid': testId = 'Location'
}: {
  operationDisabled: boolean
  country: CompanyOverviewFragment['country']
  city: CompanyOverviewFragment['city']
  clientId: string
  'data-testid': string
}) => (
  <div data-testid={testId}>
    <div data-testid={`${testId}-country`}>{country?.name}</div>
    <div data-testid={`${testId}-city`}>{city}</div>
    <div data-testid={`${testId}-clientId`}>{clientId}</div>
    <div data-testid={`${testId}-operationDisabled`}>
      {operationDisabled.toString()}
    </div>
  </div>
)

export default MockComponent
