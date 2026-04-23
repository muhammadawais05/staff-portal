export const getTalentUnfilledCallsResponse = () => ({
  data: {
    viewer: {
      calls: {
        totalCount: 0,
        __typename: 'CallsConnection'
      },
      __typename: 'Viewer'
    }
  }
})
