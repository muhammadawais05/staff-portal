import React from 'react'
import { Section, Table } from '@toptal/picasso'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { ContainerLoader } from '@staff-portal/ui'
import { ENGAGEMENT_UPDATED } from '@staff-portal/engagements'
import {
  ScheduleInterviewItem,
  INTERVIEW_UPDATED,
  INTERVIEW_SCHEDULED
} from '@staff-portal/engagements-interviews'

import { useGetEngagementInterviews } from './data'
import { EngagementInterview, EngagementInterviewsLoader } from './components'

export interface Props {
  engagementId: string
}

const EngagementInterviews = ({ engagementId }: Props) => {
  const { engagement, interviews, initialLoading, loading, refetch } =
    useGetEngagementInterviews(engagementId)

  useMessageListener(
    [ENGAGEMENT_UPDATED, INTERVIEW_UPDATED, INTERVIEW_SCHEDULED],
    message => message.engagementId === engagementId && refetch()
  )

  return (
    <ContainerLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={<EngagementInterviewsLoader />}
    >
      {!!interviews?.length && engagement && (
        <Section
          variant='withHeaderBar'
          title='Interviews'
          data-testid='engagement-interviews-section'
          actions={
            <ScheduleInterviewItem
              componentType='button'
              size='small'
              variant='secondary'
              additionalInterview
              engagementId={engagementId}
              newExternalInterview={engagement.newExternalInterview}
            >
              Schedule Additional Interview
            </ScheduleInterviewItem>
          }
        >
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Cell>Date and Time</Table.Cell>
                <Table.Cell>Status</Table.Cell>
                <Table.Cell>Actions</Table.Cell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {interviews.map(interview => (
                <EngagementInterview
                  key={interview.id}
                  engagement={engagement}
                  interview={interview}
                />
              ))}
            </Table.Body>
          </Table>
        </Section>
      )}
    </ContainerLoader>
  )
}

export default EngagementInterviews
