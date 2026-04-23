import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetInfractionClientDocument } from './get-infraction-client.staff.gql.types'

export const GET_INFRACTION_CLIENT: typeof GetInfractionClientDocument = gql`
  query GetInfractionClient($companyId: ID!) {
    node(id: $companyId) {
      ... on Client {
        ...InfractionClientFragment
      }
    }
  }

  fragment InfractionClientFragment on Client {
    id
    fullName
  }
`
export const useGetInfractionClient = ({
  companyId,
  skip
}: {
  companyId: string
  skip?: boolean
}) => {
  const { data, error, ...restOptions } = useQuery(GET_INFRACTION_CLIENT, {
    variables: { companyId },
    fetchPolicy: 'cache-first',
    skip
  })

  if (error && !data) {
    throw error
  }

  return {
    data: data?.node,
    error,
    ...restOptions
  }
}
