import React, { PropsWithChildren } from 'react'
import { ContainerLoader } from '@staff-portal/ui'
import { Container, SkeletonLoader } from '@toptal/picasso'

import { useGetBillingPermits } from './data'

interface Props {
  skeletonRowsSize: number
}

const ViewBillingOptionsContainer = ({
  skeletonRowsSize,
  children
}: PropsWithChildren<Props>) => {
  const { loading, initialLoading, permits } = useGetBillingPermits()

  return (
    <ContainerLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={
        <Container top='medium'>
          <SkeletonLoader.Typography rows={skeletonRowsSize} />
        </Container>
      }
    >
      {permits?.canViewBillingOptions && children}
    </ContainerLoader>
  )
}

export default ViewBillingOptionsContainer
