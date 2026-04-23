import setupServer from '../../../support/commands/setupServer'
import defaultResponses from '../../../support/defaultResponse/memorandumsListDefault'
import * as addMemorandum from '../../../partials/memorandumList/addMemorandum.spec'
import * as search from '../../../partials/memorandumList/search.spec'
/// <reference types="cypress" />

const resetSetup = ({
  overriddenResponses = {},
  baseUrl = '/',
  modalsOnly = false
} = {}) => {
  cy.mockGraphQL((operationName: string) =>
    setupServer({
      operationName,
      defaultResponses,
      overriddenResponses
    })
  )
  cy.clock()
  cy.visit(baseUrl, {
    onBeforeLoad: contentWindow => {
      contentWindow.DATA_WIDGET = 'StaffMemorandumListPage'
      contentWindow.DATA_MODALS_ONLY = modalsOnly
    }
  })
  cy.waitForReact()
}

describe('Memorandums list', () => {
  describe('list workflow', () => {
    before(() => {
      resetSetup({
        baseUrl:
          '/?status=allocated&balance=credit&creation_date%5Bfrom%5D=2020-12-07&creation_date%5Btill%5D=2020-12-16&page=1'
      })
    })

    it('verifies required parts of page flow', () => {
      // filters
      search.restoreFunctionality()
      search.basicFunctionality()

      // list
      addMemorandum.successfulFlow()
    })
  })
})
