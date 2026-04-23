import { Counter } from '@staff-portal/graphql/staff'

import { countersMock } from '~integration/mocks/counters-mock'

export const getTouchCounterResponse = (counter: Partial<Counter> = {}) => ({
  data: {
    touchCounter: {
      counter: {
        ...countersMock[0],
        ...counter,
        __typename: 'Counter'
      },
      errors: [],
      success: true,
      __typename: 'TouchCounterPayload'
    }
  }
})
