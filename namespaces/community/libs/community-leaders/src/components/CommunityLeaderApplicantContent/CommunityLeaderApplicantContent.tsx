import React, { memo } from 'react'
import {
  Container,
  Tooltip,
  Typography,
  TypographyOverflow
} from '@toptal/picasso'
import { DetailedList } from '@staff-portal/ui'
import {
  CommunityLeaderApplicationStatus,
  CommunityLeaderStatus
} from '@staff-portal/graphql/staff'
import { DEFAULT_FULL_DATE_FORMAT } from '@staff-portal/date-time-utils'
import { useUserDateFormatter } from '@staff-portal/current-user'
import { Link } from '@staff-portal/navigation'

import {
  CommunityLeaderApplicationData,
  CommunityLeaderApplicationNode
} from '../../types'
import { getCommunityLeaderType } from '../../services/get-community-leader-type'
import { getCommunityLeaderRole } from '../../services/get-community-leader-role'
import {
  getCommunityLeaderApplicationStatus,
  getCommunityLeaderStatus
} from '../../services/get-community-leader-status'

interface Props {
  communityLeader: CommunityLeaderApplicationNode
}

const CommunityLeaderApplicantContent = ({ communityLeader }: Props) => {
  const userDateFormatter = useUserDateFormatter()

  const {
    createdAt,
    updatedAt,
    type,
    commitment,
    slackChannel,
    initialIdeas,
    holdComment
  } = communityLeader.application as CommunityLeaderApplicationData

  const role = getCommunityLeaderRole(communityLeader)

  const status = getCommunityLeaderStatus(
    communityLeader.status as CommunityLeaderStatus
  )

  const applicationStatus = getCommunityLeaderApplicationStatus(
    communityLeader.application?.status as CommunityLeaderApplicationStatus
  )

  return (
    <Container top='small'>
      {/* eslint-disable-next-line @toptal/davinci/no-deprecated-props */}
      <DetailedList
        striped
        defaultValue='—'
        labelColumnWidth={10}
        columns={2}
        items={[
          {
            label: 'Email',
            value: (
              <TypographyOverflow>
                <Link href={`mailto:${role?.email}`}>{role?.email}</Link>
              </TypographyOverflow>
            )
          },
          { label: 'Country', value: role?.location?.country?.name },
          { label: 'State', value: role?.location?.stateName },
          { label: 'City', value: role?.location?.cityName },
          {
            label: 'Community Leader Status',
            value:
              communityLeader.status === CommunityLeaderStatus.ON_HOLD ? (
                <Container as='span' flex inline>
                  <Tooltip content={holdComment} placement='top-start'>
                    <Typography color='yellow'> Paused </Typography>
                  </Tooltip>
                </Container>
              ) : (
                <Typography css={status.css}>{status.label}</Typography>
              )
          },
          {
            label: 'Community Leader Type',
            value: type ? getCommunityLeaderType(type) : null
          },
          {
            label: 'Initial Ideas',
            value: initialIdeas
          },
          {
            label: 'Application Status',
            value: (
              <Typography css={applicationStatus.css}>
                {applicationStatus.label}
              </Typography>
            )
          },
          {
            label: 'Application Created At',
            value: createdAt
              ? userDateFormatter(createdAt, DEFAULT_FULL_DATE_FORMAT)
              : null
          },
          {
            label: 'Application Updated At',
            value: updatedAt
              ? userDateFormatter(updatedAt, DEFAULT_FULL_DATE_FORMAT)
              : null
          },
          {
            label: 'Is Committed?',
            value: commitment ? 'Yes' : 'No'
          },
          {
            label: 'Slack Channel of Interest',
            value: slackChannel,
            hidden: !slackChannel
          }
        ]}
      />
    </Container>
  )
}

export default memo(CommunityLeaderApplicantContent)
