import React from 'react'
import { titleize } from '@staff-portal/string'
import { TypographyOverflow } from '@toptal/picasso'

import { JobListItemFragment } from '../JobListItem/data'

interface Props {
  jobType: JobListItemFragment['jobType']
}

const JobTypeField = ({ jobType }: Props) => (
  <TypographyOverflow size='medium' data-testid='job-type'>
    {`${titleize(jobType, {
      capitalizeAllWords: false
    })} job`}
  </TypographyOverflow>
)

export default JobTypeField
