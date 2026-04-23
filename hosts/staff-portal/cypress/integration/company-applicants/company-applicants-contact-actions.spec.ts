import { updateCompanyApplicantsContactActionsStubs } from '~integration/mocks/schema-updates/company-applicants'
import { CompanyApplicants } from '~integration/modules/pages'

describe('Company Applicants Page -> Contact Actions', () => {
  const page = new CompanyApplicants()

  beforeEach(() => {
    updateCompanyApplicantsContactActionsStubs()
  })

  describe('Skype', () => {
    it('calls skype and phone number', () => {
      page.visit()

      page.skypeLink.should('have.attr', 'href', 'skype:SKYPE_ID')

      page.phoneLink.click()
      cy.url().should(
        'be.equal',
        Cypress.config().baseUrl + '/applicants/companies?page=911'
      )
    })
  })
})
