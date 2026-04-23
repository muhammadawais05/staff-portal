import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => <div data-testid='InvoiceNoteUpdate' />)

export default MockComponent
