import React, { memo } from 'react'
import { Container, Typography, TypographyOverflow } from '@toptal/picasso'
import { DetailedList } from '@staff-portal/ui'
import { DEFAULT_FULL_DATE_FORMAT } from '@staff-portal/date-time-utils'
import { useUserDateFormatter } from '@staff-portal/current-user'
import { Link } from '@staff-portal/navigation'
import { CommunityLeaderStatus } from '@staff-portal/graphql/staff'

import { CommunityLeader } from '../../types'
import { getCommunityLeaderRole } from '../../services/get-community-leader-role'
import { getCommunityLeaderStatus } from '../../services/get-community-leader-status'
import CommunityLeaderUpdateField from '../CommunityLeaderUpdateField'

type Props = {
  communityLeader: CommunityLeader
  onListChange?: () => void
}

const CommunityLeaderListItemContent = ({
  communityLeader,
  onListChange
}: Props) => {
  const userDateFormatter = useUserDateFormatter()

  const role = getCommunityLeaderRole(communityLeader)

  const status = getCommunityLeaderStatus(
    communityLeader.status as CommunityLeaderStatus
  )

  return (
    <>
      <Container top='small'>
        {/* eslint-disable-next-line @toptal/davinci/no-deprecated-props */}
        <DetailedList
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
            {
              label: 'Country',
              value: role?.location?.country?.name
            },
            {
              label: 'State',
              value: role?.location?.stateName
            },
            { label: 'City', value: role?.location?.cityName },
            {
              label: 'Community Leader Status',
              value: <Typography css={status.css}>{status.label}</Typography>
            },
            {
              label: 'Community Leader Type',
              value: (
                <CommunityLeaderUpdateField
                  communityLeaderData={communityLeader}
                  onListChange={onListChange}
                />
              )
            },
            {
              label: 'Initial Ideas',
              value: communityLeader.application?.initialIdeas
            },
            {
              label: 'Slack Channel of Interest',
              value: communityLeader.application?.slackChannel
            },
            {
              label: 'Is Committed?',
              value: communityLeader.application?.commitment ? 'Yes' : 'No'
            },
            {
              label: 'Application Created At',
              value: communityLeader.application?.createdAt
                ? userDateFormatter(
                    communityLeader.application?.createdAt,
                    DEFAULT_FULL_DATE_FORMAT
                  )
                : null
            },
            {
              label: 'Application Updated At',
              value: communityLeader.application?.updatedAt
                ? userDateFormatter(
                    communityLeader.application?.updatedAt,
                    DEFAULT_FULL_DATE_FORMAT
                  )
                : null
            },
            {
              label: 'CL Requested At',
              value: communityLeader.node?.requestedAt
                ? userDateFormatter(
                    communityLeader.node?.requestedAt,
                    DEFAULT_FULL_DATE_FORMAT
                  )
                : null
            },
            {
              label: 'CL Created At',
              value: communityLeader.node?.createdAt
                ? userDateFormatter(
                    communityLeader.node?.createdAt,
                    DEFAULT_FULL_DATE_FORMAT
                  )
                : null
            }
          ]}
        />
      </Container>
    </>
  )
}

export default memo(CommunityLeaderListItemContent)
