import React from 'react'

const MockComponent = jest.fn().mockImplementation(props => (
  <div
    data-testid='PaymentPayModalFormContent'
    data-amount={props.amount}
    data-payment-method-required={props.paymentMethodRequired}
    data-is-eligible-to-be-paid-out={props.isEligibleToBePaidOut}
  >
    {JSON.stringify(props.subject)}
  </div>
))

export default MockComponent
