import { useNotifications } from '@toptal/picasso/utils'
import { renderHook } from '@testing-library/react-hooks'
import { useMutation } from '@staff-portal/data-layer-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import useSetJobPriority from './use-set-job-priority'
import { SetJobPriorityDocument } from '../data/set-job-priority.staff.gql.types'

jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: jest.fn()
}))
jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/mutation-result-handlers/src/form-error-handler')

const useNotificationsMock = useNotifications as jest.Mock
const useMutationMock = useMutation as jest.Mock
const useHandleMutationResultMock = useHandleMutationResult as jest.Mock

describe('useSetJobPriority', () => {
  beforeEach(() => {
    useNotificationsMock.mockReturnValue({ showError: 'show-error' })
    useMutationMock.mockReturnValue([
      'set-job-priority',
      { loading: 'loading' }
    ])
    useHandleMutationResultMock.mockReturnValue({})
  })

  it('invokes inner functions with correct params', () => {
    renderHook(() => useSetJobPriority(() => {}))

    expect(useNotificationsMock).toHaveBeenCalledTimes(1)
    expect(useHandleMutationResultMock).toHaveBeenCalledTimes(1)
    expect(useMutationMock).toHaveBeenCalledTimes(1)
    expect(useMutationMock).toHaveBeenCalledWith(SetJobPriorityDocument, {
      onError: 'show-error'
    })
  })

  it('returns expected data', () => {
    const { result } = renderHook(() => useSetJobPriority(() => {}))

    expect(result.current).toEqual({
      handleSubmit: expect.any(Function),
      loading: 'loading'
    })
  })
})
