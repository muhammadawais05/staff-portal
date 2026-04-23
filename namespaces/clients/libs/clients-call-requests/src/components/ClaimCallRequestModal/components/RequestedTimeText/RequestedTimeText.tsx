import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { useGetCurrentUser } from '@staff-portal/current-user'

import { CallRequestType } from '../../../../enums'
import FormattedTimeText from '../FormattedTimeText'
import { getClientNameWithFallback } from '../../utils/get-client-name-with-fallback'

export interface Props {
  type?: string | null
  requestedStartTime?: string | null
  name?: string | null
}

const RequestedTimeText = ({ type, requestedStartTime, name }: Props) => {
  const user = useGetCurrentUser()
  const timeZoneName = user?.timeZone?.name

  return (
    <Container bottom='medium'>
      <Typography size='medium' data-testid='requested-time-text'>
        {`${getClientNameWithFallback(name)} has requested a call back `}
        {(type === CallRequestType.INSTANT ||
          type === CallRequestType.SEAMLESS) && (
          <Typography as='span' weight='semibold'>
            now.
          </Typography>
        )}
        {type === CallRequestType.SCHEDULED && requestedStartTime && (
          <Typography as='span'>
            on{' '}
            <FormattedTimeText
              requestedStartTime={requestedStartTime}
              timeZoneName={timeZoneName}
            />
          </Typography>
        )}
      </Typography>
    </Container>
  )
}

export default RequestedTimeText
