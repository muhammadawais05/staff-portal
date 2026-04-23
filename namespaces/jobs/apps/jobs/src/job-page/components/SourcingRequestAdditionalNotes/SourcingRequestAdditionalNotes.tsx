import React from 'react'
import { Section, Container, Typography } from '@toptal/picasso'
import { useGetNode } from '@staff-portal/data-layer-service'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { DetailedListSkeleton, DescriptionFormatter } from '@staff-portal/ui'
import { ENGAGEMENT_UPDATED } from '@staff-portal/engagements'
import { JOB_UPDATED } from '@staff-portal/jobs'
import { NO_VALUE } from '@staff-portal/config'

import { GetJobSourcingRequestNotesDocument } from './data'

interface Props {
  jobId: string
}

export const SourcingRequestAdditionalNotes = ({ jobId }: Props) => {
  const { data, loading, refetch } = useGetNode(
    GetJobSourcingRequestNotesDocument
  )({ jobId })

  useMessageListener(JOB_UPDATED, ({ jobId: id }) => jobId === id && refetch())
  useMessageListener(ENGAGEMENT_UPDATED, () => refetch())

  return (
    <Container top='medium'>
      <Section title='Additional Notes' variant='withHeaderBar'>
        {!data && loading ? (
          <DetailedListSkeleton columns={2} labelColumnWidth={14} items={3} />
        ) : (
          <Typography
            size='medium'
            as='div'
            data-testid='sourcing-request-additional-notes'
          >
            <DescriptionFormatter
              text={data?.sourcingRequest?.additionalNotes || NO_VALUE}
            />
          </Typography>
        )}
      </Section>
    </Container>
  )
}

export default SourcingRequestAdditionalNotes
