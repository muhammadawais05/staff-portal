import React from 'react'

const MockComponent = jest.fn().mockImplementation(({ title, roles }) => (
  <div data-testid='ClientClaimerUpdateModalForm'>
    <span data-testid='ClientClaimerUpdateModalForm-title'>{title}</span>
    <span data-testid='ClientClaimerUpdateModalForm-roles'>
      {JSON.stringify(roles)}
    </span>
  </div>
))

export default MockComponent
