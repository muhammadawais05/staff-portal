import React from 'react'

const MockComponent = jest.fn().mockImplementation(({ client }) => (
  <div data-testid='BillingAddressItem'>
    <span data-testid='BillingAddressItem-client'>{client.id}</span>
  </div>
))

export default MockComponent
