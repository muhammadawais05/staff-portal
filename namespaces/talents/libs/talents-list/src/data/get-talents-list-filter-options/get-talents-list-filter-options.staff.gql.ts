import { gql, useQuery, ApolloError } from '@staff-portal/data-layer-service'

import { GetTalentsListFilterOptionsDocument } from './get-talents-list-filter-options.staff.gql.types'

export const GET_TALENTS_LIST_FILTER_OPTIONS = gql`
  query GetTalentsListFilterOptions {
    talentMaxHourlyRateLimit
    viewer {
      permits {
        accessTalentInternals
      }
    }
  }
`
interface Props {
  onError?: (error: ApolloError) => void
}
export const useGetTalentsListFilterOptions = ({ onError }: Props) =>
  useQuery(GetTalentsListFilterOptionsDocument, {
    fetchPolicy: 'cache-first',
    onError
  })
