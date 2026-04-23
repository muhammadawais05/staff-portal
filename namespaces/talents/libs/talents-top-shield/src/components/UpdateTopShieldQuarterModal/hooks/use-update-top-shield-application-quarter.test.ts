import { useNotifications } from '@toptal/picasso/utils'
import { renderHook } from '@testing-library/react-hooks'
import { useMutation } from '@staff-portal/data-layer-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useUpdateTopShieldApplicationQuarter } from './use-update-top-shield-application-quarter'
import { UpdateTopShieldApplicationQuarterDocument } from '../data/update-top-shield-application-quarter'

jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: jest.fn()
}))
jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/mutation-result-handlers/src/form-error-handler')

const useNotificationsMock = useNotifications as jest.Mock
const useMutationMock = useMutation as jest.Mock
const useHandleMutationResultMock = useHandleMutationResult as jest.Mock
const updateQuarterMock = jest.fn()

describe('useUpdateTopShieldApplicationQuarter', () => {
  beforeEach(() => {
    useNotificationsMock.mockReturnValue({ showError: 'show-error' })
    useMutationMock.mockReturnValue([updateQuarterMock, { loading: 'loading' }])
    useHandleMutationResultMock.mockReturnValue({})
  })

  it('invokes inner functions with correct params', () => {
    renderHook(() =>
      useUpdateTopShieldApplicationQuarter({
        quarterId: '123',
        hideModal: () => {}
      })
    )

    expect(useNotificationsMock).toHaveBeenCalledWith()
    expect(useHandleMutationResultMock).toHaveBeenCalledWith()
    expect(useMutationMock).toHaveBeenCalledWith(
      UpdateTopShieldApplicationQuarterDocument,
      { onError: expect.any(Function) }
    )
  })

  it('returns expected data', () => {
    const { result } = renderHook(() =>
      useUpdateTopShieldApplicationQuarter({
        quarterId: '123',
        hideModal: () => {}
      })
    )

    expect(result.current).toEqual({
      handleSubmit: expect.any(Function)
    })

    result.current.handleSubmit({
      startDate: '2021-01-01',
      endDate: '2021-01-01'
    })

    expect(updateQuarterMock).toHaveBeenCalledWith({
      variables: {
        input: {
          startDate: '2021-01-01',
          endDate: '2021-01-01',
          paymentEndDate: null,
          quarterId: '123'
        }
      }
    })
  })
})
