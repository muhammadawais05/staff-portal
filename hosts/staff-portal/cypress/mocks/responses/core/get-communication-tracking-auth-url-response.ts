export const getCommunicationTrackingAuthUrlResponse = () => ({
  payload: {
    data: {
      viewer: {
        __typename: 'Viewer',
        authCommunicationTrackingUrl:
          'https://staging.toptal.net/gateway/lens/auth/google'
      }
    }
  },
  operationName: 'GetCommunicationTrackingAuthUrl'
})
