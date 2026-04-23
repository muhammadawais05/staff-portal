import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ children }) => (
    <div data-testid='BillingAddressEditModalForm'>{children}</div>
  ))

export default MockComponent
