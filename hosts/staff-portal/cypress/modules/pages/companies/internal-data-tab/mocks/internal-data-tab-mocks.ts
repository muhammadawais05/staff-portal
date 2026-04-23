import {
  staffNodeMock,
  clientInternalDataMock
} from '~integration/mocks/fragments'

export const internalDataMocks = (node?: {}) => ({
  Query: {
    node: () => ({
      ...staffNodeMock,
      ...clientInternalDataMock(),
      ...node
    })
  }
})
