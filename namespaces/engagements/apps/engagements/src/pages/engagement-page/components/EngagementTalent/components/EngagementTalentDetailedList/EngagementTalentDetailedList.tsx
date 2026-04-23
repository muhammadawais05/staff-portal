/* eslint-disable complexity, max-lines, max-lines-per-function */
import React from 'react'
import { ContactType } from '@staff-portal/graphql/staff'
import { Link } from '@staff-portal/navigation'
import { Typography, TypographyOverflow } from '@toptal/picasso'
import { DetailedList as DL, TypographyOverflowLink } from '@staff-portal/ui'
import { PhoneLink } from '@staff-portal/communication'
import { SkypeField } from '@staff-portal/role-profile'
import { isNotNullish } from '@staff-portal/utils'
import { getRoleTypeText } from '@staff-portal/facilities'
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
import { EngagementStatus } from '@staff-portal/engagements-interviews'
import { NO_VALUE } from '@staff-portal/config'

import { PurchaseOrderField, TalentSentAtField } from '../../components'
import { GetEngagementTalentQuery } from '../../data'
import { getIsTalentSentAtVisible } from '../../utils/get-is-talent-sent-at-visible'

type Props = {
  engagement: GetEngagementTalentQuery['node']
  onboardingPlanUrlIsHidden?: boolean
  purchaseOrderIsHidden?: boolean
  labelColumnWidth?: number
  poLinesEnabled?: boolean
}

