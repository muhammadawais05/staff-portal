import React from 'react'

const MockComponent = jest.fn().mockImplementation(() => (
  <tr data-testid='Row'>
    <td />
  </tr>
))

export default MockComponent
