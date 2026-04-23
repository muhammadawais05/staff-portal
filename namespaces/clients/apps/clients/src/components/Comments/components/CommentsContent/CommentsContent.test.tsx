import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { ClientCumulativeStatus } from '@staff-portal/graphql/staff'
import type { ApolloError } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { HistoryList, Entry } from '@staff-portal/chronicles'

import CommentsContent from '.'
import CommentsSection from '../CommentsSection'
import {
  appendWithCommentLiteral,
  getIsCommentsSectionCollapsedByDefault
} from '../../utils'

jest.mock('../../utils', () => ({
  appendWithCommentLiteral: jest.fn(),
  getIsCommentsSectionCollapsedByDefault: jest.fn()
}))
jest.mock('@staff-portal/chronicles', () => ({
  ...jest.requireActual('@staff-portal/chronicles'),
  HistoryList: jest.fn()
}))
jest.mock('../CommentsSection')
jest.mock('../../utils')
jest.mock('@toptal/picasso/Loader', () => () => 'loader')

const HistoryListMock = HistoryList as unknown as jest.Mock
const CommentsSectionMock = CommentsSection as jest.Mock
const appendWithCommentLiteralMock = appendWithCommentLiteral as jest.Mock

const arrangeTest = (props: ComponentProps<typeof CommentsContent>) =>
  render(
    <TestWrapper>
      <CommentsContent {...props} />
    </TestWrapper>
  )

describe('CommentsContent', () => {
  beforeEach(() => {
    HistoryListMock.mockReturnValue(null)
    CommentsSectionMock.mockImplementation(({ children }) => children)
  })

  it('checks if section is collapsed by default', () => {
    arrangeTest({
      comments: [],
      cumulativeStatus: 'status' as ClientCumulativeStatus
    })

    expect(getIsCommentsSectionCollapsedByDefault).toHaveBeenCalledTimes(1)
    expect(getIsCommentsSectionCollapsedByDefault).toHaveBeenCalledWith(
      'status'
    )
  })

  describe('when error', () => {
    it('renders error', () => {
      arrangeTest({
        comments: [],
        error: { message: 'error-message' } as ApolloError,
        cumulativeStatus: 'status' as ClientCumulativeStatus
      })

      expect(screen.getByText('error-message')).toBeInTheDocument()
    })
  })

  it('renders comments', () => {
    const comments = ['comment'] as unknown as Entry[]
    const appendedComments = {}

    appendWithCommentLiteralMock.mockReturnValueOnce(appendedComments)

    arrangeTest({
      comments,
      cumulativeStatus: ClientCumulativeStatus.ACTIVE
    })

    expect(appendWithCommentLiteralMock).toHaveBeenCalledTimes(1)
    expect(appendWithCommentLiteralMock).toHaveBeenCalledWith(comments)

    expect(HistoryList).toHaveBeenCalledTimes(1)
    expect(HistoryList).toHaveBeenCalledWith(
      {
        entries: appendedComments,
        defaultExpanded: true
      },
      expect.anything()
    )
  })
})
