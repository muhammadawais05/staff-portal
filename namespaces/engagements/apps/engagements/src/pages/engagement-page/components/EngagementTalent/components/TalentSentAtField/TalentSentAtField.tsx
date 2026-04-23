import React from 'react'
import { Typography } from '@toptal/picasso'
import { NO_VALUE } from '@staff-portal/config'
import { getDateDistanceFromNow } from '@staff-portal/date-time-utils'
import { useUserDateTimeFormatter } from '@staff-portal/current-user'

export type TalentSentAt = string | null | undefined

type Props = {
  talentSentAt: TalentSentAt
}

const TalentSentAtField = ({ talentSentAt }: Props) => {
  const formatDateTime = useUserDateTimeFormatter()

  return (
    <Typography size='medium'>
      {talentSentAt
        ? `${formatDateTime(talentSentAt)} (${getDateDistanceFromNow(
            talentSentAt
          ).toLowerCase()})`
        : NO_VALUE}
    </Typography>
  )
}

export default TalentSentAtField
