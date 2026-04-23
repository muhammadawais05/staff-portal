import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => <div data-testid='InvoiceSettingsDetailsTable' />)

export default MockComponent
