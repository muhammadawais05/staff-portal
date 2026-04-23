export const getClientMatchersResponse = () => ({
  data: {
    node: {
      id: 'VjEtQ2xpZW50LTM1MzUwMg',
      matchers: {
        edges: [
          {
            node: {
              id: 'VjEtQ2xpZW50TWF0Y2hlci03MzExNA',
              role: {
                id: 'VjEtU3RhZmYtMjU5NDU0Mw',
                fullName: 'Ana Balderramas',
                webResource: {
                  url: 'https://staging.toptal.net/platform/staff/staff/2594543',
                  text: 'Ana Balderramas',
                  __typename: 'Link'
                },
                __typename: 'Staff'
              },
              vertical: {
                id: 'VjEtVmVydGljYWwtMg',
                talentType: 'designer',
                __typename: 'Vertical'
              },
              __typename: 'ClientMatcher'
            },
            handoff: null,
            __typename: 'ClientMatcherEdge'
          }
        ],
        __typename: 'ClientMatcherConnection'
      },
      __typename: 'Client'
    }
  }
})
