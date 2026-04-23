import {
  gql,
  useQuery,
  isNetworkLoading
} from '@staff-portal/data-layer-service'

import { GetTalentLinkSourcingRequestDocument } from './get-talent-link-sourcing-request.staff.gql.types'

export const GET_TALENT_LINK_SOURCING_REQUEST: typeof GetTalentLinkSourcingRequestDocument = gql`
  query GetTalentLinkSourcingRequest($talentId: ID!) {
    node(id: $talentId) {
      ...TalentLinkSourcingRequestOperationFragment
    }
  }

  fragment TalentLinkSourcingRequestOperationFragment on Talent {
    id
    fullName
  }
`

export const useGetTalentLinkSourcingRequest = (
  talentId: string,
  {
    onError
  }: {
    onError: () => void
  }
) => {
  const { data, loading, networkStatus, ...restOptions } = useQuery(
    GET_TALENT_LINK_SOURCING_REQUEST,
    {
      onError,
      variables: { talentId }
    }
  )

  return {
    talentFullName: data?.node?.fullName,
    loading,
    networkLoading: isNetworkLoading({ data, loading, networkStatus }),
    ...restOptions
  }
}
