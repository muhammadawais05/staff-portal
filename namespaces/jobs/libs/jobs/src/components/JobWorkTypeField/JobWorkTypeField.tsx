import React from 'react'
import { TypographyOverflow } from '@toptal/picasso'
import { JobWorkType, Maybe } from '@staff-portal/graphql/staff'

import { getJobWorkType } from './utils'

interface Props {
  workType?: Maybe<JobWorkType>
  timeLengthOnsite?: Maybe<number>
}

const JobWorkTypeField = ({ workType, timeLengthOnsite }: Props) => {
  if (!workType) {
    return null
  }

  return (
    <TypographyOverflow size='medium' data-testid='job-work-type'>
      {getJobWorkType(workType, timeLengthOnsite)}
    </TypographyOverflow>
  )
}

export default JobWorkTypeField
