import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => <tr data-testid='ConsolidationDefaultsTableRow' />)

export default MockComponent
