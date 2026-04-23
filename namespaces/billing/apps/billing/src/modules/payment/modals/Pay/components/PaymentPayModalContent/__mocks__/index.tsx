import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ payment }) => (
    <div data-testid='PaymentPayModalContent'>{JSON.stringify(payment.id)}</div>
  ))

export default MockComponent
