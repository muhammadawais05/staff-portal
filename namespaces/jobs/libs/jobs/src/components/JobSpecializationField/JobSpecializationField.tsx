import React from 'react'
import { TypographyOverflow } from '@toptal/picasso'
import { NO_VALUE } from '@staff-portal/config'

import { JobListItemFragment } from '../JobListItem/data'

interface Props {
  specialization: JobListItemFragment['specialization']
}

const JobSpecializationField = ({ specialization }: Props) => (
  <TypographyOverflow size='medium' data-testid='job-specialization'>
    {specialization?.title || NO_VALUE}
  </TypographyOverflow>
)

export default JobSpecializationField
