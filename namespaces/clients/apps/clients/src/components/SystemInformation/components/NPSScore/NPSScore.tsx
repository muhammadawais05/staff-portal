import React from 'react'
import { Typography } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import {
  DEFAULT_DATE_FORMAT,
  parseAndFormatDate
} from '@staff-portal/date-time-utils'

import { SystemInformationFragment } from '../../data'

interface Props {
  lastAnsweredPromotion: SystemInformationFragment['lastAnsweredPromotion']
  promotions: SystemInformationFragment['promotions']
  timeZone?: string
}

const NPSScore = ({ lastAnsweredPromotion, promotions, timeZone }: Props) => {
  return (
    <Typography weight='semibold' size='medium'>
      <Link
        href={promotions?.webResource.url || ''}
        data-testid='NPSScore-link'
      >
        {`${lastAnsweredPromotion?.score} (${parseAndFormatDate(
          lastAnsweredPromotion?.updatedAt,
          {
            dateFormat: DEFAULT_DATE_FORMAT,
            timeZone
          }
        )})`}
      </Link>
    </Typography>
  )
}

export default NPSScore
