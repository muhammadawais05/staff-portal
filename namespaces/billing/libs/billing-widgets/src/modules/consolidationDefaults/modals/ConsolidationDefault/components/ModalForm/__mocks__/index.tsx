import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => <div data-testid='ConsolidationDefaultModalForm' />)

export default MockComponent
