import React from 'react'

const MockComponent = jest.fn().mockImplementation(props => {
  const { payments, totals } = props

  return (
    <div data-testid='PaymentListTable'>
      {JSON.stringify({ payments, totals })}
    </div>
  )
})

export default MockComponent
