import React, { ComponentProps } from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { Form } from '@toptal/picasso-forms'
import { TestWrapper } from '@staff-portal/test-utils'

import RejectApprovedEngagementTrialModal from './index'
jest.mock('../../../ReasonModal')

type Props = ComponentProps<typeof RejectApprovedEngagementTrialModal>

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <Form onSubmit={jest.fn()}>
        <RejectApprovedEngagementTrialModal {...props} />
      </Form>
    </TestWrapper>
  )

describe('RejectApprovedEngagementTrialModal', () => {
  it('displays modal', () => {
    arrangeTest({
      hideModal: jest.fn(),
      engagementId: '123',
      talentType: 'Developer'
    })

    expect(screen.getByTestId('ReasonModal-engagementId')).toHaveTextContent(
      '123'
    )
    expect(screen.getByTestId('ReasonModal-title')).toHaveTextContent(
      'Reject Developer'
    )
    expect(screen.getByTestId('ReasonModal-description')).toHaveTextContent(
      'Are you sure you want to reject this developer? If you do this, a Toptal recruiter will be notified and immediately start the screening process for a new developer for this position.Why you are rejecting this developer?'
    )
    expect(screen.getByTestId('ReasonModal-submitLabel')).toHaveTextContent(
      'Reject Developer'
    )
    expect(screen.getByTestId('ReasonModal-errorMessage')).toHaveTextContent(
      'An error occured, Developer was not rejected.'
    )
    expect(
      screen.getByTestId('ReasonModal-successNotificationMessage')
    ).toHaveTextContent('Developer has been rejected.')
    expect(screen.getByTestId('ReasonModal-mutationName')).toHaveTextContent(
      'rejectApprovedEngagementTrial'
    )
    expect(screen.getByTestId('extra-message-id')).toHaveTextContent(
      'The talent will be paid 50% of the amount due, and the client will be invoiced 0%.'
    )
  })
})
