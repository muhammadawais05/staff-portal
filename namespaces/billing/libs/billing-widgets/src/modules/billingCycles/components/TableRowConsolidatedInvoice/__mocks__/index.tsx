import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(props => (
    <div data-testid='BillingCycleTableRowConsolidatedInvoice'>
      {JSON.stringify(props?.invoice?.id)}
    </div>
  ))

export default MockComponent
