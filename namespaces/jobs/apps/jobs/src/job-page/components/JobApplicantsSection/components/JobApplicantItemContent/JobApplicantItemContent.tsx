/* eslint-disable max-lines */
/* eslint-disable complexity */
import React from 'react'
import { useGetNode } from '@staff-portal/data-layer-service'
import { Operation } from '@staff-portal/operations'
import { DetailedList as DL, LinkWrapper, SubSection } from '@staff-portal/ui'
import { Button, Container, TypographyOverflow } from '@toptal/picasso'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { NodeType } from '@staff-portal/graphql'
import { ENGAGEMENT_UPDATED } from '@staff-portal/engagements'
import {
  JOB_UPDATED,
  JobApplicantTalentCard,
  JobPositionAnswers,
  getTalentProfileLinkTarget,
  ApproveApplicationButton,
  RejectJobApplicantModalButton
} from '@staff-portal/jobs'
import { NO_VALUE } from '@staff-portal/config'
import { useSendEmailModal } from '@staff-portal/communication-send-email'
import {
  TalentAvatar,
  DeltaWaitingTimeField,
  EngagementsRatesField,
  SkillSetField
} from '@staff-portal/talents'
import {
  MatchQualitySubSection,
  talentJobMatchNames,
  talentPastPerformanceNames,
  talentProfileNames
} from '@staff-portal/talents-quality'
import { getRoleTypeText, HourlyRateField } from '@staff-portal/facilities'

import SlackButton, { hasSlackContacts } from '../../../SlackButton'
import { GetJobApplicationDocument } from './data/get-job-application'
import JobApplicantItemSkeletonLoader from './JobApplicantItemSkeletonLoader'
import * as S from './styles'
import { LABEL_COLUMN_EXPANDED_SECTION_WIDTH } from '../../../../config'

interface Props {
  jobApplicationId: string
  jobId: string
  emailMessagingJobApplicantId?: string
}

