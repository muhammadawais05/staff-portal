import React from 'react'

const MockComponent = jest.fn().mockImplementation(({ children }) => (
  <table data-testid='EngagementsTable'>
    <tbody>{children}</tbody>
  </table>
))

export default MockComponent
