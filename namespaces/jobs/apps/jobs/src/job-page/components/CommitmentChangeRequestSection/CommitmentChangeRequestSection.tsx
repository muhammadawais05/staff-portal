import React from 'react'
import { Section, Container } from '@toptal/picasso'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { ContainerLoader } from '@staff-portal/ui'
import { ENGAGEMENT_UPDATED } from '@staff-portal/engagements'
import { JOB_UPDATED } from '@staff-portal/jobs'

import { useGetJobCommitmentChangeRequest } from './data'
import CommitmentChangeRequestActions from './components/CommitmentChangeRequestActions'
import {
  CommitmentChangeRequestList,
  SectionSkeletonLoader
} from './components'

interface Props {
  jobId: string
}

const CommitmentChangeRequestSection = ({ jobId }: Props) => {
  const { data, initialLoading, loading, refetch } =
    useGetJobCommitmentChangeRequest(jobId)
  const { title: jobTitle, client, pendingCommitmentChangeRequest } = data || {}
  const isLoading = loading || initialLoading || pendingCommitmentChangeRequest

  useMessageListener(JOB_UPDATED, ({ jobId: id }) => jobId === id && refetch())
  useMessageListener(ENGAGEMENT_UPDATED, () => refetch())

  return (
    <>
      {isLoading && (
        <Container top='medium' data-testid='CommitmentChangeRequestSection'>
          <Section
            variant='withHeaderBar'
            title='Commitment Change Request'
            actions={
              <CommitmentChangeRequestActions
                commitmentChangeRequest={pendingCommitmentChangeRequest}
                jobId={jobId}
                jobTitle={jobTitle}
                clientId={client?.id}
              />
            }
          >
            <ContainerLoader
              loading={loading}
              showSkeleton={initialLoading}
              skeletonComponent={<SectionSkeletonLoader />}
            >
              <CommitmentChangeRequestList
                commitmentChangeRequest={pendingCommitmentChangeRequest}
              />
            </ContainerLoader>
          </Section>
        </Container>
      )}
    </>
  )
}

export default CommitmentChangeRequestSection
