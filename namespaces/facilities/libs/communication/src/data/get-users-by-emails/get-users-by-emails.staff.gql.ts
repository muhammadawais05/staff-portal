import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetUsersByEmailsDocument } from './get-users-by-emails.staff.gql.types'
import { USER_BY_EMAIL_FRAGMENT } from '../user-by-email-fragment'

export const GET_USERS_BY_EMAILS: typeof GetUsersByEmailsDocument = gql`
  query GetUsersByEmails($filter: CommunicationTrackingRolesFilter!) {
    communicationTrackingRoles(filter: $filter) {
      nodes {
        ...UserByEmailFragment
      }
    }
  }

  ${USER_BY_EMAIL_FRAGMENT}
`

export const useGetUsersByEmails = (
  emails: string[],
  {
    skip,
    onCompleted,
    onError
  }: { skip: boolean; onCompleted?: () => void; onError?: () => void }
) => {
  const { data, refetch, loading, error } = useQuery(GET_USERS_BY_EMAILS, {
    variables: { filter: { emails } },
    skip: emails.length === 0 || skip,
    onCompleted,
    onError
  })

  return {
    data: data?.communicationTrackingRoles.nodes,
    refetch,
    loading,
    error
  }
}
