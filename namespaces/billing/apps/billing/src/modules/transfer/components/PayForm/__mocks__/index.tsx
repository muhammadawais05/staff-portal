import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(props => (
    <div data-testid='PayForm'>{JSON.stringify(props.transfer.id)}</div>
  ))

export default MockComponent
