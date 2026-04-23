import React from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'

import NoteEditModalWrapper from '.'
import { useGetNote } from '../../data'

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
jest.mock('@staff-portal/billing/src/components/ContentLoader')
jest.mock('../../data')
jest.mock('../../data/mutationNoteUpdate.graphql.types', () => ({
  useUpdateNoteMutation: () => [jest.fn()]
}))

const render = () =>
  renderComponent(<NoteEditModalWrapper options={{ nodeId: '12345' }} />)

const mockGetNote = useGetNote as jest.Mock
const mockHandleOnSubmissionError = handleOnSubmissionError as jest.Mock

describe('NoteEditModalWrapper', () => {
  it('renders Form properly', () => {
    mockGetNote.mockReturnValue({
      data: fixtures.MockNotes.notes.nodes[0],
      loading: false
    })
    mockHandleOnSubmissionError.mockReturnValue(
      'exampleHandleOnSubmissionError'
    )

    const { queryByTestId, getByTestId } = render()

    expect(getByTestId('NoteEditModalForm-isEdit')).toContainHTML('true')
    expect(getByTestId('NoteEditModalForm-initialValues')).toContainHTML(
      '{"attachment":[{"__typename":"NoteAttachment","identifier":"example text document","url":"example.com/index.tsx","webResource":{"text":"example text document","url":"example.com/index.tsx","__typename":"Link"},"file":{"name":"example.com/index.tsx"}}],"comment":"fghfgdhgf","title":"fdghfgdfgh"}'
    )

    expect(handleOnSubmissionError).toHaveBeenCalledWith('updateNote')
    expect(handleSubmit).toHaveBeenCalledWith({
      variables: { noteId: 'VjEtTm90ZS0xMjM0NQ' },
      handleError: 'exampleHandleOnSubmissionError',
      adjustValues: 'exampleAdjustValues',
      responseKey: 'updateNote',
      handleSuccess: 'mockedHandleOnSuccess',
      submit: expect.any(Function)
    })

    expect(queryByTestId('ContentLoader')).toBeInTheDocument()
    expect(queryByTestId('NoteEditModalForm')).toBeInTheDocument()
  })
})
