import React from 'react'
import { Redirect } from '@staff-portal/navigation'
import { getDashboardPath } from '@staff-portal/routes'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import {
  OFACComplianceSection,
  OFAC_UPDATED
} from '@staff-portal/ofac-compliance'
import { Container } from '@toptal/picasso'

import { useGetStaffProfile } from '../../data'
import { useGetStaffProfileIdParam } from '../../hooks'
import {
  ProfileSection,
  AboutSection,
  BookingPagesSection,
  CalendarSection
} from '../../sections'
import { STAFF_UPDATED } from '../../messages'
import { userCanViewStaffProfile } from '../../utils'
import { StaffContextProvider } from '../../context/StaffContext'

const StaffProfileOverview = () => {
  const { staffId } = useGetStaffProfileIdParam()
  const { staffProfile, loading, initialLoading, refetch, error } =
    useGetStaffProfile(staffId)

  useMessageListener(
    STAFF_UPDATED,
    ({ staffId: staffProfileId }) => staffId === staffProfileId && refetch()
  )
  useMessageListener(
    OFAC_UPDATED,
    ({ nodeId }) => nodeId === staffId && refetch()
  )

  if (!loading && !userCanViewStaffProfile(staffProfile)) {
    return <Redirect to={getDashboardPath()} />
  }

  return (
    <StaffContextProvider error={error} staffProfile={staffProfile}>
      <ProfileSection
        loading={loading}
        initialLoading={initialLoading}
      />
      <AboutSection
        loading={loading}
        initialLoading={initialLoading}
        about={staffProfile?.about}
      />
      <Container top='medium'>
        <OFACComplianceSection
          nodeId={staffId}
          sectionVariant='withHeaderBar'
          listenedMessages={[OFAC_UPDATED]}
        />
      </Container>
      <BookingPagesSection
        loading={loading}
        initialLoading={initialLoading}
        meetingSchedulers={staffProfile?.meetingSchedulers}
      />
      <CalendarSection staffId={staffId} />
    </StaffContextProvider>
  )
}

export default StaffProfileOverview
