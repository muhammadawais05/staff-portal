import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ documentNumber, type, actionItems }) => (
    <div data-testid='Actions'>
      {JSON.stringify({ documentNumber, type, actionItems })}
    </div>
  ))

export default MockComponent
