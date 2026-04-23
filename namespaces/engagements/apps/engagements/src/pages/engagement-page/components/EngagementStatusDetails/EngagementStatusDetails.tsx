import { Container, Typography } from '@toptal/picasso'
import React from 'react'
import { EngagementStatus as EngagementStatusType } from '@staff-portal/graphql/staff'
import { getDateDistanceFromNow } from '@staff-portal/date-time-utils'
import { NO_VALUE } from '@staff-portal/config'

import { EngagementStatusFragment } from '../EngagementStatusSection/data'
import { getEngagementStatusDetails } from './utils'

export interface Props {
  engagement: EngagementStatusFragment & {
    status: EngagementStatusType
  }
}

const EngagementStatusDetails = ({ engagement }: Props) => {
  const { message, comment, occurredAt } =
    getEngagementStatusDetails(engagement)

  if (!message) {
    return <>{NO_VALUE}</>
  }

  return (
    <>
      <Typography size='medium' data-testid='EngagementStatusDetails-message'>
        {message}
      </Typography>
      {!!comment && !!occurredAt && (
        <Container top='xsmall'>
          <Typography
            size='medium'
            as='div'
            data-testid='EngagementStatusDetails-comment'
          >
            {comment}
          </Typography>
          <Typography
            size='xsmall'
            as='div'
            data-testid='EngagementStatusDetails-date'
          >
            {getDateDistanceFromNow(occurredAt)}
          </Typography>
        </Container>
      )}
    </>
  )
}

export default EngagementStatusDetails
