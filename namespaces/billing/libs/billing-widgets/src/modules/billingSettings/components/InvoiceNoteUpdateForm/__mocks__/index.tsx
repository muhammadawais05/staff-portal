import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ children }) => (
    <div data-testid='InvoiceNoteUpdateForm'>{children}</div>
  ))

export default MockComponent
