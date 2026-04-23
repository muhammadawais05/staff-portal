export const getTalentTouchCounterResponse = () => ({
  data: {
    touchCounter: {
      success: true,
      errors: [],
      counter: {
        name: 'sourcing_requests',
        total: 0,
        unread: 0,
        __typename: 'Counter'
      },
      __typename: 'TouchCounterPayload'
    }
  }
})
