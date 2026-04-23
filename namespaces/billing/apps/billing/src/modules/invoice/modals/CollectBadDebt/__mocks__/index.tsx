import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(props => (
    <div data-testid='CollectBadDebt'>{JSON.stringify(props.invoiceId)}</div>
  ))

export default MockComponent
