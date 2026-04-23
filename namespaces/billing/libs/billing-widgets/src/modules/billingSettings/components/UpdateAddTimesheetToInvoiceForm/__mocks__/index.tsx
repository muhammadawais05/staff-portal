import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => (
    <div data-testid='UpdateAddTimesheetToInvoiceForm' />
  ))

export default MockComponent
