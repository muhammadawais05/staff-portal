import { renderHook, act } from '@testing-library/react-hooks'

import useStateWithLocalStorage from './use-state-with-local-storage'
import localStorageService from '../local-storage'

jest.mock('../local-storage')

const ITEM_KEY = 'item'
const INITIAL_VALUE = 'aaa'

const setItemMock = localStorageService.setItem as jest.Mock
const getItemMock = localStorageService.getItem as jest.Mock

describe('useStateWithLocalStorage', () => {
  afterEach(() => {
    setItemMock.mockReset()
    getItemMock.mockReset()
  })

  it('defines initial state on local state if no previous value was found on local storage', () => {
    const { result } = renderHook(() =>
      useStateWithLocalStorage(ITEM_KEY, INITIAL_VALUE)
    )

    const [value] = result.current

    expect(value).toBe(INITIAL_VALUE)
    expect(setItemMock).toHaveBeenCalledTimes(0)
    expect(getItemMock).toHaveBeenCalledTimes(1)
  })

  it('returns persisted value as initial value', () => {
    const persistedValue = 'bbb'

    getItemMock.mockReturnValue(persistedValue)

    const { result } = renderHook(() =>
      useStateWithLocalStorage(ITEM_KEY, INITIAL_VALUE)
    )

    const [value] = result.current

    expect(value).toBe(persistedValue)
  })

  it('updates value', () => {
    const newValue = 'ccc'

    const { result } = renderHook(() =>
      useStateWithLocalStorage(ITEM_KEY, INITIAL_VALUE)
    )

    const [value, setValue] = result.current

    expect(value).toBe(INITIAL_VALUE)

    act(() => {
      setValue(newValue)
    })

    // renderHook mutates the value of current when updates happen so you cannot destructure its values
    // see: https://react-hooks-testing-library.com/usage/basic-hooks
    expect(result.current[0]).toBe(newValue)
  })

  it('syncs local state with local storage state when [storage] event is fired', () => {
    renderHook(() => useStateWithLocalStorage(ITEM_KEY, INITIAL_VALUE, true))

    expect(getItemMock).toHaveBeenCalledTimes(1)

    window.dispatchEvent(new Event('storage'))

    expect(getItemMock).toHaveBeenCalledTimes(2)
  })
})
