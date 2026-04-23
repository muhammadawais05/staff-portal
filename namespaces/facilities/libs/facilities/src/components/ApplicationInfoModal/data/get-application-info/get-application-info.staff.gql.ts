import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetApplicationInfoDocument } from './get-application-info.staff.gql.types'

export const GET_APPLICATION_INFO: typeof GetApplicationInfoDocument = gql`
  query GetApplicationInfo($entityId: ID!) {
    node(id: $entityId) {
      ... on Client {
        id
        applicationInfo {
          ...ApplicationInfoFragment
        }
      }

      ... on Talent {
        id
        applicationInfo {
          ...ApplicationInfoFragment
        }
      }
    }
  }

  fragment ApplicationInfoFragment on ApplicationInfo {
    id
    attributes {
      key
      value
    }
  }
`

export const useGetApplicationInfo = (entityId: string) => {
  const { data, ...restOptions } = useQuery(GET_APPLICATION_INFO, {
    throwOnError: true,
    variables: { entityId }
  })

  return {
    applicationInfo: data?.node?.applicationInfo?.attributes,
    ...restOptions
  }
}
