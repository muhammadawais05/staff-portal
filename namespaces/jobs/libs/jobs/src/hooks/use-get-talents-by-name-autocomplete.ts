import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetTalentsByNameAutocompleteDocument } from '../data'

const useGetTalentsByNameAutocomplete = ({
  jobId,
  specializationId,
  limit = DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
  offset = 0
}: {
  jobId: string
  specializationId?: string
  limit?: number
  offset?: number
}) => {
  const [getTalentsByNameAutocomplete, { data, ...options }] = useLazyQuery(
    GetTalentsByNameAutocompleteDocument,
    {
      fetchPolicy: 'cache-first'
    }
  )

  const getTalentsByName = (term = '') =>
    getTalentsByNameAutocomplete({
      variables: {
        jobId,
        term,
        specialization: specializationId,
        offset,
        limit
      }
    })

  return {
    getTalentsByName,
    data: data?.node?.talentsAutocomplete?.edges,
    ...options
  }
}

export default useGetTalentsByNameAutocomplete
