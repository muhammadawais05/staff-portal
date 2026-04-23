import { gql, useQuery } from '@staff-portal/data-layer-service'

import {
  GetPendoVisitorDocument
} from './get-pendo-visitor.staff.gql.types'
import { PENDO_VISITOR_ROLE_FRAGMENT } from './pendo-visitor-role-fragment.staff.gql'

export const GET_PENDO_VISITOR = gql`
query GetPendoVisitor {
  viewer {
    me {
      id
      createdAt
      jobTitle
      teams {
        nodes {
          name
        }
      }
      ...PendoVisitorRoleFragment
    }
  }
}

${PENDO_VISITOR_ROLE_FRAGMENT}
`

export const useGetPendoVisitor = ({ onError }: { onError?: () => void } = {}) => {
  const { data, loading, error } = useQuery(GetPendoVisitorDocument, {
    onError,
    fetchPolicy: 'cache-first'
  })

  return { data: data?.viewer, loading, error }
}
