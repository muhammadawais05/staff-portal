import { useNotifications } from '@toptal/picasso/utils'
import { renderHook } from '@testing-library/react-hooks'
import { useMutation } from '@staff-portal/data-layer-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import useUpdateJobClaimer from './use-update-job-claimer'

jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: jest.fn()
}))
jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/mutation-result-handlers/src/form-error-handler')

const useNotificationsMock = useNotifications as jest.Mock
const useMutationMock = useMutation as jest.Mock
const useHandleMutationResultMock = useHandleMutationResult as jest.Mock

describe('useUpdateJobClaimer', () => {
  beforeEach(() => {
    useNotificationsMock.mockReturnValue({ showError: 'show-error' })
    useMutationMock.mockReturnValue([
      'update-job-claimer',
      { loading: 'loading' }
    ])
    useHandleMutationResultMock.mockReturnValue({})
  })

  it('invokes inner functions with correct params', () => {
    renderHook(() => useUpdateJobClaimer(() => {}))

    expect(useNotificationsMock).toHaveBeenCalledTimes(1)
    expect(useHandleMutationResultMock).toHaveBeenCalledTimes(1)
    expect(useMutationMock).toHaveBeenCalledTimes(1)
  })

  it('returns expected data', () => {
    const { result } = renderHook(() => useUpdateJobClaimer(() => {}))

    expect(result.current).toEqual({
      handleSubmit: expect.any(Function),
      loading: 'loading'
    })
  })
})
