import React from 'react'

import InlineForm from '.'
import renderComponent from '../../utils/tests'

jest.mock('../../_lib/form/handlers', () => ({
  handleOnSubmissionError: jest.fn(),
  handleSubmit: jest.fn(() => jest.fn())
}))
jest.mock('../../_lib/customHooks/useFormSubmission', () => () => ({
  handleOnRootLevelError: jest.fn(),
  handleOnSuccess: jest.fn()
}))

const noop = () => {}

const render = () =>
  renderComponent(
    <InlineForm
      onSubmit={noop}
      label='My form'
      editComponent={<div data-testid='my-form' />}
    />
  )

describe('InlineForm', () => {
  it('default render', () => {
    const { getByTestId } = render()

    expect(getByTestId('edit')).toBeInTheDocument()
  })
})
