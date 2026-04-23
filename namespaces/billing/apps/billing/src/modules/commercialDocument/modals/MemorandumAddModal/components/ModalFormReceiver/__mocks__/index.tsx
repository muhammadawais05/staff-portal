import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => <div data-testid='ModalFormReceiver' />)

export default MockComponent
