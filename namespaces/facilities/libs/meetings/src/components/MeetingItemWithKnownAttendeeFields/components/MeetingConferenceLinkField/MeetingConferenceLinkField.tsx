import { Button, Container, Typography } from '@toptal/picasso'
import React from 'react'
import { Link } from '@staff-portal/navigation'

import { MeetingFragment } from '../../../../data/meeting-fragment'

export type Props = Pick<MeetingFragment, 'conferenceLink' | 'moderationUrl'>

const MeetingConferenceLinkField = ({
  conferenceLink,
  moderationUrl
}: Props) => {
  if (!conferenceLink?.url) {
    return null
  }

  return (
    <Container flex justifyContent='space-between' alignItems='center'>
      <Typography size='medium' weight='semibold'>
        <Link
          href={conferenceLink.url}
          target='_blank'
          data-testid='conference-url'
        >
          {conferenceLink.text}
        </Link>
      </Typography>

      {moderationUrl && (
        <Container left='xsmall'>
          <Button
            href={moderationUrl}
            target='_blank'
            data-testid='join-as-moderator'
            size='small'
            variant='secondary'
          >
            Join As Moderator
          </Button>
        </Container>
      )}
    </Container>
  )
}

export default MeetingConferenceLinkField
