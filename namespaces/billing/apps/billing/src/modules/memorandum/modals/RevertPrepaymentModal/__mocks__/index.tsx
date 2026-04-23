import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(props => (
    <div data-testid='RevertPrepaymentModal'>
      {JSON.stringify(props.memorandumId)}
    </div>
  ))

export default MockComponent
