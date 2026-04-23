import React, { useMemo } from 'react'
import { Section, Container } from '@toptal/picasso'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { ContainerLoader, TableSkeleton } from '@staff-portal/ui'
import { ENGAGEMENT_UPDATED } from '@staff-portal/engagements'
import { JOB_UPDATED } from '@staff-portal/jobs'

import {
  CandidateIntroDraftsTable,
  ViewPitchSnippetsButton
} from './components'
import { tableCols } from './components/CandidateIntroDraftsTable/config'
import { useGetCandidateIntroDrafts } from './data'
import { getPitchSnippetEngagementIds } from './utils'

interface Props {
  jobId: string
}

const JobCandidateIntroDrafts = ({ jobId }: Props) => {
  const { data, initialLoading, loading, refetch } =
    useGetCandidateIntroDrafts(jobId)

  const pitchSnippetEngagementIds = useMemo(
    () => getPitchSnippetEngagementIds(data),
    [data]
  )

  useMessageListener(JOB_UPDATED, ({ jobId: id }) => jobId === id && refetch())
  useMessageListener(
    [ENGAGEMENT_UPDATED],
    ({ engagementId }) =>
      data.some(({ id }) => id === engagementId) && refetch()
  )

  if (!loading && !data.length) {
    return null
  }

  return (
    <Container top='medium'>
      <Section
        data-testid='JobCandidateIntroDrafts-section'
        variant='withHeaderBar'
        title='Draft Engagements'
        actions={
          !loading && (
            <ViewPitchSnippetsButton
              engagementIds={pitchSnippetEngagementIds}
            />
          )
        }
      >
        <ContainerLoader
          loading={loading}
          showSkeleton={initialLoading}
          skeletonComponent={
            <TableSkeleton
              rows={1}
              cols={tableCols}
              dataTestId='JobCandidateIntroDrafts-loader'
              variant='clear'
            />
          }
        >
          <CandidateIntroDraftsTable candidates={data} />
        </ContainerLoader>
      </Section>
    </Container>
  )
}

export default JobCandidateIntroDrafts
