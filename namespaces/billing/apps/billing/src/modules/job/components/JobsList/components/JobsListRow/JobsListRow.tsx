import React, { FC, memo } from 'react'
import { Table } from '@toptal/picasso'
import { JobStatus } from '@staff-portal/jobs'
import LinkWrapper from '@staff-portal/billing/src/components/LinkWrapper'
import { decodeRawIdAndType } from '@staff-portal/billing/src/_lib/helpers/apollo'

import * as S from './styles'
import { renderEngagementLinkOrEmpty } from '../../../../../purchaseOrder/utils/renderEngagementLinkOrEmpty'
import { GetJobListItemFragment } from '../../../data/getJobListItemFragment.graphql.types'

const displayName = 'JobsListRow'

const TableCell = Table.Cell
const TableRow = Table.Row

interface Props {
  job: GetJobListItemFragment
  showJob: boolean
  showEngagement: boolean
  index: number
}

const JobsListRow: FC<Props> = memo<Props>(
  ({ job, showJob, showEngagement, index }) => {
    const { id, title, webResource, engagements } = job

    return (
      <TableRow stripeEven={Boolean(index % 2)} data-testid={displayName}>
        <TableCell css={S.rowCell} data-testid={`${displayName}-job-id`}>
          {showJob && (
            <LinkWrapper href={webResource?.url}>
              {`#${decodeRawIdAndType(id).id}`}
            </LinkWrapper>
          )}
        </TableCell>

        <TableCell css={S.rowCell} data-testid={`${displayName}-engagement-id`}>
          {showEngagement && renderEngagementLinkOrEmpty(engagements?.nodes[0])}
        </TableCell>

        <TableCell css={S.rowCell} data-testid={`${displayName}-job-title`}>
          {title}
        </TableCell>

        <TableCell css={S.rowCell} data-testid={`${displayName}-job-status`}>
          <JobStatus
            job={job}
            data-testid={`${displayName}-jobStatus-component`}
          />
        </TableCell>
      </TableRow>
    )
  }
)

JobsListRow.displayName = displayName

export default JobsListRow
