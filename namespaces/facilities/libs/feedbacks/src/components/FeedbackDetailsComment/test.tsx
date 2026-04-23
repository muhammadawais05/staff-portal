import { fireEvent, render, screen, waitFor } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import FeedbackDetailsComment, { Props } from './FeedbackDetailsComment'

const mockMutation = jest.fn()

jest.unmock('@staff-portal/editable')

jest.mock('./data', () => ({
  getLazyFeedbackCommentHook: () => () => ({
    request: () => {},
    data: [{ id: '1', name: 'Option 1' }],
    loading: false
  }),
  useUpdateFeedbackComment: () => [mockMutation, { loading: false }]
}))

const arrangeTest = ({
  disabled = false,
  comment = 'Some Comment'
}: Partial<Props> = {}) =>
  render(
    <TestWrapper>
      <FeedbackDetailsComment
        feedbackId='1'
        disabled={disabled}
        comment={comment}
      />
    </TestWrapper>
  )

describe('FeedbackDetailsComment', () => {
  it('change the comment value', async () => {
    mockMutation.mockReturnValue({ data: {} })

    arrangeTest()

    expect(screen.getByTestId('EditableField-comment')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('EditableField-toggle-button-comment'))

    fireEvent.change(await screen.findByText('Some Comment'), {
      target: { value: 'New Comment' }
    })

    fireEvent.click(screen.getByTestId('EditableField-comment-editor-submit'))

    await waitFor(() =>
      expect(mockMutation).toHaveBeenCalledWith({
        variables: { input: { feedbackId: '1', comment: 'New Comment' } }
      })
    )
  })
})
