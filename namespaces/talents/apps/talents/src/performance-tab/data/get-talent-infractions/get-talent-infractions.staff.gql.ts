import {
  gql,
  useQuery,
  isNetworkLoading
} from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { TALENT_INFRACTION_FRAGMENT } from '@staff-portal/talents-infractions'

import { GetTalentInfractionsDocument } from './get-talent-infractions.staff.gql.types'

export const GET_TALENT_INFRACTIONS: typeof GetTalentInfractionsDocument = gql`
  query GetTalentInfractions($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        operations {
          createTalentInfraction {
            ...OperationFragment
          }
        }
        infractions {
          nodes {
            ...TalentInfractionFragment
          }
        }
      }
    }
  }

  ${OPERATION_FRAGMENT}
  ${TALENT_INFRACTION_FRAGMENT}
`

export const useGetTalentInfractions = (talentId: string) => {
  const { data, loading, networkStatus, ...restOptions } = useQuery(
    GET_TALENT_INFRACTIONS,
    {
      variables: { talentId }
    }
  )

  return {
    data: data?.node,
    loading,
    networkLoading: isNetworkLoading({ data, loading, networkStatus }),
    ...restOptions
  }
}
