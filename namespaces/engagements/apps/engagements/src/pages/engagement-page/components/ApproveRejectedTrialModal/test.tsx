import React from 'react'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@toptal/picasso/test-utils'
import { when } from 'jest-when'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useMutation } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { ENGAGEMENT_UPDATED } from '@staff-portal/engagements'

import ApproveRejectedTrialModal from '.'
import { ApproveRejectedEngagementTrialDocument } from './data/approve-rejected-trial-engagement/approve-rejected-trial-engagement.staff.gql.types'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  PromptModal: ({ operationVariables, ...rest }: Record<string, unknown>) => {
    const ActualPromptModal = jest.requireActual(
      '@staff-portal/modals-service'
    ).PromptModal

    return <ActualPromptModal {...rest} />
  }
}))

jest.mock('@toptal/staff-portal-message-bus', () => ({
  ...jest.requireActual('@toptal/staff-portal-message-bus'),
  __esModule: true,
  useMessageEmitter: jest.fn()
}))

jest.mock('@staff-portal/data-layer-service')
const mockUseMutation = useMutation as jest.Mock

const mockSuccessImplementation = () => {
  when(mockUseMutation)
    .calledWith(ApproveRejectedEngagementTrialDocument, expect.anything())
    .mockImplementation(() => [
      () => ({
        data: {
          approveRejectedEngagementTrial: {
            success: true,
            errors: []
          }
        }
      }),
      {
        loading: false
      }
    ])
}

const arrangeTest = () => {
  const defaultProps = {
    engagementId: '123',
    talentType: 'Developer',
    hideModal: jest.fn()
  }

  return render(
    <TestWrapper>
      <ApproveRejectedTrialModal {...defaultProps} />
    </TestWrapper>
  )
}

describe('ApproveRejectedTrialModal', () => {
  it('approves rejected trial', async () => {
    const emitMessage = jest.fn()
    const mockUseMessageEmitter = useMessageEmitter as jest.Mock

    mockUseMessageEmitter.mockReturnValue(emitMessage)

    mockSuccessImplementation()
    arrangeTest()

    expect(
      screen.queryByText('Retroactively Approve Trial')
    ).toBeInTheDocument()

    expect(
      screen.queryByText(
        'Are you sure you want to approve the trial retroactively and hire developer?'
      )
    ).toBeInTheDocument()

    expect(
      screen.queryByText(
        `This action will generate invoices for all billing cycles between the trial's end date and today. These invoices may be sent automatically to the client.`
      )
    ).toBeInTheDocument()

    expect(
      screen.queryByText(
        `The talent will be paid 100% of the amount due, and the client will be invoiced 100%.`
      )
    ).toBeInTheDocument()

    userEvent.click(screen.getByText('Hire Developer'))

    expect(
      await screen.findByText('Developer was successfully hired.')
    ).toBeInTheDocument()

    expect(emitMessage).toHaveBeenCalledWith(ENGAGEMENT_UPDATED, {
      engagementId: '123'
    })
  })
})
