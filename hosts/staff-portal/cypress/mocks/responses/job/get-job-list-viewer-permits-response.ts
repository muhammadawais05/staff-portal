export const getJobListViewerPermitsResponse = () => ({
  data: {
    viewer: {
      permits: {
        createClaimableJob: true,
        canViewAllJobStatuses: true,
        __typename: 'Permits'
      },
      __typename: 'Viewer'
    }
  }
})
