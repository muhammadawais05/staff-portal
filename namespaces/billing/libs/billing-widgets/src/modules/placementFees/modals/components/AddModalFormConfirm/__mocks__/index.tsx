import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(props => (
    <div data-testid='AddModalFormConfirm'>{JSON.stringify(props)}</div>
  ))

export default MockComponent
