import React from 'react'

const MockComponent = jest.fn().mockImplementation(({ companyId }) => (
  <div data-testid='BillingInformationNotes'>
    <span data-testid='BillingInformationNotes-companyId'>{companyId}</span>
  </div>
))

export default MockComponent
