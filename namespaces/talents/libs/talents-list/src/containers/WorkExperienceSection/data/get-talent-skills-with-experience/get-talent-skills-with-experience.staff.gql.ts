import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetTalentSkillsWithExperienceDocument } from './get-talent-skills-with-experience.staff.gql.types'

export default gql`
  query GetTalentSkillsWithExperience($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        profile {
          id
          skillSets(filter: { withExperience: true, public: true }) {
            nodes {
              ...TalentSkillSetFragment
            }
          }
        }
      }
    }
  }

  fragment TalentSkillSetFragment on SkillSet {
    id
    skill {
      id
      name
      skillPage {
        publicUrl
      }
    }
    experience
  }
`

export const useGetTalentSkillsWithExperience = ({
  talentId,
  onError
}: {
  talentId: string
  onError: () => void
}) => {
  const { data, loading, error } = useQuery(
    GetTalentSkillsWithExperienceDocument,
    {
      onError,
      variables: {
        talentId
      }
    }
  )

  return {
    data: data?.node?.profile?.skillSets.nodes,
    loading: loading && !data,
    error
  }
}
