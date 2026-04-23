import TalentProfilePage from '~integration/modules/pages/talents/talent-profile-tab'
import { BasicModal } from '~integration/modules/modals'
import { updateTalentProfilePageWithRoleFlagsStubs } from '~integration/mocks/schema-updates/talents'

describe('Talent Profile Tab. Role flags and communication links', () => {
  const page = new TalentProfilePage()
  const flagModal = new BasicModal()
  const { roleFlags } = page

  it('checks Role Flag functions on the Header', () => {
    updateTalentProfilePageWithRoleFlagsStubs()

    page.visit()

    // add a flag
    roleFlags.addFlagButton.click()
    flagModal.self.should('contain.text', 'Add New Flag for')
    flagModal.clickButton('Cancel')

    // edit a flag
    roleFlags.editFlagWithName('Type A Quality Talent').trigger('mouseover')
    roleFlags.editFlagButton.click()
    flagModal.self.should('contain.text', 'Update Type A Quality Talent flag')
    flagModal.clickButton('Cancel')

    // delete a flag
    roleFlags.editFlagWithName('Type A Quality Talent').trigger('mouseover')
    roleFlags.deleteFlagButton.click()
    flagModal.self.should('contain.text', 'Delete Type A Quality Talent flag')
    flagModal.clickButton('Cancel')
  })

  it('checks communication links in the general section', () => {
    updateTalentProfilePageWithRoleFlagsStubs()

    page.visit()

    // skype
    page.generalSection.skypeLink.should(
      'have.attr',
      'href',
      'skype:cypress-skype'
    )

    // phone
    page.generalSection.getPhoneLink.click({ force: true })
    cy.url().should('be.equal', Cypress.config().baseUrl + '/talents/911')
  })
})
