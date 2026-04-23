import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => (
    <div data-testid='ConsolidationDefaultsTableRowAction' />
  ))

export default MockComponent
