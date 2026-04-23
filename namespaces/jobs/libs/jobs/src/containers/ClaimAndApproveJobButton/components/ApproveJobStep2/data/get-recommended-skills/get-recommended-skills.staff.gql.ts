import { gql, useGetNode } from '@staff-portal/data-layer-service'
import { useMemo } from 'react'
import { Scalars } from '@staff-portal/graphql/staff'

import { GetRecommendedSkillsDocument } from './get-recommended-skills.staff.gql.types'
import { JobSkillSet } from '../../../../../../types'

export const GET_RECOMMENDED_SKILLS = gql`
  query GetRecommendedSkills($jobId: ID!, $skills: [RecommendedSkillInput!]) {
    node(id: $jobId) {
      ... on Job {
        id
        recommendedSkills(skills: $skills) {
          requestId
          nodes {
            name
            totalProfilesCount
          }
        }
      }
    }
  }
`

export const useGetRecommendedSkills = ({
  jobId,
  skillSets
}: {
  jobId: string
  skillSets: JobSkillSet[]
}) => {
  const skills = useMemo(
    () =>
      skillSets
        .filter(skillSet => skillSet.destroy !== true)
        .map(({ requestId, addedAt, skill: { name } }) => ({
          skillName: name,
          // TODO: why it does not work without type cast?
          // eslint-disable-next-line @miovision/disallow-date/no-new-date
          updatedAt: (addedAt as Scalars['Time']) ?? new Date().toISOString(),
          pickedFromRequestId: requestId
        })) ?? [],
    [skillSets]
  )

  const { data, ...restOptions } = useGetNode(GetRecommendedSkillsDocument)(
    { jobId, skills },
    {
      fetchPolicy: 'cache-first'
    }
  )

  return {
    ...restOptions,
    recommendedSkills: useMemo(() => {
      if (!data?.recommendedSkills) {
        return
      }

      return data.recommendedSkills.nodes.map(
        ({ name, totalProfilesCount }) => ({
          name,
          totalProfilesCount,
          requestId: data.recommendedSkills?.requestId ?? undefined
        })
      )
    }, [data])
  }
}
