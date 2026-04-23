import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ commercialDocument }) => (
    <div data-testid='ApplyUnallocatedMemorandumsContent'>
      {JSON.stringify(commercialDocument.id)}
    </div>
  ))

export default MockComponent
