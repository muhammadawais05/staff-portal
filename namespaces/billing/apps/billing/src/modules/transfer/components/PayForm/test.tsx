import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'
import { screen } from '@testing-library/react'

import PayForm from '.'

jest.mock('@staff-portal/billing/src/components/ModalFooter')

const render = props =>
  renderComponent(
    <PayForm
      transfer={fixtures.MockTransfer}
      handleOnSubmit={jest.fn()}
      {...props}
    />
  )

describe('payForm', () => {
  it('default render', () => {
    render({
      initialValues: {
        amount: '',
        comment: '',
        effectiveDate: '',
        invoiceId: 'abc123',
        transferId: 'bda123'
      }
    })

    expect(screen.getByTestId('PayForm')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Are you sure you want to mark current transaction paid?'
      )
    ).toBeInTheDocument()
    expect(screen.getByTestId('PayForm-intro')).toBeInTheDocument()
    expect(screen.getByTestId('amount')).toBeInTheDocument()
    expect(screen.getByTestId('effectiveDate')).toBeInTheDocument()
    expect(screen.getByTestId('comment')).toBeInTheDocument()
    expect(screen.getByTestId('submit')).toBeInTheDocument()
  })
})
