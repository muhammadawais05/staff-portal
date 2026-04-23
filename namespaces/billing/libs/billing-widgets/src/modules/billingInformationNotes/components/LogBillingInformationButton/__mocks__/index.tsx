import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ clientId, formContainer, variant, children }) => (
    <div data-testid='LogBillingInformationButton'>
      <span data-testid='LogBillingInformationButton-clientId'>{clientId}</span>
      <span data-testid='LogBillingInformationButton-formContainer'>
        {JSON.stringify(formContainer)}
      </span>
      <span data-testid='LogBillingInformationButton-variant'>{variant}</span>
      <span data-testid='LogBillingInformationButton-content'>{children}</span>
    </div>
  ))

export default MockComponent
