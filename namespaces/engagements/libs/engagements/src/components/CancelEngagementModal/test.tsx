import React, { ComponentProps } from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import CancelEngagementModal from './CancelEngagementModal'

jest.mock('../ReasonModal')

type Props = ComponentProps<typeof CancelEngagementModal>

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <CancelEngagementModal {...props} />
    </TestWrapper>
  )

describe('CancelEngagementModal', () => {
  it('displays Modal', () => {
    arrangeTest({
      hideModal: jest.fn(),
      engagementId: '123'
    })

    expect(screen.getByTestId('ReasonModal-engagementId')).toHaveTextContent(
      '123'
    )
    expect(screen.getByTestId('ReasonModal-title')).toHaveTextContent(
      'Cancel Engagement'
    )
    expect(screen.getByTestId('ReasonModal-description')).toHaveTextContent(
      'Are you sure you want to cancel this engagement? Talent, client and job claimer will be notified with the reason you give.The talent will be paid 0% of the amount due, and the client will be invoiced 0%.'
    )
    expect(screen.getByTestId('ReasonModal-submitLabel')).toHaveTextContent(
      'Cancel Engagement'
    )
    expect(screen.getByTestId('ReasonModal-errorMessage')).toHaveTextContent(
      'An error occurred, engagement was not canceled.'
    )
    expect(
      screen.getByTestId('ReasonModal-successNotificationMessage')
    ).toHaveTextContent('Engagement has been cancelled.')
    expect(screen.getByTestId('ReasonModal-mutationName')).toHaveTextContent(
      'cancelEngagementTrial'
    )
  })
})
