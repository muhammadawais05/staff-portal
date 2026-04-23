import React from 'react'
import { Container, Button } from '@toptal/picasso'
import { useQuery } from '@staff-portal/data-layer-service'

import { GetMeetingAttendeesCountDocument } from './data'

interface Props {
  meetingUrl: string
  onClick: () => void
}

const ViewAttendeeLogButton = ({ meetingUrl, onClick }: Props) => {
  const { data, loading } = useQuery(GetMeetingAttendeesCountDocument, {
    variables: {
      meetingUrl
    }
  })

  if (loading) {
    return null
  }

  if (data?.meetingEndpoints.totalCount === 0) {
    return null
  }

  return (
    <Container left='xsmall'>
      <Button
        data-testid='meeting-with-field-button'
        size='small'
        variant='secondary'
        onClick={onClick}
      >
        View Attendee Log
      </Button>
    </Container>
  )
}

export default ViewAttendeeLogButton
