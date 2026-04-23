import { renderHook } from '@testing-library/react-hooks'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import useSubmitInviteContact from './use-submit-invite-contact'
import { useInviteContact } from '../data'
import useNavigateToCompanyRepresentative from './use-navigate-to-company-representative'

jest.mock('@staff-portal/mutation-result-handlers', () => ({
  useHandleMutationResult: jest.fn()
}))
jest.mock('../data', () => ({
  useInviteContact: jest.fn()
}))
jest.mock('./use-navigate-to-company-representative', () => ({
  __esModule: true,
  default: jest.fn()
}))

const mockedUseHandleMutationResult = useHandleMutationResult as jest.Mock
const mockedUseInviteContact = useInviteContact as jest.Mock
const mockedUseNavigateToCompanyRepresentative = useNavigateToCompanyRepresentative as jest.Mock

describe('useSubmitInviteContact', () => {
  describe('when handleSubmit executed', () => {
    it('handleMutationResult is called with correct params', async () => {
      const loading = {}
      const id = {}
      const inviteCompanyRepresentative = { companyRepresentative: id }
      const inviteContactMock = jest.fn()
      const handleMutationResultMock = jest.fn()
      const navigateToCompanyRepresentativeMock = jest.fn()

      inviteContactMock.mockReturnValueOnce({
        data: {
          inviteCompanyRepresentative
        }
      })
      mockedUseHandleMutationResult.mockReturnValue({
        handleMutationResult: handleMutationResultMock
      })
      mockedUseInviteContact.mockReturnValueOnce([
        inviteContactMock,
        { loading }
      ])
      mockedUseNavigateToCompanyRepresentative.mockReturnValueOnce({
        navigateToCompanyRepresentative: navigateToCompanyRepresentativeMock
      })

      const inputProps = {
        clientId: 'clientId',
        email: 'email',
        fullName: 'fullName'
      }

      const {
        result: { current }
      } = renderHook(() => useSubmitInviteContact())

      await current.handleSubmit(inputProps)

      expect(current.loading).toEqual(loading)
      expect(inviteContactMock).toHaveBeenCalledTimes(1)
      expect(inviteContactMock).toHaveBeenCalledWith({
        variables: {
          input: {
            ...inputProps
          }
        }
      })
      expect(handleMutationResultMock).toHaveBeenCalledTimes(1)
      expect(handleMutationResultMock).toHaveBeenCalledWith({
        mutationResult: inviteCompanyRepresentative,
        onSuccessAction: navigateToCompanyRepresentativeMock,
        successNotificationMessage: 'The Invitation was successfully sent.'
      })
    })
  })
})
