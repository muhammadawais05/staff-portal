import React from 'react'

import { CompanyStatusInput } from '../types'

interface Props {
  'data-testid': string
  company: CompanyStatusInput
}

const MockedComponent = ({
  'data-testid': testId = 'CompanyStatus',
  company
}: Props) => (
  <div data-testid={testId}>
    <div data-testid={`${testId}-company`}>{JSON.stringify(company)}</div>
  </div>
)

export default MockedComponent
