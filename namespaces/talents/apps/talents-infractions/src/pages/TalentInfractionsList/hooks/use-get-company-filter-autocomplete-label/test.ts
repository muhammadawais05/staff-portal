import { renderHook } from '@testing-library/react-hooks'

import { useGetInfractionClient } from '../../data'
import { useGetCompanyFilterAutocompleteLabel } from './use-get-company-filter-autocomplete-label'

jest.mock('../../data')

const useGetInfractionClientMock = useGetInfractionClient as jest.Mock

describe('useGetCompanyFilterAutocompleteLabel', () => {
  beforeEach(() => {
    useGetInfractionClientMock.mockReturnValue({
      loading: false,
      data: { fullName: 'Company Full Name' }
    })
  })

  it('returns label when company id is provided', async () => {
    const hook = renderHook(() =>
      useGetCompanyFilterAutocompleteLabel('test-company-id')
    )

    expect(useGetInfractionClientMock).toHaveBeenCalledWith({
      companyId: 'test-company-id',
      skip: false
    })
    expect(hook.result.current.label).toBe('Company Full Name')
  })

  it('skip query when company id is not provided', async () => {
    renderHook(() => useGetCompanyFilterAutocompleteLabel(undefined), {})

    expect(useGetInfractionClientMock).toHaveBeenCalledWith({
      companyId: undefined,
      skip: true
    })
  })
})
