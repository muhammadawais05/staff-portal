import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ paymentGroup }) => (
    <div data-testid='PaymentGroupApplyUnallocatedMemosContent'>
      {JSON.stringify(paymentGroup.id)}
    </div>
  ))

export default MockComponent
