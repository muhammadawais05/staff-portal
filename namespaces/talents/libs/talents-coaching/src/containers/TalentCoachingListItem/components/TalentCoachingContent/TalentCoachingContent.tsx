import React from 'react'
import {
  parseAndFormatDate,
  getDateDistanceFromNow
} from '@staff-portal/date-time-utils'
import { DetailedList as DL } from '@staff-portal/ui'
import { isOperationEnabled } from '@staff-portal/operations'
import { HourlyRateField } from '@staff-portal/facilities'
import { NO_VALUE } from '@staff-portal/config'

import { TalentCoachingEngagementFragment } from '../../../../data/talent-coaching-engagement-fragment'
import TalentCoachingAssignee from '../TalentCoachingAssignee'
import TalentCoachingStatus from '../TalentCoachingStatus'
import TalentCoachingStates from '../TalentCoachingStates'
import ApplicationStatusField from '../ApplicationStatusField'
import { COACHING_CAMPAIGN_MAPPING } from '../../../../constants'

interface Props {
  talentCoachingEngagement: TalentCoachingEngagementFragment
}

const TalentCoachingContent = ({ talentCoachingEngagement }: Props) => {
  const {
    id,
    status,
    states,
    claimedAt,
    campaignSlug,
    coach,
    operations,
    talent: { activatedAt, hourlyRate }
  } = talentCoachingEngagement

  return (
    <DL labelColumnWidth={9} defaultValue={NO_VALUE}>
      <DL.Row>
        <DL.Item label='Coaching Status'>
          <TalentCoachingStatus
            status={status}
            coachingEngagementId={id}
            operationDisabled={!isOperationEnabled(operations.changeStatus)}
          />
        </DL.Item>
        <DL.Item
          label='Activation Date'
          value={
            activatedAt
              ? `${parseAndFormatDate(
                  activatedAt
                )} – Activated ${getDateDistanceFromNow(activatedAt)}`
              : null
          }
        />
      </DL.Row>
      <DL.Row>
        <DL.Item label='Assignee'>
          <TalentCoachingAssignee
            coach={coach}
            coachingEngagementId={id}
            editingDisabled={!isOperationEnabled(operations.assignCoach)}
          />
        </DL.Item>
        <DL.Item label='Claimed at' value={parseAndFormatDate(claimedAt)} />
      </DL.Row>
      <DL.Row>
        <DL.Item label='Talent State'>
          <TalentCoachingStates states={states.nodes} />
        </DL.Item>
      </DL.Row>
      <DL.Row>
        <DL.Item
          label='Campaign'
          value={COACHING_CAMPAIGN_MAPPING[campaignSlug]}
        />
        <DL.Item label='Talent Rate'>
          <HourlyRateField hourlyRate={hourlyRate} shortSuffix />
        </DL.Item>
      </DL.Row>
      <DL.Row>
        <DL.Item label='Application Status'>
          <ApplicationStatusField
            applicationStatus={talentCoachingEngagement.applicationStatus}
          />
        </DL.Item>
      </DL.Row>
    </DL>
  )
}

export default TalentCoachingContent
