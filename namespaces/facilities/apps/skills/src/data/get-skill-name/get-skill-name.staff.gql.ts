import {
  gql,
  useQuery,
  isNetworkLoading,
  BATCH_KEY
} from '@staff-portal/data-layer-service'

import { GetSkillNameDocument } from './get-skill-name.staff.gql.types'

export default gql`
  query GetSkillName($skillNameId: ID!) {
    staffNode(id: $skillNameId) {
      ...SkillNameFragment
    }
  }

  fragment SkillNameFragment on SkillName {
    id
    name
    editorChecked
    verticalChecked
  }
`

export const useGetSkillName = (id: string, skip: boolean) => {
  const { data, loading, networkStatus, ...restOptions } = useQuery(
    GetSkillNameDocument,
    {
      variables: { skillNameId: id },
      skip,
      context: { [BATCH_KEY]: 'APPLICATION_TAB_BATCH_KEY' }
    }
  )

  return {
    data: data?.staffNode,
    loading,
    networkLoading: isNetworkLoading({ data, loading, networkStatus }),
    ...restOptions
  }
}
