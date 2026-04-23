import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(props => (
    <div data-testid='RevertPrepaymentModalForm'>
      {JSON.stringify(props.documentNumber)}
    </div>
  ))

export default MockComponent
