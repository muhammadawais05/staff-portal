import React from 'react'

const MockComponent = jest.fn().mockImplementation(({ commissionData }) => (
  <div data-testid='CommissionContent'>
    <span data-testid='CommissionContent-commissionData'>
      {JSON.stringify(commissionData)}
    </span>
  </div>
))

export default MockComponent
