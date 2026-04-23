import { EmailMessage } from '@staff-portal/graphql/lens'
import { Maybe, Staff } from '@staff-portal/graphql/staff'

import { emailMessagesListPageStubs } from '~integration/mocks/request-stubs'
import {
  getUsersByEmailResponse,
  getAssociationUsersAutocompleteResponse
} from '~integration/mocks/responses/email-messages'
import { successMutationMock } from '~integration/mocks/mutations'

const updateEmailMessageAssociateUserStubs = ({
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
    GetAssociationUserAutocomplete: getAssociationUsersAutocompleteResponse(),
    CreateEmailContact: {
      data: {
        createEmailContact: {
          ...successMutationMock()
        }
      }
    }
  })

export default updateEmailMessageAssociateUserStubs
