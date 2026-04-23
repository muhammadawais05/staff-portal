import { renderHook } from '@testing-library/react-hooks'
import { useMutation } from '@staff-portal/data-layer-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import useUpdateLegalContact from './use-update-legal-contact'
import { SetUpdateClientLegalContactDetailsDocument } from '../../../../../data/set-update-client-legal-contact-details.staff.gql.types'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/mutation-result-handlers/src/form-error-handler')

const useMutationMock = useMutation as jest.Mock
const useHandleMutationResultMock = useHandleMutationResult as jest.Mock

describe('useUpdateLegalContact', () => {
  beforeEach(() => {
    useMutationMock.mockReturnValue([
      'update-legal-contact',
      { loading: 'true' }
    ])
    useHandleMutationResultMock.mockReturnValue({})
  })

  it('invokes inner functions with correct params', () => {
    renderHook(() => useUpdateLegalContact(() => {}))

    expect(useHandleMutationResultMock).toHaveBeenCalledTimes(1)
    expect(useMutationMock).toHaveBeenCalledTimes(1)
    expect(useMutationMock).toHaveBeenCalledWith(
      SetUpdateClientLegalContactDetailsDocument
    )
  })

  it('returns expected data', () => {
    const { result } = renderHook(() => useUpdateLegalContact(() => {}))

    expect(result.current).toEqual({
      handleSubmit: expect.any(Function),
      loading: 'true'
    })
  })
})
