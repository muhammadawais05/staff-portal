import { renderHook } from '@testing-library/react-hooks'
import { useGetTalentAutocomplete } from '@staff-portal/talents'

import { useGetTalentFilterAutocompleteOptions } from './use-get-talent-filter-autocomplete-options'

jest.mock('@staff-portal/talents/src/data')

const useGetTalentAutocompleteMock = useGetTalentAutocomplete as jest.Mock

describe('useGetTalentFilterAutocompleteOptions', () => {
  const getTalents = jest.fn()
  const options = ['talent 1', 'talent 2']

  beforeEach(() => {
    useGetTalentAutocompleteMock.mockReturnValue({
      loading: false,
      getTalents,
      data: options
    })
  })

  it('returns talent autocomplete options', async () => {
    const hook = renderHook(() => useGetTalentFilterAutocompleteOptions(), {})

    expect(useGetTalentAutocompleteMock).toHaveBeenCalled()
    expect(hook.result.current.getOptions).toBe(getTalents)
    expect(hook.result.current.loading).toBe(false)
    expect(hook.result.current.options).toEqual(options)
  })
})
