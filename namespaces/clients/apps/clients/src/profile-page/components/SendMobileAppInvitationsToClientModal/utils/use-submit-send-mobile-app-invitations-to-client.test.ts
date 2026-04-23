import { renderHook } from '@testing-library/react-hooks'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import useSubmitSendMobileAppInvitationsToClient from './use-submit-send-mobile-app-invitations-to-client'
import { useSendMobileAppInvitationsToClient } from '../data'

jest.mock('@staff-portal/mutation-result-handlers', () => ({
  useHandleMutationResult: jest.fn()
}))
jest.mock('../data', () => ({
  useSendMobileAppInvitationsToClient: jest.fn()
}))

const useHandleMutationResultMock = useHandleMutationResult as jest.Mock
const useSendMobileAppInvitationsToClientMock =
  useSendMobileAppInvitationsToClient as jest.Mock

describe('useSubmitSendMobileAppInvitationsToClient', () => {
  describe('when handleSubmit executed', () => {
    it('handleMutationResult is called with correct params', async () => {
      const hideModal = () => null
      const loading = false
      const sendMobileAppInvitationsToClient = {}
      const sendMobileAppInvitationsToClientMock = jest.fn()
      const handleMutationResultMock = jest.fn()

      sendMobileAppInvitationsToClientMock.mockReturnValueOnce({
        data: {
          sendMobileAppInvitationsToClient
        }
      })
      useHandleMutationResultMock.mockReturnValue({
        handleMutationResult: handleMutationResultMock
      })
      useSendMobileAppInvitationsToClientMock.mockReturnValueOnce([
        sendMobileAppInvitationsToClientMock,
        { loading }
      ])
      const clientId = 'clientId'

      const {
        result: { current }
      } = renderHook(() => useSubmitSendMobileAppInvitationsToClient({
        hideModal,
        clientId
      }))

      await current.handleSubmit()

      expect(sendMobileAppInvitationsToClientMock).toHaveBeenCalledTimes(1)
      expect(sendMobileAppInvitationsToClientMock).toHaveBeenCalledWith({
        variables: {
          input: {
            clientId
          }
        }
      })
      expect(handleMutationResultMock).toHaveBeenCalledTimes(1)
      expect(handleMutationResultMock).toHaveBeenCalledWith({
        mutationResult: sendMobileAppInvitationsToClient,
        onSuccessAction: hideModal,
        successNotificationMessage:
          'Invitations for this client has been sent'
      })
    })
  })
})
