import React from 'react'
import { Container } from '@toptal/picasso'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { useGetNode } from '@staff-portal/data-layer-service'
import { ContainerLoader } from '@staff-portal/ui'
import { ENGAGEMENT_UPDATED } from '@staff-portal/engagements'
import { JOB_UPDATED } from '@staff-portal/jobs'

import {
  HiredTalentRow,
  HiredTalentSectionSkeletonLoader,
  HiredTalentTable
} from './components'
import { GetHiredTalentDocument } from './data'

interface Props {
  jobId: string
}

const HiredTalentSection = ({ jobId }: Props) => {
  const { data, loading, initialLoading, refetch } = useGetNode(
    GetHiredTalentDocument
  )({ jobId }, { throwOnError: true })
  const engagements = data?.engagements?.nodes
  const isExpanded = engagements?.length === 1

  useMessageListener(JOB_UPDATED, ({ jobId: id }) => jobId === id && refetch())
  useMessageListener(ENGAGEMENT_UPDATED, () => refetch())

  return (
    <ContainerLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={<HiredTalentSectionSkeletonLoader />}
      data-testid='HiredTalentSection'
    >
      {!!engagements?.length && (
        <Container top='medium'>
          <HiredTalentTable data-testid='HiredTalentSection-table'>
            {engagements.map((engagement, index) => (
              <HiredTalentRow
                key={engagement.id}
                jobId={jobId}
                engagement={engagement}
                isExpanded={isExpanded}
                stripeEven={Boolean(index % 2)}
              />
            ))}
          </HiredTalentTable>
        </Container>
      )}
    </ContainerLoader>
  )
}

export default HiredTalentSection
