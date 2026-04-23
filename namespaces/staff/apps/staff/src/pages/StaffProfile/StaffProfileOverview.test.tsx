import React from 'react'
import { render } from '@testing-library/react'
import { Redirect } from '@staff-portal/navigation'
import { getDashboardPath } from '@staff-portal/routes'
import { OFACComplianceSection } from '@staff-portal/ofac-compliance'
import { TestWrapper } from '@staff-portal/test-utils'
import { useMessageListener } from '@toptal/staff-portal-message-bus'

import { useGetStaffProfile } from '../../data'
import { useGetStaffProfileIdParam } from '../../hooks'
import {
  ProfileSection,
  AboutSection,
  CalendarSection,
  BookingPagesSection
} from '../../sections'
import { StaffProfileActions } from '../components'
import {
  getStaffProfileBrowserTitle,
  userCanViewStaffProfile
} from '../../utils'
import StaffProfileOverview from './StaffProfileOverview'

const STAFF_UPDATED = 'STAFF_UPDATED'
const OFAC_UPDATED = 'OFAC_UPDATED'

jest.mock('../../components', () => ({
  StaffProfileStatusMessages: jest.fn()
}))
jest.mock('../../sections', () => ({
  ProfileSection: jest.fn(),
  AboutSection: jest.fn(),
  BookingPagesSection: jest.fn(),
  CalendarSection: jest.fn()
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
  useGetStaffProfileIdParam: jest.fn()
}))
jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  Redirect: jest.fn()
}))
jest.mock('@staff-portal/routes', () => ({
  getDashboardPath: jest.fn()
}))
jest.mock('@staff-portal/ofac-compliance', () => ({
  OFAC_UPDATED: OFAC_UPDATED,
  OFACComplianceSection: jest.fn()
}))
jest.mock('@toptal/staff-portal-message-bus', () => ({
  ...jest.requireActual('@toptal/staff-portal-message-bus'),
  useMessageListener: jest.fn()
}))
jest.mock('../../messages', () => ({
  STAFF_UPDATED: STAFF_UPDATED
}))

const renderComponent = () =>
  render(
    <TestWrapper>
      <StaffProfileOverview />
    </TestWrapper>
  )

const MockStaffProfileActions = StaffProfileActions as jest.Mock
const MockProfileSection = ProfileSection as jest.Mock
const MockAboutSection = AboutSection as jest.Mock
const MockBookingPagesSection = BookingPagesSection as jest.Mock
const MockRedirect = Redirect as unknown as jest.Mock
const MockCalendarSection = CalendarSection as unknown as jest.Mock
const MockOFACComplianceSection = OFACComplianceSection as unknown as jest.Mock
const mockGetStaffProfileBrowserTitle = getStaffProfileBrowserTitle as jest.Mock
const mockUseGetStaffProfileIdParam = useGetStaffProfileIdParam as jest.Mock
const mockUseGetStaffProfile = useGetStaffProfile as jest.Mock
const mockUserCanViewStaffProfile = userCanViewStaffProfile as jest.Mock
const mockGetDashboardPath = getDashboardPath as jest.Mock
const mockUseMessageListener = useMessageListener as jest.Mock

describe('StaffProfile', () => {
  const browserTitle = {}
  const staffId = {}

  beforeEach(() => {
    MockRedirect.mockReturnValueOnce(null)
    MockStaffProfileActions.mockReturnValueOnce(null)
    MockProfileSection.mockReturnValueOnce(null)
    MockAboutSection.mockReturnValueOnce(null)
    MockBookingPagesSection.mockReturnValueOnce(null)
    MockOFACComplianceSection.mockReturnValueOnce(null)
    MockCalendarSection.mockReturnValueOnce(null)
    mockUseMessageListener.mockReturnValueOnce(null).mockReturnValueOnce(null)
    mockGetStaffProfileBrowserTitle.mockReturnValueOnce(browserTitle)
    mockUseGetStaffProfileIdParam.mockReturnValueOnce({ staffId })
  })

  describe('when user has permissions', () => {
    it('renders content', () => {
      const staffProfile = {
        fullName: {},
        about: {},
        meetingSchedulers: {}
      }
      const loading = {}
      const initialLoading = {}

      mockUseGetStaffProfile.mockReturnValueOnce({
        staffProfile,
        loading,
        initialLoading
      })
      mockUserCanViewStaffProfile.mockReturnValueOnce(true)

      renderComponent()

      expect(MockRedirect).toHaveBeenCalledTimes(0)
      expect(mockUseGetStaffProfile).toHaveBeenCalledTimes(1)
      expect(mockUseGetStaffProfile).toHaveBeenCalledWith(staffId)
      expect(MockProfileSection).toHaveBeenCalledTimes(1)
      expect(MockProfileSection).toHaveBeenCalledWith(
        {
          loading,
          initialLoading
        },
        {}
      )
      expect(MockAboutSection).toHaveBeenCalledTimes(1)
      expect(MockAboutSection).toHaveBeenCalledWith(
        {
          loading,
          initialLoading,
          about: staffProfile.about
        },
        {}
      )
      expect(MockBookingPagesSection).toHaveBeenCalledTimes(1)
      expect(MockBookingPagesSection).toHaveBeenCalledWith(
        {
          loading,
          initialLoading,
          meetingSchedulers: staffProfile.meetingSchedulers
        },
        {}
      )
      expect(MockOFACComplianceSection).toHaveBeenCalledTimes(1)
      expect(MockOFACComplianceSection).toHaveBeenCalledWith(
        {
          nodeId: staffId,
          sectionVariant: 'withHeaderBar',
          listenedMessages: ['OFAC_UPDATED']
        },
        {}
      )
      expect(MockCalendarSection).toHaveBeenCalledTimes(1)
      expect(MockCalendarSection).toHaveBeenCalledWith(
        {
          staffId
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
        OFAC_UPDATED,
        expect.any(Function)
      )
    })
  })

  describe('when user does not have permissions', () => {
    it('redirects to the dashboard', () => {
      const loading = false
      const mockedDashboardValue = {}

      mockUseGetStaffProfile.mockReturnValueOnce({ loading })
      mockUserCanViewStaffProfile.mockReturnValueOnce(false)
      mockGetDashboardPath.mockReturnValueOnce(mockedDashboardValue)

      renderComponent()

      expect(MockRedirect).toHaveBeenCalledTimes(1)
      expect(MockRedirect).toHaveBeenCalledWith(
        {
          to: mockedDashboardValue
        },
        {}
      )
    })
  })
})
