import { Table, Typography } from '@toptal/picasso'
import { Maybe } from '@toptal/picasso/utils'
import React from 'react'
import { EngagementStatus } from '@staff-portal/graphql/staff'
import { getFormattedDateRange } from '@staff-portal/date-time-utils'

import { EngagementBreakFragment } from '../../data/get-engagement-breaks'
import BreakActions from '../BreakActions'

type Props = {
  node: EngagementBreakFragment
  engagementStatus: Maybe<EngagementStatus>
  engagementId: string
}

const BreakRowContent = ({ node, engagementStatus, engagementId }: Props) => {
  const { startDate, endDate } = node
  const { prefix, period } = getFormattedDateRange({
    startDate,
    endDate
  })

  return (
    <>
      <Table.Cell>
        {prefix && (
          <Typography data-testid='break-row-content-prefix' as='span'>
            {prefix}{' '}
          </Typography>
        )}
        <Typography as='span' weight='semibold'>
          {period}
        </Typography>
      </Table.Cell>
      <Table.Cell align='right'>
        <BreakActions
          engagementId={engagementId}
          engagementStatus={engagementStatus}
          node={node}
        />
      </Table.Cell>
    </>
  )
}

export default BreakRowContent
