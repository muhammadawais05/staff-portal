import { useGetExperimentsQuery } from './getExperiments.graphql.types'
import { useGetData } from '../utils/graphql'

export type {
  QueryAutocompleteQuery,
  QueryAutocompleteEdgeFragment,
  QueryAutocompleteNodeFragment,
  QueryAutocompleteClientFragment,
  QueryAutocompleteRoleTypeFragment
} from './queryAutocompleteOptions.graphql.types'

export {
  QueryAutocompleteDocument,
  useQueryAutocomplete,
  useQueryAutocompleteLazyQuery
} from './queryAutocompleteOptions.graphql.types'

export const useGetExperiments = () =>
  useGetData(useGetExperimentsQuery, 'experiments')(
    {},
    { fetchPolicy: 'network-only' }
  )
