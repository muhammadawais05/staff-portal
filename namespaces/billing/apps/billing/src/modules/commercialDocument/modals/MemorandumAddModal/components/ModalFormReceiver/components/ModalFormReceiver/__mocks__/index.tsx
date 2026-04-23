import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ name }) => (
    <div data-testid='ModalFormReceiver'>{JSON.stringify(name)}</div>
  ))

export default MockComponent
