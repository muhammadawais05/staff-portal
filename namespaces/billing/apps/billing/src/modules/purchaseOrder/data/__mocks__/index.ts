export const useGetPurchaseOrderLinesDetails = jest.fn().mockReturnValue({
  data: {},
  loading: false,
  initialLoading: false,
  refetch: jest.fn()
})

export const useGetPurchaseOrdersListQuery = jest.fn().mockReturnValue({
  data: null,
  error: false,
  loading: false,
  initialLoading: false
})

export const useGetPurchaseOrderLineJobs = jest.fn().mockReturnValue({
  data: {
    id: 'VjEtUHVyY2hhc2VPcmRlckxpbmUtMg',
    client: {
      id: 'VjEtQ2xpZW50LTM2OTEyMg'
    },
    jobs: {
      nodes: [
        {
          id: 'VjEtSm9iLTE5NjA2MQ',
          webResource: {
            url: 'https://staging.toptal.net/platform/staff/jobs/196061',
            text: 'Lead Marketing Developer (196061)'
          },
          status: 'CLOSED',
          cumulativeStatus: 'CLOSED',
          currentEngagement: {
            id: 'VjEtRW5nYWdlbWVudC0yMTEyNjQ',
            webResource: {
              text: 'Fritsch-Labadie CL → Lead Marketing Developer (196061)',
              url: 'https://staging.toptal.net/platform/staff/engagements/211264'
            }
          },
          title: 'Lead Marketing Developer (196061)'
        }
      ]
    }
  },
  error: false,
  loading: false,
  initialLoading: false
})

export const useGetPurchaseOrderLinesToUpdate = jest.fn().mockReturnValue({
  data: null,
  error: false,
  loading: false,
  initialLoading: false
})
