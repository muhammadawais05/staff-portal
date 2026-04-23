import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'

import NoteEditModal from '.'

const mockedHandleOnSuccess = jest.fn(() => 'mockedHandleOnSuccess')

jest.mock('../NoteEditModalForm')
jest.mock('@staff-portal/billing/src/_lib/form/handlers')
jest.mock('../../utils/adjustValues', () => 'exampleAdjustValues')
jest.mock(
  '@staff-portal/billing/src/_lib/customHooks/useFormSubmission',
  () => () => ({
    handleOnSuccess: mockedHandleOnSuccess,
    handleOnRootLevelError: 'mockedHandleOnRootLevelError'
  })
)
jest.mock('../../data/mutationNoteCreate.graphql.types', () => ({
  useCreateNoteMutation: () => [jest.fn()]
}))

const render = () =>
  renderComponent(
    <NoteEditModal options={{ notableId: '12345', notableType: 'invoice' }} />
  )

describe('NoteCreateModalWrapper', () => {
  it('renders Form properly', () => {
    ;(handleOnSubmissionError as jest.Mock).mockReturnValue(
      'exampleHandleOnSubmissionError'
    )

    const { getByTestId } = render()

    expect(getByTestId('NoteEditModalForm-isEdit')).not.toContainHTML('true')
    expect(getByTestId('NoteEditModalForm-initialValues')).toContainHTML(
      '{"comment":"","title":"","attachment":[]}'
    )

    expect(handleOnSubmissionError).toHaveBeenCalledWith('createNote')
    expect(handleSubmit).toHaveBeenCalledWith({
      variables: { notableId: 'VjEtSW52b2ljZS0xMjM0NQ' },
      handleError: 'exampleHandleOnSubmissionError',
      adjustValues: 'exampleAdjustValues',
      responseKey: 'createNote',
      handleSuccess: 'mockedHandleOnSuccess',
      submit: expect.any(Function)
    })
  })
})
