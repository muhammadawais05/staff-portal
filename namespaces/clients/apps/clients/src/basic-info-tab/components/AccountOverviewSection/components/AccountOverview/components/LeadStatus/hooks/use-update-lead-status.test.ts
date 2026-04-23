import { renderHook } from '@testing-library/react-hooks'
import { useMutation } from '@staff-portal/data-layer-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import useUpdateLeadStatus from './use-update-lead-status'
import { SetUpdateClientEnterpriseLeadStatusDocument } from '../../../../../data/set-update-client-enterprise-lead-status.staff.gql.types'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/mutation-result-handlers/src/form-error-handler')

const useMutationMock = useMutation as jest.Mock
const useHandleMutationResultMock = useHandleMutationResult as jest.Mock

describe('useUpdateLeadStatus', () => {
  beforeEach(() => {
    useMutationMock.mockReturnValue([
      'update-lead-status',
      { loading: 'loading' }
    ])
    useHandleMutationResultMock.mockReturnValue({})
  })

  it('invokes inner functions with correct params', () => {
    renderHook(() => useUpdateLeadStatus(() => {}))

    expect(useHandleMutationResultMock).toHaveBeenCalledTimes(1)
    expect(useMutationMock).toHaveBeenCalledTimes(1)
    expect(useMutationMock).toHaveBeenCalledWith(
      SetUpdateClientEnterpriseLeadStatusDocument
    )
  })

  it('returns expected data', () => {
    const { result } = renderHook(() => useUpdateLeadStatus(() => {}))

    expect(result.current).toEqual({
      handleSubmit: expect.any(Function),
      loading: 'loading'
    })
  })
})
