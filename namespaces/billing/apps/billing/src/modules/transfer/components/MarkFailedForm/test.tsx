import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import MarkFailedForm from '.'
jest.mock('@staff-portal/billing/src/components/ModalFooter')

const render = props =>
  renderComponent(<MarkFailedForm handleOnSubmit={jest.fn()} {...props} />)

describe('MarkFailedForm', () => {
  it('default render', () => {
    const { container } = render({
      initialValues: {
        comment: '',
        invoiceId: 'abc123',
        transferId: 'dbc123'
      }
    })

    expect(container).toMatchSnapshot()
  })
})
