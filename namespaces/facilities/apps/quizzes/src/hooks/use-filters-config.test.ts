import { renderHook } from '@testing-library/react-hooks'
import { FilterConfigType } from '@staff-portal/filters'

import {
  useGetVerticals,
  GetQuizzesVerticalsQuery
} from '../data/get-verticals'
import { createVerticalsMock } from '../data/get-verticals/mocks'
import { TYPE_OF_QUIZZES_OPTIONS } from '../utils/get-filter-options'
import useFiltersConfig from './use-filters-config'

jest.mock('../data/get-verticals')

const mockUseGetVerticals = useGetVerticals as jest.Mock

type Verticals = GetQuizzesVerticalsQuery['verticals']['nodes']

const createMockFiltersConfig = (verticalOptions: Verticals) => [
  {
    type: FilterConfigType.CHECKBOX,
    name: 'talent_type',
    label: 'Vertical',
    options: verticalOptions.map(({ talentType, name }) => ({
      label: name,
      value: talentType
    }))
  },
  {
    type: FilterConfigType.RADIO,
    name: 'kind',
    label: 'Type Of Quiz',
    options: TYPE_OF_QUIZZES_OPTIONS
  }
]

describe('useFiltersConfig', () => {
  describe('when verticals are not loaded', () => {
    it('returns config values', () => {
      const mockVerticals: Verticals = []

      mockUseGetVerticals.mockImplementation(() => ({ data: mockVerticals }))

      const { result } = renderHook(() => useFiltersConfig())

      expect(result.current.filtersConfig).toEqual(
        createMockFiltersConfig(mockVerticals)
      )
    })
  })

  describe('when verticals are loaded', () => {
    const mockVerticals: Verticals = createVerticalsMock()

    beforeEach(() => {
      mockUseGetVerticals.mockImplementation(() => ({ data: mockVerticals }))
    })

    it('returns config values', () => {
      const { result } = renderHook(() => useFiltersConfig())

      expect(result.current.filtersConfig).toEqual(
        createMockFiltersConfig(mockVerticals)
      )
    })

    it('memoizes returning value', () => {
      const { result, rerender } = renderHook(() => useFiltersConfig())

      const prevValue = result.current.filtersConfig

      rerender()

      expect(prevValue).toBe(result.current.filtersConfig)
    })

    it('changes returning value when verticals were changed', () => {
      const { result, rerender } = renderHook(() => useFiltersConfig())

      const prevValue = result.current.filtersConfig

      mockUseGetVerticals.mockImplementation(() => ({ data: [] }))

      rerender()

      expect(prevValue).not.toBe(result.current.filtersConfig)
    })
  })
})
