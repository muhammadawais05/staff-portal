import React from 'react'
import {
  Maybe,
  OpportunityStatus as OpportunityStatusType
} from '@staff-portal/graphql/staff'
import { TypographyOverflow } from '@toptal/picasso'
import { titleize } from '@staff-portal/string'
import { NO_VALUE } from '@staff-portal/config'

import { OPPORTUNITIES_STATUS_COLOR_MAPPING } from './constants'

export const OpportunityStatus = ({
  status
}: {
  status: Maybe<OpportunityStatusType> | undefined
}) => {
  if (!status) {
    return <>{NO_VALUE}</>
  }

  return (
    <TypographyOverflow
      weight='semibold'
      data-testid='opportunity-status'
      color={OPPORTUNITIES_STATUS_COLOR_MAPPING[status]}
    >
      {titleize(status)}
    </TypographyOverflow>
  )
}
