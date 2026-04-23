import {
  gql,
  useQuery,
  isNetworkLoading,
  BATCH_KEY
} from '@staff-portal/data-layer-service'

import { GetSkillsVerticalsDocument } from './get-skills-verticals.staff.gql.types'

export default gql`
  query GetSkillsVerticals($skillIds: [ID!]!) {
    staffNodes(ids: $skillIds) {
      ...SkillWithVerticalFragment
    }
  }

  fragment SkillWithVerticalFragment on Skill {
    id
    isIdentifier
    parent {
      id
      name
    }
    category {
      id
      title
      vertical {
        id
        talentType
      }
    }
  }
`

export const useGetSkillsVerticals = (skillIds: string[]) => {
  const { data, loading, networkStatus, ...restOptions } = useQuery(
    GetSkillsVerticalsDocument,
    {
      variables: { skillIds },
      context: { [BATCH_KEY]: 'APPLICATION_TAB_BATCH_KEY' }
    }
  )

  return {
    data: data?.staffNodes,
    loading,
    networkLoading: isNetworkLoading({ data, loading, networkStatus }),
    ...restOptions
  }
}
