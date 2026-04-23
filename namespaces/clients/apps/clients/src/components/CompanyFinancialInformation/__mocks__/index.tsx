import React from 'react'

const MockComponent = ({ companyId }: { companyId: string }) => (
  <div data-testid='CompanyFinancialInformation'>
    <span data-testid='CompanyFinancialInformation-companyId'>{companyId}</span>
  </div>
)

export default MockComponent
