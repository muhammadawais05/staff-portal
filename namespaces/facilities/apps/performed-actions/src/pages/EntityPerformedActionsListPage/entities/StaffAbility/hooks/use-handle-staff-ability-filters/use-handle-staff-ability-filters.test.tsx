import { renderHook, act } from '@testing-library/react-hooks'
import { useLocation } from '@staff-portal/navigation'
import { useQuery, encodeEntityId } from '@staff-portal/data-layer-service'
import { when } from 'jest-when'

import useHandleStaffAbilityFilters from './use-handle-staff-ability-filters'
import {
  GetStaffAbilitiesDocument,
  GetSearchableRolesDocument
} from '../../data'

jest.mock('@staff-portal/data-layer-service', () => ({
  ...jest.requireActual('@staff-portal/data-layer-service'),
  useQuery: jest.fn()
}))
jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  __esModule: true,
  useLocation: jest.fn()
}))

const mockUseLocation = useLocation as jest.Mock
const mockUseQuery = useQuery as jest.Mock

const arrangeTest = ({ search }: { search: string }) => {
  when(mockUseQuery)
    .calledWith(GetSearchableRolesDocument)
    .mockReturnValue({
      data: {
        searchableRoles: {
          edges: [
            {
              roleId: encodeEntityId('1', 'Staff'),
              legacyUserId: '1',
              fullName: 'Aaron Nader'
            },
            {
              id: encodeEntityId('2', 'Staff'),
              legacyUserId: '2',
              fullName: 'Aaron Younger'
            }
          ]
        }
      },
      loading: false
    })
    .calledWith(GetStaffAbilitiesDocument)
    .mockReturnValue({
      data: {
        staffAbilities: {
          nodes: [
            {
              id: encodeEntityId('1', 'StaffAbility'),
              name: 'Withdraw an availability request',
              __typename: 'StaffAbility'
            },
            {
              id: encodeEntityId('2', 'StaffAbility'),
              name: 'West US Account Team permission set',
              __typename: 'StaffAbility'
            }
          ]
        }
      },
      loading: false
    })

  mockUseLocation.mockReturnValue({ search })
}

describe('useHandleStaffAbilityFilters', () => {
  describe('when there are search params', () => {
    it('returns parsed filter values', async () => {
      const searchChangeById = '1'
      const searchAbilityId = '2'

      arrangeTest({
        search: `?changed_by=${searchChangeById}&ability_id=${searchAbilityId}`
      })

      const { result } = renderHook(() => useHandleStaffAbilityFilters())

      await act(() => Promise.resolve())

      expect(result.current.filterValues).toEqual({
        staffId: encodeEntityId(searchChangeById, 'Staff'),
        changed_by: searchChangeById,
        ability_id: encodeEntityId(searchAbilityId, 'StaffAbility')
      })
    })
  })

  describe('when there are no search params', () => {
    it('returns parsed filter values', async () => {
      arrangeTest({ search: '' })

      const { result } = renderHook(() => useHandleStaffAbilityFilters())

      await act(() => Promise.resolve())

      expect(result.current.filterValues).toEqual({
        changed_by: '',
        ability_id: ''
      })
    })
  })
})
