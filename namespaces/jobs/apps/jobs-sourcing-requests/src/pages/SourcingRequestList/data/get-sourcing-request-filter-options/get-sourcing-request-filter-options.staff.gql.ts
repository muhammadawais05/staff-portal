import { gql, useQuery } from '@staff-portal/data-layer-service'
import { useMemo } from 'react'

import { GetSourcingRequestFilterOptionsDocument } from './get-sourcing-request-filter-options.staff.gql.types'

export const GET_SOURCING_REQUEST_FILTER_OPTIONS = gql`
  query GetSourcingRequestFilterOptions {
    jobClaimers: searchableRoles(
      filter: { scope: SOURCING_REQUEST_CLAIMERS }
      order: { direction: ASC, field: FULL_NAME }
    ) {
      nodes {
        id
        fullName
      }
    }

    talentSpecialists: searchableRoles(
      filter: { scope: SOURCING_REQUEST_TALENT_SPECIALISTS }
      order: { direction: ASC, field: FULL_NAME }
    ) {
      nodes {
        id
        fullName
      }
    }

    clientPartners: searchableRoles(
      filter: { scope: SOURCING_REQUEST_CLIENT_PARTNERS }
      order: { direction: ASC, field: FULL_NAME }
    ) {
      nodes {
        id
        fullName
      }
    }

    companies: searchableClients(
      filter: { scope: SOURCING_REQUEST_CLIENTS }
      order: { direction: ASC, field: FULL_NAME }
    ) {
      nodes {
        id
        fullName
      }
    }
  }
`

const mapSearchableOptions = (options?: { id: string; fullName: string }[]) =>
  options?.map(({ fullName, id }) => ({ label: fullName, value: id })) ?? []

export const useGetSourcingRequestFilterOptions = () => {
  const { data, loading } = useQuery(GetSourcingRequestFilterOptionsDocument, {
    fetchPolicy: 'cache-first'
  })

  const options = useMemo(
    () => ({
      jobClaimers: mapSearchableOptions(data?.jobClaimers.nodes),
      talentSpecialists: mapSearchableOptions(data?.talentSpecialists.nodes),
      clientPartners: mapSearchableOptions(data?.clientPartners.nodes),
      companies: mapSearchableOptions(data?.companies.nodes)
    }),
    [
      data?.clientPartners.nodes,
      data?.companies.nodes,
      data?.jobClaimers.nodes,
      data?.talentSpecialists.nodes
    ]
  )

  return {
    loading,
    ...options
  }
}
