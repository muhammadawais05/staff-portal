import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(props => (
    <div data-testid='RevertMemorandumForm'>{JSON.stringify(props)}</div>
  ))

export default MockComponent
