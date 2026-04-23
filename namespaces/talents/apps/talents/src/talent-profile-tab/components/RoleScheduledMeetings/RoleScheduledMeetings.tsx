import { useMessageListener } from '@toptal/staff-portal-message-bus'
import React, { memo } from 'react'
import { SectionProps } from '@toptal/picasso/Section'
import { useNotifications } from '@staff-portal/error-handling'
import { TALENT_UPDATED } from '@staff-portal/talents'
import { ScheduledMeetings } from '@staff-portal/meetings'

import { GetRoleScheduledMeetingsQuery } from './data/get-role-meetings.staff.gql.types'
import { useGetRoleScheduledMeetings } from './data/get-role-meetings.staff.gql'

interface Props {
  roleId: string
  sectionVariant?: SectionProps['variant']
}

const RoleScheduledMeetings = ({
  roleId,
  sectionVariant = 'default'
}: Props) => {
  const { showDevError } = useNotifications()
  const { data, loading, refetch } = useGetRoleScheduledMeetings({
    id: roleId,
    onError: () => showDevError('Unable to load role scheduled meetings.')
  })

  useMessageListener(
    [TALENT_UPDATED],
    ({ talentId: id }) => id === roleId && refetch()
  )

  if (loading || !data) {
    return null
  }

  const { type, roleTitle, fullName, scheduledMeetings, scheduleMeetingUrl } =
    data

  if (!scheduledMeetings?.nodes) {
    return null
  }

  return (
    <ScheduledMeetings<GetRoleScheduledMeetingsQuery>
      refetch={refetch}
      loading={loading}
      type={type}
      roleTitle={roleTitle}
      fullName={fullName}
      scheduleMeetingUrl={scheduleMeetingUrl}
      scheduledMeetings={scheduledMeetings.nodes}
      sectionVariant={sectionVariant}
    />
  )
}

export default memo(RoleScheduledMeetings)
