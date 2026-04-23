import { act, renderHook } from '@testing-library/react-hooks'
import { useHistory, useLocation } from '@staff-portal/navigation'
import { extractModalHash } from '@staff-portal/utils'

import useHashTabs from './use-hash-tabs'

jest.mock('@staff-portal/navigation', () => ({
  useHistory: jest.fn(),
  useLocation: jest.fn()
}))
jest.mock('@staff-portal/utils', () => ({
  extractModalHash: jest.fn()
}))

const useLocationMock = useLocation as jest.Mock
const useHistoryMock = useHistory as jest.Mock
const extractModalHashMock = extractModalHash as jest.Mock

describe('useHashTabs', () => {
  beforeEach(() => {
    useLocationMock.mockReturnValue(null)
    useHistoryMock.mockReturnValue(null)
    extractModalHashMock.mockReturnValue(null)
  })

  describe('when calling `onChange` from hook result', () => {
    it('calls `onChange` prop & `history.push` with new value', () => {
      const onChange = jest.fn()
      const push = jest.fn()

      useLocationMock.mockReturnValue({ hash: '#foo' })
      useHistoryMock.mockReturnValue({
        location: jest.fn(),
        replace: jest.fn(),
        listen: jest.fn(),
        push
      })

      const { result } = renderHook(() =>
        useHashTabs({ tabValues: ['foo', 'bar'], onChange })
      )

      act(() => {
        result.current.onChange('_', 'foo')
      })

      expect(onChange).toHaveBeenCalledWith('foo')
      expect(push).toHaveBeenCalledWith({ hash: 'foo' })
    })
  })

  describe('when `hash` does not exist', () => {
    it('calls `onChange` prop with first tab value', () => {
      const onChange = jest.fn()

      useLocationMock.mockReturnValue({ hash: '' })
      useHistoryMock.mockReturnValue({
        location: jest.fn(),
        replace: jest.fn(),
        listen: jest.fn(),
        push: jest.fn()
      })

      renderHook(() =>
        useHashTabs({ tabValues: ['foo', 'bar', 'baz'], onChange })
      )

      expect(onChange).toHaveBeenCalledWith('foo')
    })
  })

  describe('when `hash` does exist', () => {
    it('calls `onChange` prop with that `hash`', () => {
      const onChange = jest.fn()

      useLocationMock.mockReturnValue({ hash: '#baz' })
      useHistoryMock.mockReturnValue({
        location: jest.fn(),
        replace: jest.fn(),
        listen: jest.fn(),
        push: jest.fn()
      })

      renderHook(() =>
        useHashTabs({ tabValues: ['foo', 'bar', 'baz'], onChange })
      )

      expect(onChange).toHaveBeenCalledWith('baz')
    })
  })

  describe('when `location.hash` is valid', () => {
    it('does not remove invalid `location.hash` from url', () => {
      const replace = jest.fn()

      useLocationMock.mockReturnValue({ hash: '#foo#modal' })
      extractModalHashMock.mockReturnValue('#modal')
      useHistoryMock.mockReturnValue({
        location: { pathname: 'pathname' },
        listen: jest.fn(),
        replace
      })

      renderHook(() =>
        useHashTabs({ tabValues: ['foo', 'bar'], onChange: jest.fn() })
      )

      expect(replace).not.toHaveBeenCalledWith()
    })
  })

  describe('when `location.hash` is invalid', () => {
    it('removes invalid `location.hash` from url', () => {
      const onChange = jest.fn()
      const replace = jest.fn()

      useLocationMock.mockReturnValue({ hash: '#invalid#modal' })
      extractModalHashMock.mockReturnValue('#modal')
      useHistoryMock.mockReturnValue({
        location: { pathname: 'pathname' },
        listen: jest.fn(),
        replace
      })

      renderHook(() => useHashTabs({ tabValues: ['foo', 'bar'], onChange }))

      expect(replace).toHaveBeenCalledWith({
        pathname: 'pathname',
        hash: '#modal'
      })
    })
  })
})
