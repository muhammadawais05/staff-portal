import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetTalentMatchersDocument } from './get-talent-matchers.staff.gql.types'

export const GET_TALENT_MATCHERS: typeof GetTalentMatchersDocument = gql`
  query GetTalentMatchers {
    roles(
      filter: { scope: TALENT_MATCHERS }
      order: { field: FULL_NAME, direction: ASC }
    ) {
      nodes {
        ... on Staff {
          id
          fullName
          teams(filter: { matchersOnly: true }) {
            nodes {
              id
              name
            }
          }
        }
      }
    }
  }
`

export const useGetTalentMatchers = () => {
  const { data, ...restOptions } = useQuery(GET_TALENT_MATCHERS, {
    throwOnError: true
  })

  return {
    data,
    ...restOptions
  }
}
