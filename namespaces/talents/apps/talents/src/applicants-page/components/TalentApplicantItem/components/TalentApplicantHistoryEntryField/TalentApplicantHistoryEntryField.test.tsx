import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { usePerformedActionsQuery } from '@staff-portal/chronicles'

import TalentApplicantHistoryEntryField from './TalentApplicantHistoryEntryField'

const ENTRY_CONTENT = 'Test content'
const ENTRY_COMMENT = 'Test comment'

jest.mock('@staff-portal/chronicles', () => ({
  HistoryEntryContent: () => <span>{ENTRY_CONTENT}</span>,
  HistoryEntryComment: () => <span>{ENTRY_COMMENT}</span>,
  usePerformedActionsQuery: jest.fn()
}))

jest.mock('@staff-portal/data-layer-service', () => ({
  decodeEntityId: () => jest.fn()
}))

const usePerformedActionsQueryMock = usePerformedActionsQuery as jest.Mock

const arrangeTest = () => {
  render(
    <TestWrapper>
      <TalentApplicantHistoryEntryField talentId='123' />
    </TestWrapper>
  )
}

describe('Talent Applicant Item Details', () => {
  it('hides the comment', async () => {
    usePerformedActionsQueryMock.mockReturnValueOnce({
      data: [
        {
          performedAction: {
            comment: null
          }
        }
      ],
      loading: false
    })

    arrangeTest()

    expect(screen.queryByText('with comment:')).not.toBeInTheDocument()
  })

  it('shows the comment', async () => {
    usePerformedActionsQueryMock.mockReturnValueOnce({
      data: [
        {
          performedAction: {
            comment: ENTRY_COMMENT
          }
        }
      ],
      loading: false
    })

    arrangeTest()

    expect(await screen.findByText(`with comment:`)).toBeInTheDocument()
  })
})
