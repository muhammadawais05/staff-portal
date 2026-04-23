import React from 'react'

import JobsList from '../../../job/components/JobsList'
import { useGetPurchaseOrderLineJobs } from '../../data'
import { consolidateJobsEngagements } from '../../utils/consolidateJobsEngagements'

interface Props {
  nodeId: string
}
const PurchaseOrderLineJobsTable = ({ nodeId }: Props) => {
  const { data, loading, initialLoading } = useGetPurchaseOrderLineJobs(nodeId)
  const jobs = data?.jobs?.nodes ?? []

  const engagements = data?.engagements?.nodes ?? []

  const consolidatedItems = consolidateJobsEngagements(
    jobs,
    engagements,
    'purchaseOrderLine'
  )

  return (
    <JobsList
      jobs={consolidatedItems}
      loading={loading}
      initialLoading={initialLoading}
    />
  )
}

export default PurchaseOrderLineJobsTable
