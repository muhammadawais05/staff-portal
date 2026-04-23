import React from 'react'

const MockComponent = jest.fn().mockImplementation(props => (
  <tr data-testid='PaymentGroupPaymentsRow'>
    <td>{JSON.stringify(props.payment.id)}</td>
  </tr>
))

export default MockComponent
