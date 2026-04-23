import { renderHook } from '@testing-library/react-hooks'

import { useGetInfractionStaffAutocomplete } from '../../data'
import { useGetInfractionStaffFilterAutocompleteOptions } from './use-get-infraction-staff-filter-autocomplete-options'

jest.mock('../../data')

const useGetInfractionStaffAutocompleteMock =
  useGetInfractionStaffAutocomplete as jest.Mock

describe('useGetInfractionStaffFilterAutocompleteOptions', () => {
  const getUsers = jest.fn()
  const options = ['staff user 1', 'staff user 2']

  beforeEach(() => {
    useGetInfractionStaffAutocompleteMock.mockReturnValue({
      loading: false,
      getUsers,
      data: options
    })
  })

  it('returns company autocomplete options', async () => {
    const hook = renderHook(() =>
      useGetInfractionStaffFilterAutocompleteOptions()
    )

    expect(useGetInfractionStaffAutocompleteMock).toHaveBeenCalled()
    expect(hook.result.current.getOptions).toBe(getUsers)
    expect(hook.result.current.loading).toBe(false)
    expect(hook.result.current.options).toEqual(options)
  })
})
