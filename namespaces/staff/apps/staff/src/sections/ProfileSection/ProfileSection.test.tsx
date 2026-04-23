import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { AddRoleFlagButton } from '@staff-portal/role-flags'
import { ProfileHeader } from '@staff-portal/facilities'
import { TestWrapper } from '@staff-portal/test-utils'
import { Avatar } from '@toptal/picasso'

import ProfileSection from './ProfileSection'
import { GetStaffProfileQuery } from '../../data/get-staff-profile.staff.gql.types'
import { AccountOverview } from './components'
import { useStaffContext } from '../../context/StaffContext'

jest.mock('@staff-portal/role-flags', () => ({
  AddRoleFlagButton: jest.fn()
}))
jest.mock('@staff-portal/facilities', () => ({
  ProfileHeader: jest.fn()
}))
jest.mock('./components', () => ({
  AccountOverview: jest.fn()
}))
jest.mock('../../context/StaffContext', () => ({
  useStaffContext: jest.fn()
}))

const MockAddRoleFlagButton = AddRoleFlagButton as jest.Mock
const MockProfileHeader = ProfileHeader as jest.Mock
const MockAccountOverview = AccountOverview as jest.Mock
const mockUseStaffContext = useStaffContext as jest.Mock

const renderComponent = (props: ComponentProps<typeof ProfileSection>) =>
  render(
    <TestWrapper>
      <ProfileSection {...props} />
    </TestWrapper>
  )

describe('ProfileSection', () => {
  beforeEach(() => {
    MockAddRoleFlagButton.mockReturnValueOnce(null)
    MockAccountOverview.mockReturnValueOnce(null)
    MockProfileHeader.mockReturnValueOnce(null)
  })

  describe('when staffProfile is not provided', () => {
    it('does not render both action and profile header', () => {
      mockUseStaffContext.mockReturnValueOnce({ staffProfile: undefined })

      renderComponent({
        loading: true,
        initialLoading: true
      })

      expect(MockAddRoleFlagButton).toHaveBeenCalledTimes(0)
      expect(MockProfileHeader).toHaveBeenCalledTimes(0)
      expect(MockAccountOverview).toHaveBeenCalledTimes(0)
    })
  })

  describe('when staffProfile is provided', () => {
    it('renders both action and profile header', () => {
      const id = {}
      const fullName = {}
      const addRoleFlag = {}
      const photoDefault = {}
      const staffProfile = {
        id,
        fullName,
        operations: {
          addRoleFlag
        },
        photo: {
          default: photoDefault
        }
      } as GetStaffProfileQuery['node']

      mockUseStaffContext.mockReturnValueOnce({ staffProfile })

      renderComponent({
        loading: false,
        initialLoading: false
      })

      expect(MockAddRoleFlagButton).toHaveBeenCalledTimes(1)
      expect(MockAddRoleFlagButton).toHaveBeenCalledWith(
        {
          roleId: id,
          fullName,
          operation: addRoleFlag
        },
        {}
      )
      expect(MockProfileHeader).toHaveBeenCalledTimes(1)
      expect(MockProfileHeader).toHaveBeenCalledWith(
        {
          id,
          children: expect.objectContaining({
            type: Avatar,
            props: {
              size: 'small',
              name: fullName,
              src: photoDefault,
              variant: 'square'
            }
          })
        },
        {}
      )
      expect(MockAccountOverview).toHaveBeenCalledTimes(1)
      expect(MockAccountOverview).toHaveBeenCalledWith({}, {})
    })
  })
})
