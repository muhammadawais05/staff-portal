import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => <div data-testid='ExpectedCommissionsListSearch' />)

export default MockComponent
