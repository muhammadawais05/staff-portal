/// <reference types="cypress" />

import { ArgumentTypes } from '~integration/types'

type FindOptionsType = ArgumentTypes<typeof cy.find>[1]

export default (
  subject: Cypress.Chainable,
  selector: string,
  options?: FindOptionsType
) => cy.wrap(subject).find(`[data-testid='${selector}']`, options)
