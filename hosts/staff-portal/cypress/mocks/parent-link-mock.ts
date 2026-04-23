import { webResourceMock } from '~integration/mocks/fragments'

export const parentLinkMock = () => ({
  id: 'VjEtQ2xpZW50LTUzNTQyOQ',
  fullName: 'Schulist, Funk and Wolff',
  ...webResourceMock(),
  contracts: {
    nodes: [],
    totalCount: 0
  },
  __typename: 'Client'
})
