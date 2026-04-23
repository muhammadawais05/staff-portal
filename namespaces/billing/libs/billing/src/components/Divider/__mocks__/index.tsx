import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => <div data-testid='Divider' />)

export default MockComponent
