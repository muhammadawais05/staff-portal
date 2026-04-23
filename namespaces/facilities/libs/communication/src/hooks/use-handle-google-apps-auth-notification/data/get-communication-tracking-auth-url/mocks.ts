import { GET_COMMUNICATION_TRACKING_URL } from './get-communication-tracking-auth-url.lens.gql'

export const createGetCommunicationTrackingUrlMock = (trackingUrl = '') => {
  const getCommunicationTrackingUrlMock = {
    viewer: {
      authCommunicationTrackingUrl: trackingUrl,
      __typename: 'Viewer'
    }
  }

  return {
    request: { query: GET_COMMUNICATION_TRACKING_URL },
    result: { data: getCommunicationTrackingUrlMock }
  }
}
