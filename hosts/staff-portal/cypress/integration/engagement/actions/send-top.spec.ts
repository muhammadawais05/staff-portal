import { updateSendTopMocks } from '~integration/mocks/schema-updates/engagement'
import { BasicModal } from '~integration/modules/modals'
import { Engagement } from '~integration/modules/pages/engagements'
import {
  ImportTopModal,
  SendTopModal
} from '~integration/modules/pages/engagements/components'

describe('Engagement page -> More -> Send TOP', () => {
  const page = new Engagement()
  const sendTopModal = new SendTopModal()
  const importTopModal = new ImportTopModal()
  const importContractAsTopModal = new BasicModal()

  const JOB_ID = '123'

  beforeEach(() => {
    updateSendTopMocks()

    page.visit()
  })

  describe('when the `Send TOP` action is selected and the form information is correct', () => {
    it('submits the `Send TOP` modal', () => {
      page.moreButton().click()
      page.moreDropdown.contains('Send TOP').click()

      sendTopModal.getImportTopButton().click()
      importTopModal.close()

      sendTopModal.getImportContractAsTopButton().click()
      importContractAsTopModal.clickButton('Cancel')

      sendTopModal.submitButton.click()

      cy.getNotification().should('have.text', 'The TOP was successfully sent.')

      cy.url().should('include', `/jobs/${JOB_ID}`)
      cy.go('back').end()
    })
  })

  describe('when the `Import TOP` action is selected and the form information is correct', () => {
    it('submits the `Import TOP` modal', () => {
      page.moreButton().click()
      page.moreDropdown.contains('Import TOP').click()

      importTopModal.getGuidField().type('1')

      importTopModal.submitButton.click()

      cy.getNotification().should(
        'have.text',
        'The TOP was successfully imported.'
      )

      cy.url().should('include', `/jobs/${JOB_ID}`)
      cy.go('back').end()
    })
  })

  describe('when the `Import STA as TOP` action is selected and the form information is correct', () => {
    it('submits the `Import STA as TOP` modal', () => {
      page.moreButton().click()
      page.moreDropdown.contains('Import STA as TOP').click()

      importContractAsTopModal.clickButton('Import Contract')

      cy.getNotification().should(
        'have.text',
        'The STA was successfully imported as TOP.'
      )

      cy.url().should('include', `/jobs/${JOB_ID}`)
      cy.go('back').end()
    })
  })
})
