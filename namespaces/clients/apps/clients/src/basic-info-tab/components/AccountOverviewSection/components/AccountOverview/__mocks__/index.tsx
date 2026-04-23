import React from 'react'

import { CompanyOverviewFragment } from '../../../data'

const MockedComponent = ({
  company: { id: companyId }
}: {
  company: CompanyOverviewFragment
}) => (
  <div data-testid='AccountOverview'>
    <div data-testid='AccountOverview-companyId'>{companyId}</div>
  </div>
)

export default MockedComponent
