import { verticalsMock } from '~integration/mocks'

export const getUserVerticalsResponse = () => ({
  data: {
    verticals: {
      ...verticalsMock(),
      __typename: 'VerticalConnection'
    }
  }
})
