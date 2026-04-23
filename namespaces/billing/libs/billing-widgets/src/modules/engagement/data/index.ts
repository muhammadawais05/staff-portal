import { FetchPolicy } from '@apollo/client'
import { useGetNode } from '@staff-portal/billing/src/utils/graphql'

import { useGetEngagementQuery } from './getEngagement.graphql.types'

export const useGetEngagement = (
  engagementId: string,
  fetchPolicy: FetchPolicy = 'network-only'
) => useGetNode(useGetEngagementQuery)({ engagementId }, { fetchPolicy })
