import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import CancelForm from '.'

jest.mock('@staff-portal/billing/src/components/ModalFooter')

const render = props =>
  renderComponent(<CancelForm handleOnSubmit={jest.fn()} {...props} />)

describe('CancelForm', () => {
  it('default render', () => {
    const { container } = render({
      initialValues: {
        invoiceId: 'abc1234',
        transferId: 'dba1234',
        comment: ''
      }
    })

    expect(container).toMatchSnapshot()
  })
})
