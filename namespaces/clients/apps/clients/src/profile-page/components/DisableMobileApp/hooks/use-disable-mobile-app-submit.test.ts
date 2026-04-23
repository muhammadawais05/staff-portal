import { renderHook } from '@testing-library/react-hooks'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useDisableMobileApp } from '../data'
import useDisableMobileAppSubmit from './use-disable-mobile-app-submit'

const hideModal = () => {}
const companyId = 'companyId'

jest.mock('@staff-portal/mutation-result-handlers/src/form-error-handler')
jest.mock('../data')

const mockedHandleMutationResult = jest.fn()
const mockedUseDisableMobileApp = useDisableMobileApp as jest.Mock
const mockedUseHandleMutationResult = useHandleMutationResult as jest.Mock

describe('useDisableMobileAppSubmit', () => {
  beforeEach(() => {
    mockedUseDisableMobileApp.mockImplementation(() => [
      () =>
        Promise.resolve({
          data: { disableMobileAppForClient: 'disableMobileAppForClient' }
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
    } = renderHook(() => useDisableMobileAppSubmit({ hideModal, companyId }))

    await handleSubmit()

    expect(mockedHandleMutationResult).toHaveBeenCalledWith(
      expect.objectContaining({
        mutationResult: 'disableMobileAppForClient',
        successNotificationMessage:
          'Mobile access has been disabled for this company.'
      })
    )
    expect(loading).toBe(true)
  })
})
