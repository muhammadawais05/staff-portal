import { AddVertical } from '~integration/modules/pages'
import { updateCreateNewVerticalMocks } from '~integration/mocks/schema-updates/verticals'

describe('Add vertical', () => {
  describe('Add vertical form', () => {
    const page = new AddVertical()

    it('creates new vertical', () => {
      updateCreateNewVerticalMocks()

      page.visit()

      page.getFormInputByName('talentType').type('Some text')
      page.getFormInputByName('publicPagesPath').type('Some text')

      page.getFormSubmitButton().click()

      cy.getNotification().should(
        'contain',
        'The vertical was successfully added.'
      )

      cy.url().should('eq', Cypress.config().baseUrl + '/vertical_settings')
    })
  })
})
