import React from 'react'
import pluralize from 'pluralize'
import { JobCommitment } from '@staff-portal/graphql/staff'
import { getDateDistanceFromNow } from '@staff-portal/date-time-utils'
import {
  CommitmentFormatter,
  JobApplicantTalentCard,
  JobPositionAnswers,
  JobTimeZoneField
} from '@staff-portal/jobs'
import { DeltaWaitingTimeField } from '@staff-portal/talents'
import { DetailedList, LinkWrapper, SubSection } from '@staff-portal/ui'
import { Container, Section, Tag, TypographyOverflow } from '@toptal/picasso'

import {
  JOB_APPLICATION_STATUS,
  JOB_APPLICATION_STATUS_COLOR_MAPPING
} from '../../../config'
import { JobApplicationFragment } from '../../data/get-job-application'

interface Props {
  jobApplication: JobApplicationFragment
}

const JobApplicationContent = ({ jobApplication }: Props) => {
  const title = `${jobApplication.talent.fullName} / ${jobApplication.job.client.fullName} → ${jobApplication.job.title}`
  const jobApplicationStatus = JOB_APPLICATION_STATUS[jobApplication.status]
  const jobApplicationStatusColor =
    JOB_APPLICATION_STATUS_COLOR_MAPPING[jobApplication.status]

  return (
    <Section
      variant='withHeaderBar'
      title={title}
      data-testid='job-application-content'
    >
      <SubSection>
        <DetailedList>
          <DetailedList.Row>
            <DetailedList.Item
              label='Applied'
              value={getDateDistanceFromNow(jobApplication.createdAt)}
            />
            <DetailedList.Item label='Status'>
              <TypographyOverflow
                as='span'
                weight='semibold'
                size='medium'
                color={jobApplicationStatusColor}
                data-testid='job-application-content-status'
              >
                {jobApplicationStatus}
              </TypographyOverflow>
            </DetailedList.Item>
          </DetailedList.Row>
          <DetailedList.Row>
            <DetailedList.Item label='Commitment'>
              <CommitmentFormatter
                commitment={
                  jobApplication.job.commitment?.toUpperCase() as JobCommitment
                }
              />
            </DetailedList.Item>
            <DetailedList.Item label='Time zone preference'>
              <JobTimeZoneField
                timeZonePreference={jobApplication.job.timeZonePreference}
                hasPreferredHours={jobApplication.job.hasPreferredHours}
                hoursOverlap={jobApplication.job.hoursOverlapEnum}
              />
            </DetailedList.Item>
          </DetailedList.Row>
          <DetailedList.Row>
            <DetailedList.Item label='Company'>
              <LinkWrapper
                wrapWhen={Boolean(jobApplication.job.client.webResource.url)}
                href={jobApplication.job.client.webResource.url as string}
                noUnderline
                data-testid='job-application-content-client-link'
              >
                <TypographyOverflow
                  as='span'
                  weight='semibold'
                  size='medium'
                  color='inherit'
                >
                  {jobApplication.job.client.webResource.text}
                </TypographyOverflow>
              </LinkWrapper>
            </DetailedList.Item>
            <DetailedList.Item label='Job'>
              <LinkWrapper
                wrapWhen={Boolean(jobApplication.job.webResource.url)}
                href={jobApplication.job.webResource.url as string}
                noUnderline
                data-testid='job-application-content-job-link'
              >
                <TypographyOverflow
                  as='span'
                  weight='semibold'
                  size='medium'
                  color='inherit'
                >
                  {jobApplication.job.client.enterprise && (
                    <Container right='xsmall' inline>
                      <Tag.Rectangular
                        indicator='blue'
                        data-testid='job-application-content-enterprise-badge'
                      >
                        Enterprise
                      </Tag.Rectangular>
                    </Container>
                  )}
                  {jobApplication.job.webResource.text}
                </TypographyOverflow>
              </LinkWrapper>
            </DetailedList.Item>
          </DetailedList.Row>
          <DetailedList.Row>
            <DetailedList.Item label='Delta waiting time'>
              <DeltaWaitingTimeField
                deltaWaitingDays={jobApplication.talent.deltaWaitingDays}
                lastClosedEngagementEndDate={
                  jobApplication.talent.lastClosedEngagementEndDate
                }
                lastAvailabilityIncreaseDate={
                  jobApplication.talent.lastAvailabilityIncreaseDate
                }
                trialsNumber={
                  jobApplication.talent.engagements.counters.trialsNumber
                }
              />
            </DetailedList.Item>
            <DetailedList.Item
              label='Talent allocated hours'
              value={`${pluralize(
                'hour',
                jobApplication.talent.allocatedHours ?? 0,
                true
              )} per week`}
            />
          </DetailedList.Row>
        </DetailedList>
      </SubSection>

      {!!jobApplication.jobPositionAnswers?.nodes.length && (
        <SubSection last={!jobApplication.talentPitch}>
          <JobPositionAnswers
            jobPositionAnswers={jobApplication.jobPositionAnswers.nodes}
          />
        </SubSection>
      )}

      {!!jobApplication.talentPitch && (
        <SubSection last>
          <JobApplicantTalentCard jobApplicationId={jobApplication.id} />
        </SubSection>
      )}
    </Section>
  )
}

export default JobApplicationContent
