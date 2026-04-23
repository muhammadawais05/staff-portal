/* eslint-disable complexity */
import React from 'react'
import { Container, Typography, TypographyOverflow } from '@toptal/picasso'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { DetailedList as DL, LinkWrapper, SubSection } from '@staff-portal/ui'
import { ENGAGEMENT_UPDATED } from '@staff-portal/engagements'
import {
  JOB_UPDATED,
  JOB_AVAILABILITY_REQUEST_UPDATED,
  JobPositionAnswers,
  getTalentProfileLinkTarget
} from '@staff-portal/jobs'
import { NO_VALUE } from '@staff-portal/config'
import {
  TalentAvatar,
  EngagementsRatesField,
  SkillSetField
} from '@staff-portal/talents'
import { HourlyRateField } from '@staff-portal/facilities'
import {
  MatchQualitySubSection,
  talentJobMatchNames,
  talentPastPerformanceNames,
  talentProfileNames
} from '@staff-portal/talents-quality'

import * as S from './styles'
import {
  AvailabilityRequestItemActions,
  AvailabilityRequestsTableItemContentSkeleton
} from './components'
import { useGetAvailabilityRequest } from './data'
import { LABEL_COLUMN_EXPANDED_SECTION_WIDTH } from '../../../../config'
import { AVAILABILITY_REQUEST_REJECT_REASON_MAPPING } from '../../config'

interface Props {
  availabilityRequestId: string
  jobId: string
}

const AvailabilityRequestsTableItemContent = ({
  availabilityRequestId,
  jobId
}: Props) => {
  const { data, loading, refetch } = useGetAvailabilityRequest(
    availabilityRequestId,
    jobId
  )

  useMessageListener(JOB_UPDATED, ({ jobId: id }) => jobId === id && refetch())
  useMessageListener(
    JOB_AVAILABILITY_REQUEST_UPDATED,
    ({ availabilityRequestId: id }) => id === availabilityRequestId && refetch()
  )
  useMessageListener(ENGAGEMENT_UPDATED, () => refetch())

  if (loading && !data) {
    return <AvailabilityRequestsTableItemContentSkeleton />
  }

  if (!data?.talent) {
    return null
  }

  const {
    job,
    talent,
    operations: {
      withdrawAvailabilityRequest: withdrawAvailabilityRequestOperation
    },
    jobPositionAnswers,
    emailMessaging,
    talentComment,
    rejectReason,
    resumeUrl
  } = data

  const formattedRejectedReason =
    rejectReason && AVAILABILITY_REQUEST_REJECT_REASON_MAPPING[rejectReason]
  const isPublicProfileUrl = talent.resumeUrl === resumeUrl

  return (
    <Container
      padded='small'
      data-testid='JobAvailabilityRequest-item-content'
      css={S.content}
    >
      <Container
        flex
        justifyContent='space-between'
        alignItems='center'
        bottom='small'
      >
        <Container flex alignItems='center'>
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
            data-testid='talent-link'
          >
            <TypographyOverflow color='inherit' weight='semibold' size='large'>
              {talent.fullName}
            </TypographyOverflow>
          </LinkWrapper>
        </Container>
        <AvailabilityRequestItemActions
          slackContacts={talent.slackContacts.nodes}
          resumeUrl={resumeUrl}
          isPublicProfileUrl={isPublicProfileUrl}
          availabilityRequestId={availabilityRequestId}
          withdrawAvailabilityRequestOperation={
            withdrawAvailabilityRequestOperation
          }
          applicantsEmailMessagingOperation={
            emailMessaging?.operations.sendEmailTo
          }
          applicantsEmailMessagingId={emailMessaging?.id}
        />
      </Container>

      <SubSection
        last={
          !talent.matchQualityMetrics &&
          !jobPositionAnswers?.nodes.length &&
          !formattedRejectedReason &&
          !talentComment &&
          !talent.skillSets?.nodes.length
        }
      >
        <DL
          defaultValue={NO_VALUE}
          labelColumnWidth={LABEL_COLUMN_EXPANDED_SECTION_WIDTH}
        >
          <DL.Row>
            <DL.Item
              label='Current country'
              value={talent.locationV2?.country?.name}
            />
            <DL.Item label='Time Zone' value={talent.timeZone?.name} />
          </DL.Row>
          <DL.Row>
            <DL.Item label='Hourly rate'>
              <HourlyRateField hourlyRate={talent.hourlyRate} shortSuffix />
            </DL.Item>
            <DL.Item label='Engagements rates'>
              <EngagementsRatesField engagementRates={talent} />
            </DL.Item>
          </DL.Row>
        </DL>
      </SubSection>

      {talent.matchQualityMetrics && (
        <SubSection
          last={
            !jobPositionAnswers?.nodes.length &&
            !formattedRejectedReason &&
            !talentComment &&
            !talent.skillSets?.nodes.length
          }
        >
          <MatchQualitySubSection
            fieldNames={talentProfileNames}
            metrics={talent.matchQualityMetrics.nodes}
            title='Profile Quality'
          />
          <MatchQualitySubSection
            fieldNames={talentJobMatchNames}
            metrics={talent.matchQualityMetrics.nodes}
            title='Job Match'
          />
          <MatchQualitySubSection
            fieldNames={talentPastPerformanceNames}
            metrics={talent.matchQualityMetrics.nodes}
            title='Past Performance'
          />
        </SubSection>
      )}

      {!!jobPositionAnswers?.nodes.length && (
        <SubSection
          title='Matcher’s Questions'
          last={
            !formattedRejectedReason &&
            !talentComment &&
            !talent.skillSets?.nodes.length
          }
        >
          <JobPositionAnswers jobPositionAnswers={jobPositionAnswers.nodes} />
        </SubSection>
      )}

      {formattedRejectedReason && (
        <SubSection
          data-testid='JobAvailabilityRequest-reject-reason'
          title='Reason'
          last={!talentComment && !talent.skillSets?.nodes.length}
        >
          <Typography size='medium'>{formattedRejectedReason}</Typography>
        </SubSection>
      )}

      {talentComment && (
        <SubSection
          data-testid='JobAvailabilityRequest-talent-comment'
          title='Comment'
          last={!talent.skillSets?.nodes.length}
        >
          <Typography size='medium'>{talentComment}</Typography>
        </SubSection>
      )}

      {!!talent.skillSets?.nodes.length && (
        <SubSection title='Applicant Skills' last>
          <SkillSetField
            talentType={talent.type}
            skills={talent.skillSets.nodes}
            highlightedSkillIds={job.skillSets?.nodes.map(
              ({ skill: { id } }) => id
            )}
          />
        </SubSection>
      )}
    </Container>
  )
}

export default AvailabilityRequestsTableItemContent
