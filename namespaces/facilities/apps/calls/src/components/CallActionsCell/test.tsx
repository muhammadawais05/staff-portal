import React, { ComponentProps } from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { useModal } from '@staff-portal/modals-service'
import { TestWrapper } from '@staff-portal/test-utils'

import { useToggleCallDismissed } from './data'
import CallActionsCell from '.'
import openLinkInNewTab from '../../utils/open-link-in-new-tab'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))

jest.mock('./data', () => ({
  __esModule: true,
  useToggleCallDismissed: jest.fn()
}))

jest.mock('../../utils/open-link-in-new-tab', () => ({
  __esModule: true,
  default: jest.fn()
}))

const arrangeTest = (props: ComponentProps<typeof CallActionsCell>) =>
  render(
    <TestWrapper>
      <div data-testid='call-actions-wrapper'>
        <CallActionsCell {...props} />
      </div>
    </TestWrapper>
  )

describe('CallActionsCell', () => {
  describe('rendering', () => {
    it('renders null when no unfilled and no dismissed and no voicemail', () => {
      const mockuseToggleCallDismissed = useToggleCallDismissed as jest.Mock

      mockuseToggleCallDismissed.mockReturnValue([() => {}, { loading: false }])

      const useModalMock = useModal as jest.Mock

      useModalMock.mockReturnValue({ showModal: () => {} })

      arrangeTest({
        callId: 'someCallId',
        isUnfilled: false,
        isDismissed: false,
        voicemailUrl: null
      })

      expect(screen.getByTestId('call-actions-wrapper').firstChild).toBeNull()
    })

    it('renders dropdown', () => {
      const mockuseToggleCallDismissed = useToggleCallDismissed as jest.Mock

      mockuseToggleCallDismissed.mockReturnValue([() => {}, { loading: false }])

      const useModalMock = useModal as jest.Mock

      useModalMock.mockReturnValue({ showModal: () => {} })

      arrangeTest({
        callId: 'someCallId',
        isUnfilled: true,
        isDismissed: true,
        voicemailUrl: null
      })

      expect(screen.getByText('Actions')).toBeInTheDocument()
    })
  })

  describe('when dismiss call', () => {
    it('calls ToggleCallDismissed with callId', async () => {
      const mockuseToggleCallDismissed = useToggleCallDismissed as jest.Mock

      mockuseToggleCallDismissed.mockReturnValue([() => {}, { loading: false }])

      const showModal = jest.fn()
      const useModalMock = useModal as jest.Mock

      useModalMock.mockReturnValue({ showModal })

      arrangeTest({
        callId: 'someCallId',
        isUnfilled: true,
        isDismissed: false,
        voicemailUrl: null
      })

      fireEvent.click(screen.getByTestId('open-call-actions-dropdown'))

      fireEvent.click(screen.getByTestId('call-menu-item'))

      expect(showModal).toHaveBeenCalledTimes(1)
    })
  })

  describe('when undismiss call', () => {
    it('calls ToggleCallDismissed with callId', async () => {
      const mockuseToggleCallDismissed = useToggleCallDismissed as jest.Mock
      const mutationCallMock = jest
        .fn()
        .mockResolvedValue(() => Promise.resolve())

      const useModalMock = useModal as jest.Mock

      useModalMock.mockReturnValue({ showModal: () => {} })

      mockuseToggleCallDismissed.mockReturnValue([
        mutationCallMock,
        { loading: false }
      ])

      arrangeTest({
        callId: 'someCallId',
        isUnfilled: false,
        isDismissed: true,
        voicemailUrl: null
      })

      fireEvent.click(screen.getByTestId('open-call-actions-dropdown'))

      fireEvent.click(screen.getByTestId('call-menu-item'))

      await act(() => Promise.resolve())

      expect(mutationCallMock).toHaveBeenCalledTimes(1)
      expect(mutationCallMock).toHaveBeenCalledWith({
        variables: {
          input: {
            callId: 'someCallId'
          }
        }
      })
    })
  })

  describe('when voicemail', () => {
    beforeEach(() => {
      const mockuseToggleCallDismissed = useToggleCallDismissed as jest.Mock

      mockuseToggleCallDismissed.mockReturnValue([() => {}, { loading: false }])

      const useModalMock = useModal as jest.Mock

      useModalMock.mockReturnValue({ showModal: () => {} })

      arrangeTest({
        callId: 'someCallId',
        isUnfilled: false,
        isDismissed: false,
        voicemailUrl: 'wwww.random.site'
      })
    })

    it('displays dropdown with `Listen Voicemail` option', () => {
      fireEvent.click(screen.getByTestId('open-call-actions-dropdown'))
      expect(screen.getByText('Listen Voicemail')).toBeDefined()
    })

    it('opens new tab when option is clicked', () => {
      const mockOpenLinkInNewTab = openLinkInNewTab as jest.Mock

      fireEvent.click(screen.getByTestId('open-call-actions-dropdown'))
      fireEvent.click(screen.getByTestId('call-menu-item'))

      expect(mockOpenLinkInNewTab).toHaveBeenCalled()
    })
  })
})
