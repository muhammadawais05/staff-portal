import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import UnconsolidateModalForm from '.'

const render = props => renderComponent(<UnconsolidateModalForm {...props} />)

describe('UnconsolidateModalForm', () => {
  it('defaults render', () => {
    const { getByTestId } = render({
      handleOnSubmit: jest.fn(),
      initialValues: {
        comment: '',
        invoiceId: 'abc123'
      },
      documentNumber: '12345'
    })

    expect(getByTestId('UnconsolidateModalForm-title')).toContainHTML(
      'Revert Consolidation'
    )
    expect(getByTestId('comment')).toContainHTML('Comment')
    expect(getByTestId('submit')).toContainHTML('Unconsolidate')
    expect(getByTestId('cancel')).toContainHTML('Close')
  })
})
