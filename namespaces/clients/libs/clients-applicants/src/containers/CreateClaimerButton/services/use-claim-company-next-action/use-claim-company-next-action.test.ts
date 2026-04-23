import { renderHook } from '@testing-library/react-hooks'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useNavigate } from '@staff-portal/navigation'

import { useClaimCompanyNextAction } from './use-claim-company-next-action'
import { getNextAction } from '../get-next-action/get-next-action'

const CLIENT_UPDATED_MOCK = 'CLIENT_UPDATED'

jest.mock('@toptal/picasso/utils', () => ({
  useNotifications: jest.fn()
}))
jest.mock('@toptal/staff-portal-message-bus', () => ({
  useMessageEmitter: jest.fn()
}))
jest.mock('@staff-portal/navigation', () => ({
  useNavigate: jest.fn()
}))
jest.mock('../get-next-action/get-next-action', () => ({
  getNextAction: jest.fn()
}))
jest.mock('@staff-portal/clients', () => ({
  CLIENT_UPDATED: CLIENT_UPDATED_MOCK
}))

const mockedUseNotifications = useNotifications as jest.Mock
const mockedUseMessageEmitter = useMessageEmitter as jest.Mock
const mockedUseNavigate = useNavigate as jest.Mock
const mockedGetNextAction = getNextAction as jest.Mock

describe('useClaimCompanyNextAction', () => {
  const emitMessage = jest.fn()
  const showSuccess = jest.fn()
  const showError = jest.fn()
  const navigate = jest.fn()

  beforeEach(() => {
    mockedUseMessageEmitter.mockReturnValueOnce(emitMessage)
    mockedUseNotifications.mockReturnValueOnce({
      showSuccess,
      showError
    })
    mockedUseNavigate.mockReturnValueOnce(navigate)
  })

  describe('default render', () => {
    it('check that all non conditional items executed properly', async () => {
      const redirectLink = 'redirectLink'
      const hideModal = jest.fn()

      mockedGetNextAction.mockReturnValueOnce({
        redirectLink
      })

      const {
        result: { current }
      } = renderHook(() => useClaimCompanyNextAction(hideModal))

      const company = {
        id: 'id',
        fullName: 'fullName'
      }
      const result = {}

      current({ company, result })

      expect(mockedGetNextAction).toHaveBeenCalledTimes(1)
      expect(mockedGetNextAction).toHaveBeenCalledWith(result, company)
      expect(navigate).toHaveBeenCalledTimes(1)
      expect(navigate).toHaveBeenCalledWith(redirectLink)
      expect(hideModal).toHaveBeenCalledTimes(1)
      expect(emitMessage).toHaveBeenCalledTimes(1)
      expect(emitMessage).toHaveBeenCalledWith(CLIENT_UPDATED_MOCK, {
        companyId: company.id
      })
    })
  })

  describe('when successMessage returned', () => {
    it('executes success notification with the message', async () => {
      const successMessage = 'successMessage'
      const hideModal = () => null

      mockedGetNextAction.mockReturnValueOnce({
        successMessage
      })

      const {
        result: { current }
      } = renderHook(() => useClaimCompanyNextAction(hideModal))

      const company = {
        id: 'id',
        fullName: 'fullName'
      }
      const result = {}

      current({ company, result })

      expect(showSuccess).toHaveBeenCalledTimes(1)
      expect(showSuccess).toHaveBeenCalledWith(successMessage)
      expect(showError).toHaveBeenCalledTimes(0)
    })
  })

  describe('when errorMessage returned', () => {
    it('executes error notification with the message', async () => {
      const errorMessage = 'errorMessage'
      const hideModal = () => null

      mockedGetNextAction.mockReturnValueOnce({
        errorMessage
      })

      const {
        result: { current }
      } = renderHook(() => useClaimCompanyNextAction(hideModal))

      const company = {
        id: 'id',
        fullName: 'fullName'
      }
      const result = {}

      current({ company, result })

      expect(showError).toHaveBeenCalledTimes(1)
      expect(showError).toHaveBeenCalledWith(errorMessage)
      expect(showSuccess).toHaveBeenCalledTimes(0)
    })
  })

  describe('when no messages returned', () => {
    it('executes success notification with the default message', async () => {
      const hideModal = () => null

      mockedGetNextAction.mockReturnValueOnce({})

      const {
        result: { current }
      } = renderHook(() => useClaimCompanyNextAction(hideModal))

      const company = {
        id: 'id',
        fullName: 'fullName'
      }
      const result = {}

      current({ company, result })

      expect(showSuccess).toHaveBeenCalledTimes(1)
      expect(showSuccess).toHaveBeenCalledWith(
        'The Company was successfully claimed and assigned to you.'
      )
      expect(showError).toHaveBeenCalledTimes(0)
    })
  })
})
