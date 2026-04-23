import React, { ComponentProps } from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import CancelInterviewModal from './CancelInterviewModal'

jest.mock('../ReasonModal')

type Props = ComponentProps<typeof CancelInterviewModal>

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <CancelInterviewModal {...props} />
    </TestWrapper>
  )

describe('CancelInterviewModal', () => {
  it('displays Modal', () => {
    arrangeTest({
      hideModal: jest.fn(),
      engagementId: '123'
    })

    expect(screen.getByTestId('ReasonModal-engagementId')).toHaveTextContent(
      '123'
    )
    expect(screen.getByTestId('ReasonModal-title')).toHaveTextContent(
      'Cancel Interview'
    )
    expect(screen.getByTestId('ReasonModal-description')).toHaveTextContent(
      'Are you sure you want to cancel this interview?'
    )
    expect(screen.getByTestId('ReasonModal-submitLabel')).toHaveTextContent(
      'Cancel Interview'
    )
    expect(screen.getByTestId('ReasonModal-errorMessage')).toHaveTextContent(
      'An error occurred, Interview was not canceled.'
    )
    expect(
      screen.getByTestId('ReasonModal-successNotificationMessage')
    ).toHaveTextContent('Interview was canceled.')
    expect(screen.getByTestId('ReasonModal-mutationName')).toHaveTextContent(
      'cancelEngagementInInterview'
    )
  })
})
