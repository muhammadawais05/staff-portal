import { EmailMessageFragment } from './email-message-fragment.lens.gql.types'

export const createEmailMessageFragmentMock = (
  emailMessageFragment: Partial<EmailMessageFragment>
) => ({
  __typename: 'EmailMessage' as const,
  body: 'This part was obfuscated, some content was here.',
  categories: ['company', 'internal'],
  from: {
    __typename: 'EmailAddress' as const,
    blacklisted: false,
    email: 'neil-8d89afe2b72ef173@toptal.io'
  },
  id: '15871870',
  sentAt: '2019-12-23T03:33:14.000000+03:00',
  subject: 'Re: SEO - Content Writer - UX Writer',
  to: [
    {
      __typename: 'EmailAddress' as const,
      blacklisted: false,
      email: 'nick-355ae9ea64d6bbc2@toptal.io'
    },
    {
      __typename: 'EmailAddress' as const,
      blacklisted: false,
      email: 'anth-c5179613bc6fa690@toptal.io'
    }
  ],
  ...emailMessageFragment
})
