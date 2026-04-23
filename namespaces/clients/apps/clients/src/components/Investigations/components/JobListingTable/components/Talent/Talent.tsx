import React from 'react'
import { Typography } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { NO_VALUE } from '@staff-portal/config'

import { Job } from '../../../../types'

interface Props {
  talents?: NonNullable<Job['currentTalents']>['nodes']
  talentsCount?: NonNullable<Job['currentTalents']>['totalCount']
}

const Talent = ({ talentsCount, talents }: Props) => {
  let content

  switch (talentsCount) {
    case 0: {
      content = NO_VALUE
      break
    }
    case 1: {
      const talent = talents?.[0]

      content = (
        <Link href={talent?.webResource.url || ''} data-testid='Talent-link'>
          {talent?.fullName}
        </Link>
      )
      break
    }
    default: {
      content = 'Multiple'
    }
  }

  return <Typography data-testid='Talent-text'>{content}</Typography>
}

export default Talent
