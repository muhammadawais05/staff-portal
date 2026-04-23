/// <reference types="cypress" />

import { ArgumentTypes } from '~integration/types'

type GetOptionsType = ArgumentTypes<typeof cy.get>[1]

export default (selector: string, options?: GetOptionsType) =>
  cy.get(`[data-testid='${selector}']`, options)
