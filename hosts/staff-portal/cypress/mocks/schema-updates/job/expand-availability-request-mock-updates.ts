import {
  EmailMessagingOperationResolvers,
  OperationCallableTypes,
  AvailabilityRequestResolvers,
  EmailMessagingAvailabilityRequesteeResolvers
} from '@staff-portal/graphql/staff'

import {
  jobAvailabilityRequestMock,
  jobAvailabilityRequestRecipientMock
} from '~integration/mocks/fragments'
import { convertToResolver } from '~integration/utils'

const updateAvailabilityRequestsExpandMocks = () => {
  const expandedItemMock = jobAvailabilityRequestMock()
  const recipientMock = jobAvailabilityRequestRecipientMock()

  cy.updateStaffMocks({
    EmailMessagingOperation: convertToResolver<
      EmailMessagingOperationResolvers,
      'EmailMessagingOperation'
    >({
      sendEmailTo: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      }
    }),
    AvailabilityRequest: convertToResolver<
      AvailabilityRequestResolvers,
      'AvailabilityRequest'
    >(expandedItemMock),
    EmailMessagingAvailabilityRequestee: convertToResolver<
      EmailMessagingAvailabilityRequesteeResolvers,
      'EmailMessagingAvailabilityRequestee'
    >({
      ...recipientMock.emailMessaging
    })
  })
}

export default updateAvailabilityRequestsExpandMocks
