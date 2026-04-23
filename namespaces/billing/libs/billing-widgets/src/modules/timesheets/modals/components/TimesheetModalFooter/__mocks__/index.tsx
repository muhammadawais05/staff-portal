import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => <div data-testid='TimesheetListContainer' />)

export default MockComponent
