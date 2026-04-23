import { Typography } from '@toptal/picasso'
import React from 'react'

import AvailabilityRequestsSkeletonLoader from '../AvailabilityRequestsSkeletonLoader'
import AvailabilityRequestsTable from '../AvailabilityRequestsTable'
import { useGetAvailabilityRequests } from './data'

interface Props {
  talentId: string
}

const AvailabilityRequestsSection = ({
  talentId
}: Props) => {
  const { data, networkLoading } = useGetAvailabilityRequests(talentId)

  if (networkLoading) {
    return <AvailabilityRequestsSkeletonLoader />
  }

  return (
    <>
      {data?.length ? (
        <AvailabilityRequestsTable availabilityRequests={data} />
      ) : (
        <Typography size='medium'>
          Currently there are no availability requests.
        </Typography>
      )}
    </>
  )
}

export default AvailabilityRequestsSection
