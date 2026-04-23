import { gql, useLazyQuery } from '@staff-portal/data-layer-service'

import { GetPossibleSchedulersAutocompleteDocument } from './get-possible-schedulers-autocomplete.staff.gql.types'
import { SCHEDULER_FOR_TRANSFER_FRAGMENT } from '../../../../data/scheduler-for-transfer-fragment'

export const GET_POSSIBLE_SCHEDULERS_AUTOCOMPLETE: typeof GetPossibleSchedulersAutocompleteDocument = gql`
  query GetPossibleSchedulersAutocomplete($meetingId: ID!, $term: String!) {
    node(id: $meetingId) {
      ... on Meeting {
        id
        possibleSchedulersForTransferAutocomplete(
          filter: { term: $term }
          pagination: { offset: 0, limit: 10 }
        ) {
          edges {
            ...PossibleSchedulerFragment
          }
        }
      }
    }
  }

  fragment PossibleSchedulerFragment on AutocompleteEdge {
    key
    label
    labelHighlight
    node {
      ...SchedulerForTransferFragment
    }
  }

  ${SCHEDULER_FOR_TRANSFER_FRAGMENT}
`

export const useGetPossibleSchedulersAutocomplete = (meetingId: string) => {
  const [fetch, { data, loading }] = useLazyQuery(
    GET_POSSIBLE_SCHEDULERS_AUTOCOMPLETE,
    {
      fetchPolicy: 'no-cache',
      canonizeResults: false
    }
  )

  const getPossibleSchedulers = ({ term }: { term: string }) =>
    fetch({ variables: { term, meetingId } })

  return {
    getPossibleSchedulers,
    data: data?.node?.possibleSchedulersForTransferAutocomplete?.edges ?? null,
    loading
  }
}
