import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import WriteOffModalForm from '.'

const render = props => renderComponent(<WriteOffModalForm {...props} />)

describe('WriteOffModalForm', () => {
  it('default render', () => {
    const { container } = render({
      handleOnSubmit: jest.fn(),
      initialValues: {
        comment: '',
        invoiceId: 'abc123'
      },
      documentNumber: '12345'
    })

    expect(container).toMatchSnapshot()
  })
})
