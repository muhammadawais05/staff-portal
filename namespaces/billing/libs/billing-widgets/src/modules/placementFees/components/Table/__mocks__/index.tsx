import React from 'react'

const MockComponent = jest.fn().mockImplementation(({ documents }) => (
  <div data-testid='Table'>
    <span data-testid='Table-documents'>{JSON.stringify(documents)}</span>
  </div>
))

export default MockComponent
