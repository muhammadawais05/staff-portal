import React from 'react'

const MockComponent = jest.fn().mockImplementation(({ fieldArrayName }) => (
  <caption data-testid='MemosListWithHeader'>
    {JSON.stringify({
      fieldArrayName
    })}
  </caption>
))

export default MockComponent
