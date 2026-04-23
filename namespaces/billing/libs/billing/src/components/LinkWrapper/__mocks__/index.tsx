import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(props => (
    <span data-testid='LinkWrapper'>{JSON.stringify(props)}</span>
  ))

export default MockComponent
