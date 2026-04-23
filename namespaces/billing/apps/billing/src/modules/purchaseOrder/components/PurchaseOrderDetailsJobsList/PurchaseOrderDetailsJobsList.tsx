import React, { FC, memo } from 'react'
import { useGetNodes } from '@staff-portal/billing/src/utils/graphql'

import JobsList from '../../../job/components/JobsList'
import { useGetJobListQuery } from './data'
import { GetJobListQuery } from './data/getJobList.graphql.types'
import { consolidateJobsEngagements } from '../../utils/consolidateJobsEngagements'

const displayName = 'PurchaseOrderDetailsJobsList'

interface Props {
  purchaseOrderId: string
}

const PurchaseOrderDetailsJobsList: FC<Props> = memo<Props>(
  ({ purchaseOrderId }) => {
    const { data, loading, initialLoading } = useGetNodes(useGetJobListQuery)({
      ids: [purchaseOrderId]
    })

    const nodes =
      (data as Required<Exclude<GetJobListQuery['nodes'], null | undefined>>) ||
      []

    const jobs = nodes[0]?.jobs.nodes || []
    const engagements = nodes[0]?.engagements.nodes || []

    const consolidatedItems = consolidateJobsEngagements(jobs, engagements)

    return (
      <JobsList
        jobs={consolidatedItems}
        loading={loading}
        initialLoading={initialLoading}
      />
    )
  }
)

PurchaseOrderDetailsJobsList.displayName = displayName

export default PurchaseOrderDetailsJobsList
