import React from 'react'

const MockComponent = ({ companyDetails }: { companyDetails: object }) => (
  <div data-testid='CompanyFinancialInformationContent'>
    <div data-testid='CompanyFinancialInformationContent-companyDetails'>
      {JSON.stringify(companyDetails)}
    </div>
  </div>
)

export default MockComponent
