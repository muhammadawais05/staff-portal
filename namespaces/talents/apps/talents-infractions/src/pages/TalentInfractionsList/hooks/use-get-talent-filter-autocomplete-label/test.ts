import { renderHook } from '@testing-library/react-hooks'

import { useGetInfractionTalent } from '../../data'
import { useGetTalentFilterAutocompleteLabel } from './use-get-talent-filter-autocomplete-label'

jest.mock('../../data')

const useGetInfractionTalentMock = useGetInfractionTalent as jest.Mock

describe('useGetTalentFilterAutocompleteLabel', () => {
  beforeEach(() => {
    useGetInfractionTalentMock.mockReturnValue({
      loading: false,
      data: { fullName: 'Talent Full Name' }
    })
  })

  it('returns label when talent id is provided', async () => {
    const hook = renderHook(() =>
      useGetTalentFilterAutocompleteLabel('test-talent-id')
    )

    expect(useGetInfractionTalentMock).toHaveBeenCalledWith({
      talentId: 'test-talent-id',
      skip: false
    })
    expect(hook.result.current.label).toBe('Talent Full Name')
  })

  it('skip query when talent id is not provided', async () => {
    renderHook(() => useGetTalentFilterAutocompleteLabel(undefined), {})

    expect(useGetInfractionTalentMock).toHaveBeenCalledWith({
      companyId: undefined,
      skip: true
    })
  })
})
