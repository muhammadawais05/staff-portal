import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ paymentGroup }) => (
    <div data-testid='PaymentGroupPayModalContent'>
      {JSON.stringify(paymentGroup.id)}
    </div>
  ))

export default MockComponent
