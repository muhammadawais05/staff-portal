import React from 'react'

const MockComponent = jest.fn().mockImplementation(({ children }) => (
  <table data-testid='ConsolidationDefaultsTable'>
    <tbody>{children}</tbody>
  </table>
))

export default MockComponent
