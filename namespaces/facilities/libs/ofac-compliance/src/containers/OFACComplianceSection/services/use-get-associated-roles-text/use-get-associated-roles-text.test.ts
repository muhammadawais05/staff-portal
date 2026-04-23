import {
  ClientCumulativeStatus,
  CompanyRepresentativeCumulativeStatus,
  RoleStatus,
  TalentCumulativeStatus
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { renderHook } from '@testing-library/react-hooks'
import { useDependency } from '@staff-portal/dependency-injector'

import { useGetAssociatedRolesText } from './use-get-associated-roles-text'
import {
  companyStatusTextMappingMock,
  talentStatusMappingMock
} from '../../../../mocks'
import {
  COMPANY_STATUS_TEXT_MAPPING_DI_KEY,
  TALENT_STATUS_MAPPING_DI_KEY
} from '../../../../dependencies'

jest.mock('@staff-portal/dependency-injector', () => ({
  ...jest.requireActual('@staff-portal/dependency-injector'),
  useDependency: jest.fn()
}))

const mockUseDependency = useDependency as jest.Mock

describe('useGetAssociatedRolesText()', () => {
  beforeEach(() => {
    mockUseDependency.mockImplementation(key => {
      if (key === COMPANY_STATUS_TEXT_MAPPING_DI_KEY) {
        return companyStatusTextMappingMock
      }
      if (key === TALENT_STATUS_MAPPING_DI_KEY) {
        return talentStatusMappingMock
      }
    })
  })

  it('returns empty string when associatedRoles is empty', () => {
    const { result } = renderHook(() => useGetAssociatedRolesText(null))

    expect(result.current).toBeUndefined()
  })

  it('returns correct text for associated Clients', () => {
    const { result } = renderHook(() =>
      useGetAssociatedRolesText([
        {
          id: encodeEntityId('123', 'Client'),
          type: 'Client',
          clientCumulativeStatus: ClientCumulativeStatus.REJECTED
        },
        {
          id: encodeEntityId('456', 'Client'),
          type: 'Client',
          clientCumulativeStatus: ClientCumulativeStatus.PENDING_TOS
        }
      ])
    )

    expect(result.current).toBe('Client - Deleted, Client - Pending TOS')
  })

  it('returns correct text for associated Talents', () => {
    const { result } = renderHook(() =>
      useGetAssociatedRolesText([
        {
          id: encodeEntityId('123', 'Talent'),
          type: 'Talent',
          talentCumulativeStatus: TalentCumulativeStatus.ACTIVE
        },
        {
          id: encodeEntityId('456', 'Talent'),
          type: 'Talent',
          talentCumulativeStatus: TalentCumulativeStatus.IN_ONBOARDING
        }
      ])
    )

    expect(result.current).toBe('Talent - Active, Talent - In onboarding')
  })

  it('returns correct text for non-Talent roles', () => {
    const { result } = renderHook(() =>
      useGetAssociatedRolesText([
        {
          id: encodeEntityId('123', 'CompanyRepresentative'),
          type: 'CompanyRepresentative',
          companyRepresentativeCumulativeStatus:
            CompanyRepresentativeCumulativeStatus.NO_LOGIN
        },
        {
          id: encodeEntityId('456', 'Staff'),
          type: 'Staff',
          cumulativeStatus: RoleStatus.REJECTED
        }
      ])
    )

    expect(result.current).toBe(
      'Company Representative - No login, Staff - Rejected'
    )
  })
})
