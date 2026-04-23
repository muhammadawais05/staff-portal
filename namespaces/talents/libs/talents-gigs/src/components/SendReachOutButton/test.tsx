import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import {
  OperationCallableTypes,
  Operation as OperationType
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { windowOpen } from '@staff-portal/navigation'
import { trackEvent } from '@staff-portal/monitoring-service'
import { useModal } from '@staff-portal/modals-service'

import SendReachOutButton from '.'
import { PublicationGigType } from '../../types'
import { useOpenSlackConversation } from '../../data/open-slack-conversation'
import { mockedTalent, mockedShortRequest } from '../../data/mocks'

jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  windowOpen: jest.fn()
}))

jest.mock('@staff-portal/monitoring-service', () => ({
  trackEvent: jest.fn()
}))

jest.mock('../../data/open-slack-conversation', () => ({
  useOpenSlackConversation: jest.fn()
}))

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))

jest.mock(
  '@toptal/picasso/Tooltip',
  () =>
    ({
      content,
      children
    }: {
      content: React.ReactNode
      children: React.ReactNode
    }) =>
      (
        <>
          <div data-testid='tooltip-content'>{content}</div>
          {children}
        </>
      )
)

type Props = {
  onSuccess?: () => void
  request?: PublicationGigType | null
  operation?: OperationType | undefined
}

const mockedCreateGigReachOutOperation = {
  callable: OperationCallableTypes.ENABLED,
  messages: []
}

const useModalMock = useModal as jest.Mock
const noop = () => {}

const arrangeTest = ({
  onSuccess = () => {},
  request = mockedShortRequest,
  operation = mockedCreateGigReachOutOperation
}: Props = {}) => {
  render(
    <TestWrapper>
      <SendReachOutButton
        candidateId={mockedTalent.id}
        gigId={request?.id || ''}
        requestTitle={request?.title || ''}
        talentName={mockedTalent.fullName}
        onSuccess={onSuccess}
        operation={operation}
      />
    </TestWrapper>
  )
}

const mockedUseOpenSlackConversation = useOpenSlackConversation as jest.Mock
const mockWindowOpen = windowOpen as jest.Mock

describe('SendReachOutButton', () => {
  const openSlackConversation = jest.fn()
  const onSuccessCallback = jest.fn()

  beforeEach(() => {
    onSuccessCallback.mockClear()
    mockedUseOpenSlackConversation.mockReturnValue([
      openSlackConversation,
      { loading: false }
    ])
    useModalMock.mockReturnValue({ showModal: noop })
  })

  describe('Sending Reach Out', () => {
    it('enabled when operation is enabled', async () => {
      arrangeTest({
        onSuccess: onSuccessCallback,
        operation: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }
      })

      expect(screen.queryByText('Send Request')).toBeInTheDocument()
      expect(screen.getByTestId('reach-out-send-button')).toBeEnabled()
      expect(screen.queryByTestId('tooltip-content')).not.toBeInTheDocument()
    })

    it('disabled when operation is hidden', async () => {
      arrangeTest({
        onSuccess: onSuccessCallback,
        operation: {
          callable: OperationCallableTypes.HIDDEN,
          messages: []
        }
      })

      expect(screen.queryByText('Unable to Send Request')).toBeInTheDocument()
      expect(screen.getByTestId('reach-out-send-button')).toBeDisabled()
      expect(screen.getByTestId('tooltip-content')).toBeInTheDocument()
      expect(screen.getByTestId('tooltip-content')).toHaveTextContent(
        'This request cannot be sent, please check if this talent is present on Community Slack.'
      )
    })

    it('disabled when operation is disabled', async () => {
      arrangeTest({
        onSuccess: onSuccessCallback,
        operation: {
          callable: OperationCallableTypes.DISABLED,
          messages: []
        }
      })

      expect(screen.queryByText('Request was Sent')).toBeInTheDocument()
      expect(screen.getByTestId('reach-out-send-button')).toBeDisabled()
      expect(screen.getByTestId('tooltip-content')).toBeInTheDocument()
      expect(screen.getByTestId('tooltip-content')).toHaveTextContent(
        'This talent has already received a request, feel free to connect with him directly.'
      )
    })
  })

  describe('Open conversation', () => {
    let onOpenConversationCompleted: jest.Mock = jest.fn()
    let onOpenConversationError: jest.Mock = jest.fn()

    beforeEach(() => {
      mockedUseOpenSlackConversation.mockImplementation(
        ({ onCompleted, onError }) => {
          onOpenConversationCompleted = onCompleted
          onOpenConversationError = onError

          return [openSlackConversation, { loading: false }]
        }
      )

      mockWindowOpen.mockClear()
    })

    it('opens conversation upon button click', async () => {
      arrangeTest()

      fireEvent.click(screen.getByTestId('reach-out-menu-button'))
      fireEvent.click(screen.getByTestId('open-conversation-button'))

      onOpenConversationCompleted({
        openSlackConversation: {
          slackChannel: {
            url: 'https://app.slack.com/client/T03UN9VRX/D03FRN9NAA2'
          }
        }
      })

      expect(trackEvent).toHaveBeenCalledWith(
        'SP_OpeningSlackDMWithCandidate',
        { candidateId: '10', gigId: 'VjEtUHVibGljYXRpb25HaWctMzA' }
      )
      expect(openSlackConversation).toHaveBeenCalledTimes(1)
      expect(windowOpen).toHaveBeenCalledWith(
        'https://app.slack.com/client/T03UN9VRX/D03FRN9NAA2'
      )
    })

    it('displays error when opening conversation has errors', async () => {
      arrangeTest()

      fireEvent.click(screen.getByTestId('reach-out-menu-button'))
      fireEvent.click(screen.getByTestId('open-conversation-button'))

      onOpenConversationCompleted({
        openSlackConversation: {
          errors: ['Failed to create conversation']
        }
      })

      expect(trackEvent).toHaveBeenCalledWith(
        'SP_OpeningSlackDMWithCandidate',
        { candidateId: '10', gigId: 'VjEtUHVibGljYXRpb25HaWctMzA' }
      )

      expect(
        screen.queryByText('Conversation could not be initiated', {
          exact: false
        })
      ).toBeInTheDocument()
      expect(windowOpen).not.toHaveBeenCalled()
    })

    it('displays error when request to open slack conversation fails', async () => {
      arrangeTest()

      fireEvent.click(screen.getByTestId('reach-out-menu-button'))
      fireEvent.click(screen.getByTestId('open-conversation-button'))

      onOpenConversationError()

      expect(trackEvent).toHaveBeenCalledWith(
        'SP_OpeningSlackDMWithCandidate',
        { candidateId: '10', gigId: 'VjEtUHVibGljYXRpb25HaWctMzA' }
      )

      expect(
        screen.queryByText(
          'Conversation could not be initiated, please try again.'
        )
      ).toBeInTheDocument()
      expect(windowOpen).not.toHaveBeenCalled()
    })
  })
})
