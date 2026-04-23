import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => <div data-testid='UnappliedCashRecordModalForm' />)

export default MockComponent
