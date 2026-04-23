import React from 'react'

const MockComponent = jest.fn().mockImplementation(({ companyId }) => (
  <div data-testid='Commission'>
    <span data-testid='Commission-companyId'>{companyId}</span>
  </div>
))

export default MockComponent
