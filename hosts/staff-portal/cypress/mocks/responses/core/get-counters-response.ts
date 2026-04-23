export const getCountersResponse = () => ({
  data: {
    viewer: {
      counters: {
        nodes: [
          {
            name: 'test',
            total: 123,
            unread: 10,
            __typename: 'Counter'
          }
        ],
        __typename: 'CounterConnection'
      },
      __typename: 'Viewer'
    }
  }
})
