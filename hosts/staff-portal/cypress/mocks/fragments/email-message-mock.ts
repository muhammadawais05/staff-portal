import { EmailMessage } from '@staff-portal/graphql/lens'

export const emailMessageMock = (emailMessage?: Partial<EmailMessage>) =>
  ({
    __typename: 'EmailMessage',
    body: 'This part was obfuscated, some content was here.',
    categories: ['company'],
    id: '31543273',
    sentAt: '2022-02-25T21:50:00.000000+03:00',
    subject: 'Toptal Follow-up',
    ...emailMessage,
    from: {
      blacklisted: false,
      email: 'yose-5b91220bd1b78b8b@toptal.io',
      ...emailMessage?.from,
      __typename: 'EmailAddress'
    },
    to: emailMessage?.to
      ? emailMessage?.to.map(to => ({
          ...to,
          __typename: 'EmailAddress'
        }))
      : [
          {
            blacklisted: false,
            email: 'tari-c56aac53298fcc9c@toptal.io',
            __typename: 'EmailAddress'
          }
        ]
  } as unknown as EmailMessage)
