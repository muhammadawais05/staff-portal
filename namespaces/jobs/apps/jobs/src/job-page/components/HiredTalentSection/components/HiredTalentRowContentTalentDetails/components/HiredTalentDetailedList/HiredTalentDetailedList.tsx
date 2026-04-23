import { isNotNullish } from '@staff-portal/utils'
import { EngagementCommitmentEnum } from '@staff-portal/graphql/staff'
import { isOperationEnabled } from '@staff-portal/operations'
import React from 'react'
import { DetailedList as DL } from '@staff-portal/ui'
import { getRoleTypeText } from '@staff-portal/facilities'
import { NO_VALUE } from '@staff-portal/config'
import {
  CompanyRateField,
  EngagementBillingTerms,
  EngagementCommitment,
  ExtraHoursEnabledField,
  GenericRateField,
  isExtraHoursHidden,
  isMinCommitmentVisible,
  MinCommitment,
  TrialLengthField
} from '@staff-portal/engagements'

import { GetHiredTalentContentQuery } from '../../../../data/get-hired-talent-content/get-hired-talent-content.staff.gql.types'
import { LABEL_COLUMN_EXPANDED_SECTION_WIDTH } from '../../../../../../config'
import { isCurrentBillingCyclesVisible } from '../../../../utils'
import CurrentBillingCycles from '../../../CurrentBillingCycles'
import WorkSchedule from '../../../WorkSchedule'
import { getEngagementCommitmentData } from './utils/get-engagement-commitment-data'

export interface Props {
  engagement: GetHiredTalentContentQuery['node']
}

const HiredTalentDetailedList = ({ engagement }: Props) => {
  if (!engagement?.talent) {
    return null
  }

  const {
    id: engagementId,
    client,
    talent,
    billCycle,
    billingCycles,
    commitment,
    discountMultiplier,
    trialLength,
    commitmentSettings,
    operations,
    extraHoursEnabled,
    weeklyHours
  } = engagement

  const {
    availability,
    adjustedCompanyRate,
    adjustedTalentRate,
    adjustedRevenueRate,
    canBeDiscounted
  } = getEngagementCommitmentData(engagement) || {}

  return (
    <DL
      labelColumnWidth={LABEL_COLUMN_EXPANDED_SECTION_WIDTH}
      defaultValue={NO_VALUE}
      data-testid='hired-talent-items'
    >
      <DL.Row>
        <DL.Item label='Trial Length'>
          {isNotNullish(trialLength) && (
            <TrialLengthField
              operation={operations.changeEngagementTrialLength}
              engagementId={engagementId}
              trialLength={trialLength}
            />
          )}
        </DL.Item>
      </DL.Row>

      <DL.Row>
        <DL.Item label='Billing Terms'>
          {billCycle && (
            <EngagementBillingTerms
              billCycle={billCycle}
              netTerms={client?.netTerms}
            />
          )}
        </DL.Item>
      </DL.Row>

      {isCurrentBillingCyclesVisible(billingCycles.nodes) && (
        <DL.Row>
          <DL.Item label='Current Billing Cycle'>
            <CurrentBillingCycles cycles={billingCycles.nodes} />
          </DL.Item>
        </DL.Row>
      )}

      <DL.Row>
        <DL.Item label='Commitment'>
          <EngagementCommitment
            commitment={commitment}
            commitmentAvailability={availability}
          />
        </DL.Item>
      </DL.Row>

      {isNotNullish(weeklyHours) &&
        commitment === EngagementCommitmentEnum.HOURLY && (
          <DL.Row>
            <DL.Item label='Work Schedule'>
              <WorkSchedule
                engagementId={engagementId}
                weeklyHours={weeklyHours as number}
                disabled={
                  !isOperationEnabled(operations.updateEngagementWeeklyHours)
                }
              />
            </DL.Item>
          </DL.Row>
        )}

      {isMinCommitmentVisible({
        commitment,
        talentType: talent.type,
        commitmentSettings
      }) && (
        <DL.Row>
          <DL.Item label='Min Commitment'>
            <MinCommitment
              engagementId={engagementId}
              operation={operations.editEngagementCommitment}
              minimumHours={commitmentSettings?.minimumHours}
            />
          </DL.Item>
        </DL.Row>
      )}

      {!isExtraHoursHidden({
        availability: availability,
        enterprise: client?.enterprise
      }) && (
        <DL.Row>
          <DL.Item label='Extra Hours Enabled'>
            {isNotNullish(extraHoursEnabled) && (
              <ExtraHoursEnabledField
                engagementId={engagementId}
                extraHoursEnabled={extraHoursEnabled}
                operation={operations.updateEngagementExtraHoursEnabled}
              />
            )}
          </DL.Item>
        </DL.Row>
      )}

      <DL.Row>
        <DL.Item label='Company Rate'>
          <CompanyRateField
            rate={adjustedCompanyRate}
            canBeDiscounted={canBeDiscounted}
            discountMultiplier={discountMultiplier}
            client={client}
            withHourlyRate
          />
        </DL.Item>
      </DL.Row>

      <DL.Row>
        <DL.Item label={`${getRoleTypeText(talent.type)} Rate`}>
          <GenericRateField rate={adjustedTalentRate} withHourlyRate />
        </DL.Item>
      </DL.Row>

      <DL.Row>
        <DL.Item label='Net-Revenue'>
          <GenericRateField rate={adjustedRevenueRate} withHourlyRate />
        </DL.Item>
      </DL.Row>
    </DL>
  )
}

export default HiredTalentDetailedList
