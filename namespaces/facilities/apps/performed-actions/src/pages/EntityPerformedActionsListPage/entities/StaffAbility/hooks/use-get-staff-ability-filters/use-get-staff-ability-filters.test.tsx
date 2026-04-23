import React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { render } from '@testing-library/react'
import { FiltersConfig } from '@staff-portal/filters'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import useGetStaffAbilityFilters from './use-get-staff-ability-filters'
import useHandleStaffAbilityFilters from '../use-handle-staff-ability-filters'
import { PerformedActionsFilters } from '../../../../../../components'
import { StaffAbilityPerformedActionsFilters } from '../../types'

jest.mock('../../../../../../components', () => ({
  ...jest.requireActual('../../../../../../components'),
  PerformedActionsFilters: jest.fn()
}))
const PerformedActionsFiltersMock = PerformedActionsFilters as jest.Mock

jest.mock('../use-handle-staff-ability-filters', () => ({
  __esModule: true,
  default: jest.fn()
}))
const useHandleStaffAbilityFiltersMock =
  useHandleStaffAbilityFilters as jest.Mock

const arrangeTest = ({
  filtersConfig = [],
  filterValues,
  handleFilterChange = jest.fn()
}: {
  filtersConfig?: FiltersConfig
  filterValues: StaffAbilityPerformedActionsFilters & { staffId?: string }
  handleFilterChange?: () => void
}) => {
  PerformedActionsFiltersMock.mockImplementation(() => null)

  useHandleStaffAbilityFiltersMock.mockImplementation(() => ({
    filtersConfig,
    filterValues,
    handleFilterChange
  }))
}

describe('useGetStaffAbilityFilters', () => {
  it('calls `PerformedActionsFilters` component with required values', () => {
    const filtersConfig: FiltersConfig = []
    const filterValues = {
      changed_by: encodeEntityId('1', 'Staff'),
      ability_id: encodeEntityId('1', 'StaffAbility')
    }
    const handleFilterChangeMock = jest.fn()

    arrangeTest({
      filtersConfig,
      filterValues,
      handleFilterChange: handleFilterChangeMock
    })

    const { result } = renderHook(() => useGetStaffAbilityFilters())

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

  describe('when `ability_id` filter is set', () => {
    it('returns valid search variables', () => {
      arrangeTest({
        filterValues: {
          changed_by: '',
          ability_id: encodeEntityId('1', 'StaffAbility')
        }
      })

      const { result } = renderHook(() => useGetStaffAbilityFilters())

      expect(result.current.searchVariables).toEqual({
        payload: {
          path: ['affected_abilities'],
          operation: 'CONTAINS',
          value: '{"gid": "gid://platform/Ability/1"}'
        },
        performerGids: undefined
      })
    })
  })

  describe('when `change_by` filter is set', () => {
    it('returns valid search variables', () => {
      arrangeTest({
        filterValues: {
          staffId: encodeEntityId('1', 'Staff'),
          changed_by: '1',
          ability_id: ''
        }
      })

      const { result } = renderHook(() => useGetStaffAbilityFilters())

      expect(result.current.searchVariables).toEqual({
        payload: undefined,
        performerGids: ['gid://platform/Staff/1']
      })
    })
  })

  describe('when there are no filters', () => {
    it('returns valid search variables', () => {
      arrangeTest({
        filterValues: {
          changed_by: '',
          ability_id: ''
        }
      })

      const { result } = renderHook(() => useGetStaffAbilityFilters())

      expect(result.current.searchVariables).toEqual({
        payload: undefined,
        performerGids: undefined
      })
    })
  })
})
