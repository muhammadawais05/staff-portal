import React, { FC, memo } from 'react'
import { useGetNode } from '@staff-portal/data-layer-service'
import { ContainerLoader } from '@staff-portal/ui'
import { Container } from '@toptal/picasso'

import {
  ReviewAttemptsContent,
  ReviewAttemptsSkeleton
} from './components'
import { GetReviewAttemptsDocument } from './data'

interface Props {
  clientId: string
}

const ReviewAttempts: FC<Props> = memo(({ clientId }) => {
  const { data, loading, initialLoading } = useGetNode(
    GetReviewAttemptsDocument
  )({
    clientId
  })

  const reviewAttempts = data?.reviewAttempts?.nodes || []

  return (
    <Container top='medium'>
      <ContainerLoader
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={<ReviewAttemptsSkeleton />}
      >
        <ReviewAttemptsContent
          reviewAttempts={reviewAttempts}
          clientId={clientId}
        />
      </ContainerLoader>
    </Container>
  )
})

export default ReviewAttempts
