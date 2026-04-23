import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getLanguagesResponse = () => ({
  data: {
    languages: {
      nodes: [
        {
          id: encodeEntityId('123', 'Language'),
          name: 'English',
          __typename: 'Language'
        }
      ],
      __typename: 'CountryConnection'
    }
  }
})
