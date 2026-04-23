import { useQuery, gql } from '@staff-portal/data-layer-service'

import {
  GetCompanyRepresentativeDocument,
  GetCompanyRepresentativeQueryVariables
} from './get-company-representative.staff.gql.types'
import { REPRESENTATIVE_FRAGMENT } from '../representative-fragment/representative-fragment.staff.gql'

export const GET_COMPANY_REPRESENTATIVE = gql`
  query GetCompanyRepresentative($representativeId: ID!) {
    staffNode(id: $representativeId) {
      ... on CompanyRepresentative {
        id
        ...Representative

        __typename
      }
    }
  }

  ${REPRESENTATIVE_FRAGMENT}
`

export const useGetCompanyRepresentative = (
  variables: GetCompanyRepresentativeQueryVariables
) => {
  const { data, loading, initialLoading, refetch, error } = useQuery(
    GetCompanyRepresentativeDocument,
    { variables, throwOnError: true }
  )

  return {
    representative: data?.staffNode ?? undefined,
    loading,
    initialLoading,
    refetch,
    error
  }
}
