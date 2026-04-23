import { renderHook } from '@testing-library/react-hooks'
import { useGetClientAutocomplete } from '@staff-portal/clients'

import { useGetCompanyFilterAutocompleteOptions } from './use-get-company-filter-autocomplete-options'

jest.mock('@staff-portal/clients', () => ({
  useGetClientAutocomplete: jest.fn()
}))

const useGetClientAutocompleteMock = useGetClientAutocomplete as jest.Mock

describe('useGetCompanyFilterAutocompleteOptions', () => {
  const getClients = jest.fn()
  const options = ['company 1', 'company 2']

  beforeEach(() => {
    useGetClientAutocompleteMock.mockReturnValue({
      loading: false,
      getClients,
      data: options
    })
  })

  it('returns company autocomplete options', async () => {
    const hook = renderHook(() => useGetCompanyFilterAutocompleteOptions(), {})

    expect(useGetClientAutocompleteMock).toHaveBeenCalled()
    expect(hook.result.current.getOptions).toBe(getClients)
    expect(hook.result.current.loading).toBe(false)
    expect(hook.result.current.options).toEqual(options)
  })
})
