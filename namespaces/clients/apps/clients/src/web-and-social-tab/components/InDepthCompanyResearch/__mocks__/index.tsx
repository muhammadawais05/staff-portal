import React from 'react'

const MockComponent = ({ companyId }: { companyId: string }) => (
  <div data-testid='InDepthCompanyResearch'>
    <span data-testid='InDepthCompanyResearch-companyId'>{companyId}</span>
  </div>
)

export default MockComponent
