import React from 'react'
import { screen, render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  useUserDateFormatter,
  useUserDateTimeFormatter
} from '@staff-portal/current-user'
import { SkypeField, LastLoginField } from '@staff-portal/role-profile'
import { RolePhoneLink } from '@staff-portal/communication'
import { ProfileHeader } from '@staff-portal/facilities'
import { OperationCallableTypes, RoleStatus } from '@staff-portal/graphql/staff'

import { StaffListItemFragment } from '../../data/get-staffs-list/get-staffs-list.staff.gql.types'
import StaffListItem from './StaffListItem'
import Teams from '../../../../components/Teams/Teams'
import StatusField from '../../../../components/StatusField/StatusField'

jest.mock('@staff-portal/facilities')
jest.mock('@staff-portal/current-user')
jest.mock('@staff-portal/communication')
jest.mock('@staff-portal/role-profile')
jest.mock('../../../../components/StatusField/StatusField')
jest.mock('../../../../components/Teams/Teams')
jest.mock('./components/StaffListItemActions/StaffListItemActions', () => ({
  __esModule: true,
  default: () => <div />
}))

const mockUseUserDateFormatter = useUserDateFormatter as jest.Mock
const mockUseUserDateTimeFormatter = useUserDateTimeFormatter as jest.Mock

const MockSkypeField = SkypeField as jest.Mock
const MockLastLoginField = LastLoginField as jest.Mock
const MockRolePhoneLink = RolePhoneLink as jest.Mock
const MockTeams = Teams as jest.Mock
const MockStatusField = StatusField as jest.Mock
const MockProfileHeader = ProfileHeader as jest.Mock

const renderComponent = (staff: StaffListItemFragment) => {
  mockUseUserDateFormatter.mockImplementation(() => jest.fn())
  mockUseUserDateTimeFormatter.mockImplementation(() => jest.fn())
  MockSkypeField.mockImplementation(() => null)
  MockLastLoginField.mockImplementation(() => null)
  MockRolePhoneLink.mockImplementation(() => null)
  MockTeams.mockImplementation(() => null)
  MockStatusField.mockImplementation(() => null)
  MockProfileHeader.mockImplementation(() => null)

  return render(
    <TestWrapper>
      <StaffListItem staff={staff} />
    </TestWrapper>
  )
}

const staffMock = {
  id: '123',
  fullName: 'Andrei Mocanu',
  cumulativeStatusV2: RoleStatus.ACTIVE,
  roleTitle: 'Staff',
  ipLocationV2: {
    cityName: 'Bucharest',
    countryName: 'Romania',
    stateName: 'State'
  },
  locationV2: {
    country: {
      id: '234',
      name: 'Romania'
    }
  },
  teams: {
    nodes: [
      {
        id: '1',
        name: 'McLaren'
      }
    ]
  },
  timeZone: {
    name: 'UTC'
  },
  currentSignInIp: '128.1.1.1',
  skype: 'andrei.mocanu',
  email: 'andrei.mocanu123test@toptal.net',
  webResource: {
    url: 'https://staff-portal.toptal.net/'
  },
  operations: {
    deactivateStaff: {
      callable: OperationCallableTypes.HIDDEN,
      messages: []
    },
    reactivateStaff: {
      callable: OperationCallableTypes.HIDDEN,
      messages: []
    }
  }
}

describe('StaffListItem', () => {
  describe('when we receive the proper data', () => {
    it('calls the components and displays the data', () => {
      renderComponent(staffMock as StaffListItemFragment)

      expect(MockProfileHeader).toHaveBeenCalledTimes(1)
      expect(MockProfileHeader).toHaveBeenCalledWith(
        {
          id: '123',
          children: expect.anything()
        },
        {}
      )

      expect(screen.getByTestId('item-field: Email')).toHaveTextContent(
        'andrei.mocanu123test@toptal.net'
      )
      expect(
        screen.getByTestId('item-field: Current Country')
      ).toHaveTextContent('Romania')

      expect(MockSkypeField).toHaveBeenCalledTimes(1)
      expect(MockSkypeField).toHaveBeenCalledWith(
        {
          color: undefined,
          size: 'medium',
          skypeId: 'andrei.mocanu',
          weight: 'semibold'
        },
        expect.anything()
      )

      expect(MockLastLoginField).toHaveBeenCalledTimes(1)
      expect(MockLastLoginField).toHaveBeenCalledWith(
        {
          ip: '128.1.1.1',
          ipLocation: {
            cityName: 'Bucharest',
            countryName: 'Romania',
            stateName: 'State'
          },
          size: 'medium',
          weight: 'semibold'
        },
        expect.anything()
      )

      expect(MockTeams).toHaveBeenCalledTimes(1)
      expect(MockTeams).toHaveBeenCalledWith(
        {
          teams: {
            nodes: [
              {
                id: '1',
                name: 'McLaren'
              }
            ]
          },
          color: undefined,
          staffId: '123',
          size: 'medium',
          weight: 'semibold'
        },
        {}
      )

      expect(MockStatusField).toHaveBeenCalledTimes(1)
      expect(MockStatusField).toHaveBeenCalledWith(
        {
          cumulativeStatus: RoleStatus.ACTIVE,
          color: undefined,
          size: 'medium',
          weight: 'semibold'
        },
        expect.anything()
      )
    })
  })

  describe('when we don`t receive the proper data', () => {
    it('does not call the components', () => {
      renderComponent({
        id: '1',
        fullName: 'A',
        roleTitle: 'A',
        webResource: { url: 'a' },
        email: 'a'
      } as StaffListItemFragment)

      expect(MockRolePhoneLink).toHaveBeenCalledTimes(0)
      expect(MockStatusField).toHaveBeenCalledTimes(0)
      expect(MockLastLoginField).toHaveBeenCalledTimes(0)
      expect(MockTeams).toHaveBeenCalledTimes(0)
    })
  })
})
