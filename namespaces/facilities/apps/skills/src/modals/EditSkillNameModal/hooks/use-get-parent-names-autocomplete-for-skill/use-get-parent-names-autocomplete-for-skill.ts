import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { useLazyQuery } from '@staff-portal/data-layer-service'

import {
  GetPossibleParentNamesAutocompleteForSkillDocument,
  GetPossibleParentNamesAutocompleteForSkillQueryVariables
} from '../../data'

const useGetParentNamesAutocompleteForSkill = ({
  onError
}: {
  onError?: (error: Error) => void
}) => {
  const [fetch, { data, ...options }] = useLazyQuery(
    GetPossibleParentNamesAutocompleteForSkillDocument,
    {
      fetchPolicy: 'no-cache',
      canonizeResults: false,
      onError
    }
  )

  const getParentNamesAutocompleteForSkill = ({
    skillId,
    term,
    offset = 0,
    limit = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE
  }: {
    skillId: string
    term: string
  } & Partial<GetPossibleParentNamesAutocompleteForSkillQueryVariables>) =>
    fetch({ variables: { skillId, term, offset, limit } })

  return {
    getParentNamesAutocompleteForSkill,
    data: data?.node?.possibleParentNamesAutocomplete?.edges ?? null,
    ...options
  }
}

export default useGetParentNamesAutocompleteForSkill
