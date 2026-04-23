import React from 'react'
import { TypographyOverflow } from '@toptal/picasso'
import { getDateDistanceFromNow } from '@staff-portal/date-time-utils'

export interface Props {
  applicationDate?: string
}

const JobApplicantsApplied = ({ applicationDate }: Props) => {
  if (!applicationDate) {
    return null
  }

  return (
    <TypographyOverflow>
      {getDateDistanceFromNow(applicationDate)}
    </TypographyOverflow>
  )
}

export default JobApplicantsApplied
