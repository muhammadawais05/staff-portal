import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetScreeningSpecialistsDocument } from './get-screening-specialists.staff.gql.types'
import { SCREENING_SPECIALIST_FRAGMENT } from '../screening-specialist-fragment.staff.gql'

export const GET_SCREENING_SPECIALISTS_QUERY: typeof GetScreeningSpecialistsDocument = gql`
  query GetScreeningSpecialists {
    roles(filter: { scope: TALENT_SCREENING_SPECIALISTS }) {
      nodes {
        ...ScreeningSpecialistFragment
      }
    }
  }

  ${SCREENING_SPECIALIST_FRAGMENT}
`

export const useGetScreeningSpecialists = () => {
  const { data, error, loading, ...restOptions } = useQuery(
    GET_SCREENING_SPECIALISTS_QUERY,
    { fetchPolicy: 'cache-first' }
  )

  return {
    screeningSpecialists: data?.roles.nodes,
    loading,
    error,
    ...restOptions
  }
}
