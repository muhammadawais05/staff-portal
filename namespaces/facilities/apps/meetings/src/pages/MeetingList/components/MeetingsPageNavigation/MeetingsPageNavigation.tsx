import React from 'react'
import { Link } from '@staff-portal/navigation'
// eslint-disable-next-line
import { Button, Link as PicassoLink } from '@toptal/picasso'
import { MeetingPeriodEnum } from '@staff-portal/graphql/staff'
import { buildMeetingsPath } from '@staff-portal/routes'

import { MEETING_CATEGORY_TITLE } from '../../constants'

export interface Props {
  category: MeetingPeriodEnum
}

const MeetingsPageNavigation = ({ category }: Props) => {
  return (
    <div>
      {Object.entries(MEETING_CATEGORY_TITLE)
        .filter(([meetingCategory]) => meetingCategory !== category)
        .map(([meetingCategory, title]) => (
          <Button
            key={meetingCategory}
            as={Link as typeof PicassoLink}
            href={buildMeetingsPath(meetingCategory as MeetingPeriodEnum)}
            size='small'
            variant='secondary'
          >
            {title}
          </Button>
        ))}
    </div>
  )
}

export default MeetingsPageNavigation
