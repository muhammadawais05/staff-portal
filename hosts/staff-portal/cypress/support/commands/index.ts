import { defaultChromeStubs } from '~integration/mocks/request-stubs'
import { SubjectlessCommand } from '~integration/types'
import findByTestId from './find-by-test-id'
import getByTestId from './get-by-test-id'
import { getFieldError } from './get-field-error'
import { getNotification } from './get-notification'
import selectMenuOptionByText from './select-by-text'
import selectMenuOptionByValue from './select-by-value'
import { setUpMocks } from './set-up-mocks'
import getTooltip from './get-tooltip'
import { stubGraphQLRequests } from './stub-graphql-requests'
import {
  resetLensMocks,
  resetStaffMocks,
  updateStaffMocks
} from './update-mocks'
import 'cypress-file-upload'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      setUpMocks: typeof setUpMocks
      /**
       * @deprecated use cy.stubGraphQLRequests instead
       */
      updateStaffMocks: typeof updateStaffMocks
      resetStaffMocks: typeof resetStaffMocks
      resetLensMocks: typeof resetLensMocks
      getByTestId: typeof getByTestId
      findByTestId: SubjectlessCommand<typeof findByTestId>
      selectMenuOptionByValue: typeof selectMenuOptionByValue
      getFieldError: typeof getFieldError
      getNotification: typeof getNotification
      selectMenuOptionByText: typeof selectMenuOptionByText
      stubGraphQLRequests: typeof stubGraphQLRequests
      getTooltip: typeof getTooltip
    }
  }
}

const {
  Commands: { add }
} = Cypress

add('setUpMocks', setUpMocks)
add('updateStaffMocks', updateStaffMocks)
add('resetStaffMocks', resetStaffMocks)
add('resetLensMocks', resetLensMocks)
add('getByTestId', getByTestId)
// TODO: try to remove after https://toptal-core.atlassian.net/browse/FX-2734 is resolved
// eslint-disable-next-line
// @ts-ignore
add('findByTestId', { prevSubject: true }, findByTestId)
add('getFieldError', getFieldError)
add('selectMenuOptionByValue', selectMenuOptionByValue)
add('getNotification', getNotification)
add('selectMenuOptionByText', selectMenuOptionByText)
add('stubGraphQLRequests', stubGraphQLRequests)
add('getTooltip', getTooltip)

beforeEach(() => {
  stubGraphQLRequests(defaultChromeStubs())
  setUpMocks()
})
