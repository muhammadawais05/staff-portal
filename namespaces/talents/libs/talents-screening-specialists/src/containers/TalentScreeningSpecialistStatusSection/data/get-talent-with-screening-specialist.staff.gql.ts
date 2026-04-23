import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetTalentWithScreeningSpecialistDocument } from './get-talent-with-screening-specialist.staff.gql.types'
import {
  SPECIALIST_ASSIGNMENT_FRAGMENT,
  TSS_TALENT_OPERATIONS_FRAGMENT
} from '../../../data'

export const GET_TALENT_WITH_SCREENING_SPECIALIST: typeof GetTalentWithScreeningSpecialistDocument = gql`
  query GetTalentWithScreeningSpecialist($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        currentSpecialistAssignment {
          ...SpecialistAssignmentFragment
        }
        operations {
          ...TssTalentOperationsFragment
        }
      }
    }
  }
  ${TSS_TALENT_OPERATIONS_FRAGMENT}
  ${SPECIALIST_ASSIGNMENT_FRAGMENT}
`

export const useGetTalentWithScreeningSpecialist = (
  talentId: string,
  {
    onError
  }: {
    onError: () => void
  }
) => {
  const { data, loading, refetch } = useQuery(
    GET_TALENT_WITH_SCREENING_SPECIALIST,
    {
      variables: {
        talentId
      },
      onError,
      fetchPolicy: 'cache-first'
    }
  )

  return {
    talent: data?.node,
    loading,
    refetch
  }
}
