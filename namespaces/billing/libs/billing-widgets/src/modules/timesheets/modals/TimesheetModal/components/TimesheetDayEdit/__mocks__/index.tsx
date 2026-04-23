import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(props => (
    <div data-testid='TimesheetDayEdit'>{JSON.stringify(props)}</div>
  ))

export default MockComponent
