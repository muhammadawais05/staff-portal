import { gql, useQuery } from '@staff-portal/data-layer-service'
import { useNotifications } from '@staff-portal/error-handling'

import {
  GetCommunityEventAttendeesDocument,
  GetCommunityEventAttendeesQueryVariables
} from './get-community-event-attendees.staff.gql.types'

export default gql`
  query GetCommunityEventAttendees($id: ID!, $pagination: OffsetPagination!) {
    node(id: $id) {
      ... on CommunityEvent {
        attendees(pagination: $pagination) {
          nodes {
            id
            email
            fullName
          }
        }
      }
    }
  }
`

interface Variables {
  variables: GetCommunityEventAttendeesQueryVariables
}

export const useGetCommunityEventAttendees = ({ variables }: Variables) => {
  const { showError } = useNotifications()
  const { data, loading, error } = useQuery(
    GetCommunityEventAttendeesDocument,
    {
      variables,
      onError() {
        showError('Could not fetch community event attendees')
      }
    }
  )

  return {
    data: data?.node?.attendees?.nodes,
    loading,
    error
  }
}
