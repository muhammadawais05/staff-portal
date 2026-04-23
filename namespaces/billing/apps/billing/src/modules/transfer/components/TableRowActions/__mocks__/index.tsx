import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(props => (
    <div data-testid='TableRowActions'>{JSON.stringify(props.id)}</div>
  ))

export default MockComponent
