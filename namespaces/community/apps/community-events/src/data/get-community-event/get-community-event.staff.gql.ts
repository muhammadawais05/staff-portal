import { gql, useQuery } from '@staff-portal/data-layer-service'
import { useNotifications } from '@staff-portal/error-handling'

import { COMMUNITY_EVENT_FRAGMENT } from '../fragments/community-event-fragment.staff.gql'
import {
  GetCommunityEventDocument,
  GetCommunityEventQueryVariables
} from './get-community-event.staff.gql.types'

export default gql`
  query GetCommunityEvent($id: ID!) {
    node(id: $id) {
      ... on CommunityEvent {
        ...CommunityEventFragmentV2
      }
    }
  }
  ${COMMUNITY_EVENT_FRAGMENT}
`

interface Variables {
  variables: GetCommunityEventQueryVariables
}

export const useGetCommunityEvent = ({ variables }: Variables) => {
  const { showError } = useNotifications()
  const { data, loading, error } = useQuery(GetCommunityEventDocument, {
    variables,
    onError() {
      showError('Could not fetch community event')
    }
  })

  return {
    data: data?.node,
    loading,
    error
  }
}
