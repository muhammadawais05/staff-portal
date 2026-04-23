import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(props => (
    <div data-testid='FormInputDatePicker'>{JSON.stringify(props)}</div>
  ))

export default MockComponent
