import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => <div data-testid='EngagementsTableHeader' />)

export default MockComponent
