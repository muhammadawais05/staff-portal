import React from 'react'
import { render } from '@testing-library/react'
import { ContentWrapper } from '@staff-portal/page-wrapper'
import { Redirect } from '@staff-portal/navigation'
import { getDashboardPath, StaffTabUrlHash } from '@staff-portal/routes'
import { TestWrapper } from '@staff-portal/test-utils'
import { NodeStatusMessageNotifications } from '@staff-portal/status-messages'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { ROLE_FLAGS_UPDATED } from '@staff-portal/role-flags'

import { useGetStaffProfile } from '../../data'
import { useGetStaffProfileIdParam, useGetStaffTabs } from '../../hooks'
import {
  getStaffProfileBrowserTitle,
  userCanViewStaffProfile
} from '../../utils'
import StaffProfile from './StaffProfile'
import { STAFF_UPDATED } from '../../messages'

jest.mock('@staff-portal/page-wrapper', () => ({
  ContentWrapper: jest.fn()
}))
jest.mock('@staff-portal/status-messages', () => ({
  NodeStatusMessageNotifications: jest.fn()
}))
jest.mock('../components', () => ({
  StaffProfileActions: jest.fn()
}))
jest.mock('../../utils', () => ({
  getStaffProfileBrowserTitle: jest.fn(),
  userCanViewStaffProfile: jest.fn()
}))
jest.mock('../../data', () => ({
  useGetStaffProfile: jest.fn()
}))
jest.mock('../../hooks', () => ({
  useGetStaffProfileIdParam: jest.fn(),
  useGetStaffTabs: jest.fn()
}))
jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  Redirect: jest.fn()
}))
jest.mock('@staff-portal/routes', () => ({
  getDashboardPath: jest.fn(),
  StaffTabUrlHash: {
    STAFF_PROFILE: 'staff_profile',
    COMMUNITY_LEADER: 'community_leader'
  }
}))
jest.mock('@staff-portal/ofac-compliance', () => ({
  OFACComplianceSection: jest.fn()
}))
jest.mock('@toptal/staff-portal-message-bus', () => ({
  ...jest.requireActual('@toptal/staff-portal-message-bus'),
  useMessageListener: jest.fn()
}))

const renderComponent = () =>
  render(
    <TestWrapper>
      <StaffProfile />
    </TestWrapper>
  )

const MockContentWrapper = ContentWrapper as jest.Mock
const MockRedirect = Redirect as unknown as jest.Mock
const MockNodeStatusMessageNotifications =
  NodeStatusMessageNotifications as jest.Mock
const mockGetStaffProfileBrowserTitle = getStaffProfileBrowserTitle as jest.Mock
const mockUseGetStaffProfileIdParam = useGetStaffProfileIdParam as jest.Mock
const mockUseGetStaffProfile = useGetStaffProfile as jest.Mock
const mockUserCanViewStaffProfile = userCanViewStaffProfile as jest.Mock
const mockGetDashboardPath = getDashboardPath as jest.Mock
const mockUseGetStaffTabs = useGetStaffTabs as jest.Mock
const mockUseMessageListener = useMessageListener as jest.Mock

describe('StaffProfile', () => {
  const browserTitle = 'Hello there'
  const staffId = '123456789'

  beforeEach(() => {
    jest.clearAllMocks()
    MockRedirect.mockReturnValue(null)
    MockContentWrapper.mockImplementation(({ children }) => children)
    mockGetStaffProfileBrowserTitle.mockReturnValue(browserTitle)
    MockNodeStatusMessageNotifications.mockImplementation(() => (
      <span>Hello</span>
    ))
    mockUseGetStaffProfileIdParam.mockReturnValue({
      staffId
    })
    mockUseGetStaffTabs.mockReturnValue({
      label: 'Staff Profile',
      node: null,
      tabHash: StaffTabUrlHash.STAFF_PROFILE
    })
  })

  describe('when user has permissions', () => {
    it('renders content', () => {
      const staffProfile = {
        fullName: 'Alex Casillas',
        about: 'Me, myself and I',
        meetingSchedulers: {}
      }
      const loading = false
      const initialLoading = false
      const refetch = Symbol('refetch')

      mockUseGetStaffProfile.mockReturnValue({
        staffProfile,
        loading,
        initialLoading,
        refetch
      })
      mockUserCanViewStaffProfile.mockReturnValue(true)

      renderComponent()

      expect(MockRedirect).toHaveBeenCalledTimes(0)
      expect(mockUseGetStaffProfile).toHaveBeenCalledTimes(1)
      expect(MockContentWrapper).toHaveBeenCalledTimes(1)
      expect(MockContentWrapper).toHaveBeenCalledWith(
        {
          actions: expect.objectContaining({
            props: {
              staffProfile: {
                fullName: 'Alex Casillas',
                about: 'Me, myself and I',
                meetingSchedulers: {}
              },
              loading
            }
          }),
          additionalStatusMessages: expect.objectContaining({
            props: {
              id: staffId
            }
          }),
          browserTitle: 'Hello there',
          children: null,
          tabs: expect.any(Object),
          title: 'Alex Casillas',
          titleLoading: false
        },
        {}
      )
      expect(mockUseMessageListener).toHaveBeenCalledTimes(2)
      expect(mockUseMessageListener).toHaveBeenNthCalledWith(
        1,
        STAFF_UPDATED,
        expect.any(Function)
      )
      expect(mockUseMessageListener).toHaveBeenNthCalledWith(
        2,
        ROLE_FLAGS_UPDATED,
        refetch
      )
    })
  })

  describe('when user does not have permissions', () => {
    it('redirects to the dashboard', () => {
      const loading = false
      const mockedDashboardValue = {}

      mockUseGetStaffProfile.mockReturnValue({ loading })
      mockUserCanViewStaffProfile.mockReturnValue(false)
      mockGetDashboardPath.mockReturnValue(mockedDashboardValue)

      renderComponent()

      expect(MockRedirect).toHaveBeenCalledTimes(1)
      expect(MockRedirect).toHaveBeenCalledWith(
        {
          to: mockedDashboardValue
        },
        {}
      )
      expect(MockContentWrapper).toHaveBeenCalledTimes(0)
    })
  })
})
