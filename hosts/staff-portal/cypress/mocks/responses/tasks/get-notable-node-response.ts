import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getNotableNodeResponse = () => ({
  data: {
    staffNode: {
      id: encodeEntityId('123', 'Client'),
      __typename: 'Client',
      email: 'ryan-1a7b7385c859620f@toptal.io',
      notes: {
        nodes: [],
        __typename: 'NoteConnection'
      },
      webResource: {
        url: 'https://staging.toptal.net/platform/staff/companies/1628097',
        text: 'Beier, Hirthe and Keeling',
        __typename: 'Link'
      }
    }
  }
})
