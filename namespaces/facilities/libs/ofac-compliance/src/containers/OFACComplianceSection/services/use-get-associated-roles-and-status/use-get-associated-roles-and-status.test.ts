import { encodeEntityId } from '@staff-portal/data-layer-service'
import { useDependency } from '@staff-portal/dependency-injector'
import { renderHook } from '@testing-library/react-hooks'

import {
  COMPANY_STATUS_TEXT_MAPPING_DI_KEY,
  TALENT_STATUS_MAPPING_DI_KEY
} from '../../../../dependencies'
import {
  companyStatusTextMappingMock,
  talentStatusMappingMock
} from '../../../../mocks'
import {
  OfacStatusDataClientFragment,
  OfacStatusDataCompanyRepresentativeFragment,
  OfacStatusDataStaffFragment,
  OfacStatusDataTalentFragment
} from '../../data/get-ofac-status-data'
import { getClientStatusText } from '../get-client-status-text/get-client-status-text'
import { getRoleStatusText } from '../get-role-status-text/get-role-status-text'
import { getTalentStatusText } from '../get-talent-status-text/get-talent-status-text'
import { useGetAssociatedRolesAndStatus } from './use-get-associated-roles-and-status'

jest.mock('../get-client-status-text/get-client-status-text', () => ({
  getClientStatusText: jest.fn()
}))
jest.mock('../get-talent-status-text/get-talent-status-text', () => ({
  getTalentStatusText: jest.fn()
}))
jest.mock('../get-role-status-text/get-role-status-text', () => ({
  getRoleStatusText: jest.fn()
}))

jest.mock('@staff-portal/dependency-injector', () => ({
  ...jest.requireActual('@staff-portal/dependency-injector'),
  useDependency: jest.fn()
}))

const mockGetTalentStatusText = getTalentStatusText as jest.Mock
const mockUseDependency = useDependency as jest.Mock
const mockGetClientStatusText = getClientStatusText as jest.Mock
const mockGetRoleStatusText = getRoleStatusText as jest.Mock

describe('useGetAssociatedRolesAndStatus', () => {
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

  describe('when data is not defined', () => {
    it('returns keys with null', () => {
      const { result } = renderHook(() => useGetAssociatedRolesAndStatus(null))

      expect(result.current).toEqual({
        associatedRoles: null,
        roleOrClientStatus: null
      })
    })
  })

  describe('when fragment associated with Talent', () => {
    describe('when talentCumulativeStatus is defined', () => {
      it('returns roleOrClientStatus', () => {
        const talentCumulativeStatus = {}
        const talentAssociatedRoles = {
          nodes: {}
        }
        const mockedTalentStatusText = {}

        mockGetTalentStatusText.mockReturnValueOnce(mockedTalentStatusText)
        const { result } = renderHook(() =>
          useGetAssociatedRolesAndStatus({
            id: encodeEntityId('1', 'Talent'),
            talentCumulativeStatus,
            talentAssociatedRoles
          } as OfacStatusDataTalentFragment)
        )

        expect(result.current).toEqual({
          roleOrClientStatus: mockedTalentStatusText,
          associatedRoles: talentAssociatedRoles.nodes
        })
      })
    })

    describe('when talentCumulativeStatus is not defined', () => {
      it('returns null for roleOrClientStatus', () => {
        const talentAssociatedRoles = {
          nodes: {}
        }
        const { result } = renderHook(() =>
          useGetAssociatedRolesAndStatus({
            id: encodeEntityId('1', 'Talent'),
            talentAssociatedRoles
          } as OfacStatusDataTalentFragment)
        )

        expect(result.current).toEqual({
          roleOrClientStatus: null,
          associatedRoles: talentAssociatedRoles.nodes
        })
      })
    })
  })

  describe('when fragment associated with Client', () => {
    describe('when talentCumulativeStatus is defined', () => {
      it('returns roleOrClientStatus', () => {
        const clientCumulativeStatus = {}
        const clientAssociatedRoles = {
          nodes: {}
        }
        const mockedClientStatusText = {}

        mockGetClientStatusText.mockReturnValueOnce(mockedClientStatusText)

        const { result } = renderHook(() =>
          useGetAssociatedRolesAndStatus({
            id: encodeEntityId('1', 'Client'),
            clientCumulativeStatus,
            clientAssociatedRoles
          } as OfacStatusDataClientFragment)
        )

        expect(result.current).toEqual({
          roleOrClientStatus: mockedClientStatusText,
          associatedRoles: clientAssociatedRoles.nodes
        })
      })
    })

    describe('when talentCumulativeStatus is not defined', () => {
      it('returns null for roleOrClientStatus', () => {
        const clientAssociatedRoles = {
          nodes: {}
        }

        const { result } = renderHook(() =>
          useGetAssociatedRolesAndStatus({
            id: encodeEntityId('1', 'Client'),
            clientAssociatedRoles
          } as OfacStatusDataClientFragment)
        )

        expect(result.current).toEqual({
          roleOrClientStatus: null,
          associatedRoles: clientAssociatedRoles.nodes
        })
      })
    })
  })

  describe('when fragment associated with CompanyRepresentative', () => {
    it.each([
      [
        {
          associatedRoles: { nodes: ['1', '2'] }
        },
        { associatedRoles: ['1', '2'], roleOrClientStatus: null }
      ],
      [
        { cumulativeStatus: 'rep-status' },
        { associatedRoles: undefined, roleOrClientStatus: 'rep-status-text' }
      ]
    ])('returns expected output for %p', (data, expectedOutput) => {
      mockGetRoleStatusText.mockImplementation(status => `${status}-text`)

      const { result } = renderHook(() =>
        useGetAssociatedRolesAndStatus({
          id: encodeEntityId('1', 'CompanyRepresentative'),
          ...data
        } as OfacStatusDataCompanyRepresentativeFragment)
      )

      expect(result.current).toEqual(expectedOutput)
    })
  })

  describe('when fragment associated with Staff', () => {
    describe('when talentCumulativeStatus is defined', () => {
      it('returns roleOrClientStatus', () => {
        const staffCumulativeStatus = {}
        const staffAssociatedRoles = {
          nodes: {}
        }
        const mockedRoleStatusText = {}

        mockGetRoleStatusText.mockReturnValueOnce(mockedRoleStatusText)

        const { result } = renderHook(() =>
          useGetAssociatedRolesAndStatus({
            id: encodeEntityId('1', 'Staff'),
            staffCumulativeStatus,
            staffAssociatedRoles
          } as OfacStatusDataStaffFragment)
        )

        expect(result.current).toEqual({
          roleOrClientStatus: mockedRoleStatusText,
          associatedRoles: staffAssociatedRoles.nodes
        })
      })
    })

    describe('when talentCumulativeStatus is not defined', () => {
      it('returns null for roleOrClientStatus', () => {
        const staffAssociatedRoles = {
          nodes: {}
        }

        const { result } = renderHook(() =>
          useGetAssociatedRolesAndStatus({
            id: encodeEntityId('1', 'Staff'),
            staffAssociatedRoles
          } as OfacStatusDataStaffFragment)
        )

        expect(result.current).toEqual({
          roleOrClientStatus: null,
          associatedRoles: staffAssociatedRoles.nodes
        })
      })
    })
  })
})
