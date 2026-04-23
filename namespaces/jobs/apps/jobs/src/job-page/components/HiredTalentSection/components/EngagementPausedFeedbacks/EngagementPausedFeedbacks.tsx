import { Section } from '@toptal/picasso'
import React, { ComponentProps } from 'react'
import {
  useGetNode,
  WatchQueryFetchPolicy
} from '@staff-portal/data-layer-service'
import { EngagementFeedbacksCommon } from '@staff-portal/engagements'

import { GetEngagementPausedFeedbacksDocument } from './data'

export interface Props {
  engagementId: string
  labelColumnWidth: number
  sectionVariant?: ComponentProps<typeof Section>['variant']
  fetchPolicy?: WatchQueryFetchPolicy
}

const EngagementPausedFeedbacks = ({
  engagementId,
  labelColumnWidth,
  sectionVariant,
  fetchPolicy
}: Props) => {
  const { data, loading, initialLoading, refetch } = useGetNode(
    GetEngagementPausedFeedbacksDocument
  )(
    { engagementId },
    {
      throwOnError: true,
      fetchPolicy
    }
  )

  return (
    <EngagementFeedbacksCommon
      engagementId={engagementId}
      feedbacks={data?.feedbacks?.nodes}
      loading={loading}
      initialLoading={initialLoading}
      labelColumnWidth={labelColumnWidth}
      sectionVariant={sectionVariant}
      refetch={refetch}
    />
  )
}

export default EngagementPausedFeedbacks
