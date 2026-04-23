import React from 'react'
import { Table, Typography, TypographyOverflow } from '@toptal/picasso'
import { ColoredStatus } from '@staff-portal/ui'
import { getDateDistanceFromNow } from '@staff-portal/date-time-utils'
import { titleize } from '@staff-portal/string'

import { AvailabilityRequestsFragment } from '../../data/availability-requests-fragment'
import { AVAILABILITY_REQUESTS_COLOR_MAPPING } from '../../config'
import AvailabilityRequestAction from '../AvailabilityRequestAction'
import AvailabilityRequestTitle from '../AvailabilityRequestTitle'
import * as S from './styles'

export interface Props {
  availabilityRequest: AvailabilityRequestsFragment
  stripeEven?: boolean
}

const AvailabilityRequestRow = ({
  availabilityRequest: {
    status,
    createdAt,
    candidateStatus,
    sendCandidateUrl,
    job: {
      webResource: jobLink,
      client: { webResource: clientLink }
    }
  },
  stripeEven
}: Props) => {
  const statusColor = AVAILABILITY_REQUESTS_COLOR_MAPPING[status]

  return (
    <Table.Row stripeEven={stripeEven}>
      <Table.Cell css={S.halfWidth} titleCase>
        <TypographyOverflow
          tooltipContent={
            <Typography invert>
              <AvailabilityRequestTitle
                jobLink={jobLink}
                clientLink={clientLink}
                color='white'
              />
            </Typography>
          }
        >
          <AvailabilityRequestTitle jobLink={jobLink} clientLink={clientLink} />
        </TypographyOverflow>
      </Table.Cell>
      <Table.Cell>
        <ColoredStatus status={titleize(status)} color={statusColor} />
      </Table.Cell>
      <Table.Cell css={S.noWrap}>
        {getDateDistanceFromNow(createdAt)}
      </Table.Cell>
      <Table.Cell>
        <AvailabilityRequestAction
          candidateStatus={candidateStatus}
          sendCandidateUrl={sendCandidateUrl}
        />
      </Table.Cell>
    </Table.Row>
  )
}

export default AvailabilityRequestRow
