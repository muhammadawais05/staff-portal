import React from 'react'

const MockComponent = ({ companyDetails }: { companyDetails: object }) => (
  <div data-testid='InDepthCompanyResearchContent'>
    <div data-testid='InDepthCompanyResearchContent-companyDetails'>
      {JSON.stringify(companyDetails)}
    </div>
  </div>
)

export default MockComponent
