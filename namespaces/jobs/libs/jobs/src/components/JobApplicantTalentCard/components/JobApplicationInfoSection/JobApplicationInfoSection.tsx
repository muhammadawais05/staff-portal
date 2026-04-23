import React from 'react'
import { Typography, Container } from '@toptal/picasso'
import { LinkWrapper } from '@staff-portal/ui'
import { getDateDistanceFromNow } from '@staff-portal/date-time-utils'

type Props = {
  createdAt: string
  applicationComment?: string | null
  talentName: string
  talentUrl?: string | null
}

const JobApplicationInfoSection = ({
  createdAt,
  applicationComment,
  talentName,
  talentUrl
}: Props) => {
  return (
    <Container bottom='small'>
      <Typography size='xsmall'>
        <LinkWrapper href={talentUrl ?? ''} wrapWhen={!!talentUrl}>
          {talentName}
        </LinkWrapper>{' '}
        applied to the job {getDateDistanceFromNow(createdAt)} with this
        comment:
      </Typography>
      {applicationComment && (
        <Container top='small'>
          <Typography size='xsmall'>{applicationComment}</Typography>
        </Container>
      )}
    </Container>
  )
}

export default JobApplicationInfoSection
