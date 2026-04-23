import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getCandidateSendingEngagementResponse = () => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Engagement'),
      status: 'PENDING',
      talent: {
        id: encodeEntityId('123', 'Talent'),
        type: 'Developer',
        webResource: {
          text: 'France Hegmann',
          url: 'https://some.url',
          __typename: 'Link'
        },
        __typename: 'Talent'
      },
      job: {
        id: encodeEntityId('123', 'Job'),
        webResource: {
          text: 'Senior  Developer (290480)',
          url: 'https://some-url',
          __typename: 'Link'
        },
        __typename: 'Job'
      },
      webResource: {
        url: 'https://some-url',
        __typename: 'Link'
      },
      __typename: 'Engagement'
    }
  }
})
