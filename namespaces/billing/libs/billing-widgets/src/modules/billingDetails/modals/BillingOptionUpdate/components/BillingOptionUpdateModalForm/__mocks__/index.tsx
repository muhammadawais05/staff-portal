import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ title, initialValues, billingMethod }) => (
    <div data-testid='BillingOptionUpdateModalForm'>
      <div data-testid='BillingOptionUpdateModalForm-title'>{title}</div>
      <div data-testid='BillingOptionUpdateModalForm-initialValues'>
        {JSON.stringify(initialValues)}
      </div>
      <div data-testid='BillingOptionUpdateModalForm-billingMethod'>
        {billingMethod}
      </div>
    </div>
  ))

export default MockComponent
