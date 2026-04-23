import React from 'react'

const MockComponent = jest.fn().mockImplementation(props => (
  <tr data-testid={props['data-testid'] || 'TransfersTableRow'}>
    <td>isStripeEven: {JSON.stringify(props.isStripeEven)}</td>
    <td>TransferId: {JSON.stringify(props.transfer.id)}</td>
  </tr>
))

export default MockComponent
