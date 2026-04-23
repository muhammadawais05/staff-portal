import { useMemo } from 'react'
import { gql, useQuery } from '@staff-portal/data-layer-service'
import { compareAlphabetically } from '@staff-portal/string'

import { GetParentCompaniesDocument } from './get-parent-companies.staff.gql.types'

export const GET_PARENT_COMPANIES: typeof GetParentCompaniesDocument = gql`
  query GetParentCompanies {
    autocomplete(
      pagination: { limit: 10000, offset: 0 }
      filter: { model: PARENT_CLIENTS }
    ) {
      edges {
        ...ParentCompanyFragment
      }
      totalCount
    }
  }

  fragment ParentCompanyFragment on AutocompleteEdge {
    key
    node {
      id
    }
    label
  }
`

export const useGetParentCompanies = ({ onError }: { onError: () => void }) => {
  const { data, ...queryResult } = useQuery(GET_PARENT_COMPANIES, {
    onError
  })

  const parentCompanies = useMemo(
    () =>
      data?.autocomplete?.edges
        .map(edge => ({
          id: edge.node?.id,
          fullName: edge.label
        }))
        .sort((first, second) =>
          compareAlphabetically(first?.fullName || '', second?.fullName || '')
        ),
    [data]
  )

  return {
    ...queryResult,
    parentCompanies
  } as const
}
