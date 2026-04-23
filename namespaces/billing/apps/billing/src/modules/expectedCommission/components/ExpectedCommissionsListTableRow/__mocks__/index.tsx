import React from 'react'

const MockComponent = jest.fn().mockImplementation(() => (
  <tr data-testid='ExpectedCommissionsListTableRow'>
    <td />
  </tr>
))

export default MockComponent
