import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ billingMethods }) => (
    <div data-testid='PaymentMethodTotals'>
      {JSON.stringify(billingMethods)}
    </div>
  ))

export default MockComponent
