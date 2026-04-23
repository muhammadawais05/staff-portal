import { useNotifications } from '@toptal/picasso/utils'
import { renderHook } from '@testing-library/react-hooks'
import { useMutation } from '@staff-portal/data-layer-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useUpdateNumberOfDesiredHires } from './use-update-number-of-desired-hires'
import { UpdateJobTalentCountDocument } from '../data/update-job-talent-count.staff.gql.types'

jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: jest.fn()
}))
jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/mutation-result-handlers/src/form-error-handler')

const useNotificationsMock = useNotifications as jest.Mock
const useMutationMock = useMutation as jest.Mock
const useHandleMutationResultMock = useHandleMutationResult as jest.Mock

describe('useUpdateNumberOfDesiredHires', () => {
  beforeEach(() => {
    useNotificationsMock.mockReturnValue({ showError: 'show-error' })
    useMutationMock.mockReturnValue([
      'update-number-of-desired-hires',
      { loading: 'loading' }
    ])
    useHandleMutationResultMock.mockReturnValue({})
  })

  it('invokes inner functions with correct params', () => {
    renderHook(() => useUpdateNumberOfDesiredHires(() => {}))

    expect(useNotificationsMock).toHaveBeenCalledTimes(1)
    expect(useHandleMutationResultMock).toHaveBeenCalledTimes(1)
    expect(useMutationMock).toHaveBeenCalledTimes(1)
    expect(useMutationMock).toHaveBeenCalledWith(UpdateJobTalentCountDocument, {
      onError: 'show-error'
    })
  })

  it('returns expected data', () => {
    const { result } = renderHook(() => useUpdateNumberOfDesiredHires(() => {}))

    expect(result.current).toEqual({
      handleSubmit: expect.any(Function),
      loading: 'loading'
    })
  })
})
