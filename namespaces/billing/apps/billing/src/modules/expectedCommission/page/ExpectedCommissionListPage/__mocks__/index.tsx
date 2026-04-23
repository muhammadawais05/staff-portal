import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => <div data-testid='ExpectedCommissionListPage' />)

export default MockComponent
