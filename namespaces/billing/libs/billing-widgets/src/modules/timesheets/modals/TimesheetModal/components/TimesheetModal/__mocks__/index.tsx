import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => <div data-testid='TimesheetModal' />)

export default MockComponent
