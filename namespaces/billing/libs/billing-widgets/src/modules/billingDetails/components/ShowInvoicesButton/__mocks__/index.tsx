import React from 'react'

const MockComponent = jest.fn().mockImplementation(({ operation, href }) => (
  <div data-testid='ShowInvoicesButton'>
    <span data-testid='ShowInvoicesButton-operation'>{operation}</span>
    <span data-testid='ShowInvoicesButton-href'>{href}</span>
  </div>
))

export default MockComponent
