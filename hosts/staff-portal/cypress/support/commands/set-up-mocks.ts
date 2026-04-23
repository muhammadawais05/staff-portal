/// <reference types="cypress" />

import { getStaffSchema } from '~integration/utils'
import { setUpStaffMocks } from '~integration/support/commands/set-up-staff-mocks'
import { setUpKipper } from '~integration/support/commands/set-up-kipper'
import { setUpOtherMocks } from '~integration/support/commands/set-up-other-mocks'

export const setUpMocks = () => {
  // eslint-disable-next-line promise/catch-or-return
  cy.task<string>('readStaffSchema')
    .then(schemaString => getStaffSchema(schemaString))
    .then(schema => setUpStaffMocks(schema))

  setUpKipper()

  setUpOtherMocks()
}
