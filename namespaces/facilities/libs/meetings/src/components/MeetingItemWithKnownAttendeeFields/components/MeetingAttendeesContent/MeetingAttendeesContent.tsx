import React, { useState } from 'react'
import { Typography, Container } from '@toptal/picasso'
import { Pagination, getPaginationOffset } from '@staff-portal/filters'

import { MeetingFragment } from '../../../../data/meeting-fragment'
import { useGetMeetingAttendees } from './data'
import MeetingAttendeeTable from '../MeetingAttendeeTable'
import MeetingAttendeeTableRow from '../MeetingAttendeeTableRow'
import MeetingAttendeesTableLoader from './MeetingAttendeesTableLoader'

export interface Props {
  conferenceLink: MeetingFragment['conferenceLink']
}

const LIMIT = 30

const MeetingAttendeesContent = ({ conferenceLink }: Props) => {
  const [page, setNewPage] = useState(1)
  const { data, loading } = useGetMeetingAttendees(
    {
      meetingUrl: conferenceLink?.url ?? '',
      pagination: {
        limit: LIMIT,
        offset: getPaginationOffset(page, LIMIT)
      }
    },
    !conferenceLink?.url
  )

  if (loading) {
    return <MeetingAttendeesTableLoader />
  }

  return (
    <Container bottom='medium'>
      {!data?.meetingEndpoints.totalCount ? (
        <Typography>No Attendees</Typography>
      ) : (
        <MeetingAttendeeTable>
          {data?.meetingEndpoints.nodes.map((node, index) => (
            <MeetingAttendeeTableRow
              key={node.id}
              attendeesLogs={node}
              stripeEven={Boolean(index % 2)}
            />
          ))}
        </MeetingAttendeeTable>
      )}
      <Container top='medium' justifyContent='center' flex>
        <Pagination
          activePage={page}
          onPageChange={setNewPage}
          limit={LIMIT}
          itemCount={data?.meetingEndpoints.totalCount}
        />
      </Container>
    </Container>
  )
}

export default MeetingAttendeesContent
