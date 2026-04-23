import React from 'react'
import { NO_VALUE } from '@staff-portal/config'
import { formatTrialLength } from '@staff-portal/engagements'
import {
  getEngagementDefaultStatus,
  getEngagementStatusColor
} from '@staff-portal/engagements-interviews'
import { EngagementStatus } from '@staff-portal/graphql/staff'
import { DetailedList, LinkWrapper } from '@staff-portal/ui'
import {
  Avatar,
  Button,
  Container,
  Section,
  TypographyOverflow
} from '@toptal/picasso'

import { PitchStepDataFragment } from '../../data/get-pitch-step-data'
import JobSpecificResumeButton from '../JobSpecificResumeButton/JobSpecificResumeButton'
import shouldShowJobSpecificResumeButton from '../../utils/should-show-job-specific-resume-button/should-show-job-specific-resume-button'

interface Props {
  candidate: Pick<PitchStepDataFragment, 'job' | 'newEngagement' | 'talent'>
}

const PitchCandidate = ({ candidate }: Props) => {
  const { talent, job, newEngagement } = candidate

  if (!job) {
    return null
  }

  const { client, webResource: jobWebResource } = job
  const { clientPartner } = client
  const status = getEngagementDefaultStatus(
    newEngagement?.cumulativeStatus,
    talent?.type
  )
  const statusColor = newEngagement?.cumulativeStatus
    ? getEngagementStatusColor({
        cumulativeStatus: newEngagement.cumulativeStatus,
        status: '' as EngagementStatus
      })
    : undefined

  const newEngagementResumeUrl = newEngagement?.resumeUrl
  const talentResumeUrl = talent?.resumeUrl
  const showJobSpecificResume = shouldShowJobSpecificResumeButton(
    newEngagementResumeUrl,
    talentResumeUrl
  )

  return (
    <Section
      data-testid='pitch-candidate'
      variant='withHeaderBar'
      title='Candidate'
      actions={
        <>
          {showJobSpecificResume ? (
            <JobSpecificResumeButton resumeUrl={newEngagementResumeUrl} />
          ) : (
            <Button
              href={talent?.webResource.url ?? undefined}
              variant='secondary'
              size='small'
              target='_blank'
              data-testid='view-profile-button'
            >
              View Profile
            </Button>
          )}
        </>
      }
    >
      <Container bottom='medium'>
        <Avatar
          name={talent?.webResource.text}
          src={talent?.photo?.default ?? undefined}
          size='small'
          data-testid='pitch-candidate-talent-avatar'
        />
      </Container>

      <DetailedList defaultValue={NO_VALUE} labelColumnWidth={10}>
        <DetailedList.Row>
          <DetailedList.Item label='Talent'>
            <LinkWrapper
              wrapWhen={Boolean(talent?.webResource.url)}
              href={talent?.webResource.url as string}
            >
              <TypographyOverflow as='span' color='inherit' weight='inherit'>
                {talent?.webResource.text}
              </TypographyOverflow>
            </LinkWrapper>
          </DetailedList.Item>

          <DetailedList.Item label='Status'>
            <TypographyOverflow color={statusColor} weight='inherit'>
              {status}
            </TypographyOverflow>
          </DetailedList.Item>
        </DetailedList.Row>

        <DetailedList.Row>
          <DetailedList.Item label='Company'>
            <LinkWrapper
              wrapWhen={Boolean(client?.webResource.url)}
              href={client?.webResource.url as string}
            >
              <TypographyOverflow as='span' color='inherit' weight='inherit'>
                {client?.webResource.text}
              </TypographyOverflow>
            </LinkWrapper>
          </DetailedList.Item>

          <DetailedList.Item label='Talent Rate'>
            ${newEngagement?.talentHourlyRate}/h
          </DetailedList.Item>
        </DetailedList.Row>

        <DetailedList.Row>
          <DetailedList.Item label='Job'>
            <LinkWrapper
              wrapWhen={Boolean(jobWebResource.url)}
              href={jobWebResource.url as string}
            >
              <TypographyOverflow as='span' color='inherit' weight='inherit'>
                {jobWebResource.text}
              </TypographyOverflow>
            </LinkWrapper>
          </DetailedList.Item>

          <DetailedList.Item label='Bill Rate'>
            ${newEngagement?.companyHourlyRate}/h
          </DetailedList.Item>
        </DetailedList.Row>

        <DetailedList.Row>
          <DetailedList.Item label='Client Partner'>
            {clientPartner && (
              <LinkWrapper
                wrapWhen={Boolean(clientPartner?.webResource.url)}
                href={clientPartner?.webResource.url as string}
              >
                <TypographyOverflow as='span' color='inherit' weight='inherit'>
                  {clientPartner?.webResource.text}
                </TypographyOverflow>
              </LinkWrapper>
            )}
          </DetailedList.Item>

          <DetailedList.Item
            label='Trial Period'
            value={formatTrialLength(newEngagement?.trialLength)}
          />
        </DetailedList.Row>
      </DetailedList>
    </Section>
  )
}

export default PitchCandidate
