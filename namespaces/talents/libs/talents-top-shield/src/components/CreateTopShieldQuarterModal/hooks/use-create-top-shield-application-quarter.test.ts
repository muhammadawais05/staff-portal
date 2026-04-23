import { useNotifications } from '@toptal/picasso/utils'
import { renderHook } from '@testing-library/react-hooks'
import { useMutation } from '@staff-portal/data-layer-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useCreateTopShieldApplicationQuarter } from './use-create-top-shield-application-quarter'
import { CreateTopShieldApplicationQuarterDocument } from '../data/create-top-shield-application-quarter'

jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: jest.fn()
}))
jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/mutation-result-handlers/src/form-error-handler')

const useNotificationsMock = useNotifications as jest.Mock
const useMutationMock = useMutation as jest.Mock
const useHandleMutationResultMock = useHandleMutationResult as jest.Mock
const createQuarterMock = jest.fn()

describe('useCreateTopShieldApplicationQuarter', () => {
  beforeEach(() => {
    useNotificationsMock.mockReturnValue({ showError: 'show-error' })
    useMutationMock.mockReturnValue([createQuarterMock, { loading: 'loading' }])
    useHandleMutationResultMock.mockReturnValue({})
  })

  it('invokes inner functions with correct params', () => {
    renderHook(() =>
      useCreateTopShieldApplicationQuarter({
        topShieldApplicationId: '123',
        hideModal: () => {}
      })
    )

    expect(useNotificationsMock).toHaveBeenCalledWith()
    expect(useHandleMutationResultMock).toHaveBeenCalledWith()
    expect(useMutationMock).toHaveBeenCalledWith(
      CreateTopShieldApplicationQuarterDocument,
      { onError: expect.any(Function) }
    )
  })

  it('returns expected data', () => {
    const { result } = renderHook(() =>
      useCreateTopShieldApplicationQuarter({
        topShieldApplicationId: '123',
        hideModal: () => {}
      })
    )

    expect(result.current).toEqual({
      handleSubmit: expect.any(Function),
      loading: 'loading'
    })

    result.current.handleSubmit({
      startDate: '2021-01-01',
      endDate: '2021-01-01'
    })

    expect(createQuarterMock).toHaveBeenCalledWith({
      variables: {
        input: {
          startDate: '2021-01-01',
          endDate: '2021-01-01',
          paymentEndDate: null,
          topShieldApplicationId: '123'
        }
      }
    })
  })
})
