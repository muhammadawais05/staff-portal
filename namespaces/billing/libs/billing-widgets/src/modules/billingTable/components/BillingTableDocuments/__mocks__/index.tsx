import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(props => (
    <div data-testid='BillingTableDocuments'>
      {JSON.stringify(props?.hasChildAdjustments)}
    </div>
  ))

export default MockComponent
