import React from 'react'

const MockComponent = jest.fn().mockImplementation(({ totals, sortOrder }) => (
  <div data-testid='ListTotals'>
    <span data-testid='ListTotals-totals'>{JSON.stringify(totals)}</span>
    <span data-testid='ListTotals-sortOrder'>{JSON.stringify(sortOrder)}</span>
  </div>
))

export default MockComponent
