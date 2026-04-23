import { gql, useQuery } from '@staff-portal/data-layer-service'
import { useNotifications } from '@staff-portal/error-handling'

import { COMMUNITY_EVENT_FRAGMENT } from '../fragments/community-event-fragment.staff.gql'
import {
  GetCommunityEventsDocument,
  GetCommunityEventsQueryVariables
} from './get-community-events.staff.gql.types'

export default gql`
  query GetCommunityEvents(
    $filter: CommunityEventFilter
    $pagination: OffsetPagination!
  ) {
    communityEvents(filter: $filter, pagination: $pagination) {
      nodes {
        ...CommunityEventFragmentV2
      }
      totalCount
    }
  }
  ${COMMUNITY_EVENT_FRAGMENT}
`

interface Variables {
  variables: GetCommunityEventsQueryVariables
}

export const useGetCommunityEvents = ({ variables }: Variables) => {
  const { showError } = useNotifications()
  const { data, loading, error } = useQuery(GetCommunityEventsDocument, {
    variables,
    onError() {
      showError('Could not fetch community events')
    }
  })

  return {
    data: data?.communityEvents,
    loading,
    error
  }
}
