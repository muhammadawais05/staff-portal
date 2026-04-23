import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetRoleMissingFlagsDocument } from './get-role-missing-flags.staff.gql.types'

export const GET_ROLE_MISSING_FLAGS: typeof GetRoleMissingFlagsDocument = gql`
  query GetRoleMissingFlags($roleId: ID!) {
    node(id: $roleId) {
      ... on Talent {
        id
        missingFlags {
          ...MissingFlagsFragment
        }
      }
      ... on Client {
        id
        missingFlags {
          ...MissingFlagsFragment
        }
      }
      ... on CompanyRepresentative {
        id
        missingFlags {
          ...MissingFlagsFragment
        }
      }
      ... on Staff {
        id
        missingFlags {
          ...MissingFlagsFragment
        }
      }
    }
    viewer {
      permits {
        createTalentInfractions
      }
    }
  }

  fragment MissingFlagsFragment on FlagConnection {
    nodes {
      title
      id
      color
      token
    }
  }
`

export const useGetRoleMissingFlags = (roleId: string) => {
  const { data, error, loading } = useQuery(GET_ROLE_MISSING_FLAGS, {
    variables: { roleId }
  })

  const canCreateTalentInfractions =
    data?.viewer.permits.createTalentInfractions ?? false

  return {
    data: data?.node?.missingFlags?.nodes,
    canCreateTalentInfractions,
    loading,
    error
  }
}
