import { OperationCallableTypes } from '@staff-portal/graphql/staff'

export default {
  id: 'VjEtQ2xpZW50LTQ3OTgxMQ',
  linkedinLink: {
    text: '1234',
    url: 'https://linkedin.com/company/1234',
    __typename: 'Link'
  },
  facebookLink: {
    text: 'example',
    url: 'https://facebook.com/example',
    __typename: 'Link'
  },
  crunchbaseLink: {
    text: '123',
    url: 'https://www.crunchbase.com/organization/123',
    __typename: 'Link'
  },
  zoominfoProfileUrl: '',
  twitterLink: {
    text: '@awesome',
    url: 'https://twitter.com/awesome',
    __typename: 'Link'
  },
  operations: {
    patchClientProfile: {
      __typename: 'Operation',
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    __typename: 'ClientOperations'
  },
  __typename: 'Client'
}
