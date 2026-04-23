import { BATCH_KEY, gql, useQuery } from '@staff-portal/data-layer-service'
import { TIME_ZONE_FRAGMENT } from '@staff-portal/date-time-utils'

import { GetEngagementClientDocument } from './get-engagement-client.staff.gql.types'

export const GET_ENGAGEMENT_CLIENT: typeof GetEngagementClientDocument = gql`
  query GetEngagementClient($engagementId: ID!) {
    node(id: $engagementId) {
      ... on Engagement {
        id
        client {
          ...EngagementClientFragment
        }
      }
    }
  }

  fragment EngagementClientFragment on Client {
    id
    photo {
      default
    }
    fullName
    email
    contact {
      id
      contacts(filter: { type: [PHONE, SKYPE, EMAIL] }) {
        nodes {
          id
          type
          value
        }
      }
    }
    billingPhone
    timeZone {
      ...TimeZoneFragment
    }
    webResource {
      text
      url
    }
  }

  ${TIME_ZONE_FRAGMENT}
`

export const useGetEngagementClient = (engagementId: string) => {
  const { data, ...restOptions } = useQuery(GET_ENGAGEMENT_CLIENT, {
    variables: { engagementId },
    throwOnError: true,
    context: { [BATCH_KEY]: 'engagement-above-the-fold-data' }
  })

  return {
    data: data?.node?.client,
    ...restOptions
  }
}
