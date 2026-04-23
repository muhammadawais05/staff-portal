import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(props => <div data-testid='App'>{props.children}</div>)

export default MockComponent
