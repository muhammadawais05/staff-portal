import { Section } from '@toptal/picasso'
import React, { ComponentProps } from 'react'
import { useGetNode, WatchQueryFetchPolicy } from '@staff-portal/data-layer-service'

import EngagementFeedbacksCommon from '../EngagementFeedbacksCommon'
import { GetEngagementFeedbacksDocument } from './data/get-engagement-feedbacks/get-engagement-feedbacks.staff.gql.types'

export interface Props {
  engagementId: string
  labelColumnWidth: number
  sectionVariant?: ComponentProps<typeof Section>['variant']
  fetchPolicy?: WatchQueryFetchPolicy
}

const EngagementFeedbacks = ({
  engagementId,
  labelColumnWidth,
  sectionVariant,
  fetchPolicy
}: Props) => {
  const { data, loading, initialLoading, refetch } = useGetNode(
    GetEngagementFeedbacksDocument
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

export default EngagementFeedbacks
