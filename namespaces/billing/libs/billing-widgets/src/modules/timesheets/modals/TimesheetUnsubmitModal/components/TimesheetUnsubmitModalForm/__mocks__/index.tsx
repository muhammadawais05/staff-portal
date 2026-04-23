import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(props => (
    <div data-testid='TimesheetUnsubmitModalForm'>
      {JSON.stringify(props.billingCycle)}
    </div>
  ))

export default MockComponent
