import React from 'react'
import { fireEvent } from '@toptal/picasso/test-utils'

import InlineSectionForm from '.'
import renderComponent from '../../utils/tests'

jest.mock('../../_lib/form/handlers', () => ({
  handleOnSubmissionError: jest.fn(),
  handleSubmit: jest.fn(() => jest.fn())
}))
jest.mock('../../_lib/customHooks/useFormSubmission', () => () => ({
  handleOnRootLevelError: jest.fn(),
  handleOnSuccess: jest.fn()
}))

const onSubmitMock = jest.fn()
const onCloseMock = jest.fn()

const render = () =>
  renderComponent(
    <InlineSectionForm
      headerTitle='My form'
      onSubmit={onSubmitMock}
      onClose={onCloseMock}
      editComponent={<div data-testid='my-form' />}
    />
  )

describe('InlineForm', () => {
  it('default render', () => {
    const { getByTestId, getByText } = render()

    expect(getByTestId('cancel')).toBeInTheDocument()
    expect(getByTestId('submit')).toBeInTheDocument()
    expect(getByText('My form')).toBeInTheDocument()
  })

  it('should close form', () => {
    const { getByTestId } = render()

    fireEvent.click(getByTestId('cancel'))
    expect(onCloseMock).toHaveBeenCalled()
    expect(onCloseMock).toHaveBeenCalledTimes(1)
  })
})
