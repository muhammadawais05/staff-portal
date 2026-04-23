import { renderHook } from '@testing-library/react-hooks'

import { useGetInfractionsStaffUser } from '../../data'
import { useGetInfractionStaffFilterAutocompleteLabel } from './use-get-infraction-staff-filter-autocomplete-label'

jest.mock('../../data')

const useGetInfractionsStaffUserMock = useGetInfractionsStaffUser as jest.Mock

describe('useGetInfractionStaffFilterAutocompleteLabel', () => {
  beforeEach(() => {
    useGetInfractionsStaffUserMock.mockReturnValue({
      loading: false,
      data: { fullName: 'Staff Full Name' }
    })
  })

  it('returns label when staff id is provided', async () => {
    const hook = renderHook(() =>
      useGetInfractionStaffFilterAutocompleteLabel('test-id')
    )

    expect(useGetInfractionsStaffUserMock).toHaveBeenCalledWith({
      staffId: 'test-id',
      skip: false
    })
    expect(hook.result.current.label).toBe('Staff Full Name')
  })

  it('skip query when staff id is not provided', async () => {
    renderHook(
      () => useGetInfractionStaffFilterAutocompleteLabel(undefined),
      {}
    )

    expect(useGetInfractionsStaffUserMock).toHaveBeenCalledWith({
      staffId: undefined,
      skip: true
    })
  })
})
