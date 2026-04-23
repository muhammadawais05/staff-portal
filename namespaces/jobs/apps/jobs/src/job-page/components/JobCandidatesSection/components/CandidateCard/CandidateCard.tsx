import React from 'react'
import { Container, TypographyOverflow } from '@toptal/picasso'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { DetailedList as DL, LinkWrapper, SubSection } from '@staff-portal/ui'
import {
  ENGAGEMENT_UPDATED,
  CompanyRateField,
  EngagementBillingTerms,
  GenericRateField,
  TrialLengthField,
  EngagementCommitment
} from '@staff-portal/engagements'
import { EngagementStatus } from '@staff-portal/engagements-interviews'
import { TalentAvatar } from '@staff-portal/talents'
import { isNotNullish } from '@staff-portal/utils'
import { getRoleTypeText } from '@staff-portal/facilities'
import { JOB_UPDATED, getTalentProfileLinkTarget } from '@staff-portal/jobs'
import { NO_VALUE } from '@staff-portal/config'

import CandidateCardSkeletonLoader from '../CandidateCardSkeletonLoader'
import { useGetCandidateCard } from './data/get-candidate-card.staff.gql'
import * as S from './styles'
import { LABEL_COLUMN_EXPANDED_SECTION_WIDTH } from '../../../../config'

interface Props {
  engagementId: string
}

const CandidateCard = ({ engagementId }: Props) => {
  const { engagement, loading, refetch } = useGetCandidateCard(engagementId)

  useMessageListener(JOB_UPDATED, () => refetch())
  useMessageListener(
    ENGAGEMENT_UPDATED,
    ({ engagementId: id }) => id === engagementId && refetch()
  )

  if (!engagement && loading) {
    return <CandidateCardSkeletonLoader />
  }

  if (!engagement?.talent) {
    return null
  }

  const {
    id,
    client,
    talent,
    billCycle,
    commitment,
    currentCommitment,
    discountMultiplier,
    trialLength,
    operations
  } = engagement

  const adjustedCompanyRate = currentCommitment?.adjustedCompanyRate
  const adjustedTalentRate = currentCommitment?.adjustedTalentRate
  const adjustedRevenueRate = currentCommitment?.adjustedRevenueRate
  const availability = currentCommitment?.availability
  const canBeDiscounted = currentCommitment?.canBeDiscounted

  return (
    <Container padded='small' data-testid='candidate-card' css={S.content}>
      <Container flex alignItems='center' bottom='small'>
        <TalentAvatar
          avatarSize='small'
          badgeSize='large'
          right='small'
          fullName={talent.fullName}
          photo={talent.photo?.small}
          talentPartnerName={talent.talentPartner?.webResource.text}
          talentPartnerUrl={talent.talentPartner?.webResource.url}
        />
        <LinkWrapper
          wrapWhen={Boolean(talent.webResource.url)}
          href={talent.webResource.url as string}
          target={getTalentProfileLinkTarget(talent.webResource.url)}
        >
          <TypographyOverflow color='inherit' weight='semibold'>
            {talent.fullName}
          </TypographyOverflow>
        </LinkWrapper>
      </Container>
      <SubSection last>
        <DL
          defaultValue={NO_VALUE}
          labelColumnWidth={LABEL_COLUMN_EXPANDED_SECTION_WIDTH}
        >
          <DL.Row>
            <DL.Item label='Status'>
              <EngagementStatus.Detailed
                engagement={engagement}
                tooltipOptions={{
                  type: 'extended',
                  ...engagement
                }}
              />
            </DL.Item>
          </DL.Row>

          <DL.Row>
            <DL.Item label='Trial Length'>
              {isNotNullish(trialLength) && (
                <TrialLengthField
                  operation={operations.changeEngagementTrialLength}
                  engagementId={id}
                  trialLength={trialLength}
                />
              )}
            </DL.Item>
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
            <DL.Item label='Company Rate'>
              <CompanyRateField
                rate={adjustedCompanyRate}
                canBeDiscounted={canBeDiscounted}
                discountMultiplier={discountMultiplier}
                client={client}
                withHourlyRate
              />
            </DL.Item>
            <DL.Item label={`${getRoleTypeText(talent?.type)} Rate`}>
              <GenericRateField rate={adjustedTalentRate} withHourlyRate />
            </DL.Item>
          </DL.Row>

          <DL.Row>
            <DL.Item label='Net-Revenue'>
              <GenericRateField rate={adjustedRevenueRate} withHourlyRate />
            </DL.Item>
            <DL.Item label='Commitment'>
              <EngagementCommitment
                commitment={commitment}
                commitmentAvailability={availability}
              />
            </DL.Item>
          </DL.Row>
        </DL>
      </SubSection>
    </Container>
  )
}

export default CandidateCard
