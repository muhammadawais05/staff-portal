import React from 'react'

const MockComponent = jest.fn().mockImplementation(({ client }) => (
  <div data-testid='BasicBillingInfoContent'>
    <span data-testid='BasicBillingInfoContent-companyId'>
      {JSON.stringify(client)}
    </span>
  </div>
))

export default MockComponent
