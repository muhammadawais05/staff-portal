import React from 'react'
import { useGetNode } from '@staff-portal/data-layer-service'
import { ContainerLoader, DetailedListSkeleton } from '@staff-portal/ui'

import { GetOpportunityAttributionDocument } from './data'
import OpportunityAttributionContent from './components/OpportunityAttributionContent'
import { LABEL_COLUMN_WIDTH } from '../../utils/constants'

interface Props {
  opportunityId: string
}

export const OpportunityAttribution = ({ opportunityId }: Props) => {
  const {
    data: opportunityAttribution,
    loading,
    initialLoading
  } = useGetNode(GetOpportunityAttributionDocument)(
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
        <>
          <DetailedListSkeleton
            striped
            labelColumnWidth={LABEL_COLUMN_WIDTH}
            columns={2}
            items={6}
          />
        </>
      }
    >
      {opportunityAttribution && (
        <OpportunityAttributionContent
          opportunityAttribution={opportunityAttribution}
        />
      )}
    </ContainerLoader>
  )
}

export default OpportunityAttribution
