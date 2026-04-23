import { act, renderHook } from '@testing-library/react-hooks'
import { useNotifications } from '@toptal/picasso/utils'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useClaimCompany } from './use-claim-company'
import { useClaimCompanyNextAction } from '../use-claim-company-next-action/use-claim-company-next-action'
import { useCreateClientClaimer } from '../../data'

jest.mock('@toptal/picasso/utils', () => ({
  useNotifications: jest.fn()
}))
jest.mock('@staff-portal/mutation-result-handlers', () => ({
  useHandleMutationResult: jest.fn()
}))
jest.mock('../../data', () => ({
  useCreateClientClaimer: jest.fn()
}))
jest.mock(
  '../use-claim-company-next-action/use-claim-company-next-action',
  () => ({
    useClaimCompanyNextAction: jest.fn()
  })
)

const mockedUseNotifications = useNotifications as jest.Mock
const mockedUseHandleMutationResult = useHandleMutationResult as jest.Mock
const mockedUseCreateClientClaimer = useCreateClientClaimer as jest.Mock
const mockedUseClaimCompanyNextAction = useClaimCompanyNextAction as jest.Mock

describe('useClaimCompany', () => {
  describe('when handleMutationResult does not return an error', () => {
    it('should not hideModal', async () => {
      const hideModal = jest.fn()
      const createClientClaimer = jest.fn()
      const data = {
        createClientClaimer: {}
      }
      const handleMutationResultMock = jest.fn().mockReturnValueOnce(null)

      mockedUseCreateClientClaimer.mockReturnValueOnce([createClientClaimer])
      createClientClaimer.mockReturnValueOnce({ data })
      mockedUseHandleMutationResult.mockReturnValueOnce({
        handleMutationResult: handleMutationResultMock
      })
      mockedUseNotifications.mockReturnValueOnce({
        showError: () => null
      })
      mockedUseClaimCompanyNextAction.mockReturnValueOnce(null)

      const {
        result: { current }
      } = renderHook(() => useClaimCompany(hideModal))

      const company = {
        id: 'id',
        fullName: 'fullName'
      }

      await act(async () => current.handleSubmit(company))

      expect(createClientClaimer).toHaveBeenCalledTimes(1)
      expect(createClientClaimer).toHaveBeenCalledWith({
        variables: {
          clientId: company.id
        }
      })
      expect(handleMutationResultMock).toHaveBeenCalledTimes(1)
      expect(handleMutationResultMock).toHaveBeenCalledWith({
        mutationResult: data.createClientClaimer,
        onSuccessAction: expect.any(Function),
        returnAllErrors: true
      })
      expect(hideModal).toHaveBeenCalledTimes(0)
    })
  })

  describe('when handleMutationResult returns an error', () => {
    it('should hideModal', async () => {
      const hideModal = jest.fn()
      const createClientClaimer = jest.fn()
      const data = {
        createClientClaimer: {}
      }
      const handleMutationResultMock = jest.fn().mockReturnValueOnce({})

      mockedUseCreateClientClaimer.mockReturnValueOnce([createClientClaimer])
      createClientClaimer.mockReturnValueOnce({ data })
      mockedUseHandleMutationResult.mockReturnValueOnce({
        handleMutationResult: handleMutationResultMock
      })
      mockedUseNotifications.mockReturnValueOnce({
        showError: () => null
      })
      mockedUseClaimCompanyNextAction.mockReturnValueOnce(null)

      const {
        result: { current }
      } = renderHook(() => useClaimCompany(hideModal))

      const company = {
        id: 'id',
        fullName: 'fullName'
      }

      await act(async () => current.handleSubmit(company))

      expect(createClientClaimer).toHaveBeenCalledTimes(1)
      expect(createClientClaimer).toHaveBeenCalledWith({
        variables: {
          clientId: company.id
        }
      })
      expect(handleMutationResultMock).toHaveBeenCalledTimes(1)
      expect(handleMutationResultMock).toHaveBeenCalledWith({
        mutationResult: data.createClientClaimer,
        onSuccessAction: expect.any(Function),
        returnAllErrors: true
      })
      expect(hideModal).toHaveBeenCalledTimes(1)
    })
  })
})
