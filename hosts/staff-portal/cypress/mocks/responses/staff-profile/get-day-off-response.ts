export const getDayOffResponse = () => ({
  data: {
    node: {
      daysOff: {
        totalCount: 0,
        nodes: [],
        __typename: 'DayOffConnection'
      },
      __typename: 'Staff'
    }
  }
})
