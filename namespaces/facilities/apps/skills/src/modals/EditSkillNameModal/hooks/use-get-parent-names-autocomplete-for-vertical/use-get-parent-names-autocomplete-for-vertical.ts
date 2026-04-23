import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { useLazyQuery } from '@staff-portal/data-layer-service'

import {
  GetPossibleParentNamesAutocompleteForVerticalDocument,
  GetPossibleParentNamesAutocompleteForVerticalQueryVariables
} from '../../data'

const useGetParentNamesAutocompleteForVertical = ({
  onError
}: {
  onError?: (error: Error) => void
}) => {
  const [fetch, { data, ...options }] = useLazyQuery(
    GetPossibleParentNamesAutocompleteForVerticalDocument,
    {
      fetchPolicy: 'no-cache',
      canonizeResults: false,
      onError
    }
  )

  const getParentNamesAutocompleteForVertical = ({
    verticalId,
    term,
    offset = 0,
    limit = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE
  }: {
    verticalId: string
    term: string
  } & Partial<GetPossibleParentNamesAutocompleteForVerticalQueryVariables>) =>
    fetch({ variables: { verticalId, term, offset, limit } })

  return {
    getParentNamesAutocompleteForVertical,
    data: data?.node?.possibleParentSkillNamesAutocomplete?.edges ?? null,
    ...options
  }
}

export default useGetParentNamesAutocompleteForVertical
