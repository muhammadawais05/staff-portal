import React from 'react'

const MockComponent = jest.fn().mockImplementation(({ data }) => (
  <div data-testid='Table'>
    <span data-testid='Table-data'>{JSON.stringify(data)}</span>
  </div>
))

export default MockComponent
