import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetSkillNameAutocompleteLabelDocument } from './get-skill-name-autocomplete-label.staff.gql.types'

export default gql`
  query GetSkillNameAutocompleteLabel($skillNameId: ID!) {
    node(id: $skillNameId) {
      ...SkillNameLabelFragment
    }
  }

  fragment SkillNameLabelFragment on SkillName {
    id
    name
  }
`

export const useGetSkillNameAutocompleteLabel = ({
  skillNameId,
  skip
}: {
  skillNameId: string
  skip?: boolean
}) => {
  const { data, ...restOptions } = useQuery(
    GetSkillNameAutocompleteLabelDocument,
    {
      variables: { skillNameId },
      fetchPolicy: 'cache-first',
      skip
    }
  )

  return {
    data: data?.node,
    ...restOptions
  }
}
