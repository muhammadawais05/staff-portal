import React from 'react'
import { Section } from '@toptal/picasso'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { PublicMessages as BillingMessages } from '@staff-portal/billing'
import { checkIfFieldIsForbidden } from '@staff-portal/data-layer-service'
import {
  ENGAGEMENT_UPDATED,
  ENGAGEMENT_TALENT_UPDATED
} from '@staff-portal/engagements'
import { TalentAvatar } from '@staff-portal/talents'
import { getRoleTypeText } from '@staff-portal/facilities'
import {
  INTERVIEW_UPDATED,
  INTERVIEW_SCHEDULED
} from '@staff-portal/engagements-interviews'

import EngagementBadge from '../EngagementBadge'
import {
  EngagementTalentDetailedList,
  EngagementTalentSkeletonLoader
} from './components'
import { useGetEngagementTalent } from './data'

export interface Props {
  engagementId: string
  labelColumnWidth?: number
}

const EngagementTalent = ({ engagementId, labelColumnWidth }: Props) => {
  const { engagement, experiments, loading, error, refetch } =
    useGetEngagementTalent(engagementId)

  const poLinesEnabled = Boolean(experiments?.poLines?.enabled)

  useMessageListener(
    [
      ENGAGEMENT_TALENT_UPDATED,
      ENGAGEMENT_UPDATED,
      INTERVIEW_UPDATED,
      INTERVIEW_SCHEDULED
    ],
    ({ engagementId: id }) => id === engagementId && refetch()
  )

  useMessageListener(BillingMessages.commitmentChange, () => refetch())

  if (loading) {
    return <EngagementTalentSkeletonLoader />
  }

  if (!engagement?.talent) {
    return null
  }
  const { talent } = engagement

  const onboardingPlanUrlIsHidden = checkIfFieldIsForbidden(
    'onboardingPlanUrl',
    error
  )

  const purchaseOrderIsHidden = checkIfFieldIsForbidden('purchaseOrder', error)

  const formattedTalentType = getRoleTypeText(talent.type)
  const talentPartnerName = talent.talentPartner?.webResource?.text
  const talentPartnerUrl = talent.talentPartner?.webResource?.url

  return (
    <Section
      variant='withHeaderBar'
      title={formattedTalentType}
      data-testid='engagement-talent-section'
    >
      <EngagementBadge
        fullName={talent.fullName}
        profileLink={talent.profileLink}
        defaultAvatar={
          <TalentAvatar
            fullName={talent.fullName}
            photo={talent.photo?.default}
            talentPartnerName={talentPartnerName}
            talentPartnerUrl={talentPartnerUrl}
            avatarSize='small'
            badgeSize='large'
          />
        }
        data-testid='engagement-talent-badge'
      />

      <EngagementTalentDetailedList
        poLinesEnabled={poLinesEnabled}
        engagement={engagement}
        labelColumnWidth={labelColumnWidth}
        onboardingPlanUrlIsHidden={onboardingPlanUrlIsHidden}
        purchaseOrderIsHidden={purchaseOrderIsHidden}
      />
    </Section>
  )
}

export default EngagementTalent
