/// <reference types="cypress" />
import { FeatureFlag } from '@staff-portal/billing/src/@types/types'

import closeModal from './commands/closeModal'
import closeNotifications from './commands/closeNotifications'
import findByTestId from './commands/findByTestId'
import getByTestId from './commands/getByTestId'
import getFieldError from './commands/getFieldError'
import getNotification from './commands/getNotification'
import getTooltip from './commands/getTooltip'
import mockGraphQL from './commands/mockGraphQL'
import selectByValue from './commands/selectByValue'

declare global {
  interface Window {
    DATA_ACCESS_ACCESS_TOKEN: string
    DATA_ENGAGEMENT_ID: string
    DATA_FEATURE_FLAGS: Partial<FeatureFlag>
    DATA_INVOICE_ID: number
    DATA_CLIENT_ID: string
    DATA_PAYMENT_ID: number
    DATA_PAYMENT_GROUP_ID: number
    DATA_ROLE: string
    DATA_WIDGET: string
    DATA_MODALS_ONLY: boolean
  }

  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Mocks responses for GraphQL requests issued from the application.
       *  @param getOperationMock.operation The operation name of the GraphQL requests to intercept
       *  @param getOperationMock.variables (Optional) Input variables included in the request. Useful for returning different mocks for different inputs
       */
      closeModal: typeof closeModal
      closeNotifications: typeof closeNotifications
      findByTestId: typeof findByTestId
      getByTestId: typeof getByTestId
      getFieldError: typeof getFieldError
      getNotification: typeof getNotification
      getTooltip: typeof getTooltip
      mockGraphQL: typeof mockGraphQL
      selectByValue: typeof selectByValue
    }

    interface cy extends Chainable<undefined> {}
  }
}

Cypress.Commands.add('closeModal', closeModal)
Cypress.Commands.add('closeNotifications', closeNotifications)
Cypress.Commands.add('findByTestId', { prevSubject: 'optional' }, findByTestId)
Cypress.Commands.add('getByTestId', getByTestId)
Cypress.Commands.add('getFieldError', getFieldError)
Cypress.Commands.add('getNotification', getNotification)
Cypress.Commands.add('getTooltip', getTooltip)
Cypress.Commands.add('mockGraphQL', mockGraphQL)
Cypress.Commands.add('selectByValue', selectByValue)
