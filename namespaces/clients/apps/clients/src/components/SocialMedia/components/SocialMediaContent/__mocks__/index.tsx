import React from 'react'

const MockComponent = ({ companyDetails }: { companyDetails: object }) => (
  <div data-testid='SocialMediaContent'>
    <div data-testid='SocialMediaContent-companyDetails'>
      {JSON.stringify(companyDetails)}
    </div>
  </div>
)

export default MockComponent
