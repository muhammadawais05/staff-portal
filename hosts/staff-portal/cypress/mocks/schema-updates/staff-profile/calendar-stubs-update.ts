import { OperationValue } from '~integration/types'
import { staffProfilePageStubs } from '~integration/mocks/request-stubs'

export const updateCalendarStubs = (
  operationValues: { [key: string]: OperationValue } | undefined = {}
) => {
  cy.stubGraphQLRequests({
    ...staffProfilePageStubs(),
    ...operationValues
  })
}
