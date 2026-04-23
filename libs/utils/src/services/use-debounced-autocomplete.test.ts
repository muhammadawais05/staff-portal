import { act, renderHook } from '@testing-library/react-hooks'

import useDebouncedAutocomplete from './use-debounced-autocomplete'

const ITEMS = [
  { text: 'option 1', id: '1' },
  { text: 'option 2', id: '2' }
]

describe('useDebouncedAutocomplete', () => {
  it('shows the available options', async () => {
    const TERM = 'test'
    const SECOND_TERM = 'tes'

    const hook = renderHook(() =>
      useDebouncedAutocomplete({
        initialSearchTerm: TERM,
        loadingOptions: false,
        onSearch: () => {},
        searchOptions: ITEMS
      })
    )

    expect(hook.result.current.searchOptions).toHaveLength(2)

    act(() => {
      hook.result.current.setSearchTerm(TERM)
      hook.result.current.search(TERM)
    })

    expect(hook.result.current.searchOptions).toHaveLength(2)

    act(() => {
      hook.result.current.setSearchTerm(SECOND_TERM)
      hook.result.current.search(SECOND_TERM)
    })

    expect(hook.result.current.searchOptions).toBeNull()
  })

  it('works when options are the same and term has the same value', async () => {
    const TERM = 'test'
    const SECOND_TERM = 'tes'

    const hook = renderHook(() =>
      useDebouncedAutocomplete({
        initialSearchTerm: TERM,
        loadingOptions: false,
        onSearch: () => {},
        searchOptions: ITEMS
      })
    )

    expect(hook.result.current.searchOptions).toHaveLength(2)

    act(() => {
      hook.result.current.setSearchTerm(TERM)
      hook.result.current.search(TERM)

      hook.result.current.setSearchTerm(SECOND_TERM)
      hook.result.current.search(SECOND_TERM)

      hook.result.current.setSearchTerm(TERM)
      hook.result.current.search(TERM)
    })

    expect(hook.result.current.searchOptions).toHaveLength(2)
  })

  it('does not call the onSearch callback if search term is empty', async () => {
    const onSearch = jest.fn()
    const { result } = renderHook(() =>
      useDebouncedAutocomplete({
        initialSearchTerm: 'initial term',
        loadingOptions: false,
        onSearch,
        searchOptions: ITEMS
      })
    )

    act(() => {
      result.current.setSearchTerm('')
      result.current.search('')
    })

    expect(onSearch).not.toHaveBeenCalled()
  })

  it('calls the onSearch callback if search is at least 1 character long', async () => {
    const onSearch = jest.fn()
    const hook = renderHook(() =>
      useDebouncedAutocomplete({
        initialSearchTerm: 'initial term',
        loadingOptions: false,
        onSearch,
        searchOptions: ITEMS
      })
    )

    act(() => {
      hook.result.current.setSearchTerm('a')
      hook.result.current.search('a')
    })

    expect(onSearch).toHaveBeenCalledTimes(1)

    act(() => {
      hook.result.current.setSearchTerm('aa')
      hook.result.current.search('aa')
    })

    expect(onSearch).toHaveBeenCalledTimes(2)
  })
})
