import React, { useCallback } from 'react'
import { Container, Typography } from '@toptal/picasso'
import { useGetNode } from '@staff-portal/data-layer-service'
import { ContainerLoader } from '@staff-portal/ui'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { ENGAGEMENT_UPDATED } from '@staff-portal/engagements'

import {
  JobContractItem,
  JobContractsActions,
  JobContractsLayout,
  JobContractsSkeletonLoader
} from './components'
import { GetJobContractsDocument } from './data/get-job-contracts/get-job-contracts.staff.gql.types'
import { HiredTalentEngagementFragment } from '../../data/get-hired-talent/get-hired-talent.staff.gql.types'

type Props = {
  engagement: HiredTalentEngagementFragment
  jobId: string
}

const JobContracts = ({ engagement, jobId }: Props) => {
  const { data, loading, initialLoading, refetch } = useGetNode(
    GetJobContractsDocument
  )(
    {
      jobId
    },
    { fetchPolicy: 'cache-first' }
  )

  const refetchJobContracts = useCallback(() => refetch(), [refetch])

  useMessageListener(
    [ENGAGEMENT_UPDATED],
    ({ engagementId }) => engagementId === engagement.id && refetch()
  )

  return (
    <ContainerLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={<JobContractsSkeletonLoader />}
    >
      <JobContractsLayout
        actions={<JobContractsActions engagement={engagement} />}
      >
        {!data?.contracts?.nodes?.length ? (
          <Container padded='small'>
            <Typography size='medium'>No related contracts.</Typography>
          </Container>
        ) : (
          data.contracts.nodes.map(contract => (
            <JobContractItem
              key={contract.id}
              contract={contract}
              jobWebResource={data.webResource}
              onSuccessAction={refetchJobContracts}
            />
          ))
        )}
      </JobContractsLayout>
    </ContainerLoader>
  )
}

export default JobContracts
