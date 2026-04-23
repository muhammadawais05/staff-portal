import { renderHook } from '@testing-library/react-hooks'
import { useMutation } from '@staff-portal/data-layer-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import useUpdateClientClientPartner from './use-update-client-client-partner'
import { SetUpdateClientClientPartnerDocument } from '../../../../../data/set-update-client-partner.staff.gql.types'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/mutation-result-handlers/src/form-error-handler')

const useMutationMock = useMutation as jest.Mock
const useHandleMutationResultMock = useHandleMutationResult as jest.Mock

describe('useUpdateClientClientPartner', () => {
  beforeEach(() => {
    useMutationMock.mockReturnValue([
      'update-client-client-partner',
      { loading: 'loading' }
    ])
    useHandleMutationResultMock.mockReturnValue({})
  })

  it('invokes inner functions with correct params', () => {
    renderHook(() =>
      useUpdateClientClientPartner(() => {}, {
        clientId: 'client-id',
        cascade: false
      })
    )

    expect(useHandleMutationResultMock).toHaveBeenCalledTimes(1)
    expect(useMutationMock).toHaveBeenCalledTimes(1)
    expect(useMutationMock).toHaveBeenCalledWith(
      SetUpdateClientClientPartnerDocument
    )
  })

  it('returns expected data', () => {
    const { result } = renderHook(() =>
      useUpdateClientClientPartner(() => {}, {
        clientId: 'client-id',
        cascade: false
      })
    )

    expect(result.current).toEqual({
      updateClientPartner: expect.any(Function),
      loading: 'loading'
    })
  })
})
