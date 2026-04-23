import React, { ComponentProps } from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import RejectEngagementCandidateModal from './index'

jest.mock('../ReasonModal')

type Props = ComponentProps<typeof RejectEngagementCandidateModal>

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <RejectEngagementCandidateModal {...props} />
    </TestWrapper>
  )

describe('RejectEngagementCandidateModal', () => {
  it('displays Modal', () => {
    arrangeTest({
      hideModal: jest.fn(),
      engagementId: '123'
    })

    expect(screen.getByTestId('ReasonModal-engagementId')).toHaveTextContent(
      '123'
    )
    expect(screen.getByTestId('ReasonModal-title')).toHaveTextContent(
      'Reject Candidate'
    )
    expect(screen.getByTestId('ReasonModal-description')).toHaveTextContent(
      'Are you sure you want to reject this candidate? If you do this, a Toptal recruiter will be notified and immediately start the screening process for a new candidate for this position.Why you are rejecting this candidate?'
    )
    expect(screen.getByTestId('ReasonModal-submitLabel')).toHaveTextContent(
      'Reject Candidate'
    )
    expect(screen.getByTestId('ReasonModal-errorMessage')).toHaveTextContent(
      'An error occured, Candidate was not rejected.'
    )
    expect(
      screen.getByTestId('ReasonModal-successNotificationMessage')
    ).toHaveTextContent('Candidate has been rejected.')
    expect(screen.getByTestId('ReasonModal-mutationName')).toHaveTextContent(
      'rejectEngagementOnInterview'
    )
  })
})
