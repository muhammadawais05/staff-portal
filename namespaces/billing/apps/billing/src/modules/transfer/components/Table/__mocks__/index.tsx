import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => <table data-testid='Table' />)

export default MockComponent
