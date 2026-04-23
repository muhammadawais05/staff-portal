import { useMemo } from 'react'
import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetTalentSoftSkillsDocument } from './get-talent-soft-skills.staff.gql.types'
import { matchRatingsToSoftSkills } from '../../services'

export default gql`
  query GetTalentSoftSkills($talentId: ID!) {
    node(id: $talentId) {
      ...TalentSoftSkillsFragment
    }

    softSkills {
      nodes {
        ...TalentSoftSkillFragment
      }
    }
  }

  fragment TalentSoftSkillsFragment on Talent {
    id
    fullName
    operations {
      createTalentSoftSkillRating {
        callable
        messages
      }
    }
    softSkillRatings {
      nodes {
        comment
        createdAt
        id
        note {
          ...TalentSoftSkillsNoteFragment
        }
        operations {
          removeSoftSkillRating {
            callable
            messages
          }
        }
        performer {
          id
          fullName
          webResource {
            url
            text
          }
        }
        performerUnits {
          nodes {
            name
          }
        }
        softSkill {
          id
        }
        value
      }
    }
  }

  fragment TalentSoftSkillFragment on SoftSkill {
    id
    name
    ratingHints {
      description
      title
      value
    }
  }

  fragment TalentSoftSkillsNoteFragment on Note {
    id
    type
  }
`

export const useGetTalentSoftSkills = (talentId: string) => {
  const { data, loading, refetch, error } = useQuery(
    GetTalentSoftSkillsDocument,
    {
      variables: { talentId },
      fetchPolicy: 'cache-first'
    }
  )

  const softSkills = useMemo(() => {
    if (!data?.softSkills.nodes) {
      return []
    }

    return matchRatingsToSoftSkills(
      data.softSkills.nodes,
      data.node && data.node.softSkillRatings
        ? data.node.softSkillRatings.nodes
        : []
    )
  }, [data?.node, data?.softSkills.nodes])

  return {
    softSkills,
    talentFullName: data?.node?.fullName,
    createTalentSoftSkillRatingOperation:
      data?.node?.operations.createTalentSoftSkillRating,
    loading: loading && !data,
    refetch,
    error
  }
}
