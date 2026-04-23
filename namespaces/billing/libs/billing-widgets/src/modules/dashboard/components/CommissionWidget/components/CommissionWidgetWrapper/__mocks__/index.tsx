import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => <div data-testid='CommissionWidgetWrapper' />)

export default MockComponent
