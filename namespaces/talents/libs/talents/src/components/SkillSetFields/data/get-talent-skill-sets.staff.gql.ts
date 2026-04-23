import { gql, useQuery } from '@staff-portal/data-layer-service'

import { TALENT_SKILL_SETS_FRAGMENT } from '../../../data/talent-skill-sets-fragment'
import {
  GetTalentSkillSetsDocument,
  GetTalentSkillSetsQuery
} from './get-talent-skill-sets.staff.gql.types'

export const GET_TALENT_SKILL_SETS: typeof GetTalentSkillSetsDocument = gql`
  query GetTalentSkillSets($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        type
        skillSets {
          ...TalentSkillSetsFragment
        }
      }
    }
  }

  ${TALENT_SKILL_SETS_FRAGMENT}
`

export const useGetTalentSkillSets = ({
  talentId,
  onCompleted,
  onError
}: {
  talentId: string
  onCompleted?: (data: GetTalentSkillSetsQuery) => void
  onError?: (error: Error) => void
}) => {
  const { data, loading, error } = useQuery(GET_TALENT_SKILL_SETS, {
    variables: { talentId },
    onCompleted,
    onError,
    fetchPolicy: 'cache-first'
  })

  return {
    talentType: data?.node?.type ?? '',
    skillSets: data?.node?.skillSets?.nodes,
    loading,
    error
  }
}
