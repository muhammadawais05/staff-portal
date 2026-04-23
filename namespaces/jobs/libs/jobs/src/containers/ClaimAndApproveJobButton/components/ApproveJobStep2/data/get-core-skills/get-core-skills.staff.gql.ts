import { gql, useGetNode } from '@staff-portal/data-layer-service'

import { SKILL_FRAGMENT } from '../../../../../../data'
import { GetCoreSkillsDocument } from './get-core-skills.staff.gql.types'

export const GET_CORE_SKILLS = gql`
  query GetCoreSkills($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        id
        coreSkills(order: { direction: ASC, field: NAME }) {
          nodes {
            ...SkillFragment
          }
        }
      }
    }
  }

  ${SKILL_FRAGMENT}
`

export const useGetCoreSkills = (jobId: string) => {
  const { data, ...restOptions } = useGetNode(GetCoreSkillsDocument)({ jobId })

  return {
    ...restOptions,
    coreSkills: data?.coreSkills?.nodes
  }
}
