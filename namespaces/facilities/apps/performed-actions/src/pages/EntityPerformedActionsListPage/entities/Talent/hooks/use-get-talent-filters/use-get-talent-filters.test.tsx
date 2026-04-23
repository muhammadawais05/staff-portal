import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { render } from '@testing-library/react'
import { FiltersConfig } from '@staff-portal/filters'

import useGetTalentFilters from './use-get-talent-filters'
import useHandleTalentFilters from '../use-handle-talent-filters'
import { TalentPerformedActionsFilters } from '../../types'
import { TalentPerformedActionsChangeTypeFilter } from '../../enums'
import { PerformedActionsFilters } from '../../../../../../components'

jest.mock('../../../../../../components', () => ({
  ...jest.requireActual('../../../../../../components'),
  PerformedActionsFilters: jest.fn()
}))
const PerformedActionsFiltersMock = PerformedActionsFilters as jest.Mock

jest.mock('../use-handle-talent-filters', () => ({
  __esModule: true,
  default: jest.fn()
}))
const useHandleTalentFiltersMock = useHandleTalentFilters as jest.Mock

const arrangeTest = ({
  filtersConfig = [],
  filterValues,
  handleFilterChange = jest.fn()
}: {
  filtersConfig?: FiltersConfig
  filterValues: TalentPerformedActionsFilters
  handleFilterChange?: () => void
}) => {
  PerformedActionsFiltersMock.mockImplementation(() => null)

  useHandleTalentFiltersMock.mockImplementation(() => ({
    filtersConfig,
    filterValues,
    handleFilterChange
  }))
}

describe('useGetTalentFilters', () => {
  it('calls `PerformedActionsFilters` component with required values', () => {
    const filtersConfig: FiltersConfig = []
    const filterValues = {
      changeType: [
        TalentPerformedActionsChangeTypeFilter.Flags,
        TalentPerformedActionsChangeTypeFilter.RateChange
      ]
    }
    const handleFilterChangeMock = jest.fn()

    arrangeTest({
      filtersConfig,
      filterValues,
      handleFilterChange: handleFilterChangeMock
    })

    const { result } = renderHook(() => useGetTalentFilters())

    render(<>{result.current.component}</>)

    expect(PerformedActionsFiltersMock).toHaveBeenCalledWith(
      {
        filtersConfig,
        filterValues,
        handleFilterChange: handleFilterChangeMock
      },
      {}
    )
  })

  describe('when `ChangeType` filer is set', () => {
    it('returns valid search variables', () => {
      arrangeTest({
        filterValues: {
          changeType: [
            TalentPerformedActionsChangeTypeFilter.Flags,
            TalentPerformedActionsChangeTypeFilter.RateChange
          ]
        }
      })

      const { result } = renderHook(() => useGetTalentFilters())

      expect(result.current.searchVariables).toEqual({
        feeds: [['filter:flags', 'filter:rate_change']]
      })
    })
  })

  describe('when `ChangeType` filer is set and has a few invalid values', () => {
    it('returns valid search variables', () => {
      arrangeTest({
        filterValues: {
          changeType: [
            TalentPerformedActionsChangeTypeFilter.Flags,
            'foo' as TalentPerformedActionsChangeTypeFilter,
            TalentPerformedActionsChangeTypeFilter.RateChange
          ]
        }
      })

      const { result } = renderHook(() => useGetTalentFilters())

      expect(result.current.searchVariables).toEqual({
        feeds: [['filter:flags', 'filter:rate_change']]
      })
    })
  })

  describe('when `ChangeType` filer is set and has all invalid values', () => {
    it('returns valid search variables', () => {
      arrangeTest({
        filterValues: {
          changeType: [
            'foo' as TalentPerformedActionsChangeTypeFilter,
            'bar' as TalentPerformedActionsChangeTypeFilter
          ]
        }
      })

      const { result } = renderHook(() => useGetTalentFilters())

      expect(result.current.searchVariables).toEqual({
        feeds: []
      })
    })
  })

  describe('when `ChangeType` filer is not set', () => {
    it('returns valid search variables', () => {
      arrangeTest({
        filterValues: {
          changeType: []
        }
      })

      const { result } = renderHook(() => useGetTalentFilters())

      expect(result.current.searchVariables).toEqual({
        feeds: []
      })
    })
  })
})
