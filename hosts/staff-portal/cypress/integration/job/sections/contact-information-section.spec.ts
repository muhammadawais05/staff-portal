import { updateContactInformationMocks } from '~integration/mocks/schema-updates/job'
import { JobPage } from '~integration/modules/pages/jobs'
import { AddContactModal } from '~integration/modules/pages/jobs/components'

describe('Job Contact Information Section', () => {
  const page = new JobPage()
  const { contactInformationSection } = page

  beforeEach(() => {
    updateContactInformationMocks()
    page.visit()
  })

  describe('starts a call', () => {
    it('from the phone field', () => {
      contactInformationSection.phoneNumberLink.within(() =>
        cy.get('button').click()
      )

      cy.url().should('be.equal', Cypress.config().baseUrl + '/jobs/456')
    })

    it('from the contact details tooltip', () => {
      contactInformationSection.contactActionButton.trigger('mouseover', {
        force: true
      })

      contactInformationSection.contactDetailsPhoneNumberLink.within(() =>
        cy.get('button').click()
      )

      cy.url().should('be.equal', Cypress.config().baseUrl + '/jobs/456')
    })
  })

  it('adds a new job contact', () => {
    const addContactModal = new AddContactModal()

    contactInformationSection.addJobContactButton.click()
    addContactModal.setJobContactsSelectValue('Shawn Stehr +493025761781')
    addContactModal.submitButton.click()

    cy.getNotification().should(
      'have.text',
      'Shawn Stehr was successfully added as the job contact.'
    )
  })

  describe('removes a job contact', () => {
    it('by clicking on the remove button besides contact name', () => {
      contactInformationSection.contactRemoveButton.click()

      cy.getNotification().should(
        'have.text',
        'Job Contact was successfully removed.'
      )
    })

    it('by clicking on the remove button on the contact details tooltip', () => {
      contactInformationSection.contactActionButton.trigger('mouseover', {
        force: true
      })

      cy.getTooltip().within(() =>
        cy.get('button').contains('Remove Contact').click()
      )

      cy.getNotification().should(
        'have.text',
        'Job Contact was successfully removed.'
      )
    })
  })
})
