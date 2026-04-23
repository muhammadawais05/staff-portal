import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import RollbackForm from '.'

jest.mock('@staff-portal/billing/src/components/ModalFooter')

const render = props =>
  renderComponent(<RollbackForm handleOnSubmit={jest.fn()} {...props} />)

describe('RollbackForm', () => {
  it('default render', () => {
    const { container } = render({
      initialValues: {
        invoiceId: 'abc1234',
        transferId: 'dba1234',
        comment: ''
      }
    })

    expect(container).toHaveTextContent('You are about to revert a payment')
  })
})
