import { EmailMessage } from '@staff-portal/graphql/lens'
import { Maybe, Staff } from '@staff-portal/graphql/staff'

import { emailMessagesListPageStubs } from '~integration/mocks/request-stubs'
import { getUsersByEmailResponse } from '~integration/mocks/responses/email-messages'

const updateEmailMessageBlacklistEmailStubs = ({
  emailMessage,
  users
}: {
  emailMessage: EmailMessage
  users: Maybe<Partial<Staff>>[]
}) =>
  cy.stubGraphQLRequests({
    ...emailMessagesListPageStubs({
      emailMessages: [emailMessage]
    }),
    GetUsersByEmails: getUsersByEmailResponse(users),
    EmailAddressBlacklist: {
      data: {
        emailAddressBlacklist: {
          __typename: 'EmailAddressPayload',
          messages: [],
          result: {
            __typename: 'EmailAddress',
            blacklisted: true,
            email: 'anyone@toptal.io'
          },
          successful: true
        }
      }
    }
  })

export default updateEmailMessageBlacklistEmailStubs
