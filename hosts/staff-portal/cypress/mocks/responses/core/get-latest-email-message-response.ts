import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getLatestEmailMessageResponse = () => ({
  data: {
    roleLatestEmailMessage: {
      id: encodeEntityId('123', 'EmailMessage'),
      from: {
        __typename: 'EmailAddress',
        email: 'sama-a3b707ab23d8516b@toptal.io',
        blacklisted: false
      },
      to: [
        {
          __typename: 'EmailAddress',
          email: 'sama-a3b707ab23d8516b@toptal.io',
          blacklisted: false
        }
      ],
      categories: [],
      subject: 'Subject',
      body: 'body',
      sentAt: '2019-07-12T12:42:55-03:00',
      __typename: 'EmailMessage'
    }
  }
})
