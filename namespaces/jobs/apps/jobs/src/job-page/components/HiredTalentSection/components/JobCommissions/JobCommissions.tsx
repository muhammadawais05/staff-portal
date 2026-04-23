import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { useQuery } from '@staff-portal/data-layer-service'
import { ContainerLoader } from '@staff-portal/ui'

import { JobCommissionsDocument } from './data/get-job-commissions/get-job-commissions.staff.gql.types'
import {
  JobCommissionsLayout,
  JobCommissionsHeader,
  JobCommissionsFields,
  JobCommissionsSkeletonLoader
} from './components'

type Props = {
  jobId: string
}

const JobCommissions = ({ jobId }: Props) => {
  const { data, loading, initialLoading } = useQuery(JobCommissionsDocument, {
    variables: { jobId },
    fetchPolicy: 'cache-first'
  })

  if (data?.viewer.permits.canViewJobCommissions === false) {
    return null
  }

  // we are getting currentEngagement, via: filter: { scope: CURRENT })
  const engagement = data?.node?.engagements?.nodes?.[0]

  const client = data?.node?.client
  const talent = engagement?.talent
  const talentPartner = talent?.talentPartner
  const engagementCommissions = engagement?.commissions?.commissions

  const hasData = Boolean(
    client?.commissions?.referralCommissionV2 ||
      talent?.commissions?.referralCommissionV2 ||
      talentPartner?.commissions?.referralCommission ||
      engagementCommissions?.length
  )

  return (
    <ContainerLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={<JobCommissionsSkeletonLoader />}
    >
      <JobCommissionsLayout>
        <JobCommissionsHeader
          commissionsPot={engagement?.commissions?.commissionsPot}
        />
        {hasData ? (
          <JobCommissionsFields
            client={client}
            talent={talent}
            talentType={talent?.type}
            talentPartner={talentPartner}
            engagementCommissions={engagementCommissions}
          />
        ) : (
          <Container padded='small'>
            <Typography size='medium'>
              Currently, there are no commissions.
            </Typography>
          </Container>
        )}
      </JobCommissionsLayout>
    </ContainerLoader>
  )
}

export default JobCommissions
