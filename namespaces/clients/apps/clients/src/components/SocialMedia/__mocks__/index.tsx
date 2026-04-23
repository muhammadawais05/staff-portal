import React from 'react'

const MockComponent = ({ companyId }: { companyId: string }) => (
  <div data-testid='SocialMedia'>
    <span data-testid='SocialMedia-companyId'>{companyId}</span>
  </div>
)

export default MockComponent