// eslint-disable-next-line max-lines-per-function
export const JobApplicantItemContent = ({
  jobApplicationId,
  jobId,
  emailMessagingJobApplicantId
}: Props) => {
  const {
    data: jobApplication,
    loading,
    refetch
  } = useGetNode(GetJobApplicationDocument)(
    { jobApplicationId, jobId },
    { throwOnError: true }
  )

  const { showModal: showSendEmailModal } = useSendEmailModal({
    nodeId: emailMessagingJobApplicantId ?? '',
    operationVariables: {
      nodeId: jobApplicationId,
      nodeType: NodeType.JOB_APPLICATION,
      operationName: 'emailJobApplicant'
    }
  })

  useMessageListener(JOB_UPDATED, ({ jobId: id }) => id === jobId && refetch())
  useMessageListener(ENGAGEMENT_UPDATED, () => refetch())

  if (!jobApplication && loading) {
    return <JobApplicantItemSkeletonLoader />
  }

  if (!jobApplication) {
    return null
  }

  const { talent } = jobApplication
  const qualityMetrics = talent.matchQualityMetrics?.nodes

  const highlightedSkillIds =
    jobApplication.job.skillSets?.nodes.map(node => node.skill.id) || []

  const talentPartnerName = talent?.talentPartner?.webResource?.text
  const talentPartnerUrl = talent?.talentPartner?.webResource?.url

  return (
    <Container>
      <Container padded='small' css={S.jobApplicantContent}>
        <Container flex alignItems='center' bottom='small'>
          <TalentAvatar
            fullName={talent.fullName}
            photo={talent.photo?.small}
            talentPartnerName={talentPartnerName}
            talentPartnerUrl={talentPartnerUrl}
            avatarSize='small'
            badgeSize='large'
            right='small'
          />
          <LinkWrapper
            wrapWhen={Boolean(talent.webResource.url)}
            href={talent.webResource.url as string}
            data-testid='talent-link'
            target={getTalentProfileLinkTarget(talent.webResource.url)}
            css={S.talentName}
          >
            <TypographyOverflow color='inherit' weight='semibold'>
              {talent.fullName}
            </TypographyOverflow>
          </LinkWrapper>
          <Container flex alignItems='center' left='small'>
            <ApproveApplicationButton jobApplication={jobApplication} />
            <RejectJobApplicantModalButton jobApplication={jobApplication} />
            <Container left='small'>
              {emailMessagingJobApplicantId && (
                <Operation
                  operation={jobApplication?.operations.emailJobApplicant}
                  render={disabled =>
                    !disabled && (
                      <Button
                        variant='secondary'
                        size='small'
                        onClick={() => showSendEmailModal()}
                        data-testid='email-talent-button'
                      >
                        Email {getRoleTypeText(talent.type)}
                      </Button>
                    )
                  }
                />
              )}
            </Container>
            {hasSlackContacts(talent.slackContacts.nodes) && (
              <Container left='small'>
                <SlackButton
                  slackContacts={talent.slackContacts.nodes}
                  variant='button'
                />
              </Container>
            )}
          </Container>
        </Container>

        <SubSection
          last={
            !qualityMetrics &&
            !talent.skillSets?.nodes.length &&
            !jobApplication.jobPositionAnswers?.nodes.length &&
            !jobApplication?.talentPitch
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
              <DL.Item label='Time Zone' value={talent?.timeZone?.name} />
            </DL.Row>
            <DL.Row>
              <DL.Item label='Rate'>
                <HourlyRateField hourlyRate={talent.hourlyRate} shortSuffix />
              </DL.Item>
              <DL.Item label='Engagement rate'>
                <EngagementsRatesField
                  engagementRates={{ engagements: talent.engagements }}
                />
              </DL.Item>
            </DL.Row>
            <DL.Row>
              <DL.Item label='Delta waiting time'>
                <DeltaWaitingTimeField
                  deltaWaitingDays={talent.deltaWaitingDays}
                  lastClosedEngagementEndDate={
                    talent.lastClosedEngagementEndDate
                  }
                  lastAvailabilityIncreaseDate={
                    talent.lastAvailabilityIncreaseDate
                  }
                  trialsNumber={talent.engagements.counters.trialsNumber}
                />
              </DL.Item>
            </DL.Row>
          </DL>
        </SubSection>

        {qualityMetrics && (
          <SubSection
            last={
              !talent.skillSets?.nodes.length &&
              !jobApplication.jobPositionAnswers?.nodes.length &&
              !jobApplication?.talentPitch
            }
          >
            <MatchQualitySubSection
              fieldNames={talentProfileNames}
              metrics={qualityMetrics}
              title='Profile Quality'
            />
            <MatchQualitySubSection
              fieldNames={talentJobMatchNames}
              metrics={qualityMetrics}
              title='Job Match'
            />
            <MatchQualitySubSection
              fieldNames={talentPastPerformanceNames}
              metrics={qualityMetrics}
              title='Past Performance'
            />
          </SubSection>
        )}

        {!!talent.skillSets?.nodes.length && (
          <SubSection
            title='Applicant Skills'
            last={
              !jobApplication.jobPositionAnswers?.nodes.length &&
              !jobApplication?.talentPitch
            }
          >
            <SkillSetField
              talentType={talent.type}
              skills={talent.skillSets.nodes}
              highlightedSkillIds={highlightedSkillIds}
            />
          </SubSection>
        )}

        {!!jobApplication.jobPositionAnswers?.nodes.length && (
          <SubSection
            title="Matcher's Questions"
            last={!jobApplication?.talentPitch}
          >
            <JobPositionAnswers
              jobPositionAnswers={jobApplication.jobPositionAnswers.nodes}
            />
          </SubSection>
        )}

        {!!jobApplication?.talentPitch && (
          <SubSection title='Applicant Profile' last>
            <JobApplicantTalentCard jobApplicationId={jobApplicationId} />
          </SubSection>
        )}
      </Container>
    </Container>
  )
}

export default JobApplicantItemContent
