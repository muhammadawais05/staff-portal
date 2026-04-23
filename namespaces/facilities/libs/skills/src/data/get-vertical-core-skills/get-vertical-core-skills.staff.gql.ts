import { gql, useQuery } from '@staff-portal/data-layer-service'

import { VerticalSkillFragmentDoc } from '../vertical-skill-fragment/vertical-skill-fragment.staff.gql.types'
import { GetVerticalCoreSkillsDocument } from './get-vertical-core-skills.staff.gql.types'

export default gql`
  query GetVerticalCoreSkills($verticalId: ID!) {
    node(id: $verticalId) {
      ... on Vertical {
        id
        coreSkills {
          nodes {
            id
            skills: skillsV2(filter: { verticalIds: [$verticalId] }) {
              nodes {
                ...VerticalSkillFragment
              }
            }
          }
        }
      }
    }
  }
  ${VerticalSkillFragmentDoc}
`

export const useGetVerticalCoreSkills = ({
  verticalId,
  skip
}: {
  verticalId?: string | null
  skip?: boolean
}) => {
  const { data, ...rest } = useQuery(GetVerticalCoreSkillsDocument, {
    variables: { verticalId },
    fetchPolicy: 'cache-first',
    canonizeResults: false,
    skip
  })

  return {
    coreSkills: data?.node?.coreSkills?.nodes,
    ...rest
  }
}
