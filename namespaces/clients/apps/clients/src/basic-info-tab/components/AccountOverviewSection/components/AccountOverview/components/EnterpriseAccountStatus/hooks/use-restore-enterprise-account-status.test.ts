import { renderHook } from '@testing-library/react-hooks'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import useRestoreEnterpriseStatus from './use-restore-enterprise-account-status'
import { useSetRestoreClientEnterpriseAccountStatus } from './use-set-restore-enterprise-account-status'

jest.mock('@toptal/picasso/utils', () => ({
  useNotifications: () => ({ showError: () => null })
}))
jest.mock('@staff-portal/mutation-result-handlers', () => ({
  useHandleMutationResult: jest.fn()
}))
jest.mock('./use-set-restore-enterprise-account-status', () => ({
  useSetRestoreClientEnterpriseAccountStatus: jest.fn()
}))

const useHandleMutationResultMock = useHandleMutationResult as jest.Mock
const useSetRestoreClientEnterpriseAccountStatusMock =
  useSetRestoreClientEnterpriseAccountStatus as jest.Mock

describe('useRestoreEnterpriseStatus', () => {
  describe('when handleSubmit executed', () => {
    it('handleMutationResult is called with correct params', async () => {
      const hideModal = () => null
      const loading = {}
      const restoreClientEnterpriseAccountStatus = {}
      const updateClientEnterpriseAccountStatusMock = jest.fn()
      const handleMutationResultMock = jest.fn()

      updateClientEnterpriseAccountStatusMock.mockReturnValueOnce({
        data: {
          restoreClientEnterpriseAccountStatus
        }
      })
      useHandleMutationResultMock.mockReturnValue({
        handleMutationResult: handleMutationResultMock
      })
      useSetRestoreClientEnterpriseAccountStatusMock.mockReturnValueOnce([
        updateClientEnterpriseAccountStatusMock,
        { loading }
      ])

      const {
        result: { current }
      } = renderHook(() => useRestoreEnterpriseStatus(hideModal))

      const clientId = 'clientId'
      const comment = 'comment'

      await current.handleSubmit({
        clientId,
        comment
      })

      expect(updateClientEnterpriseAccountStatusMock).toHaveBeenCalledTimes(1)
      expect(updateClientEnterpriseAccountStatusMock).toHaveBeenCalledWith({
        variables: {
          input: {
            clientId,
            comment
          }
        }
      })
      expect(handleMutationResultMock).toHaveBeenCalledTimes(1)
      expect(handleMutationResultMock).toHaveBeenCalledWith({
        mutationResult: restoreClientEnterpriseAccountStatus,
        onSuccessAction: hideModal,
        successNotificationMessage:
          'The Enterprise Account status was successfully restored.'
      })
    })
  })
})
