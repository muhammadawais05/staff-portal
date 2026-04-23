import React, { ComponentProps } from 'react'
import { fireEvent } from '@toptal/picasso/test-utils'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import UnappliedCashRecordModalForm from './'

const render = (props: ComponentProps<typeof UnappliedCashRecordModalForm>) =>
  renderComponent(<UnappliedCashRecordModalForm {...props} />)

describe('UnappliedCashRecordModalForm', () => {
  it('default render', () => {
    const title = 'Create Consolidation Default'
    const submitButtonText = 'Create'

    const { getByTestId } = render({
      handleOnSubmit: jest.fn(),
      submitButtonText: submitButtonText,
      initialValues: {
        clientId: 'VjEtQ2xpZW50LTQ5MjgwNQ'
      },
      title: title
    })

    expect(getByTestId('UnappliedCashRecordModalForm-title')).toHaveTextContent(
      title
    )

    expect(
      getByTestId('UnappliedCashRecordModalForm-effectiveDate')
    ).toBeInTheDocument()

    expect(
      getByTestId('UnappliedCashRecordModalForm-amount')
    ).toBeInTheDocument()

    expect(
      getByTestId('UnappliedCashRecordModalForm-comment')
    ).toBeInTheDocument()

    expect(
      getByTestId('UnappliedCashRecordModalForm-submit')
    ).toHaveTextContent(submitButtonText)
  })

  it('Renders custom cancel button', () => {
    const mockCancel = jest.fn()
    const { getByTestId } = render({
      handleOnSubmit: jest.fn(),
      handleOnClose: mockCancel,
      submitButtonText: 'Submit',
      title: 'title',
      initialValues: {
        clientId: 'VjEtQ2xpZW50LTQ5MjgwNQ'
      }
    })

    fireEvent.click(getByTestId('cancel'))
    expect(mockCancel).toHaveBeenCalled()
  })
})
