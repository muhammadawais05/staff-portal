import React from 'react'
import { Section, Container } from '@toptal/picasso'
import { useGetNode } from '@staff-portal/data-layer-service'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import {
  DetailedList as DL,
  SectionWithDetailedListSkeleton
} from '@staff-portal/ui'
import { ENGAGEMENT_UPDATED } from '@staff-portal/engagements'
import { AnswerWithComments, JOB_UPDATED } from '@staff-portal/jobs'
import { NO_VALUE } from '@staff-portal/config'
import { HourlyRateField } from '@staff-portal/facilities'

import { GetJobSourcingRequestBudgetDetailsDocument } from './data'

interface Props {
  jobId: string
}

export const SourcingRequestBudgetDetails = ({ jobId }: Props) => {
  const { data, loading, refetch } = useGetNode(
    GetJobSourcingRequestBudgetDetailsDocument
  )({ jobId })

  useMessageListener(JOB_UPDATED, ({ jobId: id }) => jobId === id && refetch())
  useMessageListener(ENGAGEMENT_UPDATED, () => refetch())

  if (!data && loading) {
    return (
      <SectionWithDetailedListSkeleton
        title='Budget Details'
        columns={2}
        labelColumnWidth={14}
        items={3}
      />
    )
  }

  if (!data) {
    return null
  }

  return (
    <Container top='medium'>
      <Section title='Budget Details' variant='withHeaderBar'>
        <DL defaultValue={NO_VALUE} labelColumnWidth={20}>
          <DL.Row>
            <DL.Item
              label='Maximum Talent Hourly Rate'
              multilines
              titleCaseLabels={false}
            >
              <HourlyRateField
                hourlyRate={
                  data.sourcingRequest?.noTalentHourlyRateLimit
                    ? null
                    : data.sourcingRequest?.maximumTalentHourlyRate
                }
              />
            </DL.Item>
          </DL.Row>

          <DL.Row>
            <DL.Item
              label='Can this rate be shared with the talent?'
              multilines
              titleCaseLabels={false}
            >
              <AnswerWithComments
                data-testid='sourcing-request-can-share'
                answer={data.sourcingRequest?.canShareRate ? 'Yes' : 'No'}
                comments={data.sourcingRequest?.canShareRateComment}
              />
            </DL.Item>
          </DL.Row>

          <DL.Row>
            <DL.Item
              label='Can this rate be increased for the right talent?'
              multilines
              titleCaseLabels={false}
            >
              <AnswerWithComments
                data-testid='sourcing-request-can-increase'
                answer={data.sourcingRequest?.canIncreaseRate ? 'Yes' : 'No'}
                comments={data.sourcingRequest?.canIncreaseRateComment}
              />
            </DL.Item>
          </DL.Row>
        </DL>
      </Section>
    </Container>
  )
}

export default SourcingRequestBudgetDetails
