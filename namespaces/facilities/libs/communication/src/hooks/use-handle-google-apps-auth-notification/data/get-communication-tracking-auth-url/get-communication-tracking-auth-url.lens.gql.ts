import { gql, useQuery, LENS_CONTEXT } from '@staff-portal/data-layer-service'

import { GetCommunicationTrackingAuthUrlDocument } from './get-communication-tracking-auth-url.lens.gql.types'

export const GET_COMMUNICATION_TRACKING_URL: typeof GetCommunicationTrackingAuthUrlDocument = gql`
  query GetCommunicationTrackingAuthUrl {
    viewer {
      authCommunicationTrackingUrl
    }
  }
`

export const useGetCommunicationTrackingAuthUrl = () => {
  const { data } = useQuery(GET_COMMUNICATION_TRACKING_URL, {
    context: { type: LENS_CONTEXT }
  })

  return {
    authUrl: data?.viewer.authCommunicationTrackingUrl
  }
}
