import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import ClaimRefundForm from '.'

jest.mock('@staff-portal/billing/src/components/ModalFooter')

const render = props =>
  renderComponent(<ClaimRefundForm handleOnSubmit={jest.fn()} {...props} />)

describe('ClaimRefundForm', () => {
  it('default render', () => {
    const { container } = render({
      initialValues: {
        comment: '',
        invoiceId: 'abc123',
        refundAmount: '',
        transferId: 'bcd123'
      }
    })

    expect(container).toMatchSnapshot()
  })
})
