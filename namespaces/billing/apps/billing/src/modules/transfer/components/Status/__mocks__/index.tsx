import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(props => (
    <tr data-testid={props['data-testid'] || 'TransferStatus'} />
  ))

export default MockComponent
