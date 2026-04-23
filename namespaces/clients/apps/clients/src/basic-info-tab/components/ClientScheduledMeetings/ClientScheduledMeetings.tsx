import React from 'react'
import { Container } from '@toptal/picasso'
import { ScheduledMeetings } from '@staff-portal/meetings'

import { GetClientScheduledMeetingsQuery } from './data/get-client-meetings.staff.gql.types'
import { useGetClientScheduledMeetings } from './data/get-client-meetings.staff.gql'

interface Props {
  companyId: string
}

const ClientScheduledMeetings = ({ companyId }: Props) => {
  const { data, loading, refetch } = useGetClientScheduledMeetings({
    id: companyId
  })

  if (loading || !data) {
    return null
  }

  const { type, fullName, scheduledMeetings, scheduleMeetingUrl } = data

  return (
    <Container top='medium'>
      <ScheduledMeetings<GetClientScheduledMeetingsQuery>
        refetch={refetch}
        loading={loading}
        type={type}
        fullName={fullName}
        scheduleMeetingUrl={scheduleMeetingUrl}
        scheduledMeetings={scheduledMeetings?.nodes || []}
        sectionVariant='withHeaderBar'
      />
    </Container>
  )
}

export default ClientScheduledMeetings
