import React from 'react'
import { useGetNode } from '@staff-portal/data-layer-service'
import { ContainerLoader, DetailedListSkeleton } from '@staff-portal/ui'

import { GetOpportunityTimelineDocument } from './data'
import { LABEL_COLUMN_WIDTH } from '../../utils/constants'
import OpportunityTimelineContent from './components/OpportunityTimelineContent'

interface Props {
  opportunityId: string
}

export const OpportunityTimelineSection = ({ opportunityId }: Props) => {
  const {
    data: opportunityTimeline,
    loading,
    initialLoading
  } = useGetNode(GetOpportunityTimelineDocument)(
    { opportunityId },
    {
      notifyOnNetworkStatusChange: false
    }
  )

  return (
    <ContainerLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={
        <DetailedListSkeleton
          labelColumnWidth={LABEL_COLUMN_WIDTH}
          columns={2}
          items={6}
        />
      }
    >
      {opportunityTimeline && (
        <OpportunityTimelineContent opportunityTimeline={opportunityTimeline} />
      )}
    </ContainerLoader>
  )
}

export default OpportunityTimelineSection