const EngagementTalentDetailedList = ({
  engagement,
  onboardingPlanUrlIsHidden,
  purchaseOrderIsHidden,
  labelColumnWidth,
  poLinesEnabled = false
}: Props) => {
  if (!engagement?.talent) {
    return null
  }

  const {
    id: engagementId,
    client,
    cumulativeStatus,
    talent,
    onboardingPlanUrl,
    billCycle,
    commitment,
    currentCommitment,
    talentSentAt,
    discountMultiplier,
    purchaseOrder,
    purchaseOrderLine,
    trialLength,
    operations,
    commitmentSettings,
    extraHoursEnabled,
    operations: {
      updateEngagementExtraHoursEnabled:
        updateEngagementExtraHoursEnabledOperation,
      editEngagementCommitment: editEngagementCommitmentOperation
    }
  } = engagement

  const canBeDiscounted = currentCommitment?.canBeDiscounted
  const adjustedCompanyRate = currentCommitment?.adjustedCompanyRate
  const adjustedTalentRate = currentCommitment?.adjustedTalentRate
  const adjustedRevenueRate = currentCommitment?.adjustedRevenueRate
  const availability = currentCommitment?.availability

  const {
    contacts,
    email,
    additionalSkypeIds,
    id: talentId,
    timeZone: talentTimeZone,
    type: talentType
  } = talent
  const skype = contacts.nodes.find(({ type }) => type === ContactType.SKYPE)
  const phone = contacts.nodes.find(({ type }) => type === ContactType.PHONE)

  return (
    <DL
      labelColumnWidth={labelColumnWidth}
      defaultValue={NO_VALUE}
      data-testid='engagement-talent-items'
    >
      <DL.Row>
        <DL.Item label='Status'>
          <EngagementStatus.Detailed
            color='inherit'
            engagement={engagement}
            data-testid='engagement-talent-status'
          />
        </DL.Item>
      </DL.Row>

      {getIsTalentSentAtVisible(cumulativeStatus) && (
        <DL.Row>
          <DL.Item label='Talent sent at'>
            <TalentSentAtField talentSentAt={talentSentAt} />
          </DL.Item>
        </DL.Row>
      )}

      <DL.Row>
        <DL.Item label='Email'>
          <TypographyOverflowLink>
            <Link href={`mailto:${email}`}>{email}</Link>
          </TypographyOverflowLink>
        </DL.Item>
      </DL.Row>

      <DL.Row>
        <DL.Item label='Skype'>
          <SkypeField
            skypeId={skype?.value}
            additionalSkypeIds={additionalSkypeIds?.nodes}
          />
        </DL.Item>
      </DL.Row>

      <DL.Row>
        <DL.Item label='Phone'>
          {phone && (
            <TypographyOverflowLink tooltipContent={phone.value}>
              <PhoneLink
                roleId={talentId}
                phoneContactId={phone.id}
                renderPhoneContact={() => (
                  <Typography color='inherit' size='medium'>
                    {phone.value}
                  </Typography>
                )}
              />
            </TypographyOverflowLink>
          )}
        </DL.Item>
      </DL.Row>

      <DL.Row>
        <DL.Item label='Time Zone' value={talentTimeZone?.name} />
      </DL.Row>

      {!onboardingPlanUrlIsHidden && (
        <DL.Row>
          <DL.Item label='Onboarding Plan'>
            {onboardingPlanUrl && (
              <TypographyOverflow>
                <Link href={onboardingPlanUrl}>{onboardingPlanUrl}</Link>
              </TypographyOverflow>
            )}
          </DL.Item>
        </DL.Row>
      )}

      {talent.talentPartner && (
        <DL.Row>
          <DL.Item label='Talent Partner'>
            {talent.talentPartner?.webResource?.url && (
              <Link href={talent.talentPartner.webResource.url}>
                <TypographyOverflow as='span' weight='inherit' color='inherit'>
                  {talent.talentPartner.fullName}
                </TypographyOverflow>
              </Link>
            )}
          </DL.Item>
        </DL.Row>
      )}

      <DL.Row>
        <DL.Item label='Trial Length'>
          {!!trialLength && (
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
          {!!billCycle && (
            <EngagementBillingTerms
              billCycle={billCycle}
              netTerms={client?.netTerms}
            />
          )}
        </DL.Item>
      </DL.Row>

      <DL.Row>
        <DL.Item label='Commitment'>
          <EngagementCommitment
            commitment={commitment}
            commitmentAvailability={availability}
          />
        </DL.Item>
      </DL.Row>

      {isMinCommitmentVisible({
        commitment,
        talentType,
        commitmentSettings
      }) && (
        <DL.Row>
          <DL.Item label='Min Commitment'>
            <MinCommitment
              engagementId={engagementId}
              operation={editEngagementCommitmentOperation}
              minimumHours={commitmentSettings?.minimumHours}
            />
          </DL.Item>
        </DL.Row>
      )}

      {!isExtraHoursHidden({
        availability,
        enterprise: client?.enterprise
      }) && (
        <DL.Row>
          <DL.Item label='Extra Hours Enabled'>
            {isNotNullish(extraHoursEnabled) && (
              <ExtraHoursEnabledField
                engagementId={engagementId}
                extraHoursEnabled={extraHoursEnabled}
                operation={updateEngagementExtraHoursEnabledOperation}
              />
            )}
          </DL.Item>
        </DL.Row>
      )}

      <DL.Row>
        <DL.Item label={`${getRoleTypeText(talent.type)} Rate`}>
          <GenericRateField
            data-testid='TalentRateField'
            rate={adjustedTalentRate}
            withHourlyRate
          />
        </DL.Item>
      </DL.Row>

      <DL.Row>
        <DL.Item label='Company Rate'>
          <CompanyRateField
            rate={adjustedCompanyRate}
            discountMultiplier={discountMultiplier}
            canBeDiscounted={canBeDiscounted}
            client={client}
            withHourlyRate
          />
        </DL.Item>
      </DL.Row>

      <DL.Row>
        <DL.Item label='Net-Revenue'>
          <GenericRateField rate={adjustedRevenueRate} withHourlyRate />
        </DL.Item>
      </DL.Row>

      {!purchaseOrderIsHidden && (
        <DL.Row>
          <DL.Item label='Purchase Order'>
            <PurchaseOrderField
              engagementId={engagementId}
              operation={operations.assignEngagementPurchaseOrder}
              purchaseOrder={purchaseOrder}
              purchaseOrderLine={purchaseOrderLine}
              poLinesEnabled={poLinesEnabled}
            />
          </DL.Item>
        </DL.Row>
      )}
    </DL>
  )
}

export default EngagementTalentDetailedList
