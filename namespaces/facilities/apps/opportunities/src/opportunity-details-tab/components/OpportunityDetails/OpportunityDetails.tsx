import React from 'react'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { useGetNode } from '@staff-portal/data-layer-service'
import { DetailedListSkeleton, ContainerLoader } from '@staff-portal/ui'

import { GetOpportunityDetailsDocument } from './data'
import OpportunityDetailsContent from './components/OpportunityDetailsContent'
import { OPPORTUNITY_CONTRACT_DELETED } from '../../../messages'
import { LABEL_COLUMN_WIDTH } from '../../utils/constants'

interface Props {
  opportunityId: string
}

export const OpportunityDetails = ({ opportunityId }: Props) => {
  const {
    data: opportunityDetails,
    loading,
    initialLoading,
    refetch
  } = useGetNode(GetOpportunityDetailsDocument)(
    { opportunityId },
    {
      notifyOnNetworkStatusChange: false
    }
  )

  useMessageListener(OPPORTUNITY_CONTRACT_DELETED, () => refetch())

  return (
    <ContainerLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={
        <>
          <DetailedListSkeleton
            labelColumnWidth={LABEL_COLUMN_WIDTH}
            columns={1}
            items={2}
          />
          <DetailedListSkeleton
            labelColumnWidth={LABEL_COLUMN_WIDTH}
            columns={2}
            items={16}
          />
        </>
      }
    >
      {opportunityDetails && (
        <OpportunityDetailsContent opportunityDetails={opportunityDetails} />
      )}
    </ContainerLoader>
  )
}

export default OpportunityDetails
