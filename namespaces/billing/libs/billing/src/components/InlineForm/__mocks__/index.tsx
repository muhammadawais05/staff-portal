import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => <div data-testid='InlineForm' />)

export default MockComponent
