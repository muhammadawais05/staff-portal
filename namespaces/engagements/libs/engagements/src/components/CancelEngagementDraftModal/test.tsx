import React, { ComponentProps } from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import CancelEngagementDraftModal from './CancelEngagementDraftModal'

jest.mock('../ReasonModal')

type Props = ComponentProps<typeof CancelEngagementDraftModal>

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <CancelEngagementDraftModal {...props} />
    </TestWrapper>
  )

describe('CancelEngagementDraftModal', () => {
  it('displays Modal', () => {
    arrangeTest({
      hideModal: jest.fn(),
      engagementId: '123'
    })

    expect(screen.getByTestId('ReasonModal-engagementId')).toHaveTextContent(
      '123'
    )
    expect(screen.getByTestId('ReasonModal-title')).toHaveTextContent(
      'Cancel Draft'
    )
    expect(screen.getByTestId('ReasonModal-description')).toHaveTextContent(
      'Are you sure you want to cancel this draft? Cancelling the draft will also cancel the associated internal interview (if any).'
    )
    expect(screen.getByTestId('ReasonModal-submitLabel')).toHaveTextContent(
      'Cancel Draft'
    )
    expect(screen.getByTestId('ReasonModal-errorMessage')).toHaveTextContent(
      'An error occurred, Interview was not canceled.'
    )
    expect(
      screen.getByTestId('ReasonModal-successNotificationMessage')
    ).toHaveTextContent('Draft was canceled.')
    expect(screen.getByTestId('ReasonModal-mutationName')).toHaveTextContent(
      'cancelEngagementDraftInInterview'
    )
  })
})
