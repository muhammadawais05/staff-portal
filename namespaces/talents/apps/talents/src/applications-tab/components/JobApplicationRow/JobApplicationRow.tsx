import React from 'react'
import { Tooltip, Table, Typography } from '@toptal/picasso'
import { ColoredStatus, LinkWrapper } from '@staff-portal/ui'
import { getDateDistanceFromNow } from '@staff-portal/date-time-utils'
import { titleize } from '@staff-portal/string'
import { useUserDateTimeFormatter } from '@staff-portal/current-user'

import { JobApplicationFragment } from '../../data/job-application-fragment'
import { JOB_APPLICATION_STATUS_COLOR_MAPPING } from '../../config'
import * as S from './styles'

type Props = {
  jobApplication: JobApplicationFragment
  stripeEven?: boolean
  lastRow?: boolean
  style?: object
}

const JobApplicationRow = ({
  jobApplication: {
    job: {
      client: { webResource: clientLink }
    },
    webResource,
    status,
    createdAt
  },
  stripeEven = false,
  lastRow
}: Props) => {
  const formatDateTime = useUserDateTimeFormatter()
  const statusColor = JOB_APPLICATION_STATUS_COLOR_MAPPING[status]

  const timeZoneText = formatDateTime(createdAt, 'xxxxx')

  return (
    <Table.Row stripeEven={stripeEven} css={lastRow ? S.lastRow : undefined}>
      <Table.Cell>
        <LinkWrapper
          wrapWhen={Boolean(clientLink.url)}
          href={clientLink.url as string}
        >
          {clientLink.text}
        </LinkWrapper>
      </Table.Cell>
      <Table.Cell>
        <LinkWrapper
          wrapWhen={Boolean(webResource.url)}
          href={webResource.url as string}
        >
          {webResource.text}
        </LinkWrapper>
      </Table.Cell>
      <Table.Cell>
        <ColoredStatus status={titleize(status)} color={statusColor} />
      </Table.Cell>
      <Table.Cell>
        <Tooltip content={`${formatDateTime(createdAt)} (UTC${timeZoneText})`}>
          <Typography as='span'>{getDateDistanceFromNow(createdAt)}</Typography>
        </Tooltip>
      </Table.Cell>
    </Table.Row>
  )
}

export default JobApplicationRow
