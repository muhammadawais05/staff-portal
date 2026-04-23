import React from 'react'

const MockComponent = jest.fn().mockImplementation(props => (
  <tr>
    <td data-testid='EmailStatusPanelTableRow'>{JSON.stringify(props)}</td>
  </tr>
))

export default MockComponent
