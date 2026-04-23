import {
  Container,
  QuestionMark16,
  Time16,
  Tooltip,
  Typography
} from '@toptal/picasso'
import React from 'react'
import { FieldWithTooltipOverIcon } from '@staff-portal/ui'
import {
  getEngagementStatusColor,
  getEngagementStatusTooltip,
  getEngagementDetailedStatus
} from '@staff-portal/engagements-interviews'

import { HiredTalentEngagementFragment } from '../../data/get-hired-talent/get-hired-talent.staff.gql.types'

interface Props {
  engagement: HiredTalentEngagementFragment
}

const HiredTalentStatus = ({ engagement }: Props) => {
  const {
    status,
    cumulativeStatus,
    interview,
    timeZone,
    tooltipStatus,
    engagementEndedFeedbackReason,
    postponedPerformedAction
  } = engagement
  const color =
    status && cumulativeStatus
      ? getEngagementStatusColor({
          status,
          cumulativeStatus,
          interview
        })
      : undefined
  const tooltip =
    tooltipStatus &&
    getEngagementStatusTooltip(
      { cumulativeStatus },
      {
        type: 'default',
        tooltipStatus,
        engagementEndedFeedbackReason,
        postponedPerformedAction
      }
    )

  return (
    <Container
      inline
      as='span'
      flex
      alignItems='center'
      data-testid='HiredTalentStatus'
    >
      <FieldWithTooltipOverIcon tooltip={timeZone?.value} icon={<Time16 />}>
        <Typography
          inline
          as='span'
          color={color}
          size='medium'
          weight='regular'
        >
          {getEngagementDetailedStatus(engagement)}
        </Typography>
      </FieldWithTooltipOverIcon>
      {tooltip && (
        <Tooltip interactive content={tooltip}>
          <Container
            data-testid='HiredTalentStatus-additional-info'
            left='xsmall'
            inline
            as='span'
            flex
            alignItems='center'
          >
            <QuestionMark16 />
          </Container>
        </Tooltip>
      )}
    </Container>
  )
}

export default HiredTalentStatus
