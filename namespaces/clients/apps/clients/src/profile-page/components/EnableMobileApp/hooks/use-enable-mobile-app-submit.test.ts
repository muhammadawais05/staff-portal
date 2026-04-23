import { renderHook } from '@testing-library/react-hooks'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useEnableMobileApp } from '../data'
import useEnableMobileAppSubmit from './use-enable-mobile-app-submit'

const hideModal = () => {}
const companyId = 'companyId'

jest.mock('@staff-portal/mutation-result-handlers/src/form-error-handler')
jest.mock('../data')

const mockedHandleMutationResult = jest.fn()
const mockedUseEnableMobileApp = useEnableMobileApp as jest.Mock
const mockedUseHandleMutationResult = useHandleMutationResult as jest.Mock

describe('useEnableMobileAppSubmit', () => {
  beforeEach(() => {
    mockedUseEnableMobileApp.mockImplementation(() => [
      () =>
        Promise.resolve({
          data: { enableMobileAppForClient: 'enableMobileAppForClient' }
        }),
      { loading: true }
    ])
    mockedUseHandleMutationResult.mockReturnValue({
      handleMutationResult: mockedHandleMutationResult
    })
  })

  it('returns a function to handle submit and loading state', async () => {
    const {
      result: {
        current: { handleSubmit, loading }
      }
    } = renderHook(() => useEnableMobileAppSubmit({ hideModal, companyId }))

    await handleSubmit()

    expect(mockedHandleMutationResult).toHaveBeenCalledWith(
      expect.objectContaining({
        mutationResult: 'enableMobileAppForClient',
        successNotificationMessage:
          'Mobile access has been enabled for this company.'
      })
    )
    expect(loading).toBe(true)
  })
})
